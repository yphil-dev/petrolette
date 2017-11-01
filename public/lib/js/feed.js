var Feed = (function() {

    return {
        newFeed:function($tab, url, type, limit, clickNew) {

            var feedIndex = $('.feed').length;

            var $feedToggle = $('<i class="ico-generic-rss rotate">').click(function() {
                $(this).toggleClass("down")
                $(this).parent().parent().parent().children('div.feedBody').slideToggle(200);
            });

            var $feedSelect = $('<i class="icon-check-empty-1 feedSelect feedControl">').button();
            var $feedDelete = $('<i class="icon-trash feedDelete feedControl">').button();
            var $feedPrefs = $('<i class="icon-cog mobFeedPrefs feedControl">').button()
            var $feedReload = $('<i class="icon-arrows-cw mobFeedRefresh feedControl">').button();

            var $feedIcon = $('<i class="icon-generic-rss feedControl">').button();

            var $title = $('<span class="truncate">' + url + '<span>');
            var $feedControls = $('<div class="feedControls hiddeable">');

            $feedDelete.click(function() {
                Dialog.killFeed($(this))
            });

            $feedSelect.click(function() {
                $(this).toggleClass('icon-ok').toggleClass('icon-check-empty-1')
            });

            $feedPrefs.click(function() {
                Dialog.feedPrefs($(this))
            });

            var $feedBody = $('<div class="feedBody ui-widget-content"></div>');
            var $feedBodyUl = $('<ul class="feedBody"></ul>');
            var $dumbLi = $('<li>plop</li>');

            var $feed = $('<li id="feed-' + feedIndex + '" class="feed ui-widget" data-url="' + url + '" data-type="' + type + '" data-limit="' + limit + '"></li>');

            var $header = $('<div class="mobHeader ui-widget-header"></div>');
            var $feedIcon = $('<div class="feedIcon"></div>');

            var $toggleDiv = $('<div class="feedToggle"></div>');
            var $selectDiv = $('<div class="feedSelect"></div>');
            var $deleteDiv = $('<div class="feedDelete"></div>');
            var $titleDiv = $('<div class="feedTitle truncate"></div>');
            var $prefsDiv = $('<div class="prefs"></div>');
            var $reloadDiv = $('<div class="reload"></div>');

            $feedToggle.appendTo($toggleDiv);

            $feed.hover (
                function() {
                    var iconImg = $feedToggle.css('background-image')

                    $(this).find('.hiddeable').slideDown()
                    $feedToggle.removeClass('ico-generic-rss')
                                             .addClass('icon-down-dir')
                    // .css('background-image', 'none')
                },
                function() {
                    $(this).find('.hiddeable').slideUp()
                    $feedToggle.removeClass('icon-down-dir')
                           .addClass('ico-generic-rss')
                    // .css('background-image', iconImg)
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

            // $dumbLi.appendTo($feedBodyUl)
            $feedBodyUl.appendTo($feedBody)

            $header.appendTo($feed);
            $feedBody.appendTo($feed);

            if (clickNew) {
                $feed.prependTo($tab);
                $feedPrefs.click()
            } else {
                $feed.appendTo($tab);
            }



        },
        populateFeed:function($button) {

            var r = new RegExp('^(?:[a-z]+:)?//', 'i');

            var getLocation = function(href) {
                var l = document.createElement("a")
                l.href = href
                return l
            }

            var $feed = $button.parent().parent().parent().parent()
            var $feedTitle = $feed.children().children('.feedTitle')
            var $feedBody = $feed.children().children('ul.feedBody')
            var feedUrl = $feed.data('url')
            var feedLimit = $feed.data('limit')
            var feedType = $feed.data('type')

            var $feedIcon = $feed.find('.feedToggle > i')

            var l = getLocation(feedUrl)

            var feedHost = l.protocol + '//' + l.hostname
            // console.debug('$feedToggle: ' + $toggleDiv.attr('class'))

            $button.css("color", "transparent").addClass('spinner')
            $feed.children('.mobHeader').removeClass('ui-state-error')

            var cleanUrl = feedUrl.substring(0, feedUrl.lastIndexOf("/") + 1);

            $.get("/feedicon", {
                url: decodeURI(feedHost),
                dataType: "json",
                timeout: 3000
            }, function(icon, status) {
                if ( !icon || icon.length === 0) icon = "/static/images/generic-rss-32.png";
                $feedIcon.removeClass('icon-down-dir')
                         .css('background-image','url(' + icon + ')')
            })


            var jqxhr = $.get("/feed", {
                feedurl: feedUrl,
                dataType: 'json'
            }, function(data, status) {

                $button.css("color", "#3e3e3e").removeClass('spinner');

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

                    var $feedItem = $('<li class="feedItem">').attr('title', item.summary)
                    var $itemDiv = $('<div class="feedItem">')
                    var $itemLink = $('<a class="ui-helper-clearfix">')
                        .attr('href', item.link)
                        .append(item.title)

                    if (index % 2 === 0) {
                        /* we are even */
                        $feedItem.addClass('ui-state-hover')
                    }

                    $feedItem.hover(
                        function() {
                            $(this).addClass('ui-state-highlight');
                        }, function() {
                            $(this).removeClass('ui-state-highlight');
                        }
                    );

                    if (typeof imageUrl !== 'undefined') {
                        var $imgLink = $('<a data-fancybox="gallery">').attr('href', imageUrl)
                        var $itemImg = $('<img src="' + imageUrl + '" />')
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
                // console.log( "error" );
                $feed.children('.mobHeader').addClass('ui-state-error');
                $feedTitle.text('Error');
                $feedBody.html('<li class="feedItem">Feed Error: ' + feedUrl + '</li>');
            }).always(function() {
                // console.log( "finished" );
            });;
        }
    };
}());
