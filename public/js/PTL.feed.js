// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.feed = {
  
  add: function($column, url, name, type, limit, status, iconhash, nbitems, lastitem, isNewFeed, progress) {

    const $feed = $('<li>')
          .attr('class', 'feed');

    const $feedImg = $('<img>')
          .attr({
            src: '/static/images/rss.gif',
            class: 'favicon',
            width: '16px',
            height: '16px',
            onerror: "this.src='/static/images/rss.gif';"
          }).on("error", function() {       
            $(this).parent().parent().children('div.dataStore').data('iconhash', '');
            PTL.tab.saveTabs(true);
          });

    const $newItemsBadge = $('<div>')
          .attr('class', 'newItemsBadge hidden');

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
          .attr('title', PTL.tr('Select this feed for moving and deletion'))
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

    const $titleDiv = $('<div>')
          .attr({
            title: name || PTL.tr('New feed'),
            class: 'feedTitle trucate'
          });

    const $titleLink = $('<a>')
          .attr({
            href: url,
            target: '_blank',
            title: name || PTL.tr('New feed')
          })
          .html(name || PTL.tr('New feed'));
    
    // $feedControls.hover(
    //   function() { $(this).find('.collapsible').show(); },
    //   function() { $(this).find('.collapsible').hide('fade', 'fast'); }
    // );

    // if (!PTL.util.isMobile()) {
    //   $selectDiv.addClass('collapsible');
    //   $deleteDiv.addClass('collapsible');
    //   $prefsDiv.addClass('collapsible');

    //   $feedControls.append($selectDiv, $deleteDiv);
    // }

    // $feedHeader.hover(function() {

    //   $(this).find('img.favicon').hide();
    //   $feedIcon.removeClass('icon-rss').addClass('icon-down');

    // }, function() {

    //   $(this).find('img.favicon').show();
    //   $feedIcon.removeClass('icon-down');

    // });

    // New
    
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
      $feed.prependTo($column).hide();
      PTL.dialog.feedNew($prefsIcon);
    } else {
      $feed.appendTo($column);
      $refreshIcon.click();
    }

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

        let summary, imageUrl, audioUrl, audioType, videoUrl, videoType;

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

        const $imageLink = $('<a>').attr('target', '_blank').attr('class', 'imageLink'),
              $itemLink = $('<a>').attr('target', '_blank').attr('class', 'itemLink'),
              $commentsLink = $('<a>').attr('target', '_blank').attr('class', 'commentsLink'),
              $commentsIcon = $('<i>'),
              $summary = $('<null>').append(PTL.util.sanitizeInput(summary)).text(),
              $itemDiv = $('<div>').attr('class', 'itemDiv'),
              $feedItem = $('<li>').attr('class', 'feedItem');

        let $image;

        if (summary && typeof summary !== 'undefined') {
          $feedItem.attr('title', $summary.trim());
        }

        const $tempDom = $('<null>').append($description);

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
            $feedItem.attr('title', $tempDom.find('img').attr('title'));
          }
        }

        $tempDom.empty();

        if (item['media:group'] && item['media:group']['media:content'] && item['media:group']['media:content'][0] && item['media:group']['media:content'][0]['@'] && item['media:group']['media:content'][0]['@'].medium && item['media:group']['media:content'][0]['@'].medium === 'video') {
          videoUrl = item['media:group']['media:content'][0]['@'].url;
          videoType = item['media:group']['media:content'][0]['@'].type;
        }

        if (item.enclosures && typeof item.enclosures[0] !== 'undefined' && item.enclosures[0].url) {


          if (item.enclosures[0].url && item.enclosures[0].url.match(/(\.jpg|\.png|\.gif|\.jpeg)/)) {
            imageUrl = item.enclosures[0].url;

          }

          if (imgTypes.indexOf(item.enclosures[0].type) > -1) {
            imageUrl = item.enclosures[0].url;
          }

          if (!videoUrl && item.enclosures[0].url && item.enclosures[0].url.match(/(\.mp4|\.webm)/) && item.enclosures[0].url.startsWith('https')) {

            videoUrl = item.enclosures[0].url;
            videoType = item.enclosures[0].type;
          }

          if (item.enclosures[0].url && !item.enclosures[0].url.startsWith('https')) {
            isInsecureLinks = true;
          }
          
          if (item.enclosures[0].url && item.enclosures[0].url.match(/(\.ogg|\.mp3)/) && item.enclosures[0].url.startsWith('https')) {
            audioUrl = item.enclosures[0].url;
            audioType = item.enclosures[0].type;
          }
          
          if (feedType !== 'text') {

            if (videoUrl && videoType) {

              PTL.feed.appendVideoPlayer($itemDiv, videoUrl, videoType);
            }

            if (audioUrl && audioType) {
              
              PTL.feed.appendAudioPlayer($itemDiv, audioUrl, audioType);
            }

          }

        }

        $itemLink
          .attr('class', 'ui-helper-clearfix feed-link')
          .attr('href', item.link || item.enclosures[0].url)
          .append(item['mastodon:scope'] ? $summary.trim() : item.title);

        if (!videoUrl && !audioUrl && imageUrl && typeof imageUrl !== 'undefined' && !imageUrl.includes('pixel')) {

          $imageLink
            .attr('href', imageUrl)
            .attr('title', $summary.trim())
            .attr('data-fancybox', 'gallery')
            .attr('data-caption', '<a href="' + item.link + '" class="ui-button ui-corner-all" title="' + $summary.trim() + '">' + item.title + '</a>');

          const protocols = ['https://', 'http://', '//'];

          let isAbsolute = protocols.some(p => imageUrl.startsWith(p));                   
          
          if (!isAbsolute) imageUrl = feedHost + '/' + imageUrl;
          
          $image = $('<img>')
            .attr('src', '/static/images/loading.gif')
            .attr('data-srcset', imageUrl.replace('http://', 'https://'))
            .attr('srcset', '/static/images/loading.gif')
            .attr('title', $summary.trim())
            .attr('alt', item['mastodon:scope'] ? $summary.trim() : item.title)
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
  appendAudioPlayer: function($itemDiv, audioUrl, audioType) {

    const $audioLink = $('<a>').attr('target', '_blank').attr('class', 'audioLink'),
          $audioIcon = $('<i>'),
          audioPlayer = document.createElement('audio');

    audioPlayer.controls = 'controls';
    audioPlayer.src = audioUrl;
    audioPlayer.type = audioType;
    audioPlayer.preload = PTL.prefs.readConfig('mediaPreload');

    $itemDiv.append(audioPlayer);

    $audioLink
      .attr('href', audioUrl)
      .appendTo($itemDiv);
    $audioIcon
      .attr('class', 'itemIcon icon-audio')
      .appendTo($audioLink);

  },
  appendVideoPlayer: function($itemDiv, videoUrl, videoType) {

    const videoPlayer = document.createElement('video'),
          $videoIcon = $('<i>'),
          $videoLink = $('<a>').attr('target', '_blank').attr('class', 'videoLink');

    videoPlayer.controls = 'controls';
    videoPlayer.src = videoUrl + '#t=0.5';
    videoPlayer.type = videoType;
    videoPlayer.preload = PTL.prefs.readConfig('mediaPreload');

    $itemDiv.append(videoPlayer);

    $videoLink
      .attr('href', videoUrl)
      .appendTo($itemDiv);
    $videoIcon
      .attr('class', 'itemIcon icon-video')
      .appendTo($videoLink);

    return $itemDiv;

  },
  errorFeed: function(error, feedUrl) {
    
    const $validateLink = $('<a>')
          .attr('href', 'https://validator.w3.org/feed/check.cgi?url=' + feedUrl);

    $('<i>')
      .attr('class', 'itemIcon icon-w3c')
      .attr('title', PTL.tr('Validate /verify this feed file with the W3C'))
      .appendTo($validateLink);

    const $reportLink = $('<a>')
          .attr('href', 'https://framagit.org/yphil/petrolette/-/issues/new?issue[title]=Feed%20error&issue[description]=' + feedUrl + ' (' + error.type + ')');

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
          .attr('class', 'value')
          .text(error.type);

      const $errStatus = $('<span>')
            .append('&nbsp;(')
            .append($('<a>')
                    .attr('href', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/' + error.status)
                    .text(error.status))
            .append(')');

    if (error.status != 0) $errValue.append($errStatus)
        
    const $msgValue = $('<strong>')
          .attr('class', 'value')
          .text(error.message);

    const $errorItem = $('<li>')
          .attr('class', 'feedItem error')
          .append($validateLink)
          .append($reportLink)
          .append($errKey)
          .append('&nbsp;:&nbsp;')
          .append($errValue)
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
          $feedLinkDiv = $feedHeader.children('div.feedTitle'),
          $feedLink = $feedLinkDiv.children('a'),
          $badge = $feedHeader.children('.newItemsBadge'),
          $feedBody = $dataStore.parent().next('div.feedBody').removeClass('folded'),
          $feedBodyUl = $feedBody.find('ul.feedBody'),
          feedUrl = $dataStore.data('url'),
          feedIconHash = $dataStore.data('iconhash'),
          $feedToggle = $feedHeader.children('.feedToggle'),
          $feedIcon = $feedToggle.children('.feedIcon').removeClass('fold'),
          $favIcon = $feedToggle.children('.favicon');

    const l = PTL.util.getLocation(feedUrl),
          feedProtocol = l.protocol ? l.protocol + '//' : '//',
          feedHost = feedProtocol + l.hostname,
          dateObj = new Date(),
          timeStamp = dateObj.toTimeString();

    var feedLastItem = $dataStore.data('lastitem');

    $feedBodyUl.css('border', '1px solid red');
    
    if (feedIconHash && feedIconHash !== 'noicon') {
      $favIcon.attr('src', '/favicons/' + feedIconHash + '.favicon');
    } else if (!feedIconHash) {
      PTL.feed.fetchIcon(feedHost)
         .then(hash => {
           $dataStore.data('iconhash', hash);
           PTL.tab.saveTabs(true);
         })
         .catch(e => {
           $dataStore.data('iconhash', 'noicon');
           PTL.tab.saveTabs(true);
           $favIcon.attr('src', '/static/images/rss.gif');
         });
    }
    
    if ($dataStore.data('status') == 'on') {

      $refreshButton.addClass('spin');

      let fetchFeed = await PTL.feed.fetchFeed(feedUrl, feedLastItem);

      if (fetchFeed.error) {

        $feedBody
          .empty()
          .append(PTL.feed.errorFeed(fetchFeed.error, feedUrl))
          .css('height', '');
        $feedLink.addClass('danger');
        $refreshButton.removeClass('spin');

      } else {

        let lastItems = await PTL.feed.lastItems(fetchFeed.feedItems, $dataStore);

        let isInsecureLinks = lastItems[2];

        const feedName = fetchFeed.feedTitle;

        let $insecureIcon = $('<i>')
            .attr('class', 'icon-lock warning')
            .attr('title', PTL.tr("Some linked elements (image, audio or video) within this feed's items could not be loaded because they were served insecurely"));
        
        // if (isInsecureLinks) $insecureIcon.prependTo($feedLinkDiv);
        
        $feedBody.html(lastItems[0]);

        $refreshButton
          .attr('title', PTL.tr('Refresh this feed') + ' (' + feedUrl + ', ' + timeStamp + ')')
          .removeClass('spin');

        $feedLink
          .attr('href', fetchFeed.feedLink)
          .attr('title', feedName)
          .text(feedName);
        
        if ($dataStore.data('name') == '') {
          $dataStore.data('name', feedName);          
        }
        
        if (fetchFeed.totalNewItems > 0) {
          $dataStore.data('lastitem', fetchFeed.lastItem);
          PTL.tab.saveTabs();
          $badge.text(fetchFeed.totalNewItems).fadeIn('slow');
        } else {
          $badge.fadeOut('slow');
        }

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

  }

};
