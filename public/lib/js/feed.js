MOB.feed = {

  make:function($tab, url, type, limit, clickNew, progress) {

    var feedIndex = $('#tabs').find('.feed').length;

    var $feedToggle = $('<i>')
        .attr('class', 'feedIcon rotate translate')
        .data('title', 'Fold / unfold this source (%1)', url)
        .attr('title', MOB.tr('Fold / unfold this source (%1)', url));

    var $feedSelect = $('<i>')
        .attr('class', 'feedControl translate icon-check-empty-1 feedSelect')
        .data('title', 'Select this source (%1)', url)
        .attr('title', MOB.tr('Select this source (%1)', url));

    var $feedDelete = $('<i>')
        .attr('class', 'feedControl translate icon-cancel feedDelete dangerous')
        .data('title', 'Delete this source (%1)', url)
        .attr('title', MOB.tr('Delete this source (%1)', url));

    var $feedPrefs = $('<i>')
        .attr('class', 'feedControl translate icon-wrench-1 mobFeedPrefs')
        .data('title', MOB.tr('Change this source (%1) parameters', url))
        .attr('title', MOB.tr('Change this source (%1) parameters', url));

    var $feedReload = $('<i>')
        .attr('class', 'feedControl translate icon-arrows-cw mobFeedRefresh')
        .data('title', MOB.tr('Refresh this source (%1)', url))
        .attr('title', MOB.tr('Refresh this source (%1)', url));

    var $feedControls = $('<div>').attr('class', 'feedControls dataStore')
        .data('id', 'feed-' + feedIndex)
        .data('index', feedIndex)
        .data('url', url)
        .data('type', type)
        .data('limit', limit);

    $feedToggle.click(function() {
      $(this).toggleClass('down');
      $(this).parent().parent().parent().children('div.feedBody').slideToggle(200);
    });

    $feedSelect.click(function() {
      $(this).parent().parent().parent().parent().toggleClass('selected ui-state-hover');
      $(this).toggleClass('icon-ok').toggleClass('icon-check-empty-1');
    });

    $feedDelete.click(function() {

      var feedId = $(this).parent().parent().parent().parent().attr('id');
      var feedName = $(this).parent().parent().parent().find('.feedTitle').text();

      MOB.dialog.killFeed(feedId, feedName);

    });

    $feedPrefs.click(function() {
      MOB.dialog.feedPrefs($(this));
    });

    $feedReload.click(function() {
      MOB.feed.populate($(this), progress);
    });

    var $feedBody = $('<div>')
        .attr('class', 'feedBody ui-widget-content');

    var $feedBodyUl = $('<ul>')
        .attr('class', 'feedBody');

    var $feed = $('<li>')
        .attr('id', 'feed-' + feedIndex)
        .attr('class', 'feed no-fouc ui-widget')
        .data('url', url)
        .data('type', type)
        .data('limit', limit);

    var $header = $('<div class="mobHeader ui-widget-header">');
    var $toggleDiv = $('<div class="feedToggle">');
    var $myControlsToggleDiv = $('<div class="myControlsToggleDiv">');

    var $feedHandle = $('<div>')
        .data('title', MOB.tr('Move this source (%1)', url))
        .attr('title', MOB.tr('Move this source (%1)', url))
        .attr('class', 'feedHandle');

    var $selectDiv = $('<div>')
        .attr('class', 'feedSelect');

    var $deleteDiv = $('<div>')
        .attr('class', 'feedDelete');

    var $titleDiv = $('<div>')
        .attr('title', url)
        .attr('class', 'feedTitle truncate');

    var $titleLink = $('<a>')
        .attr('href', url)
        .html(url);

    var $prefsDiv = $('<div>')
        .attr('class', 'prefs');

    var $reloadDiv = $('<div class="reload" title="Click to reload ' + url + '">');

    $feedToggle.appendTo($toggleDiv);

    $myControlsToggleDiv.click(function() {

      var $controls = $(this).next();

      $('.feedControls').not($controls).removeClass('flexGrow');
      $controls.toggleClass('flexGrow');

      $(this).toggleClass('open');

    });

    $feedControls.hover (
      function() {
        $(this).find('.collapsible').show('fade', 'fast');
      },
      function() {
        $(this).find('.collapsible').hide('fade', 'slow');
      }
    );

    $header.hover (
      function() {

        var iconImg = $feedToggle.css('background-image');

        $feedToggle.addClass('feedToggleArrow');

        $(this).data('img',iconImg);

      },
      function() {

        $feedToggle.removeClass('feedToggleArrow');

        if (typeof $(this).data('img') !== 'undefined') {
          $feedToggle.css('background-image', $(this).data('img'));
        } else {
          $feedToggle.addClass('generic');
        }
      }
    );

    if (!MOB.utilities.isMobile()) {
      $selectDiv.addClass('collapsible');
      $deleteDiv.addClass('collapsible');
      $prefsDiv.addClass('collapsible');
      $selectDiv.appendTo($feedControls);
      $deleteDiv.appendTo($feedControls);
    }

    $feedSelect.appendTo($selectDiv);
    $feedDelete.appendTo($deleteDiv);
    $titleLink.appendTo($titleDiv);
    // $titleDiv.html(url);
    $feedPrefs.appendTo($prefsDiv);
    $feedReload.appendTo($reloadDiv);

    $toggleDiv.appendTo($header);

    $feedHandle.appendTo($header);

    $titleDiv.appendTo($header);

    $prefsDiv.appendTo($feedControls);
    $reloadDiv.appendTo($feedControls);

    $feedControls.appendTo($header);

    $feedBodyUl.appendTo($feedBody);

    $header.appendTo($feed);
    $feedBody.appendTo($feed);

    if (clickNew) {
      $feed.prependTo($tab);
      MOB.dialog.feedPrefs($feedPrefs, true);
    } else {
      $feed.appendTo($tab);
      $feedReload.click();
    }

  },
  populate:function($button, progress) {

    var $dataStore = $button.parent().parent(),
        $refreshButton = $dataStore.find('i.mobFeedRefresh'),
        $header = $dataStore.parent(),
        $panel = $dataStore.parent().parent().parent(),
        $feed = $dataStore.parent().parent(),
        $feedTitle = $feed.children().children('.feedTitle'),
        $feedLink = $feedTitle.children('a'),
        $feedBody = $feed.children().children('ul.feedBody'),
        feedUrl = $dataStore.data('url'),
        feedType = $dataStore.data('type'),
        feedLimit = $dataStore.data('limit'),
        $feedIcon = $feed.find('.feedToggle > i');

    if (feedUrl.indexOf('http') !== 0) {

      console.info('bad URL: (%s)', feedUrl);
      $header.addClass('ui-state-error');

      $feedTitle
        .text(MOB.tr("Error"))
        .addClass('translate')
        .data('content', MOB.tr("Error"));

      $feedBody
        .html('<li class="feedItem"><strong class="translate" data-content="' + MOB.tr("Error") + '">' + MOB.tr("Error") + '</strong> (' + feedUrl + ')</li>');

      return;
    }

    var l = MOB.utilities.getLocation(feedUrl);

    var feedHost = l.protocol + '//' + l.hostname;

    const subdomain = l.hostname.substr(0, l.hostname.indexOf('.'));

    if (subdomain === 'rss' || subdomain === 'feeds') {
      feedHost = l.protocol + '//' + l.hostname.replace(subdomain + '.', '')
    }

    $refreshButton.addClass('spin');
    $feed.children('.mobHeader').removeClass('ui-state-error');

    $.get("/feedicon", {
      url: decodeURI(feedHost),
      dataType: "json",
      timeout: 2000
    }, function(icon) {

      if ( !icon || icon.length === 0) icon = '/static/images/feed-generic-rss.png';

    }).done(function(icon) {
      // console.log( 'DONE %s OK (status %s)',  icon, status);
      $feedIcon.css('background-image','url("' + icon + '")');
      $header.data('img',icon);

      var img = new Image();

      img.src = icon;

      img.onerror = function() {
        $feedIcon.css('background-image','url("/static/images/feed-generic-rss.png")');
      };


    }).fail(function(icon, status) {
      // console.info('Bad favicon: %s (status: %s)', feedHost, status);
      $feedIcon.css('background-image','url("/static/images/feed-generic-rss.png")');
    }).always(function() {

    });

    $.get("/feed", {
      feedurl: feedUrl,
      dataType: 'json'
    }, function() {

      $feedBody.empty();

    }).done(function(data) {

      console.log('data.feedLink:', $feedTitle.text());

      $feedLink.text(data.feedTitle)
        .attr('href', data.feedLink)
        .attr('title', (data.feedTitle || MOB.tr('Error')) + ' (' + feedUrl + ')');
      // $feedTitle.text(data.feedTitle);

      if (data.error) {
        console.info('Pétrolette | bad Feed: (%s) error: [%s]', feedUrl, data.error);
        $header.addClass('ui-state-error');

        $feedTitle
          .text(MOB.tr('Error'))
          .addClass('translate')
          .data('content', MOB.tr('Error'));

        var $errorTitle = $('<strong>')
            .attr('class', 'translate')
            .data('content', MOB.tr('Error'))
            .text(MOB.tr('Error'));

        var $typeTitle = $('<strong>')
            .attr('class', 'translate')
            .data('content', MOB.tr('Type'))
            .text(MOB.tr('Type'));

        var $errorLink = $('<a>')
            .attr('href', feedUrl)
            .text(feedUrl);

        var $validateLink = $('<a>')
            .attr('href', 'https://validator.w3.org/feed/check.cgi?url=' + feedUrl)            .text(MOB.tr('validate'));

        var $error = $('<span>')
            .text(feedUrl);

        var $type = $('<strong>')
            .text(data.error);

        var $errorItem = $('<li>')
            .attr('class', 'feedItem error')
            .append($errorTitle)
            .append('&nbsp;')
            .append($errorLink)
            .append('&nbsp; (')
            .append($validateLink)
            .append(')<br/>')
            .append($typeTitle)
            .append('&nbsp;')
            .append($type);

        $feedBody
          .append($errorItem);

        return;

      }

      $.each(data.feedItems, function(index, item) {

        if (index == parseInt(feedLimit)) {
          return false;
        }

        var $description = $.parseHTML(item.description);

        var mediaUrl;

        var $tempDom = $('<output>').append($description);

        if (typeof $tempDom.find('span a').attr('href') !== 'undefined') {
          if (MOB.utilities.isImage($tempDom.find('span a').attr('href'))) {
            mediaUrl = $tempDom.find('span a').attr('href');
          }
        }

        if (!mediaUrl && typeof $tempDom.find('img').attr('src') !== 'undefined') {
          mediaUrl = $tempDom.find('img').attr('src');
        }

        if (typeof item.image.url !== 'undefined') {
          mediaUrl = item.image.url;
        } else if (item.enclosures[0]) {
          mediaUrl = item.enclosures[0].url;
        }

        if (item['media:group']) {
          var myArray = item['media:group']['media:content'];
          for (var i = 0; i < myArray.length; i++) {
            if (myArray[i]['@'].url) {
              mediaUrl = myArray[i]['@'].url;
            }
          }
        }

        var summary = $('<p>').append(item.summary).text();

        var $feedItem = $('<li class="feedItem">').attr('title', summary.trim());
        var $itemDiv = $('<div class="feedItem">');

        var $itemLink = $('<a>')
            .attr('target', '_blank')
            .attr('class', 'ui-helper-clearfix')
            .attr('href', item.link)
            .append(item.title);

        var $itemSpan = $('<span>')
            .attr('class', 'truncate ui-helper-clearfix')
            .text(summary.trim());

        if (index % 2 === 0) {
          $feedItem.addClass('mobFeedEven');
        }

        if (mediaUrl && mediaUrl !== 'null' && typeof mediaUrl !== 'undefined' && mediaUrl[0] == "/") {
          mediaUrl = feedHost + mediaUrl;
        }

        var $mediaLink;
        var $itemMedia;

        if (mediaUrl && mediaUrl !== 'null' && typeof mediaUrl !== 'undefined') {

          $mediaLink = $('<a>')
            .attr('href', mediaUrl);

          if (mediaUrl.match(/\.ogg$/) || mediaUrl.match(/\.mp3$/)) {

            $itemMedia = $('<i>')
              .attr('class', 'media icon-volume-down')
              .css('float', 'right');

          } else {

            $mediaLink
              .attr('data-fancybox', 'gallery')
              .attr('data-fancybox-group', $panel.attr('id'))
              .attr('data-caption', item.title);

            $itemMedia = $('<img>').attr('src', mediaUrl);

          }

          $itemMedia.appendTo($mediaLink);

          // $itemMedia = $('<img>').attr('src', mediaUrl)
          //   .appendTo($mediaLink);

          if (feedType == 'photo')
            $itemMedia.addClass('full');

          if (feedType !== 'text')
            $mediaLink.appendTo($itemDiv);
        }

        // $itemSpan.appendTo($itemLink);
        $itemLink.appendTo($itemDiv);
        // $itemSpan.appendTo($itemDiv);
        $itemDiv.appendTo($feedItem);
        $feedItem.appendTo($feedBody);

      });


    }).fail(function() {
      $refreshButton.removeClass('spin');

      // console.log( "error" );
      $header.addClass('ui-state-error');

      $feedTitle
        .text(MOB.tr("Error"))
        .addClass('translate')
        .data('content', MOB.tr("Error"));

      $feedBody
        .html('<li class="feedItem"><strong class="translate" data-content="' + MOB.tr("Error") + '">' + MOB.tr("Error") + '</strong> (' + feedUrl + ')</li>');

      // WP.tr('add %1', WP.tr('truck') );

    }).always(function() {

      if(progress) {
        progress.increment();
      }

      $refreshButton.removeClass('spin');

    });
  }
};
