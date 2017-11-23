$('<div id="menu">').appendTo($('body')).load('/static/templates/menu.html', function() {

  var $slider = $(this),
      $handle = $slider.find('.handle'),
      $fileImportButton = $("button#fileImport").button(),
      $fileImportInput = $("input#fileImport").button(),
      $fileExport = $('#saveTabs').button(),
      $langMenu = $('select#language'),
      $donate = $('button#donate').button().tooltip(),
      $profile = $('button#profile').button().tooltip();

  $langMenu.val(Prefs.readConfig('lang'));

  $langMenu.change(function() {

    var selectedLang = $(this).val();

    console.log('Lang: %s', selectedLang);
    MOB.language = selectedLang;
    Prefs.writeConfig('lang', selectedLang);

    $('.translate').each(function() {

      if ($(this).data('title')) {
        $(this).prop('title', MOB.tr($(this).data('title')));
      }

      if ($(this).data('content')) {
        $(this).text(MOB.tr($(this).data('content')));
      }

    });

  });

  $handle.click(function () {
    $slider.toggleClass('expanded');
    $(this).children('i').toggleClass('close');
  });

  $profile.click(function (event) {
    event.preventDefault();
    console.log('Click!');

    $handle.click();

    MOB.dialog.question(0);
  });

  $donate.click(function (event) {
    event.preventDefault();
    console.log('Click!');
    location.href='https://liberapay.com/yPhil/donate';
  });

  $fileImportButton.click(function () {
    $("input#fileImport").click();
    return false;
  });

  $fileExport.click(function () {
    Prefs.exportConfig(MOB.tab.all(), 'mobylette.json');
    return false;
  });

  $(".checkboxradio").checkboxradio();

  $(this).find('input#' + Prefs.readConfig('theme')).prop("checked", true)
    .checkboxradio('refresh');

  $('.themeSwitcher').change(function() {
    console.log('Theme: ' + '/static/css/themes/' + $(this).attr('value') + '.css');

    $("#mobStyle").attr({href : '/static/css/themes/' + $(this).attr('value') + '.css'});

    Prefs.writeConfig('theme', $(this).attr('value'));

  });

  var gallerySlideshowSpeed = Prefs.readConfig('gallerySlideshowSpeed');
  var gallerySlideTransition = Prefs.readConfig('gallerySlideTransition');

  $.fancybox.defaults.thumbs.autoStart = true;
  $.fancybox.defaults.transitionEffect = gallerySlideTransition;
  $.fancybox.defaults.slideShow.speed = gallerySlideshowSpeed;

  $slider.find('select#gallerySlideTransition').change(function() {
    console.log('New FX: %s', $(this).val());
    $.fancybox.defaults.transitionEffect = $(this).val();
    Prefs.writeConfig('gallerySlideTransition', $(this).val());
  });

  $slider.find('select#gallerySlideTransition').val(gallerySlideTransition);

  if (Prefs.readConfig('tabDropActivate') === 'true')
    $('#tabDropActivate').prop('checked', true).checkboxradio('refresh');
  else
    $('#tabDropActivate').prop('checked', false).checkboxradio('refresh');

  $('#tabDropActivate').change(function() {
    Prefs.writeConfig('tabDropActivate', $(this).prop('checked'));
  });

  $slider.find('#gallerySlideshowSpeed').slider({
    value: gallerySlideshowSpeed,
    min: 1,
    max: 10000,
    step: 1,
    slide: function(event, ui) {
      $('#amount').val(ui.value + 'ms');
      // $('#gallerySlideshowSpeedValue').text(ui.value + 'ms');
      $('#gallerySlideshowSpeedValue').text(Utilities.milliToSecs(ui.value) + 's');
    },
    change: function(event, ui) {
      Prefs.writeConfig('gallerySlideshowSpeed', ui.value);
      $('#tabs').find("[data-fancybox]").fancybox({
        slideShow: {
          speed: ui.value
        }
      });
    }
  });

  $('#amount').val($('#gallerySlideshowSpeed').slider('value') + 'ms');
  $('#gallerySlideshowSpeedValue').text(Utilities.milliToSecs($('#gallerySlideshowSpeed').slider('value')) + 's');

  // File select

  $fileImportInput.change(function(evt){
    var files = evt.target.files;
    var f = files[0];
    var reader = new FileReader();

    if (f.type.match(/application\/json/)) {
      console.log('JSON!');
    } else {
      console.log('NOT JSON!');
      Utilities.notify('error', 'Not a Mobylette definition file format');
      return;
    }

    reader.onload = (function() {
      return function(e) {

        function isOk(o) {
          var isValid = false;
          if (Object.prototype.toString.call(o) === '[object Array]') {
            isValid = o.some(obj => Array.isArray(obj.feeds) && obj.feeds.some(feed => Object.prototype.hasOwnProperty.call(feed, 'url')));
          } else {
            isValid = false;
          }
          return isValid;
        }

        var y = e.target.result;

        function IsJsonString(str) {
          try {
            JSON.parse(str);
          } catch (e) {
            return false;
          }
          return true;
        }

        var p = false;

        if (IsJsonString(y)) {
          p = JSON.parse(y);
        } else {
          Utilities.notify('error', 'Not a Mobylette definition file');
        }

        // console.log('p Is array: %s', isOk(p));

        if (p && isOk(p) === true){
          Utilities.notify('success', 'Successful import');
          MOB.tab.populate(p, true);
        } else {
          Utilities.notify('error', 'Not a Mobylette definition file');
        }

        // console.log('Is Valid: %s', isValid)
      };
    })(f);

    reader.readAsText(f);

  });

});
