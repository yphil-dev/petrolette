// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

var PTL = (function() {

  return {
    // language: Prefs.readConfig('lang'),
    sourceTypes: ['text', 'mixed', 'photo'],
    language: 'en',
    start : function() {

      var $menu = $('nav#side-menu'),
          $overlay = $('#overlay'),
          $sourceCodeButton = $('button#sourceCode'),
          $importButton = $("button#fileImport"),
          $fileImportInput = $("input#fileImport"),
          $saveButton = $('#saveTabs'),
          $langMenu = $('select#language'),
          $slider = $('div#gallerySpeedSlider'),
          $spinner = $('#gallerySpeedSpinner');

      $('noscript').hide();

      $('.js-enabled-only').show();

      $('#console').click(function() {
        $(this).toggleClass('expanded');
      });

      PTL.sync.attachWidget();

      $('button').button();

      $('body').on('click','#menuButton', function() {
        PTL.sideMenu('toggle');
      });

      $('body').on('click','.help-button', function() {
        PTL.dialog.help();
      });

      $('body').on('click','.new-source-button', function() {

        var $column;

        console.log('this: (%s)', $(this).attr('class'));

        if ($(this).hasClass('button-column')) {
          $column = $(this).parent().parent();
        } else {
          $column = $($('.ui-tabs-active')
                      .find('a')
                      .attr('href'))
            .find('.column').first();
        }

        PTL.sideMenu('close');
        PTL.src.add($column, 'New Feed', 'mixed', 8, true);
      });

      $sourceCodeButton.click(function(event) {
        event.preventDefault();
        window.open('https://framagit.org/yphil/petrolette');
      });

      $overlay.click(function() {
        PTL.sideMenu('close');
      });

      $(document).keydown(function(event) {
        if (event.keyCode === $.ui.keyCode.ESCAPE) {
          $('.column' ).sortable('cancel');
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

      PTL.util.translate();

      $langMenu.val(PTL.prefs.readConfig('lang')).prop('selected', true);

      $langMenu.change(function() {
        var selectedLang = $(this).val();
        PTL.language = selectedLang;
        PTL.prefs.writeConfig('lang', selectedLang);
        PTL.util.translate();
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

        $("#theme").attr({href : '/static/css/themes/' + $(this).attr('value') + '.css'});

        PTL.prefs.writeConfig('theme', $(this).attr('value'));

      });

      var gallerySlideshowSpeed = PTL.prefs.readConfig('gallerySlideshowSpeed');
      var gallerySlideTransition = PTL.prefs.readConfig('gallerySlideTransition');

      // $.fancybox.defaults.thumbs.autoStart = true;
      $.fancybox.defaults.transitionEffect = gallerySlideTransition;
      $.fancybox.defaults.slideShow.speed = gallerySlideshowSpeed;

      $.fancybox.defaults.buttons =  [
        'slideShow',
        'fullScreen',
        'thumbs',
        'download',
        'zoom',
        'close'
      ];

      $.fancybox.defaults.wheel = 'auto';

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

      $spinner.spinner('value', PTL.util.milliToSecs(gallerySlideshowSpeed));

      $spinner.on( 'spinstop', function() {
        $slider.slider( 'option', 'value', $(this).val() * 1000);
        $('.ui-slider-handle').text(PTL.util.milliToSecs($(this).val() * 1000) + 's');
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
          $(this).find('.ui-slider-handle').text(PTL.util.milliToSecs(gallerySlideshowSpeed) + 's');
        },
        slide: function(event, ui) {
          // $('#gallerySlideshowSpeedValue').text(ui.value + 'ms');
          $spinner.val(PTL.util.milliToSecs(ui.value));
          $(this).find('.ui-slider-handle').text(PTL.util.milliToSecs(ui.value) + 's');

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

      $fileImportInput.change(function(evt) {
        var f = evt.target.files[0],
            reader = new FileReader();

        reader.onload = (function() {
          return function(e) {
            if (PTL.util.isPTLStruct(e.target.result)) {
              PTL.tab.empty(function() {
                PTL.tab.populate(JSON.parse(e.target.result), true);
              });
            }
          };
        })(f);

        reader.readAsText(f);
      });
    },
    sideMenu: function(action) {

      var $overlay = $('#overlay'),
          $sideMenu = $('nav#side-menu');

      if (action == 'open') {
        $overlay.removeClass('hidden');
        $sideMenu.addClass('expanded');
      } else if (action == 'close') {
        $overlay.addClass('hidden');
        $sideMenu.removeClass('expanded');
      } else {
        $overlay.toggleClass('hidden');
        $sideMenu.toggleClass('expanded');
      }

    },
    tr: function( string ) {
      var _trAux,
          stringVarRegExp = /(%.)/,
          matchData,
          translatedString,
          translations,
          currentReplacement,
          i = 1; // pour pointer sur le premier argument optionnel, arguments[1]

      // Retourne la traduction de la chaine de caractère passée en argument.
      _trAux = function( string ) {
        if( !string ) {
          return "";
        }

        if ( PTL.language === "en" ) {
          // Le discriminant sert à distinguer masculin/féminin ou singulier pluriel, ex <plural>Open
          // En "en" la clé sert aussi à la traduction, donc on retire simplement le discriminant
          var discriminantRegExp = /(<.*>)(.*)/;
          var match = string.match( discriminantRegExp );
          var stringWithoutDiscriminant = match ? match[ 2 ] : null;
          return stringWithoutDiscriminant || string;
        } else {
          translations = PTL.i18n.translations[ string ];
          translatedString = translations ? translations[ PTL.language ] : string;
          return translatedString || string;
        }
      };

      translatedString = _trAux( string );

      while ( ( matchData = stringVarRegExp.exec( translatedString ) ) !== null ) {
        currentReplacement = translatedString.replace( matchData[0], arguments[ i ]  );
        translatedString =  currentReplacement;
        i++;
      }

      return translatedString;
    }
  };

})();
