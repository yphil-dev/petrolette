// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

var PTL = (function() {

  return {
    DbName: 'petrolette',
    DbVersion: 1,
    DbStore: 'feeds',
    DbKey: 'url',
    feedTypes: ['text', 'mixed', 'photo'],
    language: 'en',
    start : function() {

      let request = indexedDB.open(PTL.DbName, PTL.DbVersion);

      request.onerror = function(event) {
        // Handle errors.
      };
      request.onupgradeneeded = function(event) {
        var db = event.target.result;

        var objectStore = db.createObjectStore(PTL.DbStore, { keyPath: PTL.DbKey });

        console.log('DB OK: %s (%s)', PTL.DbName, PTL.DbStore);

      };

      PTL.util.say(PTL.tr('Pétrolette init'), 'success');

      const $sideMenu = $('nav#sideMenu'),
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
            $gallerySpeedSpinner = $('#gallerySpeedSpinner'),
            $logoType = $('.logoType'),
            $topMenu = $('nav#top-menu');

      $topMenu.removeAttr('style');
      $sideMenu.removeAttr('style');

      $('noscript').hide();

      $('.jsEnabledOnly').show();

      $searchPrefixInput
        .attr('onclick', 'this.select()')
        .val(PTL.prefs.readConfig('searchPrefix'));

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

      $('#logoTitle > .logoTitle').click(function(){
        $('.ui-state-active a').focus();
      });

      $logoType.click(function(){
        PTL.dialog.about($logoType.attr('data-version'));
      });

      $('body').on('click','.helpBookmarklet', function(event) {
        event.preventDefault();
      });

      $('nav#sideMenu .menuTourItem').each(function() {
        const step = $(this).data('step');
        $(this)
          .parent()
          .parent()
          .append($('<i>')
            .attr('class', 'icon-help helpIcon')
            .on('click', function() {
              PTL.util.help('menu', step);
            }));
      });

      $(document).on({
        mouseenter: function() {
          $(this).find('.colButtons').show();
        },
        mouseleave: function() {
          $(this).find('.colButtons').hide();
        }
      }, "ul.column");

      $('nav#sideMenu .sideMenuSectionToggle').click(function() {
        $(this).children('i').toggleClass('unfold');
        $(this).parent().next().toggle();
      });

      $('#ptlSearch i').click(function() {
        $(this).prev('input').val('');
        $('.results').removeClass('results');
      });

      $searchField.on('keypress',function(e) {
        if (e.which == 13) {
          $('a.ui-tabs-anchor.results').focus().trigger('click');
          const item = document.querySelector('li.feedItem.results');
          item.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
      });

      $searchField.on('keyup', function (e) {
        if (e.which == 27) $(this).val('');
        var v = $(this).val();
        $('.results').removeClass('results');
        $('li.feedItem').each(function () {
          if (v != '' && $(this).text().search(new RegExp(v,'gi')) != -1) {
            const $feed = $(this).parent().parent();
            const $col = $feed.parent();
            const tabId = $col.parent().attr('aria-labelledby');
            const $tab = $('a#' + tabId);
            $(this).addClass('results');
            $feed.addClass('results');
            $tab.addClass('results');
          }
        });
      });

      PTL.sync.attachWidget();

      $('button').button();

      const ptlUrl = [location.protocol, '//', location.host, location.pathname].join('');
      
      $('.helpBookmarklet')
        .attr('href', 'javascript:void(window.open("' + ptlUrl + '?add="+encodeURIComponent(location.href)))');
      
      $('body').on('click','#menuButton', function() {
        PTL.sideMenu('toggle');
      });

      $('body').on('click','.helpLink', function() {
        PTL.dialog.help();
      });

      $('body').on('click','.newFeedButton', function() {

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
          PTL.feed.add($column, '', '', 'mixed', 220, 'on', '', 16, '', 30, true, false);
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

      $langMenu.val(PTL.prefs.readConfig('lang')).prop('selected', true);

      const $syncBox = $('#syncBox');

      const $readMore = $('<a>')
            .attr('class', 'translate')
            .attr('target', '_blank')
            .attr('data-content', 'About the remoteStorage protocol')
            .attr('href', 'https://remotestorage.io/')
            .text(PTL.tr('About the remoteStorage protocol'));

      $syncBox.find('h1.rs-big-headline, h3.rs-small-headline')
        .addClass('translate')
        .attr('data-content', 'Connection to storage')
        .text(PTL.tr('Connection to storage'));

      $syncBox.find('p.rs-short-desc, span.rs-sub-headline')
        .addClass('translate')
        .attr('data-content', 'To synchronize tabs and feeds across devices')
        .text(PTL.tr('To synchronize tabs and feeds across devices'));

      $syncBox.find('p.rs-short-desc').after($readMore);

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

      const $themeBox = $('div#themeBox'),
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

      const $mediaPreloadBox = $('div#mediaPreloadBox'),
            $mediaPreloadNoneLabel = $('<label>')
            .attr('class', 'translate grow')
            .attr('for', 'none')
            .data('content', PTL.tr('None'))
            .text(PTL.tr('None')),
            $mediaPreloadNoneInput = $('<input>')
            .attr('id', 'none')
            .attr('class', 'mediaPreloadSwitcher')
            .attr('type', 'radio')
            .attr('name', 'radio-3')
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
            .attr('name', 'radio-3')
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
            .attr('name', 'radio-3')
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
        // 'thumbs',
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

      $gallerySpeedSpinner.spinner({
        min: 0.5,
        max: 10000,
        step: 0.5,
        classes: {
          "ui-spinner": "ui-corner-all",
          "ui-spinner-down": "ui-corner-br",
          "ui-spinner-up": "ui-corner-tr"
        }
      });

      $gallerySpeedSpinner.spinner('value', PTL.util.milliToSecs(gallerySlideshowSpeed));

      $gallerySpeedSpinner.on( 'spinstop', function() {
        $slider.slider( 'option', 'value', $(this).val() * 1000);
        $('.ui-slider-handle').text(PTL.util.milliToSecs($(this).val() * 1000) + 's');
      });

      $slider.slider({
        classes: {
          "ui-slider": "ui-corner-all",
          "ui-slider-handle": "ui-corner-all",
          "ui-slider-range": "ui-corner-all ui-widget-header"
        },
        value: parseInt(gallerySlideshowSpeed),
        min: 500,
        max: 10000,
        step: 500,
        create: function() {
          $(this).find('.ui-slider-handle').text(PTL.util.milliToSecs(gallerySlideshowSpeed) + 's');
        },
        slide: function(event, ui) {
          // $('#gallerySlideshowSpeedValue').text(ui.value + 'ms');
          $gallerySpeedSpinner.val(PTL.util.milliToSecs(parseInt(ui.value)));
          $(this).find('.ui-slider-handle').text(PTL.util.milliToSecs(parseInt(ui.value)) + 's');
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
            existingFeeds = JSON.parse(JSON.stringify(PTL.tab.list())),
            reader = new FileReader();

        reader.onload = (function() {
          return function(e) {

            if (PTL.util.isValidJson(e.target.result)) {
              PTL.dialog.importFeeds(existingFeeds, e.target.result);
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
        modal: true,
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        // width: PTL.util.vWidth(),
        // position: {
        //   my: "center",
        //   at: "center",
        //   of: window }
      });

      $.ui.dialog.prototype._init = function() {
        PTL.util.translate();
      };

      const $debugHiddenButton = $('<span>')
            .text('debug')
            .click(function () {
              PTL.dialog.beg();
            });

      // $debugHiddenButton.appendTo('body');

    },
    sideMenu: function(action) {

      const $overlay = $('div#overlay'),
            $sideMenu = $('nav#sideMenu');

      const $lPayAmount = $('a#lPayAmount'),
            $lPayAmountImg = $('a#lPayAmountImg img'),
            $lPayPatrons = $('a#lPayPatrons'),
            $lPayPatronsImg = $('a#lPayPatrons img');

      $lPayAmountImg.attr('src', 'https://img.shields.io/liberapay/receives/yPhil.svg?logo=liberapay');
      $lPayPatronsImg.attr('src', 'https://img.shields.io/liberapay/patrons/yPhil.svg?logo=liberapay');

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
          const discriminantRegExp = /(<.*>)(.*)/;
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
