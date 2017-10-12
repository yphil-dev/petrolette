var Feed = (function() {

    return {
        newFeed:function($tab, url, type, limit) {

            var $feedToggle = $('<i class="fa fa-caret-down fa-1 fa-pull-left fa-border" aria-hidden="true"></i>').button();
            var $chbox = $('<input class="chbox" type="checkbox" />');

            var $title = $('<span class="truncate">' + url + '<span>');

            var $feedReload = $('<i class="fa fa-refresh fa-1 fa-pull-right fa-border" aria-hidden="true"></i>').button();

            var $body = $('<div>plop</div>');

            var $li = $('<li class="feed ui-state-default" data-url="' + url + '" data-type="' + type + '" data-limit="' + limit + '"></li>');

            var $header = $('<div class="header"></div>');
            var $toggleDiv = $('<div class="toggle"></div>');
            var $selectDiv = $('<div class="TabSelect"></div>');
            var $titleDiv = $('<div class="title truncate"></div>');
            var $reloadDiv = $('<div class="reload"></div>');

            $feedToggle.appendTo($toggleDiv);
            $chbox.appendTo($selectDiv);
            $titleDiv.html(url);
            $feedReload.appendTo($reloadDiv);

            $toggleDiv.appendTo($header);
            $selectDiv.appendTo($header);
            $titleDiv.appendTo($header);
            $reloadDiv.appendTo($header);

            $header.appendTo($li);
            $body.appendTo($li);

            $li.appendTo($tab);

        }
    };
}());
