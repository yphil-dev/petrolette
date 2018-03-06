PTL.feed = {

  make:function($tab, url, type, limit, clickNew, progress) {

    var feedIndex = $('#tabs').find('.feed').length;

    var $feedToggle = $('<i>')
        .attr('class', 'feedIcon rotate translate')
        .data('title', 'Fold / unfold this source (%1)', url)
        .attr('title', PTL.tr('Fold / unfold this source (%1)', url));

    var $feedSelect = $('<i>')
        .attr('class', 'feedControl translate icon-uncheck feedSelect')
        .data('title', 'Select this source (%1)', url)
        .attr('title', PTL.tr('Select this source (%1)', url));

    var $feedDelete = $('<i>')
        .attr('class', 'feedControl translate icon-cancel feedDelete dangerous')
        .data('title', 'Delete this source (%1)', url)
        .attr('title', PTL.tr('Delete this source (%1)', url));

    var $feedPrefs = $('<i>')
        .attr('class', 'feedControl translate icon-pencil mobFeedPrefs')
        .data('title', PTL.tr('Change this source (%1) parameters', url))
        .attr('title', PTL.tr('Change this source (%1) parameters', url));

    var $feedReload = $('<i>')
        .attr('class', 'feedControl translate icon-arrows-cw mobFeedRefresh')
        .data('title', PTL.tr('Refresh this source (%1)', url))
        .attr('title', PTL.tr('Refresh this source (%1)', url));

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
      $(this).parent().parent().parent().parent().toggleClass('selected');
      $(this).toggleClass('icon-ok').toggleClass('icon-uncheck');
    });

    $feedDelete.click(function() {

      var feedId = $(this).parent().parent().parent().parent().attr('id');
      var feedName = $(this).parent().parent().parent().find('.feedTitle').text();

      PTL.dialog.killFeed(feedId, feedName);

    });

    $feedPrefs.click(function() {
      PTL.dialog.feedPrefs($(this));
    });

    $feedReload.click(function() {
      PTL.feed.populate($(this), progress);
    });

    var $feedBody = $('<div>')
        .attr('class', 'feedBody');

    var $feedBodyUl = $('<ul>')
        .attr('class', 'feedBody');

    var $feed = $('<li>')
        .attr('id', 'feed-' + feedIndex)
        .attr('class', 'feed no-fouc')
        .data('url', url)
        .data('type', type)
        .data('limit', limit);

    var $header = $('<div class="mobHeader ui-widget-header">');
    var $toggleDiv = $('<div class="feedToggle">');
    var $myControlsToggleDiv = $('<div class="myControlsToggleDiv">');

    var $feedHandle = $('<div>')
        .data('title', PTL.tr('Move this source (%1)', url))
        .attr('title', PTL.tr('Move this source (%1)', url))
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
        .attr('target', '_blank')
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

        $feedToggle.css('background-image', 'none');

        $feedToggle.addClass('icon-down-big');

        console.log('iconImg: ', iconImg);

        $(this).data('img',iconImg);

      },
      function() {

        $feedToggle.removeClass('icon-down-big');

        // $feedToggle.css('background-image', iconImg);

        if (typeof $(this).data('img') !== 'undefined') {
          $feedToggle.css('background-image', $(this).data('img'));
        } else {
          $feedToggle.addClass('generic');
        }
      }
    );

    if (!PTL.utilities.isMobile()) {
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
      PTL.dialog.feedPrefs($feedPrefs, true);
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

    var l = PTL.utilities.getLocation(feedUrl),
        feedHost = l.protocol + '//' + l.hostname,
        subdomain = l.hostname.substr(0, l.hostname.indexOf('.'));

    if (feedUrl.indexOf('http') !== 0) {

      console.info('bad URL: (%s)', feedUrl);

      $feedTitle
        .text(PTL.tr("Error"))
        .addClass('translate danger')
        .data('content', PTL.tr("Error"));

      $feedBody
        .html('<li class="feedItem"><strong class="translate" data-content="' + PTL.tr("Error") + '">' + PTL.tr("Error") + '</strong> (' + feedUrl + ')</li>');

      return;
    }

    if (subdomain === 'rss' || subdomain === 'feeds') {
      feedHost = l.protocol + '//' + l.hostname.replace(subdomain + '.', '')
    }

    $refreshButton.addClass('spin');
    $feedLink.removeClass('danger');

    $.get("/feedicon", {
      url: decodeURI(feedHost),
      dataType: "json",
      timeout: 2000
    }, function(icon) {

      if ( !icon || icon.length === 0) icon = '/static/images/feed-generic-rss.png';

    }).done(function(icon) {

      $feedIcon.css('background-image','url("' + icon + '")');
      $header.data('img',icon);

      var img = new Image();

      img.src = icon;

      img.onerror = function() {
        $feedIcon.css('background-image','url("/static/images/feed-generic-rss.png")');
      };

    }).fail(function() {
      $feedIcon.css('background-image','url("/static/images/feed-generic-rss.png")');
    });

    $.get("/feed", {
      feedurl: feedUrl,
      dataType: 'json'
    }, function() {

      $feedBody.empty();

    }).done(function(data) {

      $feedLink.text(data.feedTitle || feedUrl)
        .attr('href', data.feedLink)
        .attr('title', (data.feedTitle || PTL.tr('Untitled')) + ' (' + feedUrl + ')');

      if (data.error) {
        console.info('Pétrolette | bad Feed: (%s) error: [%s]', feedUrl, data.error);

        var $w3cLink = $('<a>'),
            $validCssIcon = $('<i>');

        $w3cLink.attr('href', 'https://validator.w3.org/feed/check.cgi?url=' + feedUrl);

        $validCssIcon
          .attr('class', 'feedItemSmallIcon icon-w3c')
          .attr('titre', PTL.tr('Validate /verify this source file with the W3C'));

        $validCssIcon.appendTo($w3cLink);
        $w3cLink.appendTo($feedBody);

        $feedLink
          .text(PTL.tr('Error'))
          .addClass('translate danger')
          .data('content', PTL.tr('Error'));

        var $errorTitle = $('<strong>')
            .attr('class', 'translate key')
            .data('content', PTL.tr('Error'))
            .text(PTL.tr('Error'));

        var $key = $('<strong>')
            .attr('class', 'translate key')
            .data('content', PTL.tr('Type'))
            .text(PTL.tr('Type'));

        var $value = $('<strong>')
            .attr('class', 'value')
            .text(data.error);

        var $errorLink = $('<a>')
            .attr('href', feedUrl)
            .text(feedUrl);

        var $validateLink = $('<a>')
            .attr('href', 'https://validator.w3.org/feed/check.cgi?url=' + feedUrl)
            .text(PTL.tr('validate'));

        var $errorItem = $('<li>')
            .attr('class', 'feedItem error')
            .append($errorTitle)
            .append('&nbsp;')
            .append($errorLink)
            .append('&nbsp; (')
            .append($validateLink)
            .append(')<br/>')
            .append($key)
            .append('&nbsp;')
            .append($value);

        $feedBody
          .append($errorItem);

        return;

      }

      $.each(data.feedItems, function(index, item) {

        if (index == parseInt(feedLimit)) {
          return false;
        }

        var $description = $.parseHTML(item.description);

        var imageUrl;

        var $imageLink = $('<a>'),
            $itemLink = $('<a>'),
            $soundLink = $('<a>'),
            $commentsLink = $('<a>'),
            $commentsIcon = $('<i>'),
            $soundIcon = $('<i>'),
            $image = $('<img>');

        var $summary = $('<null>')
            .append(item.summary)
            .text();

        var $itemDiv = $('<div>')
            .attr('class', 'itemDiv'),
            $feedItem = $('<li>')
            .attr('class', 'feedItem')
            .attr('title', $summary.trim());

        if (item.comments) {
          $commentsLink
            .attr('href', item.comments);
          $commentsIcon
            .attr('class', 'feedItemSmallIcon icon-comments')
            .appendTo($commentsLink);
          $commentsLink.appendTo($itemDiv);
        }

        var $tempDom = $('<null>').append($description);

        if (typeof $tempDom.find('span a').attr('href') !== 'undefined') {
          if (PTL.utilities.isImage($tempDom.find('span a').attr('href'))) {
            imageUrl = $tempDom.find('span a').attr('href');
          }
        }

        if (!imageUrl && typeof $tempDom.find('img').attr('src') !== 'undefined') {
          imageUrl = $tempDom.find('img').attr('src');
        }

        if (typeof item.image.url !== 'undefined') {
          imageUrl = item.image.url;
        }

        if (item.enclosures[0]) {

          imageUrl = item.enclosures[0].url;

          if (item.enclosures[0].url.match(/\.(ogg|mp3)$/)) {

            $soundLink.attr('href', item.enclosures[0].url);

            $soundIcon
              .attr('class', 'feedItemSmallIcon icon-volume');

            $soundIcon.appendTo($soundLink);
            $soundLink.appendTo($itemDiv);
          }
        }

        if (item['media:group']) {
          var myArray = item['media:group']['media:content'];
          for (var i = 0; i < myArray.length; i++) {
            if (myArray[i]['@'].url) {
              console.log('media:group! (%s)', feedUrl);
              imageUrl = myArray[i]['@'].url;
            }
          }
        }

        $itemLink
          .attr('target', '_blank')
          .attr('class', 'ui-helper-clearfix')
          .attr('href', item.link)
          .append(item.title);

        if (index % 2 === 0) {
          $feedItem.addClass('mobFeedEven');
        }

        if (imageUrl) {

          if (imageUrl[0] == "/") {
            imageUrl = feedHost + imageUrl;
          }

          $imageLink
            .attr('href', imageUrl);

          $imageLink
            .attr('data-fancybox', 'gallery')
            .attr('data-fancybox-group', $panel.attr('id'))
            .attr('data-caption', item.title);

          $image
            .attr('src', imageUrl);

          $image.appendTo($imageLink);

          if (feedType == 'photo')
            $image.addClass('full');

          if (feedType !== 'text')
            $imageLink.appendTo($itemDiv);

        }

        $itemLink.appendTo($itemDiv);
        $itemDiv.appendTo($feedItem);
        $feedItem.appendTo($feedBody);

      });

    }).fail(function() {
      $refreshButton.removeClass('spin');

      $feedLink
        .text(PTL.tr("Error"))
        .addClass('translate danger')
        .data('content', PTL.tr("Error"));

      $feedBody
        .html('<li class="feedItem"><strong class="translate" data-content="' + PTL.tr("Error") + '">' + PTL.tr("Error") + '</strong> (' + feedUrl + ')</li>');

      // WP.tr('add %1', WP.tr('truck') );

    }).always(function() {

      if(progress) {
        progress.increment();
      }

      $refreshButton.removeClass('spin');

    });
  }
};
