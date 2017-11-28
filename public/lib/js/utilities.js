MOB.utilities = {

  helpMenu:function() {
    var intro = introJs();

    intro.setOptions({
      steps: [
        {
          element: 'input#feedGuess',
          intro: 'Enter the address of the feed'
        },
        {
          element: 'button#feedGuess',
          intro: 'Search for a feed',
          position: 'right'
        },
        {
          element: 'div#feedTitle',
          intro: 'plop',
          position: 'left'
        },
        {
          element: 'fieldset#feedLimit',
          intro: 'plip',
          position: 'bottom'
        },
        {
          element: '.button-ok',
          intro: '<strong>Get</strong> it, <strong>use</strong> it.'
        }
      ]
    });

    intro.start();
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
