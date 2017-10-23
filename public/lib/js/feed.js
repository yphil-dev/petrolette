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

                var $thisFeedId = $(this).parent().parent().parent().parent().attr('id')
                var thisFeedName = $(this).parent().parent().prev().text()

                $('#mobDialogs').load('/static/templates/dialog.html', function() {
                    var $killFeedDialog = $(this).children('#dialog')

                    $killFeedDialog.dialog({
                        title: 'Kill the [' + thisFeedName + '] feed?',
                        autoOpen: false,
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Delete feed": function() {

                                var $tabFeedId = $('#' + $(this).data('feedId'))

                                $tabFeedId.remove()
                                Tab.saveTabs()
                                $(this).dialog( "close" );
                            },
                            Cancel: function() {
                                $( this ).dialog( "close" );
                            }
                        },
                        open: function () {
                            var $dialog = $(this)
                            $dialog.children('p').append('Really delete this feed?')

                            $('button:contains("Delete")').addClass('ui-state-error');
                        }
                    });

                    $killFeedDialog.data('feedId', $thisFeedId).dialog('open')
                });

                //
                //                 console.log('globalTest: ' + globalTest)
                //                 var $thisFeedId = $(this).parent().parent().parent().parent().attr('id')
                //
                //                 $('#killFeedDialog').data('feedId', $thisFeedId).dialog('open')
                //                 $('#killFeedDialog').dialog('option', 'title', 'Kill the ' + $(this).parent().parent().prev().text() + ' feed?');
                //

            });

            $feedSelect.click(function() {
                $(this).toggleClass('icon-ok').toggleClass('icon-check-empty-1')
            });

            $feedPrefs.click(function() {

                var $thisFeedId = $(this).parent().parent().parent().parent().attr('id')

                var $feedContainer = $(this).parent().parent().parent().parent();

                console.log('Ici: ' + $feedContainer.data('limit'))

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

            if (clickNew)
                $feed.prependTo($tab);
            else
                $feed.appendTo($tab);

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

            // console.log('## Sending: ' + decodeURI(cleanUrl))
            //
            //             $.get("/feedicon", {
            //                 url: decodeURI(feedHost),
            //                 dataType: "json",
            //                 timeout: 3000
            //             }, function(icon, status) {
            //                 if ( !icon || icon.length === 0) icon = "/static/images/generic-rss-32.png";
            //             })
            //

            var jqxhr = $.get("/feed", {
                feedurl: feedUrl,
                dataType: 'json'
            }, function(data, status) {

                $button.css("color", "#3e3e3e").removeClass('spinner');

                $feedBody.empty()
            }).done(function(data, title) {
                var jdata = $.parseJSON(data)
                console.log( "second success: Loaded (%s)", jdata);

                $.each(jdata, function(index, element) {

                    console.log( "Elt: (%s)", element.title);

                    // $('body').append($('<div>', {
                    //     text: element.name
                    // }));

                });


            }).fail(function() {
                console.log( "error" );
            }).always(function() {
                console.log( "finished" );
            });;
        }
    };
}());
