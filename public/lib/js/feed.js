var Feed = (function() {

    return {
        newFeed:function($tab, url, type, limit) {

            var feedIndex = $('.feed').length;

            var $feedToggle = $('<i class="icon-down-dir rotate"></i>').click(function() {

                $(this).toggleClass("down")
                $(this).parent().parent().parent().children('.feedBody').toggle(300);
            });


            var $feedSelect = $('<i class="icon-check-empty-1 feedSelect feedControl"></i>').button();
            var $feedDelete = $('<i class="icon-trash feedDelete feedControl"></i>').button();

            $feedDelete.click(function() {

                var $thisFeedId = $(this).parent().parent().parent().parent().attr('id')

                $('#killFeedDialog').data('feedId', $thisFeedId)
                                         .dialog('open')
                $('#killFeedDialog').dialog('option', 'title', 'Kill the ' + $(this).parent().parent().prev().text() + ' feed?');

            });

            $feedSelect.click(function() {
                $(this).toggleClass('icon-ok').toggleClass('icon-check-empty-1')
            });

            var $title = $('<span class="truncate">' + url + '<span>');

            var $feedControls = $('<div class="feedControls"></div>');

            var $feedPrefs = $('<i class="icon-cog mobFeedPrefs feedControl"></i>').button()

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

            var $feedReload = $('<i class="icon-arrows-cw mobFeedRefresh feedControl"></i>').button();

            var $body = $('<div class="feedBody ui-widget-content"></div>');
            var $bodyUl = $('<ol></ol>');
            var $dumbLi = $('<li>plop</li>');

            var $li = $('<li id="feed-' + feedIndex + '" class="feed ui-state-default ui-widget-header" data-url="' + url + '" data-type="' + type + '" data-limit="' + limit + '"></li>');

            $li.hover(
                function() {
                    $(this).find('.feedControls').slideDown();
                }, function() {
                    $(this).find('.feedControls').slideUp();
                }
            );

            var $header = $('<div class="mobHeader"></div>');
            var $feedIcon = $('<div class="feedIcon"></div>');

            var $toggleDiv = $('<div class="toggle hiddeable"></div>');
            var $selectDiv = $('<div class="TabSelect hiddeable"></div>');
            var $deleteDiv = $('<div class="TabDelete hiddeable"></div>');
            var $titleDiv = $('<div class="feedTitle truncate"></div>');
            var $prefsDiv = $('<div class="prefs hiddeable"></div>');
            var $reloadDiv = $('<div class="reload hiddeable"></div>');

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

            $dumbLi.appendTo($bodyUl)
            $bodyUl.appendTo($body)

            $header.appendTo($li);
            $body.appendTo($li);

            $li.appendTo($tab);

            //             $li.hover(function() {
            //
            //                 console.log('hover! ' + $(this).children('.mobHeader').children('.hiddeable').get());
            //
            //                 $(this).children('.mobHeader').children('.hiddeable')
            //                        .toggleClass("hidden")
            //                        .next()
            //                        .stop( true, true )
            //                        .slideToggle();
            //
            //             });
            //
        },
        populateFeed:function($button) {

            $button.css("color", "transparent").addClass('spinner');

            var $feedDiv = $button.parent().parent().parent();

            $feedDiv.parent().removeClass('ui-state-error');

            var feedUrl = $feedDiv.parent().data('url');

            $.get("/feed", {
                "feedurl": feedUrl
            }, function(data, status){
                // console.log('DATA: ' + JSON.stringify(status));

                $button.css("color", "#3e3e3e").removeClass('spinner');

                if (typeof data.entries !== 'undefined') {
                    $feedDiv.children('.feedTitle').text(data.title);

                    data.entries.forEach(function(entry) {
                        if($.type(entry.title) === 'string') {
                            // console.log(entry.title + ':' + entry.link);
                            $feedDiv.parent().children('.feedBody')
                        }
                    })


                } else {
                    $feedDiv.parent().addClass('ui-state-error');
                    $feedDiv.children('.feedTitle').text('Error');
                    $feedDiv.parent().children('.feedBody').text('Feed Error: ' + feedUrl);
                }

            });
        }
    };
}());
