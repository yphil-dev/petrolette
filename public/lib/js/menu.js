$('<div id="menu">').appendTo($('body')).load('/static/templates/menu.html', function() {

  var $slider = $(this),
      $handle = $slider.find('.handle'),
      $loadButton = $("button#fileImport").button(),
      $fileImportInput = $("input#fileImport").button(),

      $helpLegend = $('legend#helpLegend'),
      $saveButton = $('#saveTabs').button(),
      $dropTabLabel = $('label#dropTabLabel'),
      $dayLabel = $('label#dayLabel'),
      $nightLabel = $('label#nightLabel'),
      $langMenu = $('select#language'),
      $donate = $('button#donate').button().tooltip(),
      $profile = $('button#profile').button().tooltip();

  $('.translate').each(function() {

    if ($(this).data('title')) {
      $(this).prop('title', MOB.tr($(this).data('title')));
    }

    if ($(this).data('content')) {
      $(this).text(MOB.tr($(this).data('content')));
    }

  });

  $langMenu.val(MOB.prefs.readConfig('lang'));

  $langMenu.change(function() {

    var selectedLang = $(this).val();

    console.log('Lang: %s', selectedLang);
    MOB.language = selectedLang;
    MOB.prefs.writeConfig('lang', selectedLang);

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
    location.href='https://liberapay.com/yPhil/donate';
  });

  $loadButton.click(function () {
    $("input#fileImport").click();
    return false;
  });

  $saveButton.click(function () {
    MOB.prefs.exportConfig(MOB.tab.all(), 'mobylette.json');
    return false;
  });

  $(".checkboxradio").checkboxradio();

  $(this).find('input#' + MOB.prefs.readConfig('theme')).prop("checked", true)
    .checkboxradio('refresh');

  $('.themeSwitcher').change(function() {
    console.log('Theme: ' + '/static/css/themes/' + $(this).attr('value') + '.css');

    $("#mobStyle").attr({href : '/static/css/themes/' + $(this).attr('value') + '.css'});

    MOB.prefs.writeConfig('theme', $(this).attr('value'));

  });

  var gallerySlideshowSpeed = MOB.prefs.readConfig('gallerySlideshowSpeed');
  var gallerySlideTransition = MOB.prefs.readConfig('gallerySlideTransition');

  $.fancybox.defaults.thumbs.autoStart = true;
  $.fancybox.defaults.transitionEffect = gallerySlideTransition;
  $.fancybox.defaults.slideShow.speed = gallerySlideshowSpeed;

  $slider.find('select#gallerySlideTransition').change(function() {
    console.log('New FX: %s', $(this).val());
    $.fancybox.defaults.transitionEffect = $(this).val();
    MOB.prefs.writeConfig('gallerySlideTransition', $(this).val());
  });

  $slider.find('select#gallerySlideTransition').val(gallerySlideTransition);

  if (MOB.prefs.readConfig('tabDropActivate') === 'true')
    $('input#tabDropActivate').prop('checked', true).checkboxradio('refresh');
  else
    $('input#tabDropActivate').prop('checked', false).checkboxradio('refresh');

  $('input#tabDropActivate').change(function() {
    MOB.prefs.writeConfig('tabDropActivate', $(this).prop('checked'));
  });

  $slider.find('#gallerySlideshowSpeed').slider({
    value: gallerySlideshowSpeed,
    min: 1,
    max: 10000,
    step: 1,
    slide: function(event, ui) {
      $('#amount').val(ui.value + 'ms');
      // $('#gallerySlideshowSpeedValue').text(ui.value + 'ms');
      $('#gallerySlideshowSpeedValue').text(MOB.utilities.milliToSecs(ui.value) + 's');
    },
    change: function(event, ui) {
      MOB.prefs.writeConfig('gallerySlideshowSpeed', ui.value);
      $('#tabs').find("[data-fancybox]").fancybox({
        slideShow: {
          speed: ui.value
        }
      });
    }
  });

  $('#amount').val($('#gallerySlideshowSpeed').slider('value') + 'ms');
  $('#gallerySlideshowSpeedValue').text(MOB.utilities.milliToSecs($('#gallerySlideshowSpeed').slider('value')) + 's');

  // File select

  $fileImportInput.change(function(evt){
    var files = evt.target.files;
    var f = files[0];
    var reader = new FileReader();

    if (f.type.match(/application\/json/)) {
      console.log('JSON!');
    } else {
      console.log('NOT JSON!');
      MOB.utilities.notify('error', 'Not a Mobylette definition file format');
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
          MOB.utilities.notify('error', 'Not a Mobylette definition file');
        }

        // console.log('p Is array: %s', isOk(p));

        if (p && isOk(p) === true){
          MOB.utilities.notify('success', 'Successful import');
          MOB.tab.populate(p, true);
        } else {
          MOB.utilities.notify('error', 'Not a Mobylette definition file');
        }

        // console.log('Is Valid: %s', isValid)
      };
    })(f);

    reader.readAsText(f);

  });

});
