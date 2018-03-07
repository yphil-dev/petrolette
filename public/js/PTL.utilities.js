PTL.utilities = {
  isValidSourcesFile:function(sources) {

    var isValid = false;
    if (Object.prototype.toString.call(sources) === '[object Array]') {
      isValid = sources.some(obj => Array.isArray(obj.feeds) && obj.feeds.some(feed => Object.prototype.hasOwnProperty.call(feed, 'url')));
    } else {
      isValid = false;
    }
    return isValid;

  },
  isImage:function(string) {
    // return string.split('.').pop() === 'jpg';


    return (['jpg', 'png'].indexOf(string.split('.').pop()) >= 0);
  },
  noSourcesButton:function() {

    var $loadingSpinner = $('<i>')
        .attr('class', 'icon-arrows-cw spin');

    var $noSourcesText = $('<div>').text('Loading sources');

    var $noSourcesButton = $('<div>')
    // .append('<span data-content="Whoops, no sources!" data-title="Whoops, no sources!" class="translate"> Whoops, no sources! </span> <br/> <span data-content="Click here to add some." data-title="Click here to add some." class="translate"> Click here to add some.</span>')
          .append($loadingSpinner)
          .append('<br>')
          .append($noSourcesText);

      var $noSourcesButtonContainer = $('<div>')
          .attr('id', 'noSourcesButton')
          .attr('class', 'deadCenter')
          .append($noSourcesButton);

      $('main').append($noSourcesButtonContainer);

    },
    vWidth:function() {

      var vWidth = $(window).width(),
          vW;

      if(PTL.utilities.isMobile() || vWidth < 720 ) {
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
            intro: PTL.tr('This is a group. It contains sources.')
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
            intro: PTL.tr('This is a source.')
          },
          {
            element: 'div#newSourceButton',
            intro: PTL.tr('Click to add a source.')
          },
          {
            element: '.mobFeedRefresh',
            intro: PTL.tr('Refresh / reload this source.')
          },
          {
            element: 'li#feed-0 i.feedControl.mobFeedPrefs',
            intro: PTL.tr('Configure this source.')
          },
          {
            element: '.feedDelete',
            intro: PTL.tr('Delete this source.')
          },
          {
            element: '.feedSelect',
            intro: PTL.tr('Select this source (for drag & drop).')
          },
          {
            element: '.feedHandle',
            intro: PTL.tr('Drag here to move this source (and all other selected sources) within this group, or into another.')
          },
          {
            element: 'div.feedToggle',
            intro: PTL.tr('Expand / collapse this source.')
          }
        ]
      });

      dialog.setOptions({
        steps: [
          {
            element: 'input#feedGuess',
            intro: '<span class="translate" data-content="Enter a website address/URL and click search, then OK, or simply enter the URL of the">' + PTL.tr('Enter a website address/URL and click search, then OK, or simply enter the URL of the') + '</span> <a class="rssDocLink" href="https://' + PTL.language + '.wikipedia.org/wiki/RSS">' + PTL.tr('source') + '</a>. <span class="translate" data-content="Heck, enter anything, and Pétrolette will build a source from your search query.">' + PTL.tr('Heck, enter anything, and Pétrolette will build a source from your search query.') + '</span>',
            position: 'bottom'
          },
          {
            element: 'button#feedGuess',
            intro: PTL.tr('Find the website\'s source, or build a new one from the seach query.'),
            position: 'left'
          },
          {
            element: 'fieldset#feedGroup',
            intro: PTL.tr('Move this source to another group.'),
            position: 'bottom'
          },
          {
            element: 'fieldset#feedType',
            intro: PTL.tr('The type of source: It can be all text, all image, or mixed.'),
            position: 'top'
          },
          {
            element: 'fieldset#feedLimit',
            intro: PTL.tr('How many new items should this source display at a time?'),
            position: 'top'
          },
          {
            element: 'fieldset#killFeed',
            intro: PTL.tr('Delete this source'),
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
        $('#feed-0').find('.collapsible').show('fade', 'fast');
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

        var $progressBar = $('div#progressBar');
        this.progressBar = $progressBar;

        var $progressLabel = $( ".progress-label" );
        this.progressLabel =  $progressLabel;

        $progressBar.progressbar({
          value: 1,
          complete: function() {
            $progressLabel.text( "loaded" );
          }
        });

        this.steps = steps - 1;
      };
      progress.increment = function() {

        this.progressBar.progressbar('value', Math.ceil(100 * this.step / this.steps));

        this.progressLabel.text(this.step + '/' + this.steps + ' sources loaded');


        if (this.step >= this.steps) {
          this.finish();
        }

        this.step++;

      };
      progress.finish = function() {
        // var self = this;
        // this.$radialObj.fadeOut('slow');
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
