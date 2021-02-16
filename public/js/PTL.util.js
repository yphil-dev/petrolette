// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.util = {
  nagUser:function() {

    PTL.util.console(PTL.tr('Pétrolette needs you'), 'success');

    var nextNag = PTL.prefs.readConfig('nextNag');
    const dateNow = Date.now();

    if (nextNag === 0) {
      nextNag = dateNow;
      console.log('dateNow: %s (%s)', dateNow);
      PTL.prefs.writeConfig('nextNag', dateNow);
      PTL.dialog.nagUser();
    }

    if (dateNow > nextNag) {
      console.log('YUP nextNag: %s dateNow: %s (< %s)', nextNag, dateNow, nextNag + 120000 < dateNow);
      PTL.prefs.writeConfig('nextNag', dateNow + 300000);
      PTL.dialog.nagUser();
    } else {
      console.log('NOPE nextNag: %s dateNow: %s (< %s)', nextNag, dateNow, nextNag + 120000 < dateNow);
    }

  },
  console:function(output, type) {

    var $lines = $('#console div');

    var d = new Date();

    console.info('Pétrolette | %s (%s)', output, d.toLocaleString());

    var $prompt = $('<span>')
        .attr('class', 'prompt')
        .text('#');
    var $line = $('<span>').text(output);

    $('#console').append($('<div>')
                         .attr('class', type || 'normal')
                         .attr('title', d.toLocaleString())
                         .append($prompt, $line));

    $('#console').animate({scrollTop: $('#console').prop("scrollHeight")}, 500);

    if ($lines.length > 50) {
      $lines.last().remove();
    }

  },
  isUrl:function(u) {
    return new RegExp('^(?:[a-z]+:)?//', 'i').test(u);
  },
  sanitizeInput:function(i) {
    var doc = new DOMParser().parseFromString(i, 'text/html');
    return doc.body.textContent || "";
  },
  isOldPTLStruct:function(o) {
    PTL.tab.empty();
    var groups = [],
        nbGroups = 0,
        nbFeeds = 0;

    JSON.parse(o).forEach(function(g) {
      var columns = [],
          column = [],
          group = {};

      nbGroups++;
      group.name = g.name;

      $.each(g.feeds, function(k, v) {
        nbFeeds++;
        column.push(v);
      });

      columns.push(column);
      group.columns = columns;
      groups.push(group);
    });

    PTL.util.console(PTL.tr('Found %1 groups containing %2 feeds', nbGroups, nbFeeds), 'success');

    PTL.tab.populate(groups, true);
  },
  isPTLStruct:function(o) {

    var isJson = false,
        isOldPTLStruct = false,
        groups = [],
        feeds = [];

    try {
      var json = JSON.parse(o);

      PTL.util.console(PTL.tr('File OK'), 'success');

      isJson = true;

      json.forEach(function(group) {

        groups.push(group);

        if ('feeds' in group) {
          isJson = false;
          isOldPTLStruct = true;
        } else {

          $.each(group.columns, function(k, v) {

            $.each(v, function() {
              var thisFeed = {};
              feeds.push(thisFeed);
            });

          });
        }
      });

    } catch(e) {
      isJson = false;
      PTL.util.console(PTL.tr('Invalid file'), 'error');
    }

    if (isJson) {

      if (groups.length < 1) {
        // PTL.util.console(PTL.tr('Found valid json file, but no groups in it'), 'warning');
      }

      if (isJson && groups.length > 0 && feeds.length < 1) {
        // PTL.util.console(PTL.tr('Valid json file with %1 groups in it, but you should put feeds in it', groups.length), 'warning');
      }

      if (isJson && groups.length > 0 && feeds.length > 0)  {
        // PTL.util.console(PTL.tr('Found %1 groups containing %2 feeds', groups.length, feeds.length), 'ok');
      }
    }

    if (isOldPTLStruct) {
      PTL.util.console(PTL.tr('Old feeds file format: converting'), 'warning');
      PTL.util.isOldPTLStruct(o);
    }

    return isJson;

  },
  isValidFeedsFile:function(feeds) {

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

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      isMobile = true;
    } else {
      isMobile = false;
    }

    return isMobile;

  },
  help:function(type) {

    var dialog = introJs(),
        menu = introJs(),
        ui = introJs();

    ui.setOptions({
      steps: [
        {
          element: 'li[aria-controls=tab-1]',
          intro: PTL.tr('This is a group. It contains feeds.')
        },
        {
          element: 'li[aria-controls=tab-2]',
          intro: PTL.tr('Click on a group tab to display it.')
        },
        {
          element: 'li[aria-controls=tab-1]',
          intro: PTL.tr('Click on the current/selected group tab to change its name and position.')
        },
        {
          element: 'li.feed',
          intro: PTL.tr('This is a feed. ') + '<a class="ui-button ui-corner-all icon-rzz" href="https://' + PTL.language + '.wikipedia.org/wiki/RSS">' + PTL.tr('More info') + '</a>'
        },
        {
          element: 'div#newFeedButton',
          intro: PTL.tr('Click to add a feed.')
        },
        {
          element: '.feed-refresh',
          intro: PTL.tr('Refresh / reload this feed.')
        },
        {
          element: '.feed-edit',
          intro: PTL.tr('Configure this feed.')
        },
        {
          element: '.feed-delete',
          intro: PTL.tr('Delete this feed.')
        },
        {
          element: '.feed-select',
          intro: PTL.tr('Select this feed (for drag & drop).')
        },
        {
          element: '.feed-handle',
          intro: PTL.tr('Drag here to move this feed (and all other selected feeds) within this group, or into another.')
        },
        {
          element: 'div.feed-toggle',
          intro: PTL.tr('Fold / unfold this feed.')
        }
      ]
    });

    dialog.setOptions({
      steps: [
        {
          element: 'input#feed-guess',
          intro: '<span class="translate" data-content="Enter a website address URL and click search, then OK, or simply enter the URL of the">' + PTL.tr('Enter a website address/URL and click search, then OK, or simply enter the URL of the') + '</span> <a class="help-rss" href="https://' + PTL.language + '.wikipedia.org/wiki/RSS">' + PTL.tr('feed') + '</a>. <span class="translate" data-content="Heck, enter anything, and Pétrolette will build a feed from your search query">' + PTL.tr('Heck, enter anything, and Pétrolette will build a feed from your search query') + '</span>',
          position: 'bottom'
        },
        {
          element: 'button#feed-guess',
          intro: PTL.tr('Find the feed of this website, or build a new one from the search terms.'),
          position: 'left'
        },
        {
          element: 'fieldset#feedGroup',
          intro: PTL.tr('Move this feed to another group.'),
          position: 'bottom'
        },
        {
          element: 'fieldset#feedType',
          intro: PTL.tr('The type of feed: It can be all text, all image, or mixed.'),
          position: 'top'
        },
        {
          element: 'fieldset#feedLimit',
          intro: PTL.tr('How many new items should this feed display at a time?'),
          position: 'top'
        },
        {
          element: 'fieldset#killFeed',
          intro: PTL.tr('Delete this feed'),
          position: 'top'
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
          element: 'button#profile',
          intro: PTL.tr('Reset Pétrolette according to your political mood of the week.')
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

    ui.setOption('hideNext', true);
    ui.setOption('hidePrev', true);
    ui.setOption('showStepNumbers', false);

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

    $('.introjs-button').button();

  },
  translate:function() {

    $('.translate').each(function() {

      if ($(this).data('title')) {
        $(this).prop('title', PTL.tr($(this).data('title')));
      }

      if ($(this).data('content')) {
        $(this).text(PTL.tr($(this).data('content')));
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
