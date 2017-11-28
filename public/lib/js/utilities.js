MOB.utilities = {

  help:function(type) {
    var dialog = introJs();
    var menu = introJs();

    dialog.setOptions({
      steps: [
        {
          element: 'input#feedGuess',
          intro: '<span class="translate" data-content="Enter a website address/URL and click search, then OK, or simply enter the URL of the">' + MOB.tr('Enter a website address/URL and click search, then OK, or simply enter the URL of the') + '</span> <a class="translate rssDocLink" data-content="Feed" href="https://' + MOB.language + '.wikipedia.org/wiki/RSS">' + MOB.tr('feed') + '</a>.'
        },
        {
          element: 'button#feedGuess',
          intro: MOB.tr('Find the website\'s RSS feed')
        },
        {
          element: 'div#feedTitle',
          intro: MOB.tr('What type of feed? All text, all image, or mixed'),
          position: 'left'
        },
        {
          element: 'fieldset#feedLimit',
          intro: MOB.tr('How many new items should the feed display at a time?'),
          position: 'bottom'
        },
        {
          element: '.button-ok',
          intro: MOB.tr('Ok')
        }
      ]
    });

    menu.setOptions({
      steps: [
        {
          element: 'select#language',
          intro: MOB.tr('Select your lang'),
          position: 'right'
        },
        {
          element: 'button#fileImport',
          intro: MOB.tr('Import the shit')
        },
        {
          element: 'button#saveTabs',
          intro: MOB.tr('Save the shit')
        },
        {
          element: 'label#dropTabLabel',
          intro: MOB.tr('Open tab on witch a feed is dropped')
        },
        {
          element: 'div#themeBox',
          intro: MOB.tr('Select your visual mood')
        },
        {
          element: 'fieldset#galleryBox',
          intro: MOB.tr('When you click an image, you can view it in a gallery, and start a slideshow')
        },
        {
          element: 'button#profile',
          intro: MOB.tr('Reset Mobylette according to your political mood of the day')
        },
        {
          element: 'button#donate',
          intro: MOB.tr('Help Mobylette according to your spiritual mood of the day')
        }
      ]
    });

    if (type === 'menu') {
      menu.start();
      $('.introjs-fixParent').css('position', 'absolute');
    } else {
      dialog.start();
    }

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

    // return regexp.test(s);
  },
  buildProgress : function() {

    var progress = { step: 0 };

    progress.init = function( steps ) {
      this.progressContainer = $('<div id="progressBar">' );
      this.progressElt = $('<div id="cursor">' );

      this.progressContainer.append( this.progressElt );
      $('body').prepend(this.progressContainer);
      this.steps = steps;
      this.go();
    };
    progress.increment = function() {

      this.progressElt.animate({
        width: Math.ceil(100 * (this.step + 1) / this.steps) + '%'
        // ,'background-color': randomColor
      });
      this.step++;
      if (this.step + 1 >= this.steps) this.finish();

    };
    progress.finish = function() {
      var self = this;
      self.progressContainer.hide('fast');
    };
    progress.stop = function() {
      this.progressElt.removeClass( 'progress-bar-striped active' );
    };
    progress.go = function() {
      this.progressElt.addClass( 'progress-bar-striped active' );
    };

    return progress;
  },
  notify : function(type, message) {
    var $p = $('#menu').find('#mobNotify > p').empty();

    var $type = $('<strong>')
        .addClass(type)
        .addClass('translate')
        .text(MOB.tr(type));

    $p.append($type, ' ', message)
      .parent().fadeIn('fast')
      .fadeIn( 1000, function() {
        $p.animate({
          opacity: 0.1
        }, 6500, function() {
          $p.slideUp(500, function() {
            $p.animate({opacity: 1}, 1);
            $p.parent().fadeOut('slow');
          });
        });
      });
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
