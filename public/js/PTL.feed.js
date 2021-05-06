// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.feed = {

  add:function($column, url, name, type, limit, status, iconhash, nbitems, lastitem, clickNew, isQueryString, progress) {

    const feedIndex = $('#tabs').find('.feed').length;

    const $feed = $('<li>')
          .attr('class', 'feed');

    const $feedImg = $('<img>')
          .attr({
            src: '/static/images/rss.gif',
            class: 'favicon',
            width: '16px',
            height: '16px',
            onerror: "this.src='/static/images/rss.gif';"
          })
          .on("error", function() {
            $(this).attr('src', '/static/images/rss.gif');
          });

    const $newItemsBadge = $('<div>')
          .attr('class', 'newItemsBadge hidden');

    const $feedIcon = $('<i>')
          .attr('class', 'feed-control feedIcon translate')
          .data('title', 'Fold / unfold this feed (%1)', url)
          .attr('title', PTL.tr('Fold / unfold this feed (%1)', url))
          .click(function() {

            // Can't just use toggle because we have to pass the div to populate() in order to recreate it with the new data values, just setting data-* here doesn't work :(

            if ($feedControls.data('status') == 'on') {
              $(this).removeClass('fold')
                .parent().parent().parent()
                .children('div.feedBody')
                .addClass('folded');
              $feedControls.data('status', 'off');
              $refreshIcon.removeClass('icon-refresh')
                .addClass('icon-pin');
            } else {
              $(this).addClass('fold')
                .parent().parent().parent()
                .children('div.feedBody')
                .removeClass('folded');
              $feedControls.data('status', 'on');
              $refreshIcon.removeClass('icon-pin')
                .addClass('icon-refresh');
            }

            PTL.tab.saveTabs();
            PTL.feed.populate($refreshIcon);

          });

    const $selectIcon = $('<i>')
          .attr('class', 'feed-control translate icon-checkbox feedSelect')
          .data('title', 'Select this feed (%1)', url)
          .attr('title', PTL.tr('Select this feed (%1)', url))
          .click(function() {
            $(this).parent().parent().parent().parent()
              .toggleClass('selected');
            $(this).toggleClass('icon-checked icon-checkbox');
          });

    const $deleteIcon = $('<i>')
          .attr('class', 'feed-control translate icon-cancel feed-delete')
          .data('title', 'Delete this feed (%1)', url)
          .attr('title', PTL.tr('Delete this feed (%1)', url))
          .click(function() {
            $('.selected').removeClass('selected');
            $('.icon-checked').toggleClass('icon-checked icon-checkbox');
            PTL.dialog.killFeed($(this));
          });

    const $prefsIcon = $('<i>')
          .attr('class', 'feed-control translate icon-cog feedPrefs')
          .data('title', 'Edit this feed (%1) parameters', url)
          .attr('title', PTL.tr('Edit this feed (%1) parameters', url))
          .click(function() {
            $('.selected').removeClass('selected');
            $('.icon-checked').toggleClass('icon-checked icon-checkbox');
            PTL.dialog.feedPrefs($(this));
          });

    const $refreshIcon = $('<i>')
          .attr('class', 'feed-control translate icon-refresh feedRefresh')
          .data('title', 'Refresh this feed (%1)', url)
          .attr('title', PTL.tr('Refresh this feed (%1)', url))
          .click(function() {
            $('.selected').removeClass('selected');
            $('.icon-checked').toggleClass('icon-checked icon-checkbox');
            PTL.feed.populate($(this), progress);
          });

    // const $feedControls = $('<div>').attr('class', 'feedControls dataStore')
    //       .data('index', feedIndex)
    //       .data('url', url)
    //       .data('name', name)
    //       .data('type', type)
    //       .data('limit', limit)
    //       .data('status', status)
    //       .data('iconhash', iconhash)
    //       .data('nbitems', nbitems)
    //       .data('lastitem', lastitem);

    const $feedControls = $('<div>')
          .attr('class', 'feedControls dataStore')
          .attr('data-index', feedIndex)
          .attr('data-url', url)
          .attr('data-name', name)
          .attr('data-type', type)
          .attr('data-limit', limit)
          .attr('data-status', status)
          .attr('data-iconhash', iconhash)
          .attr('data-nbitems', nbitems)
          .attr('data-lastitem', lastitem);

    if ($feedControls.data('status') == 'on') {
      $refreshIcon.removeClass('icon-pin')
        .addClass('icon-refresh');
    } else {
      $refreshIcon.removeClass('icon-refresh')
        .addClass('icon-pin');
    }

    const $feedHandle = $('<div>')
          .data('title', PTL.tr('Move this feed (%1)', url))
          .attr({
            title: PTL.tr('Move this feed (%1)', url),
            class:'feedHandle'
          });

    const $feedBody = $('<div>').attr('class', 'feedBody').css('height', limit),
          $feedHeader = $('<div>').attr('class', 'feedHeader'),
          $feedToggle = $('<div>').attr('class', 'feedToggle').append($feedIcon, $feedImg),
          $selectDiv = $('<div>').append($selectIcon),
          $deleteDiv = $('<div>').append($deleteIcon),
          $prefsDiv = $('<div>').append($prefsIcon),
          $reloadDiv = $('<div>').append($refreshIcon);

    const $titleDiv = $('<div>')
          .attr({
            title: url || PTL.tr('New feed'),
            class:'feedTitle trucate'
          });

    const $titleLink = $('<a>')
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


    $feedHeader.hover (function() {

      $(this).find('img.favicon').hide();
      $feedIcon.removeClass('icon-rss').addClass('icon-down-circle');

    }, function() {

      $(this).find('img.favicon').show();
      $feedIcon.removeClass('icon-down-circle');

    });

    $feedHeader.append($feedToggle,
                       $feedHandle,
                       $titleDiv.append($titleLink),
                       $newItemsBadge,
                       $feedControls.append($prefsDiv, $reloadDiv));

    $feed.append($feedHeader, $feedBody);

    if (clickNew) {
      $feed.prependTo($column);
      PTL.dialog.feedPrefs($prefsIcon, true, isQueryString);
    } else {
      $feed.appendTo($column);
      $refreshIcon.click();
    }

  },
  lastItems:function(data, $dataStore) {

    // console.log('lastItems: %s (%s)');

    return new Promise((resolve, reject) => {

      const $feedBody = $dataStore.parent().next('div.feedBody'),
            $feedBodyUl = $('<ul>').attr('class', 'feedBody'),
            feedUrl = $dataStore.data('url'),
            nbItems = $dataStore.data('nbitems'),
            feedType = $dataStore.data('type');

      const l = PTL.util.getLocation(feedUrl),
            p = l.protocol ? l.protocol + '//' : '//',
            feedHost = p + l.hostname;

      var newItems = 0;
      var finalList;

      for (var key in data.feedItems) {
        newItems++;
        // console.log('YAAZ item:[%s], data[item]:[%s]', key, JSON.stringify(data.feedItems[key]));
        var item = data.feedItems[key];

        if (newItems == nbItems) return false;

        const $description = $.parseHTML(item.description),
              imgTypes = ['image',
                          'image/jpg',
                          'image/jpeg',
                          'image/gif',
                          'image/png'];

        var summary,
            imageUrl,
            videoUrl,
            videoType;

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
              $feedItem = $('<li>').attr('class', 'feedItem');

        var $image;

        if (summary && typeof summary !== 'undefined') {
          $feedItem.attr('title', $summary.trim());
        }

        const $tempDom = $('<null>').append($description);

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

            const videoPlayer      = document.createElement('video');
            videoPlayer.controls = 'controls';
            videoPlayer.src      = videoUrl;
            videoPlayer.type     = videoType;

            $itemDiv.append(videoPlayer);

            $videoLink
              .attr('href', item.enclosures[0].url)
              .appendTo($itemDiv);
            $videoIcon
              .attr('class', 'itemIcon icon-video')
              .appendTo($videoLink);
          }

          if (item.enclosures[0].url && item.enclosures[0].url.match(/\.(ogg|mp3)$/)) {

            const audioPlayer      = document.createElement('audio');
            audioPlayer.controls = 'controls';
            audioPlayer.src      = item.enclosures[0].url;
            audioPlayer.type     = item.enclosures[0].type;
            audioPlayer.preload  = PTL.prefs.readConfig('mediaPreload');

            $itemDiv.append(audioPlayer);

            $audioLink
              .attr('href', item.enclosures[0].url)
              .appendTo($itemDiv);
            $audioIcon
              .attr('class', 'itemIcon icon-audio')
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

        $tempDom.empty();

      }

      return resolve([$feedBodyUl.html(), newItems]);

    });

  },
  errorFeed:function(error, feedUrl) {


    const type = (error.statusText) ? error.statusText : PTL.tr('Unknown error');
    const status = (error.status) ? error.status : '0';
    const errno = (error.errno) ? error.errno : '0';
    // const message = (error.responseJSON.error.message) ? error.responseJSON.error.message : '';
    const message = 'plop';

    const $validateLink = $('<a>')
          .attr('href', 'https://validator.w3.org/feed/check.cgi?url=' + feedUrl);

    const $validateLinkIcon = $('<i>')
          .attr('class', 'itemIcon icon-w3c')
          .attr('title', PTL.tr('Validate /verify this feed file with the W3C'))
          .appendTo($validateLink);

    const $reportLink = $('<a>')
          .attr('href', 'https://framagit.org/yphil/petrolette/-/issues/new?issue[title]=Feed%20error&issue[description]=' + feedUrl + ' (' + type + ')');

    const $reportLinkIcon = $('<i>')
          .attr('class', 'itemIcon icon-petrolette')
          .attr('title', PTL.tr('Report feed error'))
          .appendTo($reportLink);

    const $errKey = $('<strong>')
          .attr('class', 'translate key')
          .data('content', PTL.tr('Error:'))
          .text(PTL.tr('Error:'));

    const $msgKey = $('<strong>')
          .attr('class', 'translate key')
          .data('content', PTL.tr('Message:'))
          .text(PTL.tr('Message:'));

    const $errValue = $('<strong>')
          .attr('class', 'value')
          .text(type + ' (' + status + ')');

    const $msgValue = $('<strong>')
          .attr('class', 'value')
          .text(message);

    const $errorLink = $('<a>')
          .attr('href', feedUrl)
          .text(feedUrl);

    const $errorButtonsFlexBox = $('<a>')
          .attr('class', 'translate flexBox');

    const $errorItem = $('<li>')
          .attr('class', 'feedItem error')
          .append($validateLink, $reportLink)
          .append($errKey)
          .append('&nbsp;')
          .append($errValue)
          .append('<br>')
          .append($msgKey)
          .append('&nbsp;')
          .append($msgValue);

    const $feedBodyUl = $('<ul>').attr('class', 'feedBody')
          .append($errorItem);

    return $feedBodyUl;

  },
  getit:function(feedUrl, lastItem, nbItems) {

    // console.log('getit: %s (%s)');

    return new Promise((resolve, reject) => {
      $.get("/feed", {
        url: feedUrl,
        dataType: 'json',
        lastItem: lastItem,
        nbItems: nbItems
      }).done(function(data, textStatus, jqXHR) {
        resolve(data);
      }).fail(function(jqXHR, textStatus, errorThrown) {
        reject(jqXHR);
      });
    });

  },
  populate:function($button, progress, newLimit) {

    const $dataStore = $button.parent().parent(),
          $refreshButton = $dataStore.find('i.feedRefresh'),
          $feedHeader = $dataStore.parent(),
          $badge = $feedHeader.find('.newItemsBadge'),
          $panel = $dataStore.parent().parent().parent(),
          $feed = $dataStore.parent().parent(),
          $feedTitle = $feed.children().children('.feedTitle'),
          $feedLink = $feedTitle.children('a'),
          $feedBody = $dataStore.parent().next('div.feedBody'),
          // $feedBodyUl = $feed.children().children('ul.feedBody'),
          $feedBodyUl = $('<ul>').attr('class', 'feedBody'),
          feedUrl = $dataStore.data('url'),
          feedName = $dataStore.data('name'),
          feedType = $dataStore.data('type'),
          feedLimit = newLimit || $dataStore.data('limit'),
          feedStatus = $dataStore.data('status'),
          feedIconHash = $dataStore.data('iconhash'),
          feedNbItems = $dataStore.data('nbitems'),
          feedLastItem = $dataStore.attr('data-lastitem'),
          $feedToggle = $feed.find('.feedToggle'),
          $feedIcon = $feed.find('.feedToggle > i.feedIcon'),
          $myFeedIcon = $feedToggle.find('.favicon');

    const l = PTL.util.getLocation(feedUrl),
          feedProtocol = l.protocol ? l.protocol + '//' : '//',
          feedHost = feedProtocol + l.hostname,
          dateObj = new Date(),
          timeStamp = dateObj.getUTCHours() + ":" + dateObj.getUTCMinutes() + ":" + dateObj.getUTCSeconds();

    var feedTitle;

    $feedIcon.addClass('fold');
    // $button.removeClass('spin');

    try {
      $myFeedIcon.attr('src', '/favicons/' + feedIconHash + '.favicon');
    } catch(error) {
      console.log('Fav: %s (%s)', error);
    }


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
        }

      }).fail(function(jqXHR, textStatus, errorThrown) {
        $feedIcon.addClass('icon-rss');
      });

    }

    if (feedName) {
      feedTitle = feedName;
    } else {
      feedTitle = feedUrl;
    }

    $feedLink.text(feedTitle)
      .attr('href', feedUrl)
      .attr('title', feedTitle + ' (' + feedUrl + ')');

    $feedLink.removeClass('danger');

    if ($dataStore.data('status') == 'on') {

      $feedIcon.removeClass('fold');
      $refreshButton.addClass('spin');

    } else {

      $dataStore
        .parent()
        .parent()
        .children('div.feedBody')
        .addClass('folded');

    }


    let request = indexedDB.open(PTL.DbName, PTL.DbVersion);
    var saved;
    var isSaved = false;

    request.onerror = function(event) {
      // Handle errors.
    };
    request.onsuccess = function(event) {
      var db = event.target.result;

      let transaction = db.transaction(PTL.DbStore, "readonly");
      let objectStore = transaction.objectStore(PTL.DbStore);
      let request = objectStore.get(feedUrl);
      request.onerror = function(event) {
        // Handle errors!
        console.log('I NEVER happen :(', JSON.stringify(event));
      };
      request.onsuccess = function(event) {

        console.log('event.result: %s (%s)', JSON.stringify(event.target.result));

        if (event.target.result) {

          saved = event.target.result.content;
          console.log('Kayn: [%s] (%s)', saved, feedUrl);
          isSaved = true;

          console.log('yo: %s (%s)', saved);

          if ($feedBody.is(':empty')) {
            $feedBody.append(saved);
          }

          PTL.feed.getit(feedUrl, feedLastItem, feedNbItems)
            .then(function(data) {

              // console.log('NEW items: %s (%s)', $feedBodyUl[1], feedUrl);

              PTL.feed.lastItems(data, $dataStore)
                .then((list) => {

                  var $feedBodyUl = list[0];

                  if (data.lastItem) {
                    try {
                      $dataStore.data('lastitem', data.lastItem);
                      // localStorage.setItem(feedUrl, $html);
                      PTL.tab.saveTabs();
                    } catch(error) {
                      console.log('CATCHED!: %s (%s)', error);
                    }
                  }

                  $badge.text(list[1]);

                  if (list[1] > 0) {
                    $feedBody.prepend($feedBodyUl[0]);
                    $badge.fadeIn('slow');
                  } else {
                    $badge.fadeOut('slow');
                  }

                  $refreshButton
                    .prop('title', PTL.tr('Refresh this feed (%1 - %2)', feedName || feedUrl, timeStamp) + ' (' + $feedBodyUl[1] + ' new items)' )
                    .removeClass('spin');

                })
                .catch();

            })
            .catch(function(error) {
              console.log('whoops: %s (%s)', JSON.stringify(error), feedUrl);
              $feedBody.empty().append(PTL.feed.errorFeed(error, feedUrl));
              $feedBody.css('height', '');

              $refreshButton.removeClass('spin');
            });

          // console.log('if: %s (%s)');


        } else {
          console.log('Makayn\'sh: %s (%s)', feedUrl);


          // console.log('else: %s (%s)');

          PTL.feed.getit(feedUrl, 'feedLastItem', feedNbItems)
            .then(function(data) {

              // console.log('YAAA: %s (%s)', JSON.stringify(data));

              if (feedName) {
                feedTitle = feedName;
              } else if (data.feedTitle) {
                feedTitle = data.feedTitle;
                $dataStore.data('name', feedTitle);
              }

              $feedLink.text(feedTitle)
                .attr('href', data.feedLink)
                .attr('title', feedTitle + ' (' + feedUrl + ')');

              if (data.lastItem) {
                // console.log('YEP: %s (%s)', data.lastItem);
                $dataStore.attr('data-lastitem', data.lastItem);
              }

              PTL.feed.lastItems(data, $dataStore).then((list) => {

                $feedBody.html(list[0]);

                let openRequest = indexedDB.open(PTL.DbName, PTL.DbVersion);

                $badge.text(list[1]);

                if (list[1] > 0) {
                  $badge.fadeIn('slow');
                } else {
                  $badge.fadeOut('slow');
                }

                $refreshButton
                  .prop('title', PTL.tr('Refresh this feed (%1 - %2)', feedName || feedUrl, timeStamp) + ' (' + $feedBodyUl[1] + ' new items)' )
                  .removeClass('spin');

                openRequest.onsuccess = function() {

                  let db = openRequest.result;

                  if (!db.objectStoreNames.contains(PTL.DbStore)) {
                    db.createObjectStore(PTL.DbStore, {keyPath: PTL.DbKey});
                  }

                  let transaction = db.transaction(PTL.DbStore, "readwrite");

                  let feeds = transaction.objectStore(PTL.DbStore);

                  let feed = {
                    url: feedUrl,
                    content: list[0]
                  };

                  let request = feeds.put(feed);

                  request.onsuccess = function() {
                    console.log("Feed added to the store: ", request.result);
                    console.log('ADDED: %s (%s)', request.result, list[0]);
                  };

                  request.onerror = function() {
                    console.log("Error: ", request.error);
                  };

                };

              });

              // const $html = $feedBody.html();
              // localStorage.setItem(feedUrl, $html);

            })
            .catch(function(error) {
              console.log('whoops: %s (%s)', JSON.stringify(error));
              $feedBody.empty().append(PTL.feed.errorFeed(error, feedUrl));
              $feedBody.css('height', '');

              $badge.fadeOut('fast');

              $refreshButton.removeClass('spin');
            });

        }
      };

    };

    // console.log('yolo: %s (%s)', isSaved, feedUrl);

    if (progress) progress.increment();

  }

};
