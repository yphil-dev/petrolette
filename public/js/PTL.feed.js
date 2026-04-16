// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.feed = {

  add: function($column, url, name, type, limit, status, iconhash, nbitems, lastitem, isNewFeed, progress) {

    const $feed = $('<li>')
          .attr('class', 'feed');

    const $feedImg = $('<img>')
          .attr({
            src: 'static/images/rss.gif',
            class: 'favicon',
            width: '16px',
            height: '16px',
            onerror: "this.src='static/images/rss.gif';"
          }).on("error", function() {
            $(this).parent().parent().children('div.dataStore').data('iconhash', '');
            PTL.tab.saveTabs(true);
          });

    const $newItemsBadge = $('<div>')
          .attr('class', 'new-items-badge hidden');

    const $feedIcon = $('<i>')
          .attr('class', 'feed-control feedIcon translate')
          .click(function() {

            if ($feedControls.data('status') == 'on') {

              $(this)
                .data('title', 'Open this feed')
                .attr('title', PTL.tr('Open this feed'));
              $feedControls.data('status', 'off');

            } else {

              $(this)
                .data('title', 'Close this feed')
                .attr('title', PTL.tr('Close this feed'));
              $feedControls.data('status', 'on');

            }

            PTL.tab.saveTabs();
            PTL.feed.populate($refreshIcon);

          });

    const $selectIcon = $('<i>')
          .attr('class', 'feed-control translate icon-checkbox feedSelect')
          .data('title', 'Select this feed for moving and deletion')
          .attr('title', PTL.tr('Select this feed for moving and deletion') + 'hash: ' + iconhash)
          .click(function() {
            $(this).toggleClass('icon-checked icon-checkbox')
              .parent().parent().parent().parent()
              .toggleClass('selected');
          });

    const $deleteIcon = $('<i>')
          .attr('class', 'feed-control translate icon-trash-empty feed-delete')
          .data('title', 'Delete selected feeds')
          .attr('title', PTL.tr('Delete selected feeds'))
          .click(function() {
            PTL.dialog.killFeed($(this).parent().parent().parent().parent().addClass('selected'), $('.selected'));
          });

    const $prefsIcon = $('<i>')
          .attr('class', 'feed-control translate icon-cog feedPrefs')
          .data('title', 'Edit this feed parameters')
          .attr('title', PTL.tr('Edit this feed parameters'))
          .click(function() {
            $('.selected').removeClass('selected');
            $('.icon-checked').toggleClass('icon-checked icon-checkbox');
            PTL.dialog.feedPrefs($(this), false);
          });

    const $refreshIcon = $('<i>')
          .attr('class', 'feed-control translate icon-refresh feedRefresh')
          .click(function() {
            $('.selected').removeClass('selected');
            $('.icon-checked').toggleClass('icon-checked icon-checkbox');
            PTL.feed.populate($(this), progress);
          });

    const $feedControls = $('<div>')
          .attr('class', 'feedControls dataStore')
          .data('url', url)
          .data('name', name)
          .data('type', type)
          .data('limit', limit)
          .data('status', status)
          .data('iconhash', iconhash)
          .data('nbitems', nbitems)
          .data('lastitem', lastitem);

    $refreshIcon
      .attr('data-url', url)
      .attr('data-name', name)
      .attr('data-type', type)
      .attr('data-limit', limit)
      .attr('data-status', status)
      .attr('data-iconhash', iconhash)
      .attr('data-nbitems', nbitems)
      .attr('data-lastitem', lastitem);

    if ($feedControls.data('status') == 'on') {

      $feedIcon
        .data('title', 'Close this feed')
        .attr('title', PTL.tr('Close this feed'));

      $refreshIcon.removeClass('icon-pin')
        .addClass('icon-refresh');

    } else {

      $feedIcon
        .data('title', 'Open this feed')
        .attr('title', PTL.tr('Open this feed'));

      $refreshIcon.removeClass('icon-refresh')
        .addClass('icon-pin');
    }

    const $feedHandle = $('<div>')
          .data('title', PTL.tr('Move selected feeds'))
          .attr({
            title: PTL.tr('Move selected feeds'),
            class: 'feedHandle'
          });

    const $feedBody = $('<div>').attr('class', 'feedBody').css('height', limit),
          $feedHeader = $('<div>').attr('class', 'feedHeader'),
          $feedToggle = $('<div>').attr('class', 'feedToggle').append($feedIcon, $feedImg),
          $selectDiv = $('<div>').append($selectIcon),
          $deleteDiv = $('<div>').append($deleteIcon),
          $prefsDiv = $('<div>').append($prefsIcon),
          $refreshDiv = $('<div>').append($refreshIcon);

    const $warningIconSpan = $('<span>')
          .attr('class', 'warningIconSpan');

    const $titleDiv = $('<div>')
          .attr({
            title: name || PTL.tr('New feed'),
            class: 'feedTitle'
          })
          .prepend($warningIconSpan);

    const $titleLink = $('<a>')
          .attr({
            href: url,
            target: '_blank',
            title: name || PTL.tr('New feed')
          })
          .text(name || PTL.tr('New feed'));

    $feedHeader.hover(function() {

      $(this).find('img.favicon').hide();
      $feedIcon.removeClass('icon-rss').addClass('icon-down');
      $(this).find('.collapsible').show(0);

    }, function() {

      $(this).find('img.favicon').show();
      $feedIcon.removeClass('icon-down');
      $(this).find('.collapsible').hide('fade', 150);

    });

    $feedHeader.hover(function() {

      $(this).find('img.favicon').hide();
      $feedIcon.removeClass('icon-rss').addClass('icon-down');
      $(this).find('.collapsible').show(0);

    }, function() {

      $(this).find('img.favicon').show();
      $feedIcon.removeClass('icon-down');
      $(this).find('.collapsible').hide('fade', 150);

    });

    if (!PTL.util.isMobile()) {
      $selectDiv.addClass('collapsible');
      $deleteDiv.addClass('collapsible');
      $prefsDiv.addClass('collapsible');

      $feedControls.append($selectDiv, $deleteDiv);
    }

    $feedHeader.append($feedToggle,
                       $feedHandle,
                       $titleDiv.append($titleLink),
                       $newItemsBadge,
                       $feedControls.append($prefsDiv, $refreshDiv));

    $feed.append($feedHeader, $feedBody);

    if (isNewFeed) {
      $feed.prependTo($column);
    } else {
      $feed.appendTo($column);
    }

    $refreshIcon.click();

  },
  lastItems: function(feedItems, $dataStore) {

    return new Promise((resolve, reject) => {

      const $feedBodyUl = $('<ul>').attr('class', 'feedBody'),
            feedUrl = $dataStore.data('url'),
            nbItems = $dataStore.data('nbitems'),
            feedType = $dataStore.data('type');

      const l = PTL.util.getLocation(feedUrl),
            p = l.protocol ? l.protocol + '//' : '//',
            feedHost = p + l.hostname;

      let newItems = 0;

      var isInsecureLinks = false;

      for (const key in feedItems) {
        newItems++;

        const item = feedItems[key];

        if (nbItems > 0 && newItems -1 == nbItems) break;

        const $description = $.parseHTML(item.description),
              imgTypes = ['image', 'image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

        let summary = '',
            imageUrl, mediaType, mediaEncoding, mediaUrl, pubDate;

        if (item.pubDate && typeof item.pubDate !== 'undefined') {
          pubDate = PTL.util.dateFormat(item.pubDate);
        } else {
          pubDate = '';
        }

        if (item.summary && typeof item.summary !== 'undefined') {
          summary = item.summary;
        }

        if (item.description && typeof item.description !== 'undefined') {
          summary = item.description;
        }

        if (item['media:group']) {
          if (item['media:group']['media:description']) {
            summary = item['media:group']['media:description']["#"];
          }
        }

        if (!summary) {
          summary = PTL.tr('(no summary)');
        }

        const $imageLink = $('<a>').attr('target', '_blank').attr('class', 'imageLink'),
              $itemLink = $('<a>').attr('target', '_blank').attr('class', 'itemLink'),
              $commentsLink = $('<a>').attr('target', '_blank').attr('class', 'commentsLink'),
              $commentsIcon = $('<i>'),
              $itemDiv = $('<div>').attr('class', 'itemDiv'),
              $feedItem = $('<li>').attr('class', 'feedItem'),
              $image = $('<img>'),
              author = (item.author) ? '(' + item.author + ') ' : '',
              $summary = $('<null>').append(PTL.util.sanitizeInput(summary)).text();

        let itemText,
            imageSummary = '';

        const $tempDom = $('<null>').append($description);

        // console.log('$description: ', $description);

        if (item.image && typeof item.image.url !== 'undefined') {
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
            imageSummary = $tempDom.find('img').attr('title');
          }
        }

        $tempDom.empty();
        // $summary.empty();


        if (item['media:group'] && item['media:group']['media:content'] && item['media:group']['media:content'][0] && item['media:group']['media:content'][0]['@'] && item['media:group']['media:content'][0]['@'].medium && item['media:group']['media:content'][0]['@'].medium === 'video') {
          mediaUrl = item['media:group']['media:content'][0]['@'].url;
          mediaType = item['media:group']['media:content'][0]['@'].type;
        }

        if (item.enclosures && typeof item.enclosures[0] !== 'undefined' && item.enclosures[0].url) {


          if (item.enclosures[0].url && item.enclosures[0].url.match(/(\.jpg|\.png|\.gif|\.jpeg)/)) {
            imageUrl = item.enclosures[0].url;

          }

          if (imgTypes.indexOf(item.enclosures[0].type) > -1) {
            imageUrl = item.enclosures[0].url;
          }

          if (item.enclosures[0].url && !item.enclosures[0].url.startsWith('https')) {
            isInsecureLinks = true;
          }

          // console.log('item: ', item.enclosures[0].url);

          if (item.enclosures[0].url && item.enclosures[0].url.match(/(\.ogg|\.mp3|\.mp4|\.webm)/) && item.enclosures[0].url.startsWith('https')) {
            mediaUrl = (item.enclosures[0].url) ? item.enclosures[0].url : null;
            mediaEncoding = (item.enclosures[0].type) ? item.enclosures[0].type : null;
            mediaType = (mediaEncoding) ? mediaEncoding.substring(0, mediaEncoding.indexOf('/')) : null;
          }

          if (mediaUrl && mediaType && mediaEncoding) {


            if (feedType != 'photo') {

              const $mediaIcon = $('<i>'),
                    $mediaLink = $('<a>').attr('target', '_blank'),
                    mediaIcon = 'icon-' + mediaType;

              $mediaLink
                .attr({
                  'href': mediaUrl,
                  'target': '_blank',
                  'class': 'translate',
                  'data-title': 'Drag & drop this link in your player',
                  'title': PTL.tr('Drag & drop this link in your player')
                })
                .appendTo($itemDiv);

              $mediaIcon
                .attr('class', 'itemIcon')
                .addClass(mediaIcon)
                .appendTo($mediaLink);

            }

            if (feedType != 'text') {

              const mediaPlayer = document.createElement(mediaType);

              mediaPlayer.classList.add(feedType);
              mediaPlayer.controls = 'controls';
              mediaPlayer.controlslist = 'play';
              mediaPlayer.src = mediaUrl;
              // mediaPlayer.type = mediaEncoding || '';
              mediaPlayer.preload = PTL.prefs.readConfig('mediaPreload');

              $itemDiv.append(mediaPlayer);

            }

          }

        }

        const itemLink = item.link || item.enclosures[0].url;


        if (summary && typeof summary !== 'undefined') {
          // $feedItem.attr('title', pubDate + '\n--------------------------\n' + author + summary.replace(/&lt;br\s*\/?&gt;/gi, ' ').replace(/<br\s*\/?>/gi, ' '));
          $feedItem.attr('title', pubDate + '\n--------------------------\n' + author + PTL.util.clickableLinks(PTL.util.sanitizeInput(summary), false));
        }


        if (item.title && item.description && (item.title.slice(0, 10) == item.description.slice(0, 10)) && (item.title.slice(-3) == '...')) {
          itemText = PTL.util.clickableLinks(PTL.util.sanitizeInput(PTL.util.truncateStr(item.description, 300)), true);

        } else {
          itemText = PTL.util.clickableLinks(item.title, true);
        }

        $itemLink
          .attr('class', 'ui-helper-clearfix feed-link')
          .attr('href', itemLink.replace('https://www.bitchute.com/embed', 'https://www.bitchute.com/video'))
          .append(itemText);

        if (!mediaUrl && imageUrl && typeof imageUrl !== 'undefined' && !imageUrl.includes('pixel')) {

          $imageLink
            .attr('href', imageUrl)
            .attr('data-fancybox', 'gallery')
            .attr('data-caption', '<a href="' + item.link + '" class="ui-button ui-corner-all" title="' + $summary + '">' + item.title + '</a>');

          const protocols = ['https://', 'http://', '//'];

          let isAbsolute = protocols.some(p => imageUrl.startsWith(p));

          if (!isAbsolute) imageUrl = feedHost + '/' + imageUrl;

          $image
            .attr('src', 'static/images/loading.gif')
            .attr('data-srcset', imageUrl.replace('http://', 'https://'))
            .attr('srcset', 'static/images/loading.gif')
            .attr('title', imageSummary ? imageSummary.trim() : $summary.trim())
            .attr('alt', imageSummary ? imageSummary.trim() : $summary.trim())
            .attr('class', 'ptl-img responsively-lazy')
            .attr('onerror', "this.style.display='none'")
            .appendTo($imageLink);

        }

        if (item.comments) {
          $commentsIcon
            .attr('class', 'itemIcon icon-comments')
            .appendTo($commentsLink);

          $commentsLink
            .attr('href', item.comments)
            .appendTo($itemDiv);
        }

        if ($image && feedType == 'photo') $image.addClass('full');
        if (feedType !== 'text') $imageLink.appendTo($itemDiv);

        $itemLink.appendTo($itemDiv);
        $itemDiv.appendTo($feedItem);
        $feedItem.appendTo($feedBodyUl);


      }

      resolve([$feedBodyUl.html(), newItems, isInsecureLinks]);

    });

  },
  errorFeed: function(error, feedUrl) {

    const $validateLink = $('<a>')
          .attr('href', 'https://validator.w3.org/feed/check.cgi?url=' + feedUrl);

    $('<i>')
      .attr('class', 'itemIcon icon-w3c')
      .attr('title', PTL.tr('Validate /verify this feed file with the W3C'))
      .appendTo($validateLink);

    const $reportLink = $('<a>')
          .attr('href', 'https://gitlab.com/yphil/petrolette/-/issues/new?issue[title]=Feed%20error&issue[description]=' + feedUrl + ' (' + error.type + ')');

    $('<i>')
      .attr('class', 'itemIcon icon-petrolette')
      .attr('title', PTL.tr('Report feed error'))
      .appendTo($reportLink);

    const $errKey = $('<strong>')
          .attr('class', 'translate key')
          .data('content', PTL.tr('Type'))
          .text(PTL.tr('Type'));

    const $msgKey = $('<strong>')
          .attr('class', 'translate key')
          .data('content', PTL.tr('Message'))
          .text(PTL.tr('Message'));

    const $errValue = $('<strong>')
          .attr({'class': 'value translate',
                 'data-content': error.type})
          .text(PTL.tr(error.type));

    const $errStatus = $('<span>')
          .append('&nbsp;(')
          .append($('<a>')
                  .attr('href', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/' + error.status)
                  .text(error.status))
          .append(')');

    // if (error.status != 0) $errValue.append($errStatus);

    const $msgValue = $('<strong>')
          .attr({'class': 'value translate',
                 'data-content': error.message})
          .text(PTL.tr(error.message));

    const $errorItem = $('<li>')
          .attr('class', 'feedItem error')
          .append($validateLink)
          .append($reportLink)
          .append($errKey)
          .append('&nbsp;:&nbsp;')
          .append($errValue)
          .append('&nbsp;')
          .append($errStatus)
          .append('<br>')
          .append($msgKey)
          .append('&nbsp;:&nbsp;')
          .append($msgValue);

    const $feedBodyUl = $('<ul>').attr('class', 'feedBody')
          .append($errorItem);

    return $feedBodyUl;

  },
  fetchIcon: function(feedHost) {

    return new Promise((resolve, reject) => {
      $.get("/favicon", {
        url: decodeURI(feedHost),
        async: false,
        dataType: "json"
      }).done(function(hash) {
        if (hash)
          resolve(hash);
        else
          reject();
      }).fail(function(jqXHR, textStatus, errorThrown) {
        reject(jqXHR);
      });

    });

  },
  fetchFeed: function(feedUrl, lastItem, nbItems) {

    return new Promise((resolve, reject) => {
      $.get("/feed", {
        url: feedUrl,
        async: false,
        dataType: 'json',
        lastItem: lastItem,
        nbItems: nbItems
      }).done(function(data, _textStatus, jqXHR) {
        resolve(data);
      }).fail(function(jqXHR, textStatus, errorThrown) {
        reject(jqXHR, textStatus, errorThrown);
      });
    });

  },
  populate: async function($button, progress) {

    const $dataStore = $button.parent().parent(),
          $refreshButton = $dataStore.find('i.feedRefresh').removeClass('icon-pin').addClass('icon-refresh spin'),
          $feedHeader = $dataStore.parent(),
          $feedTitle = $feedHeader.children('div.feedTitle'),
          $warningIconSpan = $feedTitle.children('span.warningIconSpan'),
          $feedLink = $feedTitle.children('a'),
          $badge = $feedHeader.children('.new-items-badge'),
          $feedBody = $dataStore.parent().next('div.feedBody').removeClass('folded'),
          $feedBodyUl = $feedBody.find('ul.feedBody'),
          feedUrl = $dataStore.data('url'),
          $feedToggle = $feedHeader.children('.feedToggle'),
          $feedIcon = $feedToggle.children('.feedIcon').removeClass('fold'),
          $favIcon = $feedToggle.children('.favicon');

    const l = PTL.util.getLocation(feedUrl),
          feedProtocol = l.protocol ? l.protocol + '//' : '//',
          feedHost = feedProtocol + l.hostname,
          dateObj = new Date(),
          timeStamp = dateObj.toTimeString();

    let feedLastItem = $dataStore.data('lastitem'),
        feedIconHash = $dataStore.data('iconhash'),
        feedIconUrl;

    $feedBodyUl.css('border', '1px solid red');
    $feedBody.css('height', $dataStore.data('limit'));

    async function fetchFeedData(feedUrl, feedLastItem) {
      let fetchFeed = await PTL.feed.fetchFeed(feedUrl, feedLastItem);
      if (fetchFeed.error) {
        handleFeedError(fetchFeed.error, feedUrl);
      } else {
        handleFeedSuccess(fetchFeed);
      }
    }

    function handleFeedError(error, feedUrl) {
      $feedBody
        .empty()
        .append(PTL.feed.errorFeed(error, feedUrl))
        .css('height', '');
      $feedLink.addClass('danger');
      $refreshButton.removeClass('spin');
    }

    if ($dataStore.data('status') == 'on') {

      $refreshButton.addClass('spin');

      try {
        let fetchFeed = await PTL.feed.fetchFeed(feedUrl, feedLastItem);

        if (fetchFeed.error) {

          $feedBody
            .empty()
            .append(PTL.feed.errorFeed(fetchFeed.error, feedUrl))
            .css('height', '');
          $feedLink.addClass('danger');
          $refreshButton.removeClass('spin');

        } else {

          $feedLink.removeClass('danger');

          let lastItems = await PTL.feed.lastItems(fetchFeed.feedItems, $dataStore);

          let isInsecureLinks = lastItems[2];

          const feedName = $dataStore.data('name') ? $dataStore.data('name') : fetchFeed.feedTitle;

          if (fetchFeed.feedIcon) feedIconUrl = fetchFeed.feedIcon;

          let $insecureIcon = $('<i>')
              .attr('class', 'icon-lock-open insecureIcon warning')
              .attr('title', PTL.tr("Some linked elements (image, audio or video) within this feed's items could not be loaded because they were served insecurely"));

          if (isInsecureLinks) $warningIconSpan.html($insecureIcon);

          $feedBody.html(lastItems[0]);

          $refreshButton
            .attr('title', PTL.tr('Reload this feed') + '\n' + feedUrl + '\n' + timeStamp)
            .removeClass('spin');

          $feedLink
            .attr('href', fetchFeed.feedLink)
            .attr('title', feedName)
            .text(feedName);

          if ($dataStore.data('name') == '') $dataStore.data('name', feedName);

          if (fetchFeed.totalNewItems > 0) {
            $dataStore.data('lastitem', fetchFeed.lastItem);
            PTL.tab.saveTabs();
            $badge
              .text(fetchFeed.totalNewItems)
              .attr('title', PTL.tr('There are %1 new items in this feed', fetchFeed.totalNewItems))
              .fadeIn('slow');
          } else {
            $badge.fadeOut('slow');
          }

        }
      } catch (err) {

        $feedBody
          .empty()
          .append(PTL.feed.errorFeed(err, feedUrl))
          .css('height', '');
        $feedLink.addClass('danger');
        $refreshButton.removeClass('spin');

      }

    } else {

      $feedBody.addClass('folded');

      $feedIcon.addClass('fold');

      $refreshButton
        .addClass('icon-pin')
        .removeClass('icon-refresh spin')
        .attr('title', PTL.tr('This feed is closed'));

    }

    if (progress) progress.increment();

    function updateFavIcon(hash) {
      feedIconHash = false;
      $dataStore.data('iconhash', hash);
      PTL.tab.saveTabs(true);
      $favIcon.attr('src', 'favicons/' + hash + '.favicon');
    }

    function handleFetchIconError() {
      // $dataStore.data('iconhash', 'noicon');
      // PTL.tab.saveTabs(true);
    }

    if (feedIconHash && feedIconHash !== 'noicon') {
      $favIcon.attr('src', 'favicons/' + feedIconHash + '.favicon');
    } else if (feedIconHash && feedIconHash == 'noicon') {
      // pass
    } else {
      const iconUrl = feedIconUrl || feedHost;
      PTL.feed.fetchIcon(iconUrl)
        .then(updateFavIcon)
        .catch(handleFetchIconError);
    }

  }

};
