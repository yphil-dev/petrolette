MOB.feed = {

  make:function($tab, url, type, limit, clickNew, progress) {

    var feedIndex = $('#tabs').find('.feed').length;

    var $feedToggle = $('<i>')
        .attr('class', 'feedIcon rotate translate')
        .data('title', 'Fold / unfold')
        .attr('title', MOB.tr('Fold / unfold'));

    var $controlsToggle = $('<i>')
        .attr('class', 'feedControl icon-left-open rotate')
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

    var $feedControls = $('<div>').attr('class', 'feedControls dataStore')
        .data('id', 'feed-' + feedIndex)
        .data('index', feedIndex)
        .data('url', url)
        .data('type', type)
        .data('limit', limit);

    $feedToggle.click(function() {
      $(this).toggleClass("down");
      $(this).parent().parent().parent().children('div.feedBody').slideToggle(200);
      // return false;
    });

    $feedSelect.click(function() {
      $(this).parent().parent().parent().parent().toggleClass('selected ui-state-hover');
      $(this).toggleClass('icon-ok').toggleClass('icon-check-empty-1');
      // return false;
    });

    $feedDelete.click(function() {
      MOB.dialog.killFeed($(this));
      // return false;
    });

    $feedPrefs.click(function() {
      MOB.dialog.feedPrefs($(this));
      // return false;
    });

    $feedReload.click(function() {
      MOB.feed.populate($(this), progress);
      // return false;
    });

    var $feedBody = $('<div>')
        .attr('class', 'feedBody ui-widget-content');

    var $feedBodyUl = $('<ul>')
        .attr('class', 'feedBody');

    var $feed = $('<li id="feed-' + feedIndex + '" class="feed ui-widget" data-url="' + url + '" data-type="' + type + '" data-limit="' + limit + '"></li>');

    var $header = $('<div class="mobHeader ui-widget-header">');
    var $toggleDiv = $('<div class="feedToggle">');
    var $controlsToggleDiv = $('<div class="controlsToggle">');
    var $myControlsToggleDiv = $('<div class="myControlsToggleDiv">');

    var $selectDiv = $('<div class="feedSelect">');
    var $deleteDiv = $('<div class="feedDelete">');
    var $titleDiv = $('<div class="feedTitle truncate" data-content="">');
    var $prefsDiv = $('<div class="prefs">');
    var $reloadDiv = $('<div class="reload" title="Click to reload ' + url + '">');

    $feedToggle.appendTo($toggleDiv);

    $myControlsToggleDiv.click(function() {

      var $controls = $(this).next();

      $('.feedControls').not($controls).removeClass('flexGrow');
      $controls.toggleClass('flexGrow');

      $(this).toggleClass('open');

    });

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

    $feedSelect.appendTo($selectDiv);
    $feedDelete.appendTo($deleteDiv);
    $titleDiv.html(url);
    $feedPrefs.appendTo($prefsDiv);
    $feedReload.appendTo($reloadDiv);

    $toggleDiv.appendTo($header);
    $titleDiv.appendTo($header);

    $controlsToggle.appendTo($myControlsToggleDiv);
    $myControlsToggleDiv.appendTo($header);

    // $controlsToggleDiv.appendTo($feedControls);
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
      // $feedPrefs.click()
      MOB.dialog.feedPrefs($feedPrefs, true);
    } else {
      $feed.appendTo($tab);
      $feedReload.click();
    }

  },
  populate:function($button, progress) {

    var $dataStore = $button.parent().parent();
    var $refreshButton = $dataStore.find('i.mobFeedRefresh');
    var $header = $dataStore.parent();
    var $panel = $dataStore.parent().parent().parent();

    // var $feed = $('#' + id);
    // var $feed = $('#' + $dataStore.data('id'));
    var $feed = $dataStore.parent().parent();

    var $feedTitle = $feed.children().children('.feedTitle');
    var $feedBody = $feed.children().children('ul.feedBody');

    var feedUrl = $dataStore.data('url');
    var feedType = $dataStore.data('type');
    var feedLimit = $dataStore.data('limit');

    var $feedIcon = $feed.find('.feedToggle > i');

    if (!MOB.utilities.isUrl(feedUrl)) {

      // MOB.utilities.feedError($feed, 'dOh!');


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

    // const myurl = new URL(feedUrl);
    const subdomain = l.hostname.substr(0, l.hostname.indexOf('.'));

    if (subdomain === 'rss' || subdomain === 'feeds') {
      feedHost = l.protocol + '//' + l.hostname.replace(subdomain + '.', '')
    }

    // console.log('HOST: (%s)', feedHost);

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

        var imageUrl;

        if (item['media:group']) {
          var myArray = item['media:group']['media:content'];
          for (var i = 0; i < myArray.length; i++) {
            if (myArray[i]['@'].url) {
              imageUrl = myArray[i]['@'].url;
            }
          }
        }

        var $tempDom = $('<output>').append($description);

        if (typeof $tempDom.find('img').attr('src') !== 'undefined') {
          imageUrl = $tempDom.find('img').attr('src');
        }

        if (typeof item.image.url !== 'undefined') {
          imageUrl = item.image.url;
        }

        if (item.enclosures[0]) {
          imageUrl = item.enclosures[0].url;
        }

        // console.log('S: %s', item.summary)
        var summary = $('<p>').append(item.summary).text();

        var $feedItem = $('<li class="feedItem">').attr('title', summary.trim());
        var $itemDiv = $('<div class="feedItem">');
        var $itemLink = $('<a>')
            .attr('target', '_blank')
            .attr('class', 'ui-helper-clearfix')
            .attr('href', item.link)
            .append(item.title);

        var $itemSpan = $('<span>')
            .attr('class', 'truncate ui-helper-clearfix')
            .text(summary.trim());

        if (index % 2 === 0) {
          $feedItem.addClass('mobFeedEven');
        }

        if (imageUrl && imageUrl[0] == "/") {
          imageUrl = feedHost + imageUrl;
        }

        if (typeof imageUrl !== 'undefined') {
          var $imgLink = $('<a>')
              .attr('href', imageUrl)
              .attr('data-fancybox', 'gallery')
              .attr('data-fancybox-group', $panel.attr('id'))
              .attr('data-caption', item.title);

          var $itemImg = $('<img>').attr('src', imageUrl)
              .appendTo($imgLink);

          if (feedType == 'photo')
            $itemImg.addClass('full');

          if (feedType !== 'text')
            $imgLink.appendTo($itemDiv);
        }

        // $itemSpan.appendTo($itemLink);
        $itemLink.appendTo($itemDiv);
        // $itemSpan.appendTo($itemDiv);
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
