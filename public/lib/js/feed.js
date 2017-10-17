var Feed = (function() {

    return {
        newFeed:function($tab, url, type, limit) {

            var feedIndex = $('.feed').length;

            var $feedToggle = $('<i class="icon-down-dir rotate">').click(function() {
                $(this).toggleClass("down")
                $(this).parent().parent().parent().children('div.feedBody').slideToggle(200);
            });

            var $feedSelect = $('<i class="icon-check-empty-1 feedSelect feedControl">').button();
            var $feedDelete = $('<i class="icon-trash feedDelete feedControl">').button();
            var $feedPrefs = $('<i class="icon-cog mobFeedPrefs feedControl">').button()
            var $feedReload = $('<i class="icon-arrows-cw mobFeedRefresh feedControl">').button();

            var $title = $('<span class="truncate">' + url + '<span>');
            var $feedControls = $('<div class="feedControls">');

            $feedDelete.click(function() {

                var $thisFeedId = $(this).parent().parent().parent().parent().attr('id')

                $('#killFeedDialog').data('feedId', $thisFeedId).dialog('open')
                $('#killFeedDialog').dialog('option', 'title', 'Kill the ' + $(this).parent().parent().prev().text() + ' feed?');


            });

            $feedSelect.click(function() {
                $(this).toggleClass('icon-ok').toggleClass('icon-check-empty-1')
            });

            $feedPrefs.click(function() {

                var $thisFeedId = $(this).parent().parent().parent().parent().attr('id')

                var $feedContainer = $(this).parent().parent().parent().parent();

                $('#feedDialog')
                    .data('feedId', $thisFeedId)
                    .data('feedUrl', $feedContainer.data('url'))
                    .data('feedLimit', $feedContainer.data('limit'))
                    .data('feedType', $feedContainer.data('type'))
                    .dialog('open');
            });

            var $feedBody = $('<div class="feedBody ui-widget-content"></div>');
            var $feedBodyUl = $('<ul class="feedBody"></ul>');
            var $dumbLi = $('<li>plop</li>');

            var $feed = $('<li id="feed-' + feedIndex + '" class="feed ui-state-default ui-widget-header" data-url="' + url + '" data-type="' + type + '" data-limit="' + limit + '"></li>');

            $feed.hover (
                function() {$(this).find('.feedControls').slideDown();},
                function() {$(this).find('.feedControls').slideUp();}
            );

            var $header = $('<div class="mobHeader"></div>');
            var $feedIcon = $('<div class="feedIcon"></div>');

            var $toggleDiv = $('<div class="feedToggle hiddeable"></div>');
            var $selectDiv = $('<div class="feedSelect hiddeable"></div>');
            var $deleteDiv = $('<div class="feedDelete hiddeable"></div>');
            var $titleDiv = $('<div class="feedTitle truncate"></div>');
            var $prefsDiv = $('<div class="prefs hiddeable"></div>');
            var $reloadDiv = $('<div class="reload hiddeable"></div>');

            //
            //             $feedToggle.appendTo($toggleDiv);
            //             $feedSelect.appendTo($selectDiv);
            //             $feedDelete.appendTo($deleteDiv);
            //             $titleDiv.html(url);
            //             $feedPrefs.appendTo($prefsDiv);
            //             $feedReload.appendTo($reloadDiv);
            //
            //             $toggleDiv.appendTo($header);
            //             $titleDiv.appendTo($header);
            //             $selectDiv.appendTo($feedControls);
            //             $deleteDiv.appendTo($feedControls);
            //             $prefsDiv.appendTo($feedControls);
            //             $reloadDiv.appendTo($feedControls);
            //


            $feedToggle.appendTo($toggleDiv);
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

            $feed.appendTo($tab);

        },
        populateFeed:function($button) {

            var r = new RegExp('^(?:[a-z]+:)?//', 'i');

            var $feed = $button.parent().parent().parent().parent()
            var $feedTitle = $feed.children().children('.feedTitle')
            var $feedBody = $feed.children().children('ul.feedBody')
            var feedUrl = $feed.data('url')
            var feedLimit = $feed.data('limit')
            var feedType = $feed.data('type')

            $button.css("color", "transparent").addClass('spinner')
            $feed.removeClass('ui-state-error')

            $.get("/feed", {
                "feedurl": feedUrl
            }, function(data, status) {

                $button.css("color", "#3e3e3e").removeClass('spinner');

                $feedBody.empty()

                if (typeof data.entries !== 'undefined') {
                    $feedTitle.text(data.title);

                    data.entries.slice(0, parseInt(feedLimit)).forEach(function(entry) {
                        if($.type(entry.title) === 'string') {

                            // console.log('ALL: ' + JSON.stringify(entry))

                            var content = $.parseHTML(entry.content)
                            var $entry = $(entry)

                            // console.log('Enclosure: ' + $entry.find("enclosure").attr('url'))

                            var $tempDom = $('<output>').append(content);

                            var $feedItem = $('<li class="feedItem">')
                            var $itemDiv = $('<div class="feedItem">')
                            var $itemLink = $('<a class="ui-helper-clearfix">').attr('href', entry.link).append(entry.title)

                            var $hostName = $itemLink.prop('hostname')
                            var $protocol = $itemLink.prop('protocol')
                            // console.log('P: ' + $protocol)

                            if (typeof $tempDom.find('img').attr('src') !== 'undefined') {

                                var $imgUrl = $tempDom.find('img').attr('src')

                                if (!r.test($imgUrl))
                                    $imgUrl = $protocol + '' + $hostName + $imgUrl

                                var $imgLink = $('<a data-fancybox="gallery">').attr('href', $imgUrl)
                                // console.log('S: ' + $imgUrl)

                                var $itemImg = $('<img src="' + $imgUrl + '" />')
                                    .appendTo($imgLink)

                                if (feedType == 'photo')
                                    $itemImg.addClass('full')

                                if (feedType !== 'text')
                                    $imgLink.appendTo($itemDiv)
                            }

                            $itemLink.appendTo($itemDiv)
                            $itemDiv.appendTo($feedItem)
                            $feedItem.appendTo($feedBody)
                        }
                    })

                } else {
                    $feed.addClass('ui-state-error');
                    $feedTitle.text('Error');
                    $feedBody.html('<li class="feedItem">Feed Error: ' + feedUrl + '</li>');
                }
            });
        }
    };
}());
