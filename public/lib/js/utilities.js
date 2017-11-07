var Utilities = (function() {

    return {
        buildProgress : function( $container, eltClass ) {

            var progress = { step: 0 };

            progress.init = function( steps ) {
                // this.progressElt = $( '#progressBar > #cursor' );
                this.progressContainer = $('<div id="progressBar">' );
                this.progressElt = $('<div id="cursor">' );

                this.progressContainer.append( this.progressElt );
                $('body').prepend(this.progressContainer);
                this.steps = steps;
                this.go();
            };
            progress.increment = function() {
                this.step++;
                this.progressElt.css( "width", Math.ceil( 100 * this.step / this.steps ) + "%" );
            };
            progress.finish = function() {
                var self = this;
                self.progressContainer.remove();
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
