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
            // var plop = $(this).parent().parent().parent().next('div.feedBody').find('li').lengh;
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

        // if (newItems == nbItems) return false;

        const $description = $.parseHTML(item.description),
              imgTypes = ['image',
                          'image/jpg',
                          'image/jpeg',
                          'image/gif',
                          'image/png'];

        var summary,
            imageUrl,
            audioUrl,
            audioType,
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

          if (item.enclosures[0].url && item.enclosures[0].url.match(/\.(ogg|mp3)$/)) {
            audioUrl = item.enclosures[0].url;
            audioType = item.enclosures[0].type;
          }

          if (videoUrl && videoType) {
            PTL.feed.appendVideoPlayer($itemDiv, videoUrl, videoType);
          }

          if (audioUrl && audioType) {
            PTL.feed.appendAudioPlayer($itemDiv, audioUrl, audioType);
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
  appendAudioPlayer:function($itemDiv, audioUrl, audioType) {

    const $audioLink = $('<a>').attr('target', '_blank').attr('class', 'audioLink'),
          $audioIcon = $('<i>'),
          audioPlayer      = document.createElement('audio');

    audioPlayer.controls = 'controls';
    audioPlayer.src      = audioUrl;
    audioPlayer.type     = audioType;
    audioPlayer.preload  = PTL.prefs.readConfig('mediaPreload');

    $itemDiv.append(audioPlayer);

    $audioLink
      .attr('href', audioUrl)
      .appendTo($itemDiv);
    $audioIcon
      .attr('class', 'itemIcon icon-audio')
      .appendTo($audioLink);

  },
  appendVideoPlayer:function($itemDiv, videoUrl, videoType) {

    const videoPlayer    = document.createElement('video'),
          $videoIcon = $('<i>'),
          $videoLink = $('<a>').attr('target', '_blank').attr('class', 'videoLink');

    videoPlayer.controls = 'controls';
    videoPlayer.src      = videoUrl;
    videoPlayer.type     = videoType;
    videoPlayer.preload  = PTL.prefs.readConfig('mediaPreload');

    $itemDiv.append(videoPlayer);

    $videoLink
      .attr('href', videoUrl)
      .appendTo($itemDiv);
    $videoIcon
      .attr('class', 'itemIcon icon-video')
      .appendTo($videoLink);

    return $itemDiv;

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
  fetchIcon:function(feedHost) {

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
  fetchFeed:function(feedUrl, lastItem, nbItems) {

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
          $refreshButton = $dataStore.find('i.feedRefresh').addClass('spin'),
          $feedHeader = $dataStore.parent(),
          $badge = $feedHeader.children('.newItemsBadge'),
          $feed = $dataStore.parent().parent(),
          $feedTitle = $feedHeader.children('.feedTitle'),
          $feedLink = $feedTitle.children('a'),
          $feedBody = $dataStore.parent().next('div.feedBody'),
          $feedBodyUl = $feedBody.find('ul.feedBody'),
          feedUrl = $dataStore.data('url'),
          feedName = $dataStore.data('name'),
          feedType = $dataStore.data('type'),
          feedLimit = newLimit || $dataStore.data('limit'),
          feedStatus = $dataStore.data('status'),
          feedIconHash = $dataStore.data('iconhash'),
          feedNbItems = $dataStore.data('nbitems'),
          feedLastItem = $dataStore.attr('data-lastitem') || '',
          $feedToggle = $feedHeader.children('.feedToggle'),
          $feedIcon = $feedToggle.children('.feedIcon').addClass('fold'),
          $favIcon = $feedToggle.children('.favicon');

    const l = PTL.util.getLocation(feedUrl),
          feedProtocol = l.protocol ? l.protocol + '//' : '//',
          feedHost = feedProtocol + l.hostname,
          dateObj = new Date(),
          timeStamp = dateObj.getUTCHours() + ":" + dateObj.getUTCMinutes() + ":" + dateObj.getUTCSeconds();

    var feedTitle;

    $feedBodyUl.css('border', '1px solid red');

    if ($dataStore.data('status') == 'on') {
      $feedIcon.removeClass('fold');
    } else {
      $dataStore
        .parent()
        .parent()
        .children('div.feedBody')
        .addClass('folded');
    }

    if (feedIconHash) {
      $favIcon.attr('src', '/favicons/' + feedIconHash + '.favicon');
    } else {
      PTL.feed.fetchIcon(feedHost).then((iconhash) => {
        if (iconhash) {
          $favIcon.attr('src', '/favicons/' + iconhash + '.favicon');
          $dataStore.data('iconhash', iconhash);
          PTL.tab.saveTabs();
        }
      }).catch((error) => {
        console.log('error: %s (%s)',error);
        $favIcon.addClass('icon-rss');
      });
    }

    feedTitle = (feedName) ? feedName : feedUrl;
    $feedLink.text(feedTitle)
      .attr('href', feedUrl)
      .attr('title', feedTitle + ' (' + feedUrl + ')')
      .removeClass('danger');

    let request = indexedDB.open(PTL.DbName, PTL.DbVersion);

    request.onerror = function(event) {
      PTL.util.say(PTL.tr('DataBase error: %1', event.target.error), 'error');
    };

    request.onsuccess = async function(event) {

      let readFeed = await PTL.db.readFeed(url);

      if (readFeed) {

        let lastiItems = await PTL.feed.lastiItems(readFeed);

        let fetchFeed = await PTL.feed.fetchFeed(readFeed, lastItem);

        if (fetchFeed) {

          let lastItems = await PTL.feed.lastItems(fetchFeed[0]);
          PTL.db.putFeed(lastItems);

        }

      } else {
        let fetchFeed = await PTL.feed.fetchFeed(url, lastItem);
        let lastItems = await PTL.feed.lastItems(fetchFeed);
        PTL.db.putFeed(lastItems);
      }

      var db = event.target.result;
      let ReadTransaction = db.transaction(PTL.DbStore, "readonly");
      let objectStore = ReadTransaction.objectStore(PTL.DbStore);
      let request = objectStore.get(feedUrl);

      request.onerror = function(event) {
        PTL.util.say(PTL.tr('DataBase error: %1', event.target.error), 'error');
      };

      request.onsuccess = function(event) {

        if (event.target.result) {

          console.log('yeah!: %s (%s)');

          $feedBody.html(event.target.result.content);

          PTL.feed.fetchFeed(feedUrl, feedLastItem).then((data) => {

            // console.log('Kayn: %s (%s)', JSON.stringify(data.thereArenewItems));

            if (data.lastItem) {
              console.log('YEP: %s (%s)', data.lastItem);
              $dataStore.attr('data-lastitem', data.lastItem);
            }

            PTL.feed.lastItems(data, $dataStore).then((itemList) => {

              console.log('itemList: %s (%s)', JSON.stringify(itemList));

              var $newFeedBodyUl = $(itemList[0]);

              if (data.lastItem) {
                try {
                  $dataStore.data('lastitem', data.lastItem);
                } catch(error) {
                  console.log('lastItems error: %s (%s)', error);
                }
              }

              console.log('Kayn, but thereArenewItems: (%s)', JSON.stringify(data.thereArenewItems));

              if (data.thereArenewItems) {

                $feedBody.prepend($newFeedBodyUl);
                $badge.fadeIn('slow').text(itemList[1]);

                let ReadTransaction = db.transaction(PTL.DbStore, "readwrite"),
                    feeds = ReadTransaction.objectStore(PTL.DbStore),
                    feed = {url: feedUrl, content: $feedBody.html()},
                    WriteRequest = feeds.put(feed);

                WriteRequest.onsuccess = function() {
                  console.log("Feed added to the store: (%s) (%s)", feedUrl, request.result);
                  PTL.tab.saveTabs();
                };

                WriteRequest.onerror = function(event) {
                  PTL.util.say(PTL.tr('DataBase error: %1', event.target.error), 'error');
                };

              } else {
                $badge.fadeOut('slow');
              }

              $refreshButton
                .prop('title', PTL.tr('Refresh this feed (%1 - %2)', feedName || feedUrl, timeStamp) + ' (' + $newFeedBodyUl[1] + ' new items)' )
                .removeClass('spin');

            }).catch();

          }).catch(function(error) {
            console.log('whoops: %s (%s)', JSON.stringify(error), feedUrl);
            $feedBody.empty().append(PTL.feed.errorFeed(error, feedUrl));
            $feedBody.css('height', '');

            $refreshButton.removeClass('spin');
          });

        } else {

          // console.log('Makayn\'sh: [%s] (%s)', feedLastItem, feedUrl);

          PTL.feed.fetchFeed(feedUrl, 'noLastItem').then(function(data) {

            console.log('MaKaynash, but thereArenewItems: (%s)', JSON.stringify(data.thereArenewItems));

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
              console.log('YEP: %s (%s)', data.lastItem);
              $dataStore.attr('data-lastitem', data.lastItem);
            }

            PTL.feed.lastItems(data, $dataStore).then((itemList) => {

              $feedBody.html(itemList[0]);

              $badge.text(itemList[1]);

              if (itemList[1] > 0) {
                $badge.fadeIn('slow');
              } else {
                $badge.fadeOut('slow');
              }

              $refreshButton
                .prop('title', PTL.tr('Refresh this feed (%1 - %2)', feedName || feedUrl, timeStamp) + ' (' + itemList[1] + ' new items)' )
                .removeClass('spin');

              let request = indexedDB.open(PTL.DbName, PTL.DbVersion);

              request.onsuccess = (event) => {

                let db = event.target.result;

                if (!db.objectStoreNames.contains(PTL.DbStore)) {
                  db.createObjectStore(PTL.DbStore, {keyPath: PTL.DbKey});
                }

                let transaction = db.transaction(PTL.DbStore, "readwrite"),
                    feeds = transaction.objectStore(PTL.DbStore),
                    feed = {url: feedUrl, content: itemList[0]},
                    request = feeds.put(feed);

                request.onsuccess = function() {
                  console.log("Feed added to the store: ", request.result);
                };

                request.onerror = function(event) {
                  PTL.util.say(PTL.tr('DataBase error: %1', event.target.error), 'error');
                };

              };

            });

          })
            .catch(function(error) {
              console.log('whoops: %s (%s)', JSON.stringify(error));
              $feedBody
                .empty()
                .append(PTL.feed.errorFeed(error, feedUrl))
                .css('height', '');
              $badge.fadeOut('fast');
              $refreshButton.removeClass('spin');
            });

        }
      };

    };

    if (progress) progress.increment();

  }

};
