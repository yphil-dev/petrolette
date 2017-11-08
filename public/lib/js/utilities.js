var Utilities = (function() {

    return {
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
                var newColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);

                var colors = ['#f00', '#00f']

                var randomColor = colors[Math.floor(Math.random() * colors.length)];

                // this.progressElt.animate({'background-color': newColor}, 200);

                // console.log('Step: %s/%s, percent: %s', this.step + 1, this.steps, Math.ceil(100 * (this.step + 1) / this.steps));

                this.progressElt.animate({
                    width: Math.ceil(100 * (this.step + 1) / this.steps) + '%',
                    'background-color': randomColor
                });
                this.step++;
                if (this.step + 1 >= this.steps) this.finish()

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
            var $p = $('#slidermenu').find('#mobNotify > p')

            $p.parent().fadeIn('fast')

            $p.html('<strong class="' +  type + '">' + type + '</strong> ' + message)
                                     .fadeIn( 1000, function() {
                                         $p.animate({
                                             opacity: 0.1
                                         }, 1500, function() {
                                             $p.slideUp(500, function() {
                                                 $p.animate({opacity: 1}, 1)
                                                 $p.parent().fadeOut('slow')
                                             });
                                         });
                                     });
        }
    };
}());
