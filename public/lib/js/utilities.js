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
                this.step++;
                // this.progressElt.css( "width", Math.ceil( 100 * this.step / this.steps ) + "%" );

                this.progressElt.animate({width: Math.ceil(100 * this.step / this.steps) + '%'});

                console.log('Step: %s, Steps: %s', this.step -1, this.steps)
                if (this.step >= this.steps) this.finish()

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
        }
    };
}());
