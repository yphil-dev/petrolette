var Feed = (function() {

    return {
        newFeed:function($tab, url, type, limit) {

            var $chbox = $('<input class="chbox" type="checkbox" />');
            var $feedToggle = $('<button class="feedToggle small-button"><span class="ui-icon ui-icon-triangle-1-s"></span></button>').button();

            var $li = $('<li class="feed ui-state-default" data-url="' + url + '" data-type="' + type + '" data-limit="' + limit + '">' + url + '</li>')

            $chbox.prependTo($li);
            $feedToggle.prependTo($li);
            $li.appendTo($tab);

        }
    };
}());
