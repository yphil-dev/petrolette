var Feed = (function() {

    return {
        newFeed:function($tab, url, type, limit, clickNew, progress) {

            var feedIndex = $('#tabs').find('.feed').length;

            var $feedToggle = $('<i class="feedIcon rotate">').click(function() {
                $(this).toggleClass("down");
                $(this).parent().parent().parent().children('div.feedBody').slideToggle(200);
            });

            var $feedSelect = $('<i title="Select feed" class="icon-check-empty-1 feedSelect feedControl">').button();
            var $feedDelete = $('<i title="Delete feed" class="icon-trash feedDelete feedControl">').button();
            var $feedPrefs = $('<i title="Feed preferences" class="icon-cog mobFeedPrefs feedControl">').button();
            var $feedReload = $('<i title="Reload feed" class="icon-arrows-cw mobFeedRefresh feedControl">').button();

            var $feedIcon = $('<i title="Toggle feed" class="feedFavicon feedControl">').button();

            var $title = $('<span class="truncate">' + url + '<span>');
            var $feedControls = $('<div class="feedControls">');

            $feedControls.data('test', 'plop')
                         .data('id', 'feed-' + feedIndex)
                         .data('index', feedIndex)
                         .data('url', url)
                         .data('type', type)
                         .data('limit', limit);

            $feedDelete.click(function() {
                Dialog.killFeed($(this));
            });

            $feedReload.click(function() {
                Feed.populateFeed($(this), progress);
            });

            $feedSelect.click(function() {
                $(this).toggleClass('icon-ok').toggleClass('icon-check-empty-1');
            });

            $feedPrefs.click(function() {
                Dialog.feedPrefs($(this));
            });

            var $feedBody = $('<div class="feedBody ui-widget-content">');
            var $feedBodyUl = $('<ul class="feedBody">');

            var $feed = $('<li id="feed-' + feedIndex + '" class="feed ui-widget" data-url="' + url + '" data-type="' + type + '" data-limit="' + limit + '"></li>');

            var $header = $('<div class="mobHeader ui-widget-header">');
            var $feedIcon = $('<div class="feedIcon">');

            var $toggleDiv = $('<div class="feedToggle">');
            var $selectDiv = $('<div class="feedSelect">');
            var $deleteDiv = $('<div class="feedDelete">');
            var $titleDiv = $('<div class="feedTitle truncate">');
            var $prefsDiv = $('<div class="prefs">');
            var $reloadDiv = $('<div class="reload">');

            $feedToggle.appendTo($toggleDiv);

            $header.hover (
                function() {
                    var iconImg = $feedToggle.css('background-image');

                    console.log('IMG: (%s)', iconImg);

                    $(this).data('img',iconImg);

                    $(this).find('.feedControls').slideDown();
                    $feedToggle.css('background-image', 'url("/static/images/feed-toggle-triangle.png")')
                },
                function() {
                    $(this).find('.feedControls').slideUp();

                    if (typeof  $(this).data('img') !== 'undefined') {
                        $feedToggle.css('background-image', $(this).data('img'))
                    } else {
                        $feedToggle.css('background-image', 'url("/static/images/feed-generic-rss.png")')
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
            $selectDiv.appendTo($feedControls);
            $deleteDiv.appendTo($feedControls);
            $prefsDiv.appendTo($feedControls);
            $reloadDiv.appendTo($feedControls);

            $feedControls.appendTo($header);

            $feedBodyUl.appendTo($feedBody)

            $header.appendTo($feed);
            $feedBody.appendTo($feed);

            if (clickNew) {
                $feed.prependTo($tab);
                // $feedPrefs.click()
                Dialog.feedPrefs($feedPrefs, true);
            } else {
                $feed.appendTo($tab);
                $feedReload.click();
            }

        },
        populateFeed:function($button, progress) {

            var $dataStore = $button.parent().parent();
            var $refreshButton = $dataStore.find('.mobFeedRefresh');

            var r = new RegExp('^(?:[a-z]+:)?//', 'i');

            var getLocation = function(href) {
                var l = document.createElement("a");
                l.href = href;
                return l;
            }

            // var $feed = $('#' + id);
            var $feed = $('#' + $dataStore.data('id'))

            var $feedTitle = $feed.children().children('.feedTitle');
            var $feedBody = $feed.children().children('ul.feedBody');

            var feedIndex = $dataStore.data('index');
            var feedUrl = $dataStore.data('url');
            var feedType = $dataStore.data('type');
            var feedLimit = $dataStore.data('limit');

            var $feedIcon = $feed.find('.feedToggle > i')

            var l = getLocation(feedUrl)

            var feedHost = l.protocol + '//' + l.hostname
            // console.debug('$feedToggle: ' + $toggleDiv.attr('class'))

            $refreshButton.addClass('spinner')
            $feed.children('.mobHeader').removeClass('ui-state-error')

            var cleanUrl = feedUrl.substring(0, feedUrl.lastIndexOf("/") + 1);

            // $.get("/favicon", {
            //     url: decodeURI(feedUrl),
            //     dataType: "json",
            //     timeout: 3000
            // }, function(icon, status) {

            // })
            //  .done(function(icon, status) {
            //      console.log( 'FAVICON %s OK (status %s)',  icon, status);
            //  })
            //  .fail(function(icon, status) {
            //      console.log( 'FAVICON %s ERROR (status %s)',  feedHost, status);
            //  })
            //  .always(function(icon, status) {
            //      console.log(  'FAVICON %s DONE (status %s)',  icon, status);
            //  });

            console.log('H: (%s)', feedHost);

            $.get("/feedicon", {
                url: decodeURI(feedHost),
                dataType: "json",
                timeout: 3000
            }, function(icon, status) {

                console.log( 'GOT for %s: %s (status: %s)', decodeURI(feedHost), JSON.stringify(icon), status);

                if (!icon)
                    console.log('NULL')

                if (icon.length === 0)
                    console.log('LENGHT')

                if ( !icon || icon.length === 0) icon = '/static/images/feed-generic-rss.png';

                icon = '/static/images/feed-generic-rss.png';

            })
             .done(function(icon, status) {
                 // console.log( 'DONE %s OK (status %s)',  icon, status);
                 $feedIcon.css('background-image','url("' + icon + '")');
             })
             .fail(function(icon, status) {
                 console.log( 'FAVICON %s ERROR (status: %s)',  feedHost, status);
                 // $feedIcon.css('background-image','url("/static/images/feed-generic-rss.png")');
                 $feedIcon.css('background-color','red');
             })
             .always(function(icon, status) {

                 console.log( '\nALWAYS for %s: %s (status: %s)', feedHost, JSON.stringify(icon), status);
             });

            $.get("/feed", {
                feedurl: feedUrl,
                dataType: 'json'
            }, function(data, status) {

                $feedBody.empty()

            }).done(function(data) {
                $feedTitle.text(data.feedTitle);

                // console.log( "\nLimit: (%s)", feedLimit);

                $.each(data.feedItems, function(index, item) {

                    if (index == parseInt(feedLimit)) {
                        return false;
                    }

                    // console.log( "\n\nItem (%s)", item.enclosures[0].url);

                    var $description = $.parseHTML(item.description)
                    // console.log( "Title: (%s)", item.title);

                    var $tempDom = $('<output>').append($description);

                    var imageUrl;

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

                    if (typeof imageUrl !== 'undefined') {
                        var $imgLink = $('<a data-fancybox="gallery" data-caption="' + item.title + '">').attr('href', imageUrl)
                        var $itemImg = $('<img src="' + imageUrl + '" onError="this.onerror=null;this.src=\'/static/images/broken-image.png\';" />')
                            .appendTo($imgLink)
                        if (feedType == 'photo')
                            $itemImg.addClass('full')

                        if (feedType !== 'text')
                            $imgLink.appendTo($itemDiv)
                    }

                    $itemLink.appendTo($itemDiv)
                    $itemDiv.appendTo($feedItem)
                    $feedItem.appendTo($feedBody)

                });


            }).fail(function() {
                $refreshButton.css("color", "#f00").removeClass('spinner');

                // console.log( "error" );
                $feed.children('.mobHeader').addClass('ui-state-error');
                $feedTitle.text('Error');
                $feedBody.html('<li class="feedItem">Feed Error: ' + feedUrl + '</li>');
            }).always(function() {

                if(progress) {
                    progress.increment();
                }

                $refreshButton.removeClass('spinner');

            });;
        }
    };
}());
