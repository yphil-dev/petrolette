// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.feed = {

  add:function($column, url, name, type, limit, status, iconhash, clickNew, isQueryString, progress) {

    var feedIndex = $('#tabs').find('.feed').length;

    var $feed = $('<li>')
        .attr('class', 'feed')
        .data('url', url)
        .data('name', name)
        .data('type', type)
        .data('limit', limit)
        .data('iconhash', iconhash);

    const $feedImg = $('<img>')
          .attr({
            src: '/static/images/rss.gif',
            class: 'favicon feedIcon',
            width: '16px',
            height: '16px',
            onerror: "this.onerror=null;this.src='/static/images/rss.gif';"
          });

    var $feedIcon = $('<i>')
        .attr('class', 'feed-control feedIcon translate')
        .data('title', 'Fold / unfold this feed (%1)', url)
        .attr('title', PTL.tr('Fold / unfold this feed (%1)', url))
        .click(function() {

          // Can't just use toggle because we have to pass the div to populate() in order to recreate it with the new data values, just setting data-* here doesn't work :(

          if ($feedControls.data('status') == 'on') {
            $(this).removeClass('fold')
              .parent().parent().parent()
              .children('div.feed-body')
              .addClass('folded');
            $feedControls.data('status', 'off');
            $reloadIcon.removeClass('icon-refresh')
              .addClass('icon-pin');
          } else {
            $(this).addClass('fold')
              .parent().parent().parent()
              .children('div.feed-body')
              .removeClass('folded');
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
        .data('title', PTL.tr('Edit this feed (%1) parameters', url))
        .attr('title', PTL.tr('Edit this feed (%1) parameters', url))
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
        .data('name', name)
        .data('type', type)
        .data('limit', limit)
        .data('status', status)
        .data('iconhash', iconhash);

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

    var $feedBody = $('<div>').attr('class', 'feed-body').css('height', limit),
        $feedBodyUl = $('<ul>').attr('class', 'feed-body'),
        $header = $('<div>').attr('class', 'feed-header'),
        $feedToggle = $('<div>').attr('class', 'feed-toggle').append($feedIcon, $feedImg),
        $selectDiv = $('<div>').append($selectIcon),
        $deleteDiv = $('<div>').append($deleteIcon),
        $prefsDiv = $('<div>').append($prefsIcon),
        $reloadDiv = $('<div>').append($reloadIcon);

    var $titleDiv = $('<div>')
        .attr('title', url || PTL.tr('New feed'))
        .attr('class', 'feed-title trucate');

    var $titleLink = $('<a>')
        .attr('href', url)
        .attr('target', '_blank')
        .html(url || PTL.tr('New feed'));

    $feedControls.hover (
      function() {$(this).find('.collapsible').show();},
      function() {$(this).find('.collapsible').hide('fade', 'fast');}
    );

    if (!PTL.util.isMobile()) {
      $selectDiv.addClass('collapsible');
      $deleteDiv.addClass('collapsible');
      $prefsDiv.addClass('collapsible');

      $feedControls.append($selectDiv, $deleteDiv);
    }


    $header.hover (function() {

      $(this).find('img.favicon').hide();
      $feedIcon.removeClass('icon-rss').addClass('icon-down-circle');

    }, function() {

      $(this).find('img.favicon').show();
      $feedIcon.removeClass('icon-down-circle');

    });

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
  populate:function($button, progress, newLimit) {

    var $dataStore = $button.parent().parent(),
        $refreshButton = $dataStore.find('i.feed-refresh'),
        $header = $dataStore.parent(),
        $panel = $dataStore.parent().parent().parent(),
        $feed = $dataStore.parent().parent(),
        $feedTitle = $feed.children().children('.feed-title'),
        $feedLink = $feedTitle.children('a'),
        $feedBody = $dataStore.parent().next('div.feed-body'),
        $feedBodyUl = $feed.children().children('ul.feed-body'),
        feedUrl = $dataStore.data('url'),
        feedName = $dataStore.data('name'),
        feedType = $dataStore.data('type'),
        feedLimit = newLimit || $dataStore.data('limit'),
        feedStatus = $dataStore.data('status'),
        feedIconHash = $dataStore.data('iconhash'),
        $feedToggle = $feed.find('.feed-toggle'),
        $feedIcon = $feed.find('.feed-toggle > i.feedIcon'),
        $myFeedIcon = $feedToggle.find('.favicon');

    var l = PTL.util.getLocation(feedUrl),
        feedProtocol = l.protocol ? l.protocol + '//' : '//',
        feedHost = feedProtocol + l.hostname,
        dateObj = new Date(),
        timeStamp = dateObj.getUTCHours() + ":" + dateObj.getUTCMinutes() + ":" + dateObj.getUTCSeconds(),
        subdomain = l.hostname.substr(0, l.hostname.indexOf('.'));

    $feedIcon.addClass('fold');
    $button.removeClass('spin');

    var feedTitle;

    if (feedName) {
      feedTitle = feedName;
    } else {
      feedTitle = feedUrl;
    }

    $feedLink.text(feedTitle)
      .attr('href', feedUrl)
      .attr('title', feedTitle + ' (' + feedUrl + ')');

    if (feedIconHash) {

      $myFeedIcon.attr('src', '/favicons/' + feedIconHash + '.favicon');

    } else {

      $.get("/favicon", {
        url: decodeURI(feedHost),
        dataType: "json"
      }).done(function(hash) {

        if (hash) {
          $myFeedIcon.attr('src', '/favicons/' + hash + '.favicon');
          $dataStore.data('iconhash', hash);

          PTL.tab.saveTabs();

        } else {
            // $feedIcon.addClass('icon-rss');
        }

      }).fail(function(jqXHR, textStatus, errorThrown) {
        // $feedIcon.addClass('icon-rss');
      });

    }

    if ($dataStore.data('status') == 'on') {

      $feedIcon.removeClass('fold');
      $refreshButton.addClass('spin');
      $feedLink.removeClass('danger');

      $.get("/feed", {
        feedurl: feedUrl,
        dataType: 'json'
      }, function() {

        $feedBodyUl.empty();

      }).fail(function(error) {
        PTL.util.say(PTL.tr('Problem reading feed [%1] Error type [%2]', feedUrl, error), 'error');
      }).done(function(data) {

        if (feedName) {
          feedTitle = feedName;
        } else if (data.feedTitle) {
          feedTitle = data.feedTitle;
          $dataStore.data('name', feedTitle);
        }

        $feedLink.text(feedTitle)
          .attr('href', data.feedLink)
          .attr('title', feedTitle + ' (' + feedUrl + ')');

        if (data.error || (data.feedItems && data.feedItems.length == 0)) {

          var message = (data.message) ? data.message : PTL.tr('Unknown error');
          var errno = (data.errno) ? data.errno : '0';

          if (data.feedItems && data.feedItems.length == 0) {
            message = PTL.tr('Empty feed');
            errno = '5xx';
          }

          PTL.util.say(PTL.tr('Problem reading feed [%1] Error type [%2]', feedUrl, message), 'warning');

          var $validateLink = $('<a>'),
              $validateLinkIcon = $('<i>'),
              $reportLink = $('<a>'),
              $reportLinkIcon = $('<i>');

          $validateLinkIcon
            .attr('class', 'item-icon icon-w3c')
            .attr('title', PTL.tr('Validate /verify this feed file with the W3C'))
            .appendTo($validateLink);

          $validateLink
            .attr('href', 'https://validator.w3.org/feed/check.cgi?url=' + feedUrl)
            .appendTo($feedBodyUl);

          $reportLinkIcon
            .attr('class', 'item-icon icon-petrolette')
            .attr('title', PTL.tr('Report feed error'))
            .appendTo($reportLink);

          $reportLink
            .attr('href', 'https://framagit.org/yphil/petrolette/-/issues/new?issue[title]=Feed%20error&issue[description]=' + feedUrl + ' (' + message + ')')
            .appendTo($feedBodyUl);

          $feedLink.addClass('danger');

          var $key = $('<strong>')
              .attr('class', 'translate key')
              .data('content', PTL.tr('Error:'))
              .text(PTL.tr('Error:'));

          var $value = $('<strong>')
              .attr('class', 'value')
              .text(message + ' (' + errno + ')');

          var $errorLink = $('<a>')
              .attr('href', feedUrl)
              .text(feedUrl);

          var $errorButtonsFlexBox = $('<a>')
              .attr('class', 'translate flex-box');

          var $errorItem = $('<li>')
              .attr('class', 'feed-item error')
              .append($key)
              .append('&nbsp;')
              .append($value);

          $feedBodyUl
            .append($errorItem);

          $feedBody.css('height', '');

          return;

        } else {

          $feedBody.css('height', feedLimit);

        }

        $.each(data.feedItems, function(index, item) {


          if (index == 30) return false;

          var $description = $.parseHTML(item.description),
              summary,
              imageUrl,
              videoUrl,
              videoType,
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

          const $imageLink = $('<a>').attr('target', '_blank').attr('class', 'imageLink'),
                $itemLink = $('<a>').attr('target', '_blank').attr('class', 'itemLink'),
                $audioLink = $('<a>').attr('target', '_blank').attr('class', 'audioLink'),
                $videoLink = $('<a>').attr('target', '_blank').attr('class', 'videoLink'),
                $commentsLink = $('<a>').attr('target', '_blank').attr('class', 'commentsLink'),
                $commentsIcon = $('<i>'),
                $audioIcon = $('<i>'),
                $videoIcon = $('<i>'),
                $summary = $('<null>').append(PTL.util.sanitizeInput(summary)).text(),
                $itemDiv = $('<div>').attr('class', 'itemDiv'),
                $feedItem = $('<li>').attr('class', 'feed-item');

          var $image;

          if (summary && typeof summary !== 'undefined') {
            $feedItem.attr('title', $summary.trim());
          }

          var $tempDom = $('<null>').append($description);

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

          if (item['media:group'] && item['media:group']['media:content'] && item['media:group']['media:content'][0] && item['media:group']['media:content'][0]['@'] && item['media:group']['media:content'][0]['@'].medium && item['media:group']['media:content'][0]['@'].medium === 'video') {
            videoUrl = item['media:group']['media:content'][0]['@'].url;
            videoType = item['media:group']['media:content'][0]['@'].type;
          }

          if (item.enclosures && typeof item.enclosures[0] !== 'undefined' && item.enclosures[0].url) {

            if (item.enclosures[0].url && item.enclosures[0].url.endsWith(".jpg")) {
              imageUrl = item.enclosures[0].url;
            }

            if (imgTypes.indexOf(item.enclosures[0].type) > -1) {
              imageUrl = item.enclosures[0].url;
            }

            if (!videoUrl && item.enclosures[0].url && item.enclosures[0].url.match(/\.(mp4|webm)$/)) {
              videoUrl = item.enclosures[0].url;
              videoType = item.enclosures[0].type;
            }

            if (videoUrl && videoType) {

              var videoPlayer      = document.createElement('video');
              videoPlayer.controls = 'controls';
              videoPlayer.src      = videoUrl;
              videoPlayer.type     = videoType;

              $itemDiv.append(videoPlayer);

              $videoLink
                .attr('href', item.enclosures[0].url)
                .appendTo($itemDiv);
              $videoIcon
                .attr('class', 'item-icon icon-video')
                .appendTo($videoLink);
            }

            if (item.enclosures[0].url && item.enclosures[0].url.match(/\.(ogg|mp3)$/)) {

              var audioPlayer      = document.createElement('audio');
              audioPlayer.controls = 'controls';
              audioPlayer.src      = item.enclosures[0].url;
              audioPlayer.type     = item.enclosures[0].type;
              audioPlayer.preload  = PTL.prefs.readConfig('mediaPreload');

              $itemDiv.append(audioPlayer);

              $audioLink
                .attr('href', item.enclosures[0].url)
                .appendTo($itemDiv);
              $audioIcon
                .attr('class', 'item-icon icon-audio')
                .appendTo($audioLink);
            }
          }

          $itemLink
            .attr('class', 'ui-helper-clearfix feed-link')
            .attr('href', item.link || item.enclosures[0].url)
            .append(item['mastodon:scope'] ? $summary.trim() : item.title);

          if (!videoUrl && imageUrl && typeof imageUrl !== 'undefined' && !imageUrl.includes('pixel')) {

            $imageLink
              .attr('href', imageUrl.replace('http://','https://'))
              .attr('title', $summary.trim())
              .attr('data-fancybox', 'gallery')
              .attr('data-caption', '<a href="' + item.link + '" class="ui-button ui-corner-all" title="' + $summary.trim() + '">' + item.title + '</a>');

            if (!(imageUrl.indexOf('http://') === 0 || imageUrl.indexOf('https://') === 0)) {
              imageUrl = feedHost + imageUrl;
            }

            $image = $('<img>')
              .attr('src', '/static/images/loading.gif')
              .attr('data-srcset', imageUrl.replace('http://','https://'))
              .attr('srcset', '/static/images/loading.gif')
              .attr('title', $summary.trim())
              .attr('alt', item['mastodon:scope'] ? $summary.trim() : item.title)
              .attr('class', 'ptl-img responsively-lazy')
              .attr('onerror', "this.style.display='none'")
              .appendTo($imageLink);

          }

          if (item.comments) {
            $commentsIcon
              .attr('class', 'item-icon icon-comments')
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

          $tempDom.empty();

        });

      }).always(function() {

        $refreshButton.prop('title', PTL.tr('Refresh this feed (%1 - %2)', feedName || feedUrl, timeStamp));

        if (progress) progress.increment();
        $refreshButton.removeClass('spin');

      });

    } else {

      $dataStore
        .parent()
        .parent()
        .children('div.feed-body')
        .addClass('folded');

      // const u = new URL(feedUrl);

      // $feedLink.text(u.hostname.replace(/^www./, '') + u.pathname)
      //   .attr('title', u + ' - This feed is folded');

      if (progress) progress.increment();
    }

  }
};
