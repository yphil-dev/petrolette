$('<div id="menu">').appendTo($('body')).load('/static/templates/menu.html', function () {
  var $slider = $(this)
  var $handle = $slider.find('.handle')
  var $fileImportButton = $('button#fileImport').button()
  var $fileImportInput = $('input#fileImport').button()
  var $fileExport = $('#saveTabs').button()
  var $donate = $('#donate')
  var $profile = $('#profile').button().tooltip()

  $donate.button().tooltip()

  $handle.click(function () {
    $slider.toggleClass('expanded')
    $(this).children('i').toggleClass('close')
  })

  $profile.click(function (event) {
    event.preventDefault()
    console.log('Click!')

    $handle.click()

    Dialog.question(0)
  })

  $fileImportButton.click(function () {
    $('input#fileImport').click()
    return false
  })

  $fileExport.click(function () {
    Prefs.exportConfig(Tab.getTabs(), 'mobylette.json')
    return false
  })

  $('.checkboxradio').checkboxradio()

  $(this).find('input#' + Prefs.readConfig('theme')).prop('checked', true)
    .checkboxradio('refresh')

  $('.themeSwitcher').change(function () {
    console.log('Theme: ' + '/static/css/themes/' + $(this).attr('value') + '.css')

    $('#mobStyle').attr({href: '/static/css/themes/' + $(this).attr('value') + '.css'})

    Prefs.writeConfig('theme', $(this).attr('value'))
  })

  var gallerySlideshowSpeed = Prefs.readConfig('gallerySlideshowSpeed')
  var gallerySlideTransition = Prefs.readConfig('gallerySlideTransition')

  $.fancybox.defaults.thumbs.autoStart = true
  $.fancybox.defaults.transitionEffect = gallerySlideTransition
  $.fancybox.defaults.slideShow.speed = gallerySlideshowSpeed

  $slider.find('select#gallerySlideTransition').change(function () {
    console.log('New FX: %s', $(this).val())
    $.fancybox.defaults.transitionEffect = $(this).val()
    Prefs.writeConfig('gallerySlideTransition', $(this).val())
  })

  $slider.find('select#gallerySlideTransition').val(gallerySlideTransition)

  if (Prefs.readConfig('tabDropActivate') === 'true') { $('#tabDropActivate').prop('checked', true).checkboxradio('refresh') } else { $('#tabDropActivate').prop('checked', false).checkboxradio('refresh') }

  $('#tabDropActivate').change(function () {
    Prefs.writeConfig('tabDropActivate', $(this).prop('checked'))
  })

  $slider.find('#gallerySlideshowSpeed').slider({
    value: gallerySlideshowSpeed,
    min: 1,
    max: 10000,
    step: 1,
    slide: function (event, ui) {
      $('#amount').val(ui.value + 'ms')
      // $('#gallerySlideshowSpeedValue').text(ui.value + 'ms');
      $('#gallerySlideshowSpeedValue').text(Utilities.milliToSecs(ui.value) + 's')
    },
    change: function (event, ui) {
      Prefs.writeConfig('gallerySlideshowSpeed', ui.value)
      $('#tabs').find('[data-fancybox]').fancybox({
        slideShow: {
          speed: ui.value
        }
      })
    }
  })

  $('#amount').val($('#gallerySlideshowSpeed').slider('value') + 'ms')
  $('#gallerySlideshowSpeedValue').text(Utilities.milliToSecs($('#gallerySlideshowSpeed').slider('value')) + 's')

  // File select

  $fileImportInput.change(function (evt) {
    var files = evt.target.files
    var f = files[0]
    var reader = new FileReader()

    if (f.type.match(/application\/json/)) {
      console.log('JSON!')
    } else {
      console.log('NOT JSON!')
      Utilities.notify('error', 'Not a Mobylette definition file format')
      return
    }

    reader.onload = (function (theFile) {
      return function (e) {
        function isOk (o) {
          if (Object.prototype.toString.call(o) === '[object Array]') {
            var isValid = o.some(obj =>
              Array.isArray(obj.feeds) && obj.feeds.some(feed =>
                Object.prototype.hasOwnProperty.call(feed, 'url')
              )
            )
          } else {
            isValid = false
          }
          return isValid
        }

        var y = e.target.result
        var p = JSON.parse(y)

        console.log('p Is array: %s', isOk(p))

        if (isOk(p) === true) {
          Utilities.notify('success', 'Successful import')
          Tab.populateTabs(p, true)
        } else {
          Utilities.notify('error', 'Not a Mobylette definition file')
        }

        // console.log('Is Valid: %s', isValid)
      }
    })(f)

    reader.readAsText(f)
  })
})
