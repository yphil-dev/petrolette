// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.util = {
  XMLtoJSON: function () {

    this.fromStr = function(xml, rstr) {
      var xmlDoc;
      if (window.DOMParser) {
        var getxml = new DOMParser();
        xmlDoc = getxml.parseFromString(xml,"text/xml");
      }
      else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
      }
      var json_str = jsontoStr(setJsonObj(xmlDoc));
      return (typeof(rstr) == 'undefined') ? JSON.parse(json_str) : json_str;
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
          if (typeof(js_obj[nodeName]) == "undefined") {
            js_obj[nodeName] = setJsonObj(item);
          } else {
            if (typeof(js_obj[nodeName].push) == "undefined") {
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
  isNV:function(xml) {
    return xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>');
  },
  importNV:function(xml) {

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
      PTL.util.say(PTL.tr('Found %1 groups containing %2 feeds', Number(nbOfTabs) + 1, Number(totalNbOfFeed)), 'success', true);
    });

  },
  beg:function() {

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
  say:function(text, type, notify, title) {

    const $lines = $('#console div'),
          d = new Date();

    const dialogTitle = title ? title : PTL.tr(type[0].toUpperCase() + type.substring(1));

    if (notify) PTL.dialog.notify(dialogTitle, PTL.tr(text));

    var $prompt = $('<span>')
        .attr('class', 'prompt')
        .text('#');
    var $line = $('<span>').text(text);

    $('#console').append($('<div>')
                         .attr('class', type || 'normal')
                         .attr('title', d.toLocaleString())
                         .append($prompt, $line));

    $('#console').animate({scrollTop: $('#console').prop("scrollHeight")}, 500);

    if ($lines.length > 50) $lines.last().remove();

  },
  isUrl:function(u) {
    // return new RegExp('^(?:[a-z]+:)?//', 'i').test(u);

    try {
      new Url.URL(s);
      return true;
    } catch (err) {
      return false;
    }

  },
  sanitizeInput:function(i) {
    var doc = new DOMParser().parseFromString(i, 'text/html');
    return doc.body.textContent || "";
  },
  isValidJson:function(o) {

    var isJson = false;

    try {
      var json = JSON.parse(o);

      PTL.util.say(PTL.tr('Valid Pétrolette feeds file'), 'success');
      isJson = true;

    }  catch(e) {
      isJson = false;
      PTL.util.say(PTL.tr('This is not a valid Pétrolette feeds file'), 'warning', true);
    }

    return isJson;

  },
  isValidPTLFile:function(feeds) {

    var isValid = false;

    feeds.forEach(function(element) {
      if (element.columns) isValid = true;
    });

    return isValid;

  },
  isImage:function(string) {
    return (['jpg', 'png'].indexOf(string.split('.').pop()) >= 0);
  },
  vWidth:function() {

    var vWidth = $(window).width(),
        vW;

    if (PTL.util.isMobile() || vWidth < 720 ) {
      vW = vWidth - 8;
    } else {
      vW = vWidth - vWidth / 4;
    }

    return vW;

  },
  moveEltLeft:function($elt) {
    $elt.insertBefore($elt.prev());
  },
  moveEltRight:function($elt) {

    if (!$elt.next().is('#new-tab')) {
      $elt.insertAfter($elt.next());
    }

  },
  isMobile:function() {

    var isMobile = false;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      isMobile = true;
    } else {
      isMobile = false;
    }

    return isMobile;

  },
  help:function(type) {

    PTL.sideMenu('close');

    var dialog = introJs(),
        menu = introJs(),
        ui = introJs();

    ui.setOptions({
      steps: [
        {
          title: PTL.tr('Welcome to Pétrolette'),
          intro: PTL.tr('Learn to use it in a few easy steps') + ' 👋'
        },
        {
          title: PTL.tr("That's what it's all about"),
          element: 'li.feed',
          intro: PTL.tr('This is an RSS feed.') + ' <a class="helpLink" href="https://' + PTL.language + '.wikipedia.org/wiki/RSS"><i class="icon-help"></i></a>'
        },
        {
          title: PTL.tr('Keep everything tidy'),
          element: 'li[aria-controls=tab-1]',
          intro: PTL.tr('This is a tab. It contains feeds.')
        },
        {
          title: PTL.tr('Well you know how a tab works') + ' 😉',
          element: 'li[aria-controls=tab-2]',
          intro: PTL.tr('Click on a group tab to display it ; Click the current/selected group tab to change its name and position. Drag to sort tabs.')
        },
        {
          title: PTL.tr('Add a new feed'),
          element: 'div#newFeedButton',
          intro: PTL.tr('Click to add a feed.')
        },
        {
          title: PTL.tr('Refresh / reload this feed'),
          element: '.feed-refresh',
          intro: PTL.tr('Get the latest articles.')
        },
        {
          title: PTL.tr('Configure this feed'),
          element: '.feed-edit',
          intro: PTL.tr('Configure this feed.')
        },
        {
          title: PTL.tr('Keep everything tidy'),
          element: '.feed-select',
          intro: PTL.tr('Select this feed (for drag & drop).')
        },
        {
          title: 'Grip handle',
          element: '.feed-handle',
          intro: PTL.tr('Drag here to move this feed (and all other selected feeds) within this tab, or into another.')
        },
        {
          title: PTL.tr('Fold / unfold this feed.'),
          element: 'div.feed-toggle',
          intro: PTL.tr('Folded feeds are not loaded at startup, so as to speed things up.')
        },
        {
          title: PTL.tr('B-bye!'),
          element: '.feed-delete',
          intro: PTL.tr('Delete this feed.')
        },
        {
          title: PTL.tr('You are in control now'),
          element: 'div#menuButton',
          intro: PTL.tr('Use the menu to configure Pétrolette')
        }
      ]
    });

    dialog.setOptions({
      steps: [
        {
          title: PTL.tr('Everything starts here'),
          element: 'input#feed-guess',
          intro: '<span class="translate" data-content="Enter a website address URL and click search, then OK, or simply enter the URL of the">' + PTL.tr('Enter a website address/URL and click search, then OK, or simply enter the URL of the') + '</span> <a class="help-rss" href="https://' + PTL.language + '.wikipedia.org/wiki/RSS">' + PTL.tr('feed') + '</a>. <span class="translate" data-content="Heck, enter anything, and Pétrolette will build a feed from your search query">' + PTL.tr('Heck, enter anything, and Pétrolette will build a feed from your search query') + '</span>',
          position: 'bottom'
        },
        {
          title: PTL.tr('Find the feed!'),
          element: 'button#feedGuessButton',
          intro: PTL.tr('Find the feed of this website, or build a new one from the search terms.'),
          position: 'left'
        },
        {
          title: PTL.tr('Name the feed (optional)'),
          element: 'input#feed-name',
          intro: PTL.tr('Name the feed of this website, if it is not informative enough ; leave blank to get the default feed title'),
          position: 'left'
        },
        {
          title: PTL.tr('Keep everything tidy'),
          element: 'fieldset#feedGroupFieldset',
          intro: PTL.tr('Move this feed to another group.'),
          position: 'bottom'
        },
        {
          title: PTL.tr('Feed type'),
          element: 'fieldset#feedType',
          intro: PTL.tr('The type of feed: It can be all text, all image, or mixed.'),
          position: 'top'
        },
        {
          title: PTL.tr('Number of items'),
          element: 'fieldset#feedLimitFieldset',
          intro: PTL.tr('How many new items should this feed display at a time?'),
          position: 'top'
        },
        {
          title: PTL.tr('You are in control now'),
          element: '.button-ok',
          intro: PTL.tr('Ok'),
          position: 'left'
        }
      ]
    });

    menu.setOptions({
      steps: [
        {
          element: 'button#fileImport',
          intro: PTL.tr('Open / import tabs and feeds.')
        },
        {
          element: 'button#saveTabs',
          intro: PTL.tr('Save / Export tabs and feeds.')
        },
        {
          element: 'label#dropTabLabel',
          intro: PTL.tr('If this is set, when you drag & drop one or more feed(s) in a tab, said tab opens.')
        },
        {
          element: 'div#themeBox',
          intro: PTL.tr('View Pétrolette according to the time of day.')
        },
        {
          element: 'fieldset#galleryBox',
          intro: PTL.tr('When you click an image, you can view it in a gallery, and start a slideshow.')
        },
        {
          element: 'button#donate',
          intro: PTL.tr('Help Pétrolette according to your spiritual mood of the day.')
        }
      ]
    });

    ui.setOption('prevLabel', PTL.tr('Prev'));
    ui.setOption('nextLabel', PTL.tr('Next'));
    ui.setOption('skipLabel', PTL.tr('Skip'));
    ui.setOption('doneLabel', PTL.tr('Got it!'));

    dialog.setOption('prevLabel', PTL.tr('Prev'));
    dialog.setOption('nextLabel', PTL.tr('Next'));
    dialog.setOption('skipLabel', PTL.tr('Skip'));
    dialog.setOption('doneLabel', PTL.tr('Got it!'));

    dialog.setOption('overlayOpacity', 0);
    ui.setOption('overlayOpacity', 0.2);

    dialog.setOption('hideNext', true);
    dialog.setOption('hidePrev', true);

    if (type === 'menu') {
      dialog.exit();
      menu.start();
      $('.introjs-fixParent').css('position', 'absolute');
    } else if (type === 'dialog') {
      menu.exit();
      dialog.start();
    } else {
      dialog.exit();
      $('#menu > .handle').click();
      $('.feed').first().find('.collapsible').show('fade', 'fast');
      ui.start();
    }

    // $('.introjs-button').button();

  },
  translate:function() {

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
    var l = document.createElement("a");
    l.href = href;
    return l;
  },
  buildProgress : function() {

    var progress = { step: 0 };

    progress.init = function( steps ) {

      var $progressBar = $('#progress-bar');
      this.progressBar = $progressBar;

      var $progressLabel = $('.progress-label');
      this.progressLabel =  $progressLabel.removeClass('on');

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
  milliToSecs : function(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    // var mins = s % 60;
    // var hrs = (s - mins) / 60;

    return parseFloat(secs + '.' + ms.toFixed(1));
  }
};

// @license-end
