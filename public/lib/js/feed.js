var Feed = (function () {
  return {
    newFeed: function ($tab, url, type, limit, clickNew, progress) {
      var feedIndex = $('#tabs').find('.feed').length

      var $feedToggle = $('<i class="feedIcon rotate" title="Click to fold/unfold">').click(function () {
        $(this).toggleClass('down')
        $(this).parent().parent().parent().children('div.feedBody').slideToggle(200)
        return false
      })

      var $feedSelect = $('<i title="Select feed" class="icon-check-empty-1 feedSelect feedControl">').button()
      var $feedDelete = $('<i title="Delete feed" class="icon-trash feedDelete feedControl">').button()
      var $feedPrefs = $('<i title="Feed preferences" class="icon-cog mobFeedPrefs feedControl">').button()
      var $feedReload = $('<i class="icon-arrows-cw mobFeedRefresh feedControl">').button()

      var $feedIcon = $('<i title="Toggle feed" class="feedFavicon feedControl">')
      $feedIcon.button()

      var $feedControls = $('<div class="feedControls">')

      $feedControls.data('test', 'plop')
        .data('id', 'feed-' + feedIndex)
        .data('index', feedIndex)
        .data('url', url)
        .data('type', type)
        .data('limit', limit)

      $feedDelete.click(function () {
        Dialog.killFeed($(this))
        return false
      })

      $feedReload.click(function () {
        Feed.populateFeed($(this), progress)
        return false
      })

      $feedSelect.click(function () {
        $(this).parent().parent().parent().parent().toggleClass('selected ui-state-hover')
        $(this).toggleClass('icon-ok').toggleClass('icon-check-empty-1')
        return false
      })

      $feedPrefs.click(function () {
        Dialog.feedPrefs($(this))
        return false
      })

      var $feedBody = $('<div class="feedBody ui-widget-content">')
      var $feedBodyUl = $('<ul class="feedBody">')

      var $feed = $('<li id="feed-' + feedIndex + '" class="feed ui-widget" data-url="' + url + '" data-type="' + type + '" data-limit="' + limit + '"></li>')

      var $header = $('<div class="mobHeader ui-widget-header">')

      var $toggleDiv = $('<div class="feedToggle">')
      var $selectDiv = $('<div class="feedSelect">')
      var $deleteDiv = $('<div class="feedDelete">')
      var $titleDiv = $('<div class="feedTitle truncate">')
      var $prefsDiv = $('<div class="prefs">')
      var $reloadDiv = $('<div class="reload" title="Click to reload ' + url + '">')

      $feedToggle.appendTo($toggleDiv)

      $header.hover(
        function () {
          var iconImg = $feedToggle.css('background-image')

          $feedToggle.addClass('arrow')

          $(this).data('img', iconImg)

          $(this).find('.feedControls').slideDown('fast')
          $feedToggle.css('background-image', 'url("/static/images/feed-toggle-triangle.png")')
        },
        function () {
          $(this).find('.feedControls').slideUp('slow')

          $feedToggle.removeClass('arrow')

          if (typeof $(this).data('img') !== 'undefined') {
            $feedToggle.css('background-image', $(this).data('img'))
          } else {
            $feedToggle.css('background-image', 'url("/static/images/feed-generic-rss.png")')
          }
        }
      )

      $feedSelect.appendTo($selectDiv)
      $feedDelete.appendTo($deleteDiv)
      $titleDiv.html(url)
      $feedPrefs.appendTo($prefsDiv)
      $feedReload.appendTo($reloadDiv)

      $toggleDiv.appendTo($header)
      $titleDiv.appendTo($header)
      $selectDiv.appendTo($feedControls)
      $deleteDiv.appendTo($feedControls)
      $prefsDiv.appendTo($feedControls)
      $reloadDiv.appendTo($feedControls)

      $feedControls.appendTo($header)

      $feedBodyUl.appendTo($feedBody)

      $header.appendTo($feed)
      $feedBody.appendTo($feed)

      if (clickNew) {
        $feed.prependTo($tab)
        // $feedPrefs.click()
        Dialog.feedPrefs($feedPrefs, true)
      } else {
        $feed.appendTo($tab)
        $feedReload.click()
      }
    },
    populateFeed: function ($button, progress) {
      var $dataStore = $button.parent().parent()
      var $refreshButton = $dataStore.find('.mobFeedRefresh')
      var $header = $dataStore.parent()
      var $panel = $dataStore.parent().parent().parent()

      var getLocation = function (href) {
        var l = document.createElement('a')
        l.href = href
        return l
      }

      // var $feed = $('#' + id);
      var $feed = $('#' + $dataStore.data('id'))

      var $feedTitle = $feed.children().children('.feedTitle')
      var $feedBody = $feed.children().children('ul.feedBody')

      var feedUrl = $dataStore.data('url')
      var feedType = $dataStore.data('type')
      var feedLimit = $dataStore.data('limit')

      var $feedIcon = $feed.find('.feedToggle > i')

      var l = getLocation(feedUrl)

      var feedHost = l.protocol + '//' + l.hostname

      $refreshButton.addClass('spinner')
      $feed.children('.mobHeader').removeClass('ui-state-error')

      $.get('/feedicon', {
        url: decodeURI(feedHost),
        dataType: 'json',
        timeout: 2000
      }, function (icon, status) {
        if (!icon || icon.length === 0) icon = '/static/images/feed-generic-rss.png'
      }).done(function (icon, status) {
        // console.log( 'DONE %s OK (status %s)',  icon, status);
        $feedIcon.css('background-image', 'url("' + icon + '")')
        $header.data('img', icon)
      }).fail(function (icon, status) {
        // console.log( 'FAVICON %s ERROR (status: %s)',  feedHost, status);
        $feedIcon.css('background-image', 'url("/static/images/feed-generic-rss.png")')
      }).always(function (icon, status) {

        // console.log( '\nALWAYS for %s: %s (status: %s)', feedHost, JSON.stringify(icon), status);
      })

      $.get('/feed', {
        feedurl: feedUrl,
        dataType: 'json'
      }, function (data, status) {
        $feedBody.empty()
      }).done(function (data) {
        $feedTitle.text(data.feedTitle)

        // console.log( "\nLimit: (%s)", feedLimit);

        $.each(data.feedItems, function (index, item) {
          if (index === parseInt(feedLimit)) {
            return false
          }

          // console.log( "\n\nItem (%s)", item.enclosures[0].url);

          var $description = $.parseHTML(item.description)
          // console.log( "Title: (%s)", item.title);

          var $tempDom = $('<output>').append($description)

          var imageUrl

          if (typeof $tempDom.find('img').attr('src') !== 'undefined') {
            imageUrl = $tempDom.find('img').attr('src')
          }

          if (typeof item.image.url !== 'undefined') {
            imageUrl = item.image.url
          }

          if (item.enclosures[0]) {
            imageUrl = item.enclosures[0].url
          }

          // console.log('S: %s', item.summary)
          var summary = $('<p>').append(item.summary).text()

          var $feedItem = $('<li class="feedItem">').attr('title', summary.trim())
          var $itemDiv = $('<div class="feedItem">')
          var $itemLink = $('<a class="ui-helper-clearfix">')
            .attr('href', item.link)
            .append(item.title)

          if (index % 2 === 0) {
            /* we are even */
            $feedItem.addClass('mobFeedEven')
          }

          if (imageUrl && imageUrl[0] === '/') {
            imageUrl = feedHost + imageUrl
          }

          if (typeof imageUrl !== 'undefined') {
            var $imgLink = $('<a>').attr('href', imageUrl)
              .attr('data-fancybox', 'gallery')
              .attr('data-fancybox-group', $panel.attr('id'))
              .attr('data-caption', item.title)
            // var $itemImg = $('<img src="' + imageUrl + '" onError="this.onerror=null;this.src=\'/static/images/broken-image.png\';" />')

            var $itemImg = $('<img>').attr('src', imageUrl)
              .appendTo($imgLink)

            if (feedType === 'photo') { $itemImg.addClass('full') }

            if (feedType !== 'text') { $imgLink.appendTo($itemDiv) }
          }

          $itemLink.appendTo($itemDiv)
          $itemDiv.appendTo($feedItem)
          $feedItem.appendTo($feedBody)
        })
      }).fail(function () {
        $refreshButton.removeClass('spinner')

        // console.log( "error" );
        $header.addClass('ui-state-error')
        $feedTitle.text('Error')
        $feedBody.html('<li class="feedItem"><strong>Feed Error</strong> (' + feedUrl + ')</li>')
      }).always(function () {
        if (progress) {
          progress.increment()
        }

        $refreshButton.removeClass('spinner')
      })
    }
  }
}())
