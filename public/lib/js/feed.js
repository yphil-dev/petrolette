MOB.feed = {

  make:function($tab, url, type, limit, clickNew, progress) {

    var feedIndex = $('#tabs').find('.feed').length;

    var $feedToggle = $('<i>')
        .attr('class', 'feedIcon rotate translate')
        .data('title', 'Fold / unfold')
        .attr('title', MOB.tr('Fold / unfold'));

    var $feedSelect = $('<i>')
        .attr('class', 'feedControl translate icon-check-empty-1 feedSelect')
        .data('title', 'Select this source')
        .attr('title', MOB.tr('Select this source'));

    var $feedDelete = $('<i>')
        .attr('class', 'feedControl translate icon-cancel-2 feedDelete dangerous')
        .data('title', 'Delete this source')
        .attr('title', MOB.tr('Delete this source'));

    var $feedPrefs = $('<i>')
        .attr('class', 'feedControl translate icon-cog-1 mobFeedPrefs')
        .data('title', 'Options')
        .attr('title', MOB.tr('Options'));

    var $feedReload = $('<i>')
        .attr('class', 'feedControl translate icon-arrows-cw mobFeedRefresh')
        .data('title', MOB.tr('Refresh %1', url))
        .attr('title', MOB.tr('Refresh %1', url));

    var $feedControls = $('<div>')
        .attr('class', 'feedControls dataStore')
        .data('id', 'feed-' + feedIndex)
        .data('index', feedIndex)
        .data('url', url)
        .data('type', type)
        .data('limit', limit);

    $feedToggle.click(function() {
      $(this).toggleClass("down");
      $(this).parent().parent().parent().children('div.feedBody').slideToggle(200);
    });

    $feedSelect.click(function() {
      $(this).parent().parent().parent().parent().toggleClass('selected ui-state-hover');
      $(this).toggleClass('icon-ok').toggleClass('icon-check-empty-1');
    });

    $feedDelete.click(function() {
      MOB.dialog.killFeed($(this));
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

    var $header = $('<div>')
        .attr('class', 'mobHeader ui-widget-header');

    var $toggleDiv = $('<div>')
        .attr('class', 'feedToggle');

    var $feedHandle = $('<div>')
        .attr('class', 'feedHandle');

    var $selectDiv = $('<div>')
        .attr('class', 'feedSelect collapsible');

    var $deleteDiv = $('<div>')
        .attr('class', 'feedDelete collapsible');

    var $titleDiv = $('<div>')
        .attr('class', 'feedTitle truncate');

    var $prefsDiv = $('<div>')
        .attr('class', 'prefs collapsible');

    var $reloadDiv = $('<div>')
        .attr('class', 'reload')
        .data('title', MOB.tr('Refresh %1', url))
        .attr('title', MOB.tr('Refresh %1', url));

    $feedToggle.appendTo($toggleDiv);

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
        // $(this).find('.feedControls').slideDown('fast');
        // $(this).find('.feedControls').show('slide', {direction: 'right'}, 100);

        // $(this).find('.feedControls').animate({'left': '0'}, 1000);

        var iconImg = $feedToggle.css('background-image');

        $feedToggle.addClass('arrow');

        $(this).data('img',iconImg);
      },
      function() {
        // $(this).find('.feedControls').hide('slide', {direction: 'right'}, 600);
        // $(this).find('.feedControls').animate({'left': '80px'}, 1000);

        $feedToggle.removeClass('arrow');

        if (typeof $(this).data('img') !== 'undefined') {
          $feedToggle.css('background-image', $(this).data('img'));
        } else {
          $feedToggle.addClass('generic');
        }
      }
    );

    var $nameSpan = $('<span>')
        .attr('class', 'title truncate')
        .text(url);

    var $urlSpan = $('<span>')
        .attr('class', 'url truncate')
        .text(url);

    $feedSelect.appendTo($selectDiv);
    $feedDelete.appendTo($deleteDiv);
    $nameSpan.appendTo($titleDiv);

    // $('<br>').appendTo($titleDiv);
    // $urlSpan.appendTo($titleDiv);

    $feedPrefs.appendTo($prefsDiv);
    $feedReload.appendTo($reloadDiv);

    $toggleDiv.appendTo($header);

    $feedHandle.appendTo($header);

    $titleDiv.appendTo($header);

    $selectDiv.appendTo($feedControls);
    $deleteDiv.appendTo($feedControls);
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
        $feedTitle = $feed.find('span.title'),
        $feedBody = $feed.children().children('ul.feedBody'),
        feedUrl = $dataStore.data('url'),
        feedType = $dataStore.data('type'),
        feedLimit = $dataStore.data('limit'),
        $feedIcon = $feed.find('.feedToggle > i');

    if (!MOB.utilities.isUrl(feedUrl)) {

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

      // console.log( '\nALWAYS for %s: %s (status: %s)', feedHost, JSON.stringify(icon), status);
    });

    $.get("/feed", {
      feedurl: feedUrl,
      dataType: 'json'
    }, function() {

      $feedBody.empty();

    }).done(function(data) {
      $feedTitle.text(data.feedTitle);

      // console.log( "\nDATA: (%s)", JSON.stringify(data.error));

      if (data.error) {
        console.info('bad Feed: (%s) error: %s', feedUrl, data.error);
        $header.addClass('ui-state-error');

        $feedTitle
          .text(MOB.tr("Error"))
          .addClass('translate')
          .data('content', MOB.tr("Error"));

        $feedBody
          .html('<li class="feedItem"><strong class="translate" data-content="' + MOB.tr("Error") + '">' + MOB.tr("Error") + '</strong> <a class="error" href="' + feedUrl + '">' + feedUrl + '</a> ("' + data.error  + '")</li>');

        return;

      }

      $.each(data.feedItems, function(index, item) {

        if (index == parseInt(feedLimit)) {
          return false;
        }

        var $description = $.parseHTML(item.description);

        var mediaUrl;

        if (item['media:group']) {
          var myArray = item['media:group']['media:content'];
          for (var i = 0; i < myArray.length; i++) {
            if (myArray[i]['@'].url) {
              mediaUrl = myArray[i]['@'].url;
            }
          }
        }

        var $tempDom = $('<output>').append($description);

        if (typeof $tempDom.find('img').attr('src') !== 'undefined') {
          mediaUrl = $tempDom.find('img').attr('src');
        }

        if (typeof item.image.url !== 'undefined') {
          mediaUrl = item.image.url;
        }

        if (item.enclosures[0]) {
          mediaUrl = item.enclosures[0].url;
        }

        // console.log('S: %s', item.summary)
        var summary = $('<p>').append(item.summary).text();

        var $feedItem = $('<li class="feedItem">').attr('title', summary.trim());
        var $itemDiv = $('<div class="feedItem">');


        // var $itemDiv = $('<div>')
        //     .attr('class', 'feedItem ui-helper-clearfix');

        // var $itemLink = $('<a>')
        //     .attr('target', '_blank')
        //     .attr('class', 'feedItem ui-helper-clearfix')
        //     .attr('href', item.link)
        //     .append(item.title);

        // var $mediaLink = $('<a>')
        //     .css("display", "inline")
        //     .attr('href', mediaUrl);

        // if (index % 2 === 0) {
        //   $feedItem.addClass('mobFeedEven');
        // }

        // if (mediaUrl && mediaUrl[0] == "/") {
        //   mediaUrl = feedHost + mediaUrl;
        // }

        // if (mediaUrl && mediaUrl !== 'null' && typeof mediaUrl !== 'undefined') {

        //   var $media;

        //   if (mediaUrl.match(/\.mp3$/)) {

        //     $media = $('<span>')
        //       .attr('class', 'media icon-volume-down')
        //       .css("display", "inline-block")
        //       .appendTo($mediaLink);

        //   } else {

        //     $mediaLink.attr('data-fancybox', 'gallery')
        //       .attr('data-fancybox-group', $panel.attr('id'))
        //       .attr('data-caption', item.title);

        //     $media = $('<img>').attr('src', mediaUrl)
        //       .appendTo($mediaLink);
        //   }

        //   if (feedType == 'photo')
        //     $media.addClass('full');

        // }

        // if (feedType !== 'text')
        //   $mediaLink.appendTo($itemDiv);

        var $itemLink = $('<a>')
            .attr('target', '_blank')
            .attr('class', 'ui-helper-clearfix')
            .attr('href', item.link)
            .append(item.title);

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

        $itemLink.appendTo($itemDiv);
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
