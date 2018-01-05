MOB.utilities = {
  noSourcesButton:function() {

    var $noSourcesButton = $('<button>').append('<span data-content="Whoops, no sources!" data-title="Whoops, no sources!" class="translate"> Whoops, no sources! </span> <br/> <span data-content="Click here to add some." data-title="Click here to add some." class="translate"> Click here to add some.</span>');

    var $noSourcesButtonContainer = $('<div>')
        .attr('id', 'noSourcesButton')
        .attr('class', 'deadCenter hidden')
        .append($noSourcesButton);

    $('body').append($noSourcesButtonContainer);

  },
  vWidth:function() {

    var vWidth = $(window).width();
    var vW;

    if(MOB.utilities.isMobile() || vWidth < 720 ) {
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

    if (!$elt.next().hasClass('newContentButton')) {
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
          intro: MOB.tr('This is a group. It contains sources.') + '<div class="wiki ui-corner-all"><a href="https://bitbucket.org/yphil/petrolette/wiki/Home#markdown-header-importexport-tabs"><i class="icon-motorcycle"></i></a></div>'
        },
        {
          element: 'li[aria-controls=tab-2]',
          intro: MOB.tr('Click on a group tab to display it.') + '<div class="wiki ui-corner-all"><a href="https://bitbucket.org/yphil/petrolette/wiki/Home#markdown-header-importexport-tabs"><i class="icon-motorcycle"></i></a></div>'
        },
        {
          element: 'li[aria-controls=tab-1]',
          intro: MOB.tr('Click on the current/selected group tab to change its name and position.') + '<div class="wiki ui-corner-all"><a href="https://bitbucket.org/yphil/petrolette/wiki/Home#markdown-header-importexport-tabs"><i class="icon-motorcycle"></i></a></div>'
        },
        {
          element: 'li.feed',
          intro: MOB.tr('This is a source.') + '<div class="wiki ui-corner-all"><a href="https://bitbucket.org/yphil/petrolette/wiki/Home#markdown-header-how-do-i-use-it"><i class="icon-motorcycle"></i></a></div>'
        },
        {
          element: 'li#newTabButton',
          intro: MOB.tr('Click this button to add a source.') + '<div class="wiki ui-corner-all"><a href="https://bitbucket.org/yphil/petrolette/wiki/Home#markdown-header-how-do-i-use-it"><i class="icon-motorcycle"></i></a></div>'
        },
        {
          element: '.mobFeedRefresh',
          intro: MOB.tr('Refresh / reload this source.')
        },
        {
          element: '.mobFeedPrefs',
          intro: MOB.tr('Configure this source.')
        },
        {
          element: '.feedDelete',
          intro: MOB.tr('Delete this source.')
        },
        {
          element: '.feedSelect',
          intro: MOB.tr('Select this source (for drag & drop).')
        },
        {
          element: '.feedHandle',
          intro: MOB.tr('Drag here to move this source (and all other selected sources) within this group, or into another.')
        },
        {
          element: 'div.feedToggle',
          intro: MOB.tr('Expand / collapse this source.')
        }
      ]
    });

    dialog.setOptions({
      steps: [
        {
          element: 'input#feedGuess',
          intro: '<span class="translate" data-content="Enter a website address/URL and click search, then OK, or simply enter the URL of the">' + MOB.tr('Enter a website address/URL and click search, then OK, or simply enter the URL of the') + '</span> <a class="translate rssDocLink" data-content="Feed" href="https://' + MOB.language + '.wikipedia.org/wiki/RSS">' + MOB.tr('source') + '</a>. <span class="translate" data-content="Heck, enter anything, and Pétrolette will build a source from your search query.">' + MOB.tr('Heck, enter anything, and Pétrolette will build a source from your search query.') + '</span>',
          position: 'bottom'
        },
        {
          element: 'button#feedGuess',
          intro: MOB.tr('Find the website\'s source, or build a new one from the seach query.'),
          position: 'left'
        },
        {
          element: 'fieldset#feedGroup',
          intro: MOB.tr('Move this source to another group.'),
          position: 'bottom'
        },
        {
          element: 'fieldset#feedType',
          intro: MOB.tr('The type of source: It can be all text, all image, or mixed.'),
          position: 'top'
        },
        {
          element: 'fieldset#feedLimit',
          intro: MOB.tr('How many new items should this source display at a time?'),
          position: 'top'
        },
        {
          element: 'fieldset#killFeed',
          intro: MOB.tr('Delete this source'),
          position: 'top'
        }
      ]
    });

    menu.setOptions({
      steps: [
        {
          element: 'button#fileImport',
          intro: MOB.tr('Open / import tabs and feeds.') + '<div class="wiki ui-corner-all"><a href="https://bitbucket.org/yphil/petrolette/wiki/Home#markdown-header-importexport-tabs"><i class="icon-help-circled"></i></a></div>'
        },
        {
          element: 'button#saveTabs',
          intro: MOB.tr('Save / Export tabs and feeds.') + '<div class="wiki ui-corner-all"><a href="https://bitbucket.org/yphil/petrolette/wiki/Home#markdown-header-how-do-i-use-it"><i class="icon-help-circled"></i></a></div>'
        },
        {
          element: 'label#dropTabLabel',
          intro: MOB.tr('If this is set, when you drag & drop one or more feed(s) in a tab, said tab opens.')
        },
        {
          element: 'div#themeBox',
          intro: MOB.tr('View Petrolette according to the time of day.')
        },
        {
          element: 'fieldset#galleryBox',
          intro: MOB.tr('When you click an image, you can view it in a gallery, and start a slideshow.')
        },
        {
          element: 'button#profile',
          intro: MOB.tr('Reset Petrolette according to your political mood of the week.')
        },
        {
          element: 'button#donate',
          intro: MOB.tr('Help Petrolette according to your spiritual mood of the day.')
        }
      ]
    });

    dialog.setOption('overlayOpacity', 0);
    menu.setOption('overlayOpacity', 0.2);
    ui.setOption('overlayOpacity', 0.2);

    ui.setOption('showStepNumbers', false);

    ui.setOption('prevLabel', MOB.tr('Prev'));
    ui.setOption('nextLabel', MOB.tr('Next'));
    ui.setOption('skipLabel', MOB.tr('Skip'));
    ui.setOption('doneLabel', MOB.tr('Got it!'));

    dialog.setOption('prevLabel', MOB.tr('Prev'));
    dialog.setOption('nextLabel', MOB.tr('Next'));
    dialog.setOption('skipLabel', MOB.tr('Skip'));
    dialog.setOption('doneLabel', MOB.tr('Got it!'));

    ui.setOption('hidePrev', true);
    ui.setOption('hideNext', true);
    ui.setOption('exitOnEsc', true);
    ui.setOption('exitOnOverlayClick', true);
    ui.setOption('scrollToElement', true);

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
      $('#feed-0').find('.collapsible').show('fade', 'fast');
      ui.start();
    }

    $('.introjs-button').button();

  },
  translate:function() {

    $('.translate').each(function() {

      if ($(this).data('title')) {
        $(this).prop('title', MOB.tr($(this).data('title')));
      }

      if ($(this).data('content')) {
        $(this).text(MOB.tr($(this).data('content')));
      }

    });

  },
  getLocation: function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
  },
  isUrl:  function (s) {

    if (s.indexOf('http') === 0) {
      return true;
    } else {
      return false;
    }

  },
  buildProgress : function() {

    var progress = { step: 0 };

    progress.init = function( steps ) {

      this.radialObj = $('#indicatorContainer').data('radialIndicator');

      this.$radialObj = $('#indicatorContainer').fadeIn('fast');

      setTimeout(function() {

        console.log('timeout');

        if (this.$radialObj) {
          this.$radialObj.fadeOut(300);
        }

      }, 60000);

      console.log('steps: (%s)', steps);

      this.steps = steps - 1;
    };
    progress.increment = function() {

      this.radialObj.animate(Math.ceil(100 * this.step / this.steps));

      console.log('this.step: (%s)', this.step);

      if (this.step >= this.steps) {
        console.log('finished!');
        this.finish();
      }

      this.step++;

    };
    progress.finish = function() {
      // var self = this;
      this.$radialObj.fadeOut('slow');
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
