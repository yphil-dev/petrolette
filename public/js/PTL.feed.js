// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.feed = {

  add:function($column, url, type, limit, clickNew, isQueryString, progress) {

    var feedIndex = $('#tabs').find('.feed').length;

    var $feed = $('<li>')
        .attr('class', 'feed')
        .data('url', url)
        .data('type', type)
        .data('limit', limit);

    var $feedIcon = $('<i>')
        .attr('class', 'feed-control feedIcon icon-rzz rotate translate')
        .data('title', 'Fold / unfold this feed (%1)', url)
        .attr('title', PTL.tr('Fold / unfold this feed (%1)', url))
        .click(function() {
          $(this).toggleClass('down')
            .parent().parent().parent()
            .children('div.feed-body')
            .slideToggle(350);
        });

    var $selectIcon = $('<i>')
        .attr('class', 'feed-control translate icon-uncheck feed-select')
        .data('title', 'Select this feed (%1)', url)
        .attr('title', PTL.tr('Select this feed (%1)', url))
        .click(function() {
          $(this).parent().parent().parent().parent()
            .toggleClass('selected');
          $(this).toggleClass('icon-ok icon-uncheck');
        });

    var $deleteIcon = $('<i>')
        .attr('class', 'feed-control translate icon-cancel feed-delete')
        .data('title', 'Delete this feed (%1)', url)
        .attr('title', PTL.tr('Delete this feed (%1)', url))
        .click(function() {
          PTL.dialog.killFeed($(this));
        });

    var $prefsIcon = $('<i>')
        .attr('class', 'feed-control translate icon-pencil feed-edit')
        .data('title', PTL.tr('Change this feed (%1) parameters', url))
        .attr('title', PTL.tr('Change this feed (%1) parameters', url))
        .click(function() {
          PTL.dialog.feedPrefs($(this));
        });

    var $reloadIcon = $('<i>')
        .attr('class', 'feed-control translate icon-arrows-cw feed-refresh')
        .data('title', PTL.tr('Refresh this feed (%1)', url))
        .attr('title', PTL.tr('Refresh this feed (%1)', url))
        .click(function() {
          PTL.feed.populate($(this), progress);
        });

    var $feedControls = $('<div>').attr('class', 'feed-controls dataStore')
        .data('index', feedIndex)
        .data('url', url)
        .data('type', type)
        .data('limit', limit);

    var $feedHandle = $('<div>')
        .data('title', PTL.tr('Move this feed (%1)', url))
        .attr('title', PTL.tr('Move this feed (%1)', url))
        .attr('class', 'feed-handle');

    var $feedBody = $('<div>').attr('class', 'feed-body'),
        $feedBodyUl = $('<ul>').attr('class', 'feed-body'),
        $header = $('<div>').attr('class', 'feed-header'),
        $feedToggle = $('<div>').attr('class', 'feed-toggle').append($feedIcon),
        $selectDiv = $('<div>').append($selectIcon),
        $deleteDiv = $('<div>').append($deleteIcon),
        $prefsDiv = $('<div>').append($prefsIcon),
        $reloadDiv = $('<div>').append($reloadIcon);

    var $titleDiv = $('<div>')
        .attr('title', url)
        .attr('class', 'feed-title truncate');

    var $titleLink = $('<a>')
        .attr('href', url)
        .attr('target', '_blank')
        .html(url);

    $feedControls.hover (
      function() {$(this).find('.collapsible').show('fade', 'fast');},
      function() {$(this).find('.collapsible').hide('fade', 'slow');}
    );

    $header.hover (function() {

      var iconImg = $feedToggle.css('background-image');

      $feedToggle.css('background-image', 'none');

      $feedIcon.addClass('icon-down-big').removeClass('icon-rzz');

      $(this).data('img', iconImg);

    }, function() {

      $feedIcon.removeClass('icon-down-big');

      if ($(this).data('img') !== 'none') {
        $feedToggle.css('background-image', $(this).data('img'));
      } else {
        $feedIcon.addClass('icon-rzz');
      }

    });

    if (!PTL.util.isMobile()) {
      $selectDiv.addClass('collapsible');
      $deleteDiv.addClass('collapsible');
      $prefsDiv.addClass('collapsible');

      $feedControls.append($selectDiv, $deleteDiv);
    }

    $header.append($feedToggle,
                   $feedHandle,
                   $titleDiv.append($titleLink),
                   $feedControls.append($prefsDiv, $reloadDiv));

    $feed.append($header, $feedBody.append($feedBodyUl));

    if (clickNew) {
      $feed.prependTo($column);
      PTL.dialog.feedPrefs($prefsIcon, true, isQueryString);
    } else {
      $feed.appendTo($column);
      $reloadIcon.click();
    }

  },
  populate:function($button, progress) {

    var $dataStore = $button.parent().parent(),
        $refreshButton = $dataStore.find('i.feed-refresh'),
        $header = $dataStore.parent(),
        $panel = $dataStore.parent().parent().parent(),
        $feed = $dataStore.parent().parent(),
        $feedTitle = $feed.children().children('.feed-title'),
        $feedLink = $feedTitle.children('a'),
        $feedBody = $feed.children().children('ul.feed-body'),
        feedUrl = $dataStore.data('url'),
        feedType = $dataStore.data('type'),
        feedLimit = $dataStore.data('limit'),
        $feedToggle = $feed.find('.feed-toggle'),
        $feedIcon = $feed.find('.feed-toggle > i');

    var l = PTL.util.getLocation(feedUrl),
        feedProtocol = l.protocol ? l.protocol + '//' : '//',
        feedHost = feedProtocol + l.hostname,
        subdomain = l.hostname.substr(0, l.hostname.indexOf('.'));

    if (subdomain === 'rss' || subdomain === 'feeds') {
      feedHost = l.protocol + '//' + l.hostname.replace(subdomain + '.', '');
    }

    $refreshButton.addClass('spin');
    $feedLink.removeClass('danger');

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

        PTL.util.console(PTL.tr('Problem reading feed [%1] Error type [%2]', feedUrl, data.error), 'warning');

        var $w3cLink = $('<a>'),
            $validCssIcon = $('<i>');

        $validCssIcon
          .attr('class', 'item-icon icon-w3c')
          .attr('titre', PTL.tr('Validate /verify this feed file with the W3C'))
          .appendTo($w3cLink);

        $w3cLink
          .attr('href', 'https://validator.w3.org/feed/check.cgi?url=' + feedUrl)
          .appendTo($feedBody);

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
            .attr('class', 'feed-item error')
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

        $feedIcon.addClass('icon-rzz yowzo');
        $feedToggle.css('background-image', 'none');

        return;

      }

      $.each(data.feedItems, function(index, item) {

        if (index == parseInt(feedLimit)) return false;

        var $description = $.parseHTML(item.description),
            imageUrl;

        var $imageLink = $('<a>').attr('target', '_blank'),
            $itemLink = $('<a>').attr('target', '_blank'),
            $soundLink = $('<a>').attr('target', '_blank'),
            $commentsLink = $('<a>').attr('target', '_blank'),
            $commentsIcon = $('<i>'),
            $soundIcon = $('<i>'),
            $image = $('<img>'),
            $summary = $('<null>').append(item.summary || item.description).text(),
            $itemDiv = $('<div>').attr('class', 'itemDiv'),
            $feedItem = $('<li>').attr('class', 'feed-item').attr('title', $summary.trim());

        if (item.comments) {
          $commentsIcon
            .attr('class', 'item-icon icon-comments')
            .appendTo($commentsLink);

          $commentsLink
            .attr('href', item.comments)
            .appendTo($itemDiv);
        }

        var $tempDom = $('<null>').append($description);

        if (typeof $tempDom.find('span a').attr('href') !== 'undefined') {
          if (PTL.util.isImage($tempDom.find('span a').attr('href'))) {
            imageUrl = $tempDom.find('span a').attr('href');
          }
        }

        if (!imageUrl && typeof $tempDom.find('img').attr('src') !== 'undefined') {
          imageUrl = $tempDom.find('img').attr('src');
        }

        // if (typeof item.image.url !== 'undefined') {
        //   console.log('whoa!: (%s)');
        // }

        if (typeof item.enclosures[0] !== 'undefined' && item.enclosures[0].url) {

          // console.log('enclosures: (%s)', item.enclosures[0].url.match(/\.(jpg|png|jpeg|gif)$/));

          // if (item.enclosures.url.match(/\.(jpg|png|jpeg|gif)$/)) {
          //   imageUrl = item.enclosures.url;
          // }


          if (item.enclosures[0].url.match(/\.(jpg|png|jpeg|gif)$/)) {
            imageUrl = item.enclosures[0].url;
          }

          if (item.enclosures[0].url.match(/\.(ogg|mp3)$/)) {
            $soundLink
              .attr('href', item.enclosures[0].url)
              .appendTo($itemDiv);
            $soundIcon
              .attr('class', 'item-icon icon-volume')
              .appendTo($soundLink);
          }
        }

        if (item['media:group']) {
          var mgmc = item['media:group']['media:content'];
          for (var i = 0; i < mgmc.length; i++) {
            if (mgmc[i]['@'].url) imageUrl = mgmc[i]['@'].url;
          }
        }

        $itemLink
          .attr('class', 'ui-helper-clearfix feed-link')
          .attr('href', item.link)
          .append(item.title);

        if (imageUrl) {

          if (!PTL.util.isUrl(imageUrl)) {
            imageUrl = feedHost + '/' + imageUrl.substring(imageUrl.indexOf("/") + 1);
          }

          $imageLink
            .attr('href', imageUrl)
            .attr('data-fancybox', 'gallery')
            .attr('data-fancybox-group', $panel.attr('id'))
            .attr('data-caption', '<a class="ui-button ui-corner-all" href="' + item.link + '">' + item.title + '</a>');

          $image
            .attr('src', imageUrl)
            .appendTo($imageLink);

          if (!new RegExp('^(?:[a-z]+:)?//', 'i').test(imageUrl)) imageUrl = feedHost + imageUrl;
          if (feedType == 'photo') $image.addClass('full');
          if (feedType !== 'text') $imageLink.appendTo($itemDiv);
        }

        $itemLink.appendTo($itemDiv);
        $itemDiv.appendTo($feedItem);
        $feedItem.appendTo($feedBody);

      });

    }).always(function() {

      if (progress) progress.increment();
      $refreshButton.removeClass('spin');

    });

    $.get("/favicon", {
      url: decodeURI(feedHost),
      dataType: "json"
    }, function() {
      // console.log('feedHost: %s (icon %s)', feedHost, icon);
    }).done(function(icon) {

      $feedToggle.css('background-image','url(' + icon + ')');
      $feedIcon.removeClass('icon-rzz');
      $header.data('img', icon);

    }).fail(function() {
      $feedIcon.addClass('icon-rzz yowzo');
      $feedToggle.css('background-image', 'none');
    });

  }
};
