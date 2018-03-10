/*!
 * @base: public/js/PTL.menu.js
 *
 * @Source: PTL.menu.js
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2018  Philippe Y Coatmeur
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

PTL.menu = {
  top:function() {

    $('<div id="topMenu">').appendTo($('header')).load('/static/templates/menu.html nav#topnav', null);

  },
  side:function() {

    $('<div id="sideMenu">').appendTo($('body')).load('/static/templates/menu.html form#sideMenu', function() {

      var $menu = $(this),
          $overlay = $('#overlay'),
          $sourceCodeButton = $('button#sourceCode'),
          $importButton = $("button#fileImport"),
          $fileImportInput = $("input#fileImport"),
          $saveButton = $('#saveTabs'),
          $langMenu = $('select#language'),
          $slider = $('div#gallerySpeedSlider'),
          $spinner = $('#gallerySpeedSpinner');

      $('button').button();

      PTL.sync.attachWidget();

      $('body').on('click','#menuButton', function() {
        $overlay.toggleClass('visible');
        $menu.toggleClass('expanded');
      });

      $('body').on('click','#helpButton', function() {
        $('#tabs').tabs('option', 'active', 0);
        PTL.dialog.help();
      });

      $('body').on('click','#newSourceButton', function() {
        var $openGroupPanel = $($('.ui-tabs-active').find('a').attr('href')).find('.tabSort');
        $overlay.removeClass('visible');
        $menu.removeClass('expanded');
        PTL.feed.make($openGroupPanel, 'New Feed', 'mixed', 8, true);
      });

      $sourceCodeButton.click(function(event) {
        event.preventDefault();
        window.open('https://framagit.org/yphil/petrolette');
      });

      $overlay.click(function() {
        $(this).removeClass('visible');
          $menu.removeClass('expanded');
        });

        $(document).keydown(function(event) {
          if (event.keyCode === $.ui.keyCode.ESCAPE) {
            $('.tabSort' ).sortable('cancel');
          }
        });

        var $widget = $('#remotestorage-widget');

        var $readMore = $('<a>')
          .attr('class', 'rs-help')
          .attr('href', 'https:remotestorage.io/')
          .text(PTL.tr('Read more.'));

      $widget.find('.rs-short-desc').text(PTL.tr('Pétrolette allows you to sync data with a storage of your choice ; '))
        .append($readMore);

      var $fuckingButton =  $widget.find('.rs-choose-rs');

      $fuckingButton.css('border-color', '#f00');

      $fuckingButton.click(function (event) {
        event.preventDefault();
      });

      PTL.utilities.translate();

      $langMenu.val(PTL.prefs.readConfig('lang')).prop('selected', true);

      $langMenu.change(function() {
        var selectedLang = $(this).val();
        PTL.language = selectedLang;
        PTL.prefs.writeConfig('lang', selectedLang);
        PTL.utilities.translate();
      });

      $importButton.click(function () {
        $("input#fileImport").click();
        return false;
      });

      $saveButton.click(function () {
        PTL.prefs.exportConfig(PTL.tab.list(), 'petrolette.conf');
        return false;
      });

      $(".checkboxradio").checkboxradio({
        icon: false
      });

      $(this).find('input#' + PTL.prefs.readConfig('theme')).prop("checked", true)
        .checkboxradio('refresh');

      $('.themeSwitcher').change(function() {

        $("#mobStyle").attr({href : '/static/css/themes/' + $(this).attr('value') + '.css'});

        PTL.prefs.writeConfig('theme', $(this).attr('value'));

      });

      var gallerySlideshowSpeed = PTL.prefs.readConfig('gallerySlideshowSpeed');
      var gallerySlideTransition = PTL.prefs.readConfig('gallerySlideTransition');

      // $.fancybox.defaults.thumbs.autoStart = true;
      $.fancybox.defaults.transitionEffect = gallerySlideTransition;
      $.fancybox.defaults.slideShow.speed = gallerySlideshowSpeed;

      $menu.find('select#gallerySlideTransition').change(function() {
        $.fancybox.defaults.transitionEffect = $(this).val();
        PTL.prefs.writeConfig('gallerySlideTransition', $(this).val());
      });

      $menu.find('select#gallerySlideTransition').val(gallerySlideTransition);

      if (PTL.prefs.readConfig('tabDropActivate') === 'true')
        $('input#tabDropActivate').prop('checked', true).checkboxradio('refresh');
      else
        $('input#tabDropActivate').prop('checked', false).checkboxradio('refresh');

      $('input#tabDropActivate').change(function() {
        PTL.prefs.writeConfig('tabDropActivate', $(this).prop('checked'));
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

      $spinner.spinner('value', PTL.utilities.milliToSecs(gallerySlideshowSpeed));

      $spinner.on( 'spinstop', function() {
        $slider.slider( 'option', 'value', $(this).val() * 1000);
        $('.ui-slider-handle').text(PTL.utilities.milliToSecs($(this).val() * 1000) + 's');
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
          $(this).find('.ui-slider-handle').text(PTL.utilities.milliToSecs(gallerySlideshowSpeed) + 's');
        },
        slide: function(event, ui) {
          // $('#gallerySlideshowSpeedValue').text(ui.value + 'ms');
          $spinner.val(PTL.utilities.milliToSecs(ui.value));
          $(this).find('.ui-slider-handle').text(PTL.utilities.milliToSecs(ui.value) + 's');

        },
        change: function(event, ui) {
          PTL.prefs.writeConfig('gallerySlideshowSpeed', ui.value);
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
              console.error('Pétrolette | ' + PTL.tr('This file is bad [%1]', f.name));
            }

            if (p && isOk(p) === true){
              console.info('Pétrolette | ' + PTL.tr('Loading of [%1] OK', f.name));
              PTL.tab.populate(p, true);
            } else {
              console.error('Pétrolette | ' + PTL.tr('This file is bad [%1]', f.name));
            }

          };
        })(f);

        reader.readAsText(f);

      });

    });

  }
};
