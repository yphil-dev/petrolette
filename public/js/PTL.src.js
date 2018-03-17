// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.src = {

  add:function($column, url, type, limit, clickNew, progress) {

    var feedIndex = $('#tabs').find('.feed').length;

    var $feedIcon = $('<i>')
        .attr('class', 'source-control feedIcon icon-rss rotate translate')
        .data('title', 'Fold / unfold this source (%1)', url)
        .attr('title', PTL.tr('Fold / unfold this source (%1)', url));

    var $feedSelect = $('<i>')
        .attr('class', 'source-control translate icon-uncheck source-select')
        .data('title', 'Select this source (%1)', url)
        .attr('title', PTL.tr('Select this source (%1)', url));

    var $feedDelete = $('<i>')
        .attr('class', 'source-control translate icon-cancel source-delete dangerous')
        .data('title', 'Delete this source (%1)', url)
        .attr('title', PTL.tr('Delete this source (%1)', url));

    var $feedPrefs = $('<i>')
        .attr('class', 'source-control translate icon-pencil source-edit')
        .data('title', PTL.tr('Change this source (%1) parameters', url))
        .attr('title', PTL.tr('Change this source (%1) parameters', url));

    var $feedReload = $('<i>')
        .attr('class', 'source-control translate icon-arrows-cw source-refresh')
        .data('title', PTL.tr('Refresh this source (%1)', url))
        .attr('title', PTL.tr('Refresh this source (%1)', url));

    var $feedControls = $('<div>').attr('class', 'source-controls dataStore')
        .data('id', 'feed-' + feedIndex)
        .data('index', feedIndex)
        .data('url', url)
        .data('type', type)
        .data('limit', limit);

    $feedIcon.click(function() {
      $(this).toggleClass('down');
      $(this).parent().parent().parent().children('div.source-body').slideToggle(350);
    });

    $feedSelect.click(function() {
      $(this).parent().parent().parent().parent().toggleClass('selected');
      $(this).toggleClass('icon-ok').toggleClass('icon-uncheck');
    });

    $feedDelete.click(function() {
      PTL.dialog.killFeed($(this));
    });

    $feedPrefs.click(function() {
      PTL.dialog.feedPrefs($(this));
    });

    $feedReload.click(function() {
      PTL.src.populate($(this), progress);
    });

    var $feedBody = $('<div>')
        .attr('class', 'source-body');

    var $feedBodyUl = $('<ul>')
        .attr('class', 'source-body');

    var $feed = $('<li>')
        .attr('id', 'feed-' + feedIndex)
        .attr('class', 'feed')
        .data('url', url)
        .data('type', type)
        .data('limit', limit);

    var $header = $('<div>')
        .attr('class', 'source-header');

    var $feedToggle = $('<div>')
        .attr('class', 'source-toggle');

    var $feedHandle = $('<div>')
        .data('title', PTL.tr('Move this source (%1)', url))
        .attr('title', PTL.tr('Move this source (%1)', url))
        .attr('class', 'source-handle');

    var $selectDiv = $('<div>'),
        $deleteDiv = $('<div>'),
        $prefsDiv = $('<div>'),
        $reloadDiv = $('<div>');

    var $titleDiv = $('<div>')
        .attr('title', url)
        .attr('class', 'source-title truncate');

    var $titleLink = $('<a>')
        .attr('href', url)
        .attr('target', '_blank')
        .html(url);

    $feedIcon.appendTo($feedToggle);

    $feedControls.hover (
      function() {
        $(this).find('.collapsible').show('fade', 'fast');
      },
      function() {
        $(this).find('.collapsible').hide('fade', 'slow');
      }
    );

    $header.hover (function() {

      var iconImg = $feedToggle.css('background-image');

      $feedToggle.css('background-image', 'none');

      $feedIcon.addClass('icon-down-big');
      $feedIcon.removeClass('icon-rss');

      $(this).data('img', iconImg);

    },
      function() {

        $feedIcon.removeClass('icon-down-big');

        // $feedIcon.css('background-image', iconImg);


        if ($(this).data('img') !== 'none') {
          $feedToggle.css('background-image', $(this).data('img'));
        } else {
          $feedIcon.addClass('icon-rss');
        }

      });

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

    $feedToggle.appendTo($header);

    $feedHandle.appendTo($header);

    $titleDiv.appendTo($header);

    $prefsDiv.appendTo($feedControls);
    $reloadDiv.appendTo($feedControls);

    $feedControls.appendTo($header);

    $feedBodyUl.appendTo($feedBody);

    $header.appendTo($feed);
    $feedBody.appendTo($feed);

    if (clickNew) {
      $feed.prependTo($column);
      PTL.dialog.feedPrefs($feedPrefs, true);
    } else {
      $feed.appendTo($column);
      $feedReload.click();
    }

  },
  populate:function($button, progress) {

    var $dataStore = $button.parent().parent(),
        $refreshButton = $dataStore.find('i.source-refresh'),
        $header = $dataStore.parent(),
        $panel = $dataStore.parent().parent().parent(),
        $feed = $dataStore.parent().parent(),
        $feedTitle = $feed.children().children('.source-title'),
        $feedLink = $feedTitle.children('a'),
        $feedBody = $feed.children().children('ul.source-body'),
        feedUrl = $dataStore.data('url'),
        feedType = $dataStore.data('type'),
        feedLimit = $dataStore.data('limit'),
        $feedToggle = $feed.find('.source-toggle'),
        $feedIcon = $feed.find('.source-toggle > i');

    var l = PTL.utilities.getLocation(feedUrl),
        feedHost = l.protocol + '//' + l.hostname,
        subdomain = l.hostname.substr(0, l.hostname.indexOf('.'));

    if (!PTL.utilities.isUrl(feedUrl)) {

      console.info('bad URL: (%s)', feedUrl);
      PTL.utilities.console(PTL.tr('Unrecognized URL: %1', feedUrl), 'warning');

      $feedTitle
        .text(PTL.tr("Error"))
        .addClass('translate danger')
        .data('content', PTL.tr("Error"));

      $feedBody
        .html('<li class="source-item"><strong class="translate" data-content="' + PTL.tr("Error") + '">' + PTL.tr("Error") + '</strong> (' + feedUrl + ')</li>');

      return;
    }

    if (subdomain === 'rss' || subdomain === 'feeds') {
      feedHost = l.protocol + '//' + l.hostname.replace(subdomain + '.', '');
    }

    $refreshButton.addClass('spin');
    $feedLink.removeClass('danger');

    $.get("/feedicon", {
      url: decodeURI(feedHost),
      dataType: "json",
      timeout: 2000
    }, function(icon) {

    }).done(function(icon) {

      $feedToggle.css('background-image','url("' + icon + '")');
      $feedIcon.removeClass('icon-rss');
      $header.data('img',icon);

      var img = new Image();

      img.src = icon;

      img.onerror = function() {
        $feedIcon.addClass('icon-rss');
        $feedToggle.css('background-image', 'none');
      };

    }).fail(function() {
      $feedIcon.addClass('icon-rss');
      $feedToggle.css('background-image', 'none');
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

        console.warn('Pétrolette | ' + PTL.tr('Problem reading source [%1] Error type [%2]', feedUrl, data.error));

        var $w3cLink = $('<a>'),
            $validCssIcon = $('<i>');

        $w3cLink.attr('href', 'https://validator.w3.org/feed/check.cgi?url=' + feedUrl);

        $validCssIcon
          .attr('class', 'item-icon icon-w3c')
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
            .attr('class', 'source-item error')
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

        var $imageLink = $('<a>').attr('target', '_blank'),
            $itemLink = $('<a>').attr('target', '_blank'),
            $soundLink = $('<a>').attr('target', '_blank'),
            $commentsLink = $('<a>').attr('target', '_blank'),
            $commentsIcon = $('<i>'),
            $soundIcon = $('<i>'),
            $image = $('<img>');

        var $summary = $('<null>')
            .append(item.summary)
            .text();

        var $itemDiv = $('<div>')
            .attr('class', 'itemDiv'),
            $sourceItem = $('<li>')
            .attr('class', 'source-item')
            .attr('title', $summary.trim());

        if (item.comments) {
          $commentsLink
            .attr('href', item.comments);
          $commentsIcon
            .attr('class', 'item-icon icon-comments')
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

        if (typeof item.enclosures[0] !== 'undefined' && item.enclosures[0].url) {

          imageUrl = item.enclosures[0].url;

          if (item.enclosures[0].url.match(/\.(ogg|mp3)$/)) {

            $soundLink.attr('href', item.enclosures[0].url);

            $soundIcon
              .attr('class', 'item-icon icon-volume');

            $soundIcon.appendTo($soundLink);
            $soundLink.appendTo($itemDiv);
          }
        }

        if (item['media:group']) {
          var myArray = item['media:group']['media:content'];
          for (var i = 0; i < myArray.length; i++) {
            if (myArray[i]['@'].url) {
              imageUrl = myArray[i]['@'].url;
            }
          }
        }

        $itemLink
          .attr('class', 'ui-helper-clearfix source-link')
          .attr('href', item.link)
          .append(item.title);

        if (index % 2 === 0) {
          $sourceItem.addClass('mobFeedEven');
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
        $itemDiv.appendTo($sourceItem);
        $sourceItem.appendTo($feedBody);

      });

    }).fail(function() {
      $refreshButton.removeClass('spin');

      $feedLink
        .text(PTL.tr("Error"))
        .addClass('translate danger')
        .data('content', PTL.tr("Error"));

      $feedBody
        .html('<li class="source-item"><strong class="translate" data-content="' + PTL.tr("Error") + '">' + PTL.tr("Error") + '</strong> (' + feedUrl + ')</li>');

      // WP.tr('add %1', WP.tr('truck') );

    }).always(function() {

      if(progress) {
        progress.increment();
      }

      $refreshButton.removeClass('spin');

    });
  }
};
