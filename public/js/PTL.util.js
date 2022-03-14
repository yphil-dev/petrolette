// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.util = {
  firstColumn: function() {
    return $($('.ui-tabs-active')
             .find('a')
             .attr('href'))
      .find('.column').first();
  },
  XMLtoJSON: function() {

    this.fromStr = function(xml, rstr) {
      var xmlDoc;
      if (window.DOMParser) {
        var getxml = new DOMParser();
        xmlDoc = getxml.parseFromString(xml, "text/xml");
      }
      else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
      }
      var json_str = jsontoStr(setJsonObj(xmlDoc));
      return (typeof (rstr) == 'undefined') ? JSON.parse(json_str) : json_str;
    };

    var setJsonObj = function(xml) {
      var js_obj = {};
      if (xml.nodeType == 1) {
        if (xml.attributes.length > 0) {
          js_obj["@attributes"] = {};
          for (var j = 0; j < xml.attributes.length; j++) {
            var attribute = xml.attributes.item(j);
            js_obj["@attributes"][attribute.nodeName] = attribute.value;
          }
        }
      } else if (xml.nodeType == 3) {
        js_obj = xml.nodeValue;
      }
      if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
          var item = xml.childNodes.item(i);
          var nodeName = item.nodeName;
          if (typeof (js_obj[nodeName]) == "undefined") {
            js_obj[nodeName] = setJsonObj(item);
          } else {
            if (typeof (js_obj[nodeName].push) == "undefined") {
              var old = js_obj[nodeName];
              js_obj[nodeName] = [];
              js_obj[nodeName].push(old);
            }
            js_obj[nodeName].push(setJsonObj(item));
          }
        }
      }
      return js_obj;
    };

    var jsontoStr = function(js_obj) {
      var rejsn = JSON.stringify(js_obj, undefined, 2)
          .replace(/(\\t|\\r|\\n)/g, '')
          .replace(/"",[\n\t\r\s]+""[,]*/g, '')
          .replace(/(\n[\t\s\r]*\n)/g, '')
          .replace(/[\s\t]{2,}""[,]{0,1}/g, '')
          .replace(/"[\s\t]{1,}"[,]{0,1}/g, '')
          .replace(/\[[\t\s]*\]/g, '""');
      return (rejsn.indexOf('"parsererror": {') == -1) ? rejsn : 'Invalid XML format';
    };
  },
  isNV: function(xml) {
    return xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>');
  },
  importNV: function(xml) {

    var xml2json = new PTL.util.XMLtoJSON(),
        objson = xml2json.fromStr(xml),
        dbparsed = JSON.stringify(objson),
        all = objson.opml.body.outline,
        allTabs = [];

    var totalNbOfFeed = 0;

    for (var nbOfTabs in all) {
      var tabs = all[nbOfTabs],
          feeds = tabs.outline;

      for (var key in tabs.outline[0]) {
        var tab = tabs[key],
            thisTab = {},
            thisTabFeeds = [],
            thisColFeeds = [];

        for (var nbOfFeeds in feeds) {
          var thisFeed = {};
          var thisIndex;
          totalNbOfFeed++;
          thisFeed.status = "off";
          thisFeed.limit = 220;
          thisFeed.type = "mixed";
          thisFeed.url = DOMPurify.sanitize(feeds[nbOfFeeds]["@attributes"].xmlUrl);
          thisIndex = DOMPurify.sanitize(Number(feeds[nbOfFeeds]["@attributes"].col)) - 1;
          if (!thisColFeeds[thisIndex]) thisColFeeds[thisIndex] = [];
          thisColFeeds[thisIndex].push(thisFeed);
        }
        thisTabFeeds.push(thisColFeeds);
        thisTab.columns = thisColFeeds;
        thisTab.name = tab.title;
        allTabs.push(thisTab);
      }
    }

    PTL.tab.empty(function() {
      PTL.tab.populate(allTabs, true);
      PTL.util.say(PTL.tr('Data structure OK: %1 tab(s) containing %2 feed(s)', Number(nbOfTabs) + 1, Number(totalNbOfFeed)), 'success', true);
    });

  },
  beg: function() {

    const dateNow = Date.now(),
          nextNag = PTL.prefs.readConfig('nextNag');

    PTL.util.say(PTL.tr('Pétrolette needs you'), 'success');

    if (nextNag === 0) {
      PTL.dialog.beg();
      PTL.prefs.writeConfig('nextNag', dateNow + 86400000); // 24 hours
    }

    if (dateNow > nextNag) {
      PTL.prefs.writeConfig('nextNag', dateNow + 43200000);
      PTL.dialog.beg();
    }

  },
  say: function(text, type, notify, title) {

    const $lines = $('#console div'),
          d = new Date();

    const dialogTitle = title ? title : PTL.tr(type[0].toUpperCase() + type.substring(1));

    if (notify) PTL.dialog.notify(dialogTitle, PTL.tr(text));

    const $prompt = $('<span>')
          .attr('class', 'prompt')
          .text('#');
    const $line = $('<span>').text(text);

    $('#console').append($('<div>')
                         .attr('class', type || 'normal')
                         .attr('title', d.toLocaleString())
                         .append($prompt, $line));

    $('#console').animate({ scrollTop: $('#console').prop("scrollHeight") }, 1);

    if ($lines.length > 50) $lines.last().remove();

  },
  isUrl: function(u) {
    // return new RegExp('^(?:[a-z]+:)?//', 'i').test(u);

    try {
      new Url.URL(u);
      return true;
    } catch (err) {
      return false;
    }

  },
  isDomStorageEnabled: function () {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  },
  sanitizeInput: function(i) {
    var doc = new DOMParser().parseFromString(i, 'text/html');
    return doc.body.textContent || "";
  },
  isValidJson: function(o) {

    var isJson = false;

    try {
      var json = JSON.parse(o);

      PTL.util.say(PTL.tr('Valid Pétrolette feeds file'), 'success');
      isJson = true;

    } catch (e) {
      isJson = false;
      PTL.util.say(PTL.tr('This is not a valid Pétrolette feeds file'), 'warning', true);
    }

    return isJson;

  },
  isValidPTLFile: function(feeds) {

    var isValid = false;

    feeds.forEach(function(element) {
      if (element.columns) isValid = true;
    });

    return isValid;

  },
  isImage: function(string) {
    return (['jpg', 'png'].indexOf(string.split('.').pop()) >= 0);
  },
  vWidth: function() {

    const vWidth = $(window).width();
    var vW;

    if (PTL.util.isMobile() || vWidth < 720) {
      vW = vWidth - 8;
    } else {
      vW = vWidth - vWidth / 4;
    }

    return vW;

  },
  moveEltLeft: function($elt) {
    $elt.insertBefore($elt.prev());
  },
  moveEltRight: function($elt) {

    if (!$elt.next().is('#new-tab')) {
      $elt.insertAfter($elt.next());
    }

  },
  isMobile: function() {

    var isMobile = false;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      isMobile = true;
    } else {
      isMobile = false;
    }

    return isMobile;

  },
  translate: function() {

    $('.translate').each(function() {

      if ($(this).data('content')) {
        $(this).text(PTL.tr($(this).data('content')));
      }

      if ($(this).data('title')) {
        $(this).prop('title', PTL.tr($(this).data('title')));
      }

      if ($(this).data('placeholder')) {
        $(this).prop('placeholder', PTL.tr($(this).data('placeholder')));
      }

    });

  },
  getLocation: function(href) {
    const l = document.createElement("a");
    l.href = href;
    return l;
  },
  buildProgress: function() {

    const progress = { step: 0 };

    progress.init = function(steps) {

      const $progressBar = $('#progressBar');
      this.progressBar = $progressBar;

      const $progressLabel = $('.progress-label');
      this.progressLabel = $progressLabel.removeClass('on');

      $progressBar.progressbar({
        value: 1,
        complete: function() {
          $progressLabel.addClass('on');
        }
      });

      this.steps = steps - 1;
    };
    progress.increment = function() {

      this.progressBar.progressbar('value', Math.ceil(100 * this.step / this.steps));
      this.progressLabel.text(this.step + '/' + this.steps + ' ' + PTL.tr('feeds loaded'));

      this.step++;

    };

    return progress;
  },
  milliToSecs: function(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;

    return parseFloat(secs + '.' + ms.toFixed(1));
  },
  detectColorScheme: function() {

    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

    if (userPrefersDark) {
      return 'night';
    } else {
      return 'day';
    }

  },
  getPreferredLang: function() {
    if (navigator.languages != undefined)
      return navigator.languages[0];
    return navigator.language;
  }
};

// @license-end
