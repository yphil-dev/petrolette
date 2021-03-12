// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

var PTL = (function() {

  return {
    // language: Prefs.readConfig('lang'),
    feedTypes: ['text', 'mixed', 'photo'],
    language: 'en',
    start : function() {

      PTL.util.say(PTL.tr('Pétrolette starting up OK'), 'success');

      var $sideMenu = $('nav#sideMenu'),
          $overlay = $('#overlay'),
          $feedCodeButton = $('button#feedCode'),
          $importButton = $("button#fileImportButton"),
          $fileImportInput = $("input#fileImport"),
          $saveButton = $('#saveTabs'),
          $resetButton = $('#resetTabs'),
          $langMenu = $('select#language'),
          $slider = $('div#gallerySpeedSlider'),
          $searchField = $('#ptlSearch input').val(''),
          $searchPrefixOkButton = $('button#searchPrefixOkButton'),
          $searchPrefixRestoreButton = $('button#searchPrefixRestoreButton'),
          $searchPrefixInput = $('input#searchPrefixInput'),
          $spinner = $('#gallerySpeedSpinner'),
          $logoType = $('.logoType'),
          $topMenu = $('nav#top-menu');

      $topMenu.removeAttr('style');
      $sideMenu.removeAttr('style');

      $searchPrefixInput.val(PTL.prefs.readConfig('searchPrefix'));

      $searchPrefixRestoreButton.click(function(){
        console.log('val %s', $searchPrefixInput.val());
        $searchPrefixInput.val(PTL.prefs.readConfig('searchPrefixDefault'));
        PTL.util.say(PTL.tr('Restored search prefix to default value'), 'success', true);
      });

      $searchPrefixOkButton.click(function(){
        const clean = DOMPurify.sanitize($searchPrefixInput.val());
        PTL.prefs.writeConfig('searchPrefix', clean);
        PTL.util.say(PTL.tr('Search prefix') + ': ' + clean, 'success', true);
      });

      $('#logo-title a').click(function(){
        $('#ui-id-1').focus().trigger('click');
      });

      $logoType.click(function(){
        PTL.dialog.about($logoType.attr('data-version'));
      });

      $('noscript').hide();

      $('.js-enabled-only').show();

      $('body').on('click','.help-bookmarklet', function(event) {
        event.preventDefault();
      });

      $('#sideMenu legend').click(function() {
        $(this).children('i').toggleClass('unfold');
        $(this).next().toggle();
      });

      $('#ptlSearch i').click(function() {
        $(this).prev('input').val('');
        $('.results').removeClass('results');
      });

      $searchField.on('keypress',function(e) {
        if(e.which == 13) $('a.ui-tabs-anchor.results').focus().trigger('click');
      });

      $searchField.on('keyup', function () {
        var v = $(this).val();
        $('.results').removeClass('results');
        $('a.feed-link').each(function () {
          if (v != '' && $(this).text().search(new RegExp(v,'gi')) != -1) {
            var $feed = $(this).parent().parent().parent().parent();
            var $col = $feed.parent().parent();
            var tabId = $col.parent().attr('aria-labelledby');
            var $tab = $('a#' + tabId);
            $(this).addClass('results');
            $feed.addClass('results');
            // $col.addClass('results');
            $tab.addClass('results');
          }
        });
      });

      PTL.sync.attachWidget();

      $('button').button();

      $('body').on('click','#menuButton', function() {
        PTL.sideMenu('toggle');
      });

      $('body').on('click','.help-button', function() {
        PTL.dialog.help();
        // PTL.dialog.beg();
      });

      $('body').on('click','.new-feed-button', function() {

        var $column;

        if ($(this).hasClass('button-column')) {
          $column = $(this).parent().parent();
        } else {
          $column = $($('.ui-tabs-active')
                      .find('a')
                      .attr('href'))
            .find('.column').first();
        }

        PTL.sideMenu('close');
        PTL.feed.add($column, '', 'mixed', 350, 'on', true, false);
      });

      $feedCodeButton.click(function(event) {
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

      $resetButton.click(function () {
        PTL.dialog.resetTabs();
      });

      var $themeBox = $('div#themeBox'),
          $dayLabel = $('<label>')
          .attr('for', 'day')
          .attr('class', 'translate grow')
          .data('content', PTL.tr('Day'))
          .text(PTL.tr('Day')),
          $dayInput = $('<input>')
          .attr('id', 'day')
          .attr('class', 'themeSwitcher')
          .attr('type', 'radio')
          .attr('name', 'radio-1')
          .attr('value', 'day'),
          $nightLabel = $('<label>')
          .attr('for', 'night')
          .attr('class', 'translate grow')
          .data('content', PTL.tr('Night'))
          .text(PTL.tr('Night')),
          $nightInput = $('<input>')
          .attr('id', 'night')
          .attr('class', 'themeSwitcher')
          .attr('type', 'radio')
          .attr('name', 'radio-1')
          .attr('value', 'night');

      $themeBox.append($dayLabel, $dayInput, $nightLabel, $nightInput);

      $sideMenu.find('.themeSwitcher').checkboxradio();

      $sideMenu.find("input#" + PTL.prefs.readConfig('theme')).attr("checked", true);

      $sideMenu.find('.themeSwitcher').checkboxradio('refresh');

      $('.themeSwitcher').change(function() {
        $("#theme").attr({href : '/static/css/themes/' + $(this).attr('value') + '.css'});
        PTL.prefs.writeConfig('theme', $(this).attr('value'));
      });

      var $brokenImagesBox = $('div#brokenImagesBox'),
          $showLabel = $('<label>')
          .attr('class', 'translate grow')
          .attr('for', 'show')
          .data('content', PTL.tr('Show'))
          .text(PTL.tr('Show')),
          $showInput = $('<input>')
          .attr('id', 'show')
          .attr('class', 'brokenImagesSwitcher')
          .attr('type', 'radio')
          .attr('name', 'radio-2')
          .attr('value', 'show'),
          $hideLabel = $('<label>')
          .attr('class', 'translate grow')
          .attr('for', 'hide')
          .data('content', PTL.tr('Hide'))
          .text(PTL.tr('Hide')),
          $hideInput = $('<input>')
          .attr('id', 'hide')
          .attr('class', 'brokenImagesSwitcher')
          .attr('type', 'radio')
          .attr('name', 'radio-2')
          .attr('value', 'hide');

      $brokenImagesBox.append($showLabel, $showInput, $hideLabel, $hideInput);

      $sideMenu.find('.brokenImagesSwitcher').checkboxradio({icon: true});

      $sideMenu.find("input#" + PTL.prefs.readConfig('brokenImages')).attr("checked", true);

      $sideMenu.find('.brokenImagesSwitcher').checkboxradio('refresh');

      $('.brokenImagesSwitcher').change(function() {
        PTL.prefs.writeConfig('brokenImages', $(this).attr('value'));
      });

      var $mediaPreloadBox = $('div#mediaPreloadBox'),
          $mediaPreloadNoneLabel = $('<label>')
          .attr('class', 'translate grow')
          .attr('for', 'none')
          .data('content', PTL.tr('None'))
          .text(PTL.tr('None')),
          $mediaPreloadNoneInput = $('<input>')
          .attr('id', 'none')
          .attr('class', 'mediaPreloadSwitcher')
          .attr('type', 'radio')
          .attr('name', 'radio-2')
          .attr('value', 'none'),
          $mediaPreloadMetaLabel = $('<label>')
          .attr('class', 'translate grow')
          .attr('for', 'metadata')
          .data('content', PTL.tr('Meta'))
          .text(PTL.tr('Meta')),
          $mediaPreloadMetaInput = $('<input>')
          .attr('id', 'metadata')
          .attr('class', 'mediaPreloadSwitcher')
          .attr('type', 'radio')
          .attr('name', 'radio-2')
          .attr('value', 'metadata'),
          $mediaPreloadAutoLabel = $('<label>')
          .attr('class', 'translate grow')
          .attr('for', 'auto')
          .data('content', PTL.tr('All'))
          .text(PTL.tr('All')),
          $mediaPreloadAutoInput = $('<input>')
          .attr('id', 'auto')
          .attr('class', 'mediaPreloadSwitcher')
          .attr('type', 'radio')
          .attr('name', 'radio-2')
          .attr('value', 'auto');

      $mediaPreloadBox.append($mediaPreloadNoneLabel,
                              $mediaPreloadNoneInput,
                              $mediaPreloadMetaLabel,
                              $mediaPreloadMetaInput,
                              $mediaPreloadAutoLabel,
                              $mediaPreloadAutoInput);

      $sideMenu.find('.mediaPreloadSwitcher').checkboxradio();

      $sideMenu.find("input#" + PTL.prefs.readConfig('mediaPreload')).attr("checked", true);

      $sideMenu.find('.mediaPreloadSwitcher').checkboxradio('refresh');

      $('.mediaPreloadSwitcher').change(function() {
        PTL.prefs.writeConfig('mediaPreload', $(this).attr('value'));
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

      $sideMenu.find('select#gallerySlideTransition').change(function() {
        $.fancybox.defaults.transitionEffect = $(this).val();
        PTL.prefs.writeConfig('gallerySlideTransition', $(this).val());
      });

      $sideMenu.find('select#gallerySlideTransition').val(gallerySlideTransition);

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
          "ui-slider": "ui-corner-all",
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
            } else if (PTL.util.isNV(e.target.result)) {
              PTL.util.importNV(e.target.result);
            } else {
              PTL.util.say(PTL.tr("Pétrolette can't read this file"), 'warning', true);
            }

          };
        })(f);

        reader.readAsText(f);
      });

      $.extend($.ui.dialog.prototype.options, {
        closeOnEscape: true,
        resizable: true,
        height: 'auto',
        width: PTL.util.vWidth(),
        modal: true,
        autoOpen: true
      });

      $.ui.dialog.prototype._init = function() {
        PTL.util.translate();
      };

    },
    sideMenu: function(action) {

      var $overlay = $('#overlay'),
          $sideMenu = $('nav#sideMenu');

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
