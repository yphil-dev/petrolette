var Utilities = (function () {
  return {
    buildProgress: function ($container, eltClass) {
      var progress = { step: 0 }

      progress.init = function (steps) {
        this.progressContainer = $('<div id="progressBar">')
        this.progressElt = $('<div id="cursor">')

        this.progressContainer.append(this.progressElt)
        $('body').prepend(this.progressContainer)
        this.steps = steps
        this.go()
      }
      progress.increment = function () {
        this.progressElt.animate({
          width: Math.ceil(100 * (this.step + 1) / this.steps) + '%'
        })
        this.step++
        if (this.step + 1 >= this.steps) this.finish()
      }
      progress.finish = function () {
        var self = this
        self.progressContainer.hide('fast')
      }
      progress.stop = function () {
        this.progressElt.removeClass('progress-bar-striped active')
      }
      progress.go = function () {
        this.progressElt.addClass('progress-bar-striped active')
      }

      return progress
    },
    notify: function (type, message) {
      var $p = $('#menu').find('#mobNotify > p')

      $p.parent().fadeIn('fast')

      $p.html('<strong class="' + type + '">' + type + '</strong> ' + message)
      $p.fadeIn(1000, function () {
        $p.animate({
          opacity: 0.1
        }, 6500, function () {
          $p.slideUp(500, function () {
            $p.animate({opacity: 1}, 1)
            $p.parent().fadeOut('slow')
          })
        })
      })
    },
    milliToSecs: function (s) {
      var ms = s % 1000
      s = (s - ms) / 1000
      var secs = s % 60
      s = (s - secs) / 60
      // var mins = s % 60
      // var hrs = (s - mins) / 60

      return secs + '.' + ms
    }
  }
}())
