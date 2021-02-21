// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.feed = {

  add:function($column, url, type, limit, status, clickNew, isQueryString, progress) {

    var feedIndex = $('#tabs').find('.feed').length;

    var $feed = $('<li>')
        .attr('class', 'feed')
        .data('url', url)
        .data('type', type)
        .data('limit', limit);

    var $feedIcon = $('<i>')
        .attr('class', 'feed-control feedIcon icon-rss translate')
        .data('title', 'Fold / unfold this feed (%1)', url)
        .attr('title', PTL.tr('Fold / unfold this feed (%1)', url))
        .click(function() {

          // Can't just use toggle because we have to pass the div to populate() in order to recreate it with the new data values, just setting data-* here doesn't work :(

          if ($feedControls.data('status') == 'on') {
            $(this).removeClass('fold')
              .parent().parent().parent()
              .children('div.feed-body')
              .slideUp(350);
            $feedControls.data('status', 'off');
            $reloadIcon.removeClass('icon-refresh')
              .addClass('icon-pin');
          } else {
            $(this).addClass('fold')
              .parent().parent().parent()
              .children('div.feed-body')
              .slideDown(350);
            $feedControls.data('status', 'on');
            $reloadIcon.removeClass('icon-pin')
              .addClass('icon-refresh');
          }

          PTL.tab.saveTabs();
          PTL.feed.populate($reloadIcon);

        });

    var $selectIcon = $('<i>')
        .attr('class', 'feed-control translate icon-checkbox feed-select')
        .data('title', 'Select this feed (%1)', url)
        .attr('title', PTL.tr('Select this feed (%1)', url))
        .click(function() {
          $(this).parent().parent().parent().parent()
            .toggleClass('selected');
          $(this).toggleClass('icon-checked icon-checkbox');
        });

    var $deleteIcon = $('<i>')
        .attr('class', 'feed-control translate icon-cancel feed-delete')
        .data('title', 'Delete this feed (%1)', url)
        .attr('title', PTL.tr('Delete this feed (%1)', url))
        .click(function() {
          PTL.dialog.killFeed($(this));
        });

    var $prefsIcon = $('<i>')
        .attr('class', 'feed-control translate icon-cog feed-edit')
        .data('title', PTL.tr('Modify this feed (%1) parameters', url))
        .attr('title', PTL.tr('Modify this feed (%1) parameters', url))
        .click(function() {
          PTL.dialog.feedPrefs($(this));
        });

    var $reloadIcon = $('<i>')
        .attr('class', 'feed-control translate icon-refresh feed-refresh')
        .data('title', PTL.tr('Refresh this feed (%1)', url))
        .attr('title', PTL.tr('Refresh this feed (%1)', url))
        .click(function() {
          PTL.feed.populate($(this), progress);
        });

    var $feedControls = $('<div>').attr('class', 'feed-controls dataStore')
        .data('index', feedIndex)
        .data('url', url)
        .data('type', type)
        .data('limit', limit)
        .data('status', status);

    if ($feedControls.data('status') == 'on') {
      $reloadIcon.removeClass('icon-pin')
        .addClass('icon-refresh');
    } else {
      $reloadIcon.removeClass('icon-refresh')
        .addClass('icon-pin');
    }

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

    // const feedUrlHost = new URL(url).host;

    var $titleDiv = $('<div>')
        .attr('title', url)
        .attr('class', 'feed-title trucate');

    var $titleLink = $('<a>')
        .attr('href', url)
        .attr('target', '_blank')
        .html(url);

    $feedControls.hover (
      function() {$(this).find('.collapsible').show();},
      function() {$(this).find('.collapsible').hide('fade', 'fast');}
    );

    $header.hover (function() {

      var iconImg = $feedToggle.css('background-image');
      $feedToggle.css('background-image', 'none');

      $feedIcon.removeClass('icon-rss').addClass('icon-down');

      $(this).data('img', iconImg);

    }, function() {

      $feedIcon.removeClass('icon-down');

      if ($(this).data('img') !== 'none') {
        $feedToggle.css('background-image', $(this).data('img'));
      } else {
        $feedIcon.addClass('icon-rss');
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
            feedStatus = $dataStore.data('status'),
            $feedToggle = $feed.find('.feed-toggle'),
            $feedIcon = $feed.find('.feed-toggle > i');

      var l = PTL.util.getLocation(feedUrl),
          feedProtocol = l.protocol ? l.protocol + '//' : '//',
          feedHost = feedProtocol + l.hostname,
          dateObj = new Date(),
          timeStamp = dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds(),
          subdomain = l.hostname.substr(0, l.hostname.indexOf('.'));

      if (subdomain === 'rss' || subdomain === 'feeds') {
        feedHost = l.protocol + '//' + l.hostname.replace(subdomain + '.', '');
      }

      $feedIcon.addClass('fold');
      $button.removeClass('spin');

      if ($dataStore.data('status') == 'on') {

        $feedIcon.removeClass('fold');

        $refreshButton.addClass('spin');
        $feedLink.removeClass('danger');

        $.get("/feed", {
        feedurl: feedUrl,
        dataType: 'json'
        }, function() {

          $feedBody.empty();

        }).fail(function(error) {
            PTL.util.console(PTL.tr('Problem reading feed [%1] Error type [%2]', feedUrl, error), 'error');
        }).done(function(data) {

          $feedLink.text(data.feedTitle || feedUrl)
            .attr('href', data.feedLink)
            .attr('title', (data.feedTitle || PTL.tr('Untitled')) + ' (' + feedUrl + ')');

          if (data.error || data.feedItems.length == 0) {

            var message = data.error.code ? data.error.code : PTL.tr('Empty feed');

            PTL.util.console(PTL.tr('Problem reading feed [%1] Error type [%2]', feedUrl, message), 'warning');

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

            var $key = $('<strong>')
                .attr('class', 'translate key')
                .data('content', PTL.tr('Type'))
                .text(PTL.tr('Type'));

            var $value = $('<strong>')
                .attr('class', 'value')
                .text(message);

            var $errorLink = $('<a>')
                .attr('href', feedUrl)
                .text(feedUrl);

            var $validateLink = $('<a>')
                .attr('href', 'https://validator.w3.org/feed/check.cgi?url=' + feedUrl)
                .text(PTL.tr('validate'));

            var $errorItem = $('<li>')
                .attr('class', 'feed-item error')
                .append($errorLink)
                .append('&nbsp; (')
                .append($validateLink)
                .append(')<br/>')
                .append($key)
                .append('&nbsp;')
                .append($value);

            $feedBody
              .append($errorItem);

            $feedIcon.addClass('icon-rss');
            $feedToggle.css('background-image', 'none');

            return;

          } else {

            $.get("/favicon", {
              url: decodeURI(feedHost),
              dataType: "json"
            }, function() {
              // console.log('feedHost: %s (icon %s)', feedHost, icon);
            }).done(function(icon) {

              $feedToggle.css('background-image','url(' + icon + ')');
              $feedIcon.removeClass('icon-rss');
              $header.data('img', icon);

            }).fail(function() {
              $feedIcon.addClass('icon-rss');
              $feedToggle.css('background-image', 'none');
            });

          }

            $.each(data.feedItems, function(index, item) {

                if (index == parseInt(feedLimit)) return false;

              // console.log('i: (%s)', JSON.stringify(item));

              var $description = $.parseHTML(item.description),
                  summary,
                  imageUrl,
                  imageUrls = [],
                  imgTypes = ['image',
                              'image/jpg',
                              'image/jpeg',
                              'image/gif',
                              'image/png'];

              if (item.summary && typeof item.summary !== 'undefined') {
                summary = item.summary;
              }

              if (item.description && typeof item.description !== 'undefined'){
                summary = item.description;
              }

              if (item['media:group']) {
                if (item['media:group']['media:description']) {
                  summary = item['media:group']['media:description']["#"];
                }
              }

              var $imageLink = $('<a>').attr('target', '_blank'),
                  $itemLink = $('<a>').attr('target', '_blank'),
                  $soundLink = $('<a>').attr('target', '_blank'),
                  $commentsLink = $('<a>').attr('target', '_blank'),
                  $commentsIcon = $('<i>'),
                  $soundIcon = $('<i>'),
                  $image,
                  $summary = $('<null>').append(PTL.util.sanitizeInput(summary)).text(),
                  $itemDiv = $('<div>').attr('class', 'itemDiv'),
                  $feedItem = $('<li>').attr('class', 'feed-item');

              if (summary && typeof summary !== 'undefined') {
                $feedItem.attr('title', $summary.trim());
              }

              if (item.comments) {
                $commentsIcon
                  .attr('class', 'item-icon icon-comments')
                  .appendTo($commentsLink);

                $commentsLink
                  .attr('href', item.comments)
                  .appendTo($itemDiv);
              }

              var $tempDom = $('<null>').append($description);

              if (item['mastodon:scope']) {
                if (item['activity:object']) {
                  var links = item['activity:object'].link;
                  for (var i = 0, len = links.length; i < len; i++) {
                    if (imgTypes.indexOf(links[i]['@'].type) > -1) {
                      imageUrl = links[i]['@'].href;
                      imageUrls.push(links[i]['@'].href);
                    }
                  }
                }
              }

              if (!imageUrl && item.image && typeof item.image.url !== 'undefined') {
                imageUrl = item.image.url;
              }

              if (!imageUrl && typeof $tempDom.find('span a').attr('href') !== 'undefined') {
                if (PTL.util.isImage($tempDom.find('span a').attr('href'))) {
                  imageUrl = $tempDom.find('span a').attr('href');
                }
              }

              if (!imageUrl && typeof $tempDom.find('img').attr('src') !== 'undefined') {
                imageUrl = $tempDom.find('img').attr('src');
                if (typeof $tempDom.find('img').attr('title') !== 'undefined') {
                  // XKCD summary in the title of the description XML tag
                  $feedItem.attr('title', $tempDom.find('img').attr('title'));
                }
              }

              if (item.enclosures && typeof item.enclosures[0] !== 'undefined' && item.enclosures[0].url) {

                if (item.enclosures[0].url && item.enclosures[0].url.endsWith(".jpg")) {
                  imageUrl = item.enclosures[0].url;
                }

                if (imgTypes.indexOf(item.enclosures[0].type) > -1) {
                  imageUrl = item.enclosures[0].url;
                }

                if (item.enclosures[0].url.match(/\.(ogg|mp3|mp4)$/)) {
                  $soundLink
                    .attr('href', item.enclosures[0].url)
                    .appendTo($itemDiv);
                  $soundIcon
                    .attr('class', 'item-icon icon-audio')
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
                .attr('href', item.link || item.enclosures[0].url)
                .append(item['mastodon:scope'] ? $summary.trim() : item.title);

              if (imageUrls && imageUrls.length >= 1) {

                console.log('imageUrls.length: %s (%s)',imageUrls.length);

                $image = $('<div>')
                  .attr('class', 'ptl-img')
                  .appendTo($imageLink);

                for (var i = 0, len = imageUrls.length; i < len; i++) {

                  $('<a>')
                    .attr('href', imageUrls[i])
                    .attr('data-fancybox', 'gallery')
                    .attr('data-caption', '<a class="ui-button ui-corner-all" href="' + item.link + '">' + $summary.trim() + '</a>')
                    .appendTo($image)
                    .append($('<img>')
                            .attr('src', imageUrls[i])
                            .attr('alt', item['mastodon:scope'] ? $summary.trim() : item.title)
                            .appendTo($image));
                }

              } else if (imageUrl && typeof imageUrl !== 'undefined' && !imageUrl.includes('pixel')) {

                if (!PTL.util.isUrl(imageUrl)) imageUrl = feedHost + '/' + imageUrl.substring(imageUrl.indexOf("/") + 1);

                $imageLink
                  .attr('href', imageUrl)
                  .attr('data-fancybox', 'gallery')
                  .attr('data-caption', '<a class="ui-button ui-corner-all" href="' + item.link + '">' + item.title + '</a>');

                $image = $('<img>')
                  .attr('src', imageUrl)
                  .attr('alt', item['mastodon:scope'] ? $summary.trim() : item.title)
                  .attr('class', 'ptl-img b-lazy')
                  .appendTo($imageLink);

                if (PTL.prefs.readConfig('brokenImages') === 'hide') $image.attr('onerror', "this.style.display='none'");

              }

              if ($image && feedType == 'photo') $image.addClass('full');
              if (feedType !== 'text') $imageLink.appendTo($itemDiv);

              $itemLink.appendTo($itemDiv);
                $itemDiv.appendTo($feedItem);
                $feedItem.appendTo($feedBody);

                $tempDom.empty();

            });

        }).always(function() {

          $refreshButton.prop('title', PTL.tr('Refresh this feed (%1 - %2)', feedUrl, timeStamp));

          if (progress) progress.increment();
          $refreshButton.removeClass('spin');

        });

      } else {

        const u = new URL(feedUrl);

        $feedLink.text(u.hostname.replace(/^www./, '') + u.pathname)
          .attr('title', u + ' - This feed is folded');

        if (progress) progress.increment();
      }

    }
};
