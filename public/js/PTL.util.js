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
      PTL.util.say(PTL.tr('Data structure OK: %1 tab(s) containing %2 feed(s)', Number(nbOfTabs) + 1, Number(totalNbOfFeed)), 'success', true);
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

    const $prompt = $('<span>')
          .attr('class', 'prompt')
          .text('#');
    const $line = $('<span>').text(text);

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

    const vWidth = $(window).width();
    var vW;

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
  help:function(type, step) {

    const dialog = introJs(),
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
          intro: PTL.tr('This is an RSS feed.') + ' <a href="https://' + PTL.language + '.wikipedia.org/wiki/RSS"><i class="icon-globe"></i></a>'
        },
        {
          title: PTL.tr('Keep everything tidy'),
          element: 'li[aria-controls=tab-1]',
          intro: PTL.tr('This is a tab. It contains feeds.')
        },
        {
          title: PTL.tr('Tab control'),
          element: 'li[aria-controls=tab-2]',
          intro: PTL.tr('Click on a tab to display it ; Click the current/selected tab to change its name and position, drag to move it') + '.'
        },
        {
          title: PTL.tr('Add a new feed'),
          element: 'div#newFeedButton',
          intro: PTL.tr('Click to add a feed.')
        },
        {
          title: PTL.tr('Refresh / reload this feed'),
          element: '.feedRefresh',
          intro: PTL.tr('Get the latest articles.')
        },
        {
          title: PTL.tr('Configure this feed'),
          element: '.feedPrefs',
          intro: PTL.tr('Configure this feed.')
        },
        {
          title: PTL.tr('Keep everything tidy'),
          element: '.feedSelect',
          intro: PTL.tr('Select this feed (for drag & drop).')
        },
        {
          title: 'Grip handle',
          element: '.feedHandle',
          intro: PTL.tr('Drag here to move this feed (and all other selected feeds) within this tab, or into another.')
        },
        {
          title: PTL.tr('Fold / unfold this feed'),
          element: 'div.feedToggle',
          intro: PTL.tr('Folded feeds are not loaded at startup, so as to speed things up.')
        },
        {
          title: PTL.tr('B-bye!'),
          element: '.feed-delete',
          intro: PTL.tr('Delete this feed.')
        },
        {
          title: PTL.tr('Columns'),
          element: 'div.buttons',
          intro: PTL.tr('Click + to add a column, and - to delete it.')
        },
        {
          title: PTL.tr('You are home') + ' 🏠',
          element: 'div#menuButton',
          intro: PTL.tr('Use the menu to configure your Pétrolette.')
        }
      ]
    });

    dialog.setOptions({
      steps: [
        {
          title: PTL.tr('Location of the feed'),
          element: '#feedGuessDiv',
          intro: '<p><span class="translate" data-content="Enter a website address URL and click search, then OK, or simply enter the URL of the">' + PTL.tr('Enter a website address/URL and click search, then OK, or simply enter the URL of the') + '</span> <a class="help-rss ptl-link" href="https://' + PTL.language + '.wikipedia.org/wiki/RSS">' + PTL.tr('feed') + '</a>.</p><p><span class="translate" data-content="If what you enter is not a regular URL (an internet location in the form of \"http...\") Pétrolette will build a search feed using the words">' + PTL.tr('If what you enter is not a regular URL (an internet location in the form of \"http...\") Pétrolette will build a search feed using the words') + '.</span><p>',
          position: 'bottom'
        },
        {
          title: PTL.tr('Feed name (optional)'),
          element: 'input#feedNameInput',
          intro: PTL.tr('Name the feed of this website, if it is not informative enough ; leave blank to get the default feed title.'),
          position: 'left'
        },
        {
          title: PTL.tr('Keep everything tidy'),
          element: '#feedTabSelect',
          intro: PTL.tr('Move this feed to another tab ; Use this menu when drag & drop is not available, like on a phone or a TV.'),
          position: 'bottom'
        },
        {
          title: PTL.tr('Feed type'),
          element: '#feedTypeDiv',
          intro: PTL.tr('The type of feed: It can be all text, all image, or mixed.'),
          position: 'top'
        },
        {
          title: PTL.tr('Height of the feed'),
          element: '#feedHeightDiv',
          intro: PTL.tr('Height of the feed\'s viewport.'),
          position: 'top'
        },
        {
          title: PTL.tr('Number of items'),
          element: '#feedMaxItemsDiv',
          intro: PTL.tr('Number of items to load ; 0 loads all items.'),
          position: 'top'
        },
        {
          title: PTL.tr('Have a nice read ☕ 📰'),
          element: '.button-ok',
          intro: PTL.tr('I think that\'s about it...') + ' <a href="https://framagit.org/yphil/petrolette/-/issues">' + PTL.tr('Any questions?') + '</a>',
          position: 'left'
        }
      ]
    });

    menu.setOptions({
      steps: [
        {
          title: PTL.tr('Feeds'),
          element: 'fieldset.feedsMenuForm',
          intro: '<h4>' + PTL.tr('Open') + '</h4>' + PTL.tr('Load / import a feeds file') + ' ; ' + PTL.tr('to append to or replace the existing feeds.') + '<h4>' + PTL.tr('Save') + '</h4>' + PTL.tr('Save / export a feeds file.') + '<h4>' + PTL.tr('Reset') + '</h4>' + PTL.tr('Reset Pétrolette with the default feeds.') + '<h4>' + PTL.tr('Connection to storage') + '</h4>' + PTL.tr('Connection to the cloud to synchronize tabs and feeds on all devices.'),
          position: 'right'
        },
        {
          title: PTL.tr('Search prefix'),
          element: 'fieldset.searchPrefixFieldset',
          intro: '<h4>' + PTL.tr('Search prefix') + '</h4>' + PTL.tr('Preferred Search engine for building search feeds.') + '<h4>' + PTL.tr('Restore default') + '</h4>' + PTL.tr('Restore default search prefix') + '.',
          position: 'right'
        }
      ]
    });

    ui.setOption('prevLabel', PTL.tr('Prev'));
    ui.setOption('nextLabel', PTL.tr('Next'));
    ui.setOption('skipLabel', 'x');
    ui.setOption('doneLabel', PTL.tr('Got it!'));

    dialog.setOption('prevLabel', PTL.tr('Prev'));
    dialog.setOption('nextLabel', PTL.tr('Next'));
    dialog.setOption('skipLabel', 'x');
    dialog.setOption('doneLabel', PTL.tr('Got it!'));

    menu.setOption('prevLabel', PTL.tr('Prev'));
    menu.setOption('nextLabel', PTL.tr('Next'));
    menu.setOption('skipLabel', 'x');
    menu.setOption('doneLabel', PTL.tr('Got it!'));

    dialog.setOption('overlayOpacity', 0);
    ui.setOption('overlayOpacity', 0.2);

    dialog.setOption('hideNext', true);
    dialog.setOption('hidePrev', true);

    if (step) {

      if (type === 'dialog') {
        PTL.sideMenu('close');
        ui.exit();
        menu.exit();
        dialog.goToStepNumber(step).start();
      }
      
      if (type === 'menu') {
        ui.exit();
        dialog.exit();
        menu.goToStepNumber(step).start();
      }
      
    } else {
      PTL.sideMenu('close');
      dialog.exit();
      menu.exit();
      $('#menu > .handle').click();
      $('#tabs').tabs('option', 'active', 0);
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
    const l = document.createElement("a");
    l.href = href;
    return l;
  },
  buildProgress : function() {

    const progress = { step: 0 };

    progress.init = function( steps ) {

      const $progressBar = $('#progressBar');
      this.progressBar = $progressBar;

      const $progressLabel = $('.progress-label');
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

    return parseFloat(secs + '.' + ms.toFixed(1));
  }
};

// @license-end
