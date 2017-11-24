MOB.utilities = {

    feedError:function($feed, message) {

        var $feedTitle = $feed.children().children('.feedTitle');
        var $feedBody = $feed.children().children('ul.feedBody');
        var $header = $feed.children('div.mobHeader');

        console.info('error: %s', message);
        $header.addClass('ui-state-error');

        $feedTitle
            .text(MOB.tr("Error"))
            .addClass('translate')
            .data('content', MOB.tr("Error"));

        $feedBody
            .html('<li class="feedItem"><strong class="translate" data-content="' + MOB.tr("Error") + '">' + MOB.tr("Error") + '</strong> (' + feedUrl + ') ' + data.error  + '</li>');

        // return;

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
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        console.log('String: (%s)', s.indexOf('http'));

        if (s.indexOf('http') === 0) {
            return true;
        } else {
            return false;
        }

        // return regexp.test(s);
    },
    buildProgress : function( $container, eltClass ) {

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
            var randomColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);

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
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return secs + '.' + ms;
    }
};
