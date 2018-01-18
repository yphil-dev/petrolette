$('<div id="menu">').appendTo($('body')).load('/static/templates/menu.html', function() {

  var $menu = $(this),
      $handle = $menu.find('.handle'),
      $loadButton = $("button#fileImport").button(),
      $fileImportInput = $("input#fileImport").button(),
      $saveButton = $('#saveTabs').button(),
      $langMenu = $('select#language'),
      $help = $('button#help').button(),
      $donate = $('button#donate').button(),
      $addSource = $('button#addSource').button(),
      $slider = $('div#gallerySpeedSlider'),
      $syncBox = $('div#syncBox'),
      $spinner = $('#gallerySpeedSpinner');

  MOB.sync.rs();

  MOB.utilities.translate();

  $langMenu.val(MOB.prefs.readConfig('lang')).prop('selected', true);

  // $langMenu.val(MOB.prefs.readConfig('lang'));

  $langMenu.change(function() {

    var selectedLang = $(this).val();

    MOB.language = selectedLang;
    MOB.prefs.writeConfig('lang', selectedLang);
    MOB.utilities.translate();

  });

  $handle.click(function () {
    $menu.toggleClass('expanded');
    $('#logoTitle').fadeToggle('slow');
    $(this).children('i').toggleClass('close');

    $('i.logoType')
      .toggleClass('close')
      .toggleClass('icon-menu')
      .toggleClass('icon-motorcycle');

  });

  $addSource.click(function (event) {
    event.preventDefault();

    $handle.click();

    MOB.dialog.newContent();

  });

  $help.click(function (event) {
    event.preventDefault();
    $('#tabs').tabs('option', 'active', 0);
    MOB.utilities.help('ui');
  });


  $donate.click(function (event) {
    event.preventDefault();
    window.open('https://liberapay.com/yPhil/donate', '_blank');
  });

  $loadButton.click(function () {
    $("input#fileImport").click();
    return false;
  });

  $saveButton.click(function () {
    MOB.prefs.exportConfig(MOB.tab.list(), 'petrolette.conf');
    return false;
  });

  $(".checkboxradio").checkboxradio({
    icon: false
  });

  $(this).find('input#' + MOB.prefs.readConfig('theme')).prop("checked", true)
    .checkboxradio('refresh');

  $('.themeSwitcher').change(function() {
    console.log('Theme: ' + '/static/css/themes/' + $(this).attr('value') + '.css');

    $("#mobStyle").attr({href : '/static/css/themes/' + $(this).attr('value') + '.css'});

    MOB.prefs.writeConfig('theme', $(this).attr('value'));

  });

  var gallerySlideshowSpeed = MOB.prefs.readConfig('gallerySlideshowSpeed');
  var gallerySlideTransition = MOB.prefs.readConfig('gallerySlideTransition');

  // $.fancybox.defaults.thumbs.autoStart = true;
  $.fancybox.defaults.transitionEffect = gallerySlideTransition;
  $.fancybox.defaults.slideShow.speed = gallerySlideshowSpeed;

  $menu.find('select#gallerySlideTransition').change(function() {
    console.log('New FX: %s', $(this).val());
    $.fancybox.defaults.transitionEffect = $(this).val();
    MOB.prefs.writeConfig('gallerySlideTransition', $(this).val());
  });

  $menu.find('select#gallerySlideTransition').val(gallerySlideTransition);

  if (MOB.prefs.readConfig('tabDropActivate') === 'true')
    $('input#tabDropActivate').prop('checked', true).checkboxradio('refresh');
  else
    $('input#tabDropActivate').prop('checked', false).checkboxradio('refresh');

  $('input#tabDropActivate').change(function() {
    MOB.prefs.writeConfig('tabDropActivate', $(this).prop('checked'));
  });

  $spinner.spinner({
    min: 0.5,
    max: 10000,
    step: 0.5,
    classes: {
      "ui-spinner": "shrink ui-corner-all",
      "ui-spinner-down": "ui-corner-br",
      "ui-spinner-up": "ui-corner-tr"
    }
  });

  $spinner.spinner('value', MOB.utilities.milliToSecs(gallerySlideshowSpeed));

  $spinner.on( 'spinstop', function() {
    $slider.slider( 'option', 'value', $(this).val() * 1000);
    $('.ui-slider-handle').text(MOB.utilities.milliToSecs($(this).val() * 1000) + 's');
  });

  $slider.slider({
    classes: {
      "ui-slider": "grow ui-corner-all",
      "ui-slider-handle": "ui-corner-all",
      "ui-slider-range": "ui-corner-all ui-widget-header"
    },
    value: gallerySlideshowSpeed,
    min: 500,
    max: 10000,
    step: 500,
    create: function() {
      $(this).find('.ui-slider-handle').text(MOB.utilities.milliToSecs(gallerySlideshowSpeed) + 's');
    },
    slide: function(event, ui) {
      // $('#gallerySlideshowSpeedValue').text(ui.value + 'ms');
      $spinner.val(MOB.utilities.milliToSecs(ui.value));
      $(this).find('.ui-slider-handle').text(MOB.utilities.milliToSecs(ui.value) + 's');

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

  // File reader

  $fileImportInput.change(function(evt){
    var f = evt.target.files[0],
        reader = new FileReader();

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

        function isJsonString(str) {
          try {
            JSON.parse(str);
          } catch (e) {
            return false;
          }
          return true;
        }

        var p = false;

        if (isJsonString(y)) {
          p = JSON.parse(y);
        } else {
          $.notify(MOB.tr('This file is bad'), 'error');
        }

        // console.log('p Is array: %s', isOk(p));

        if (p && isOk(p) === true){
          $.notify(MOB.tr('Loading of [%s] OK', f.name), 'success');
          MOB.tab.populate(p, true);
        } else {
          $.notify(MOB.tr('This file is bad'), 'error');
        }

        // console.log('Is Valid: %s', isValid)
      };
    })(f);

    reader.readAsText(f);

  });

});
