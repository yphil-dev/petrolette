var Feed = (function() {

    return {
        newFeed:function($tab, url, type, limit) {

            var $feedToggle = $('<i class="fa fa-caret-down fa-1 fa-pull-left fa-border rotate" aria-hidden="true"></i>').button().click(function() {

                $(this).toggleClass("down")
                $(this).parent().parent().parent().children('.feedBody').toggle(300);
            });;

            var $feedSelect = $('<label class="feedSelect"><input class="chbox" type="checkbox" /></label>').button();

            var $title = $('<span class="truncate">' + url + '<span>');

            var $feedControls = $('<div class="feedControls"></div>');

            var $feedPrefs = $('<i class="fa fa-cog fa-1 fa-pull-right fa-border mobFeedPrefs" aria-hidden="true"></i>').button();

            var $feedReload = $('<i class="fa fa-refresh fa-1 fa-pull-right fa-border mobFeedRefresh" aria-hidden="true"></i>').button();

            var $body = $('<div class="feedBody ui-widget-content">plop</div>');

            var $li = $('<li class="feed ui-state-default ui-widget-header" data-url="' + url + '" data-type="' + type + '" data-limit="' + limit + '"></li>');

            var $header = $('<div class="mobHeader"></div>');
            var $feedIcon = $('<div class="feedIcon"></div>');

            var $toggleDiv = $('<div class="toggle hiddeable"></div>');
            var $selectDiv = $('<div class="TabSelect hiddeable"></div>');
            var $titleDiv = $('<div class="feedTitle truncate"></div>');
            var $prefsDiv = $('<div class="prefs hiddeable"></div>');
            var $reloadDiv = $('<div class="reload hiddeable"></div>');

            $feedToggle.appendTo($toggleDiv);
            $feedSelect.appendTo($selectDiv);
            $titleDiv.html(url);
            $feedPrefs.appendTo($prefsDiv);
            $feedReload.appendTo($reloadDiv);

            $toggleDiv.appendTo($header);
            $titleDiv.appendTo($header);
            $selectDiv.appendTo($feedControls);
            $prefsDiv.appendTo($feedControls);
            $reloadDiv.appendTo($feedControls);

            $feedControls.appendTo($header);

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

            var feedUrl = $button.parent().parent().parent().parent().data('url');
            var $feedTitleDiv = $button.parent().parent().parent().children('.feedTitle');

            $.get("/feed", {
                "feedurl": feedUrl
            }, function(data, status){
                $button.css("color", "#3e3e3e").removeClass('spinner');
                $feedTitleDiv.text(data.title);
            });

        }
        };
}());
