var Tab = (function() {

    return {
        newTab:function($tabs, name, feeds) {

            var tabIndex = $('#tabs ul').length;

            if (!name) {
                var name = 'Tab ' + tabIndex;
            }

            var $thisSortable = $('<ul id="sortable' + tabIndex + '" class="tabSort"></ul>');

            var $thisButton = $('<button class="addFeed"><i class="icon-plus"></i> Feed</button>').button();

            $thisButton.on( "click", function() {
                Feed.newFeed($(this).prev(), '//url100', 'photo', 8);
            });

            var $thisTabPane = $('<div class="tab" id="tab-' + tabIndex + '"></div>');

            $thisSortable.on('click', 'i.feedSelect', function () {
                $(this).parent().parent().parent().parent().toggleClass('selected ui-state-hover');
            });

            $thisSortable.sortable({
                revert:0,
                receive: function(e, ui) {
                    ui.helper.first().removeAttr('style'); // undo styling set by jqueryUI
                },
                helper: function (e, item) { //create custom helper
                    if (!item.hasClass('selected')) item.addClass('selected');
                    // clone selected items before hiding

                    var w = $('.selected').width();

                    var $elements = $('.selected').not('.ui-sortable-placeholder').clone();

                    console.log('w: ' + w);

                    //hide selected items
                    item.siblings('.selected').addClass('hidden');
                    var helper = $('<ul class="feedHelper"><ul/>');
                    return helper.append($elements);
                },
                start: function (e, ui) {
                    console.log('yow!');

                    var $elements = ui.item.siblings('.selected.hidden').not('.ui-sortable-placeholder');
                    //store the selected items to item being dragged
                    ui.item.data('items', $elements);
                },
                update: function (e, ui) {
                    //manually add the selected items before the one actually being dragged
                    ui.item.before(ui.item.data('items'));
                },
                stop: function (e, ui) {
                    //show the selected items after the operation
                    ui.item.siblings('.selected').removeClass('hidden');
                    //unselect since the operation is complete
                    $('.selected').removeClass('selected ui-state-hover');
                    $(this).find('i.feedSelect').removeClass('icon-ok').addClass('icon-check-empty-1');
                }
            }).disableSelection();

            $thisSortable.appendTo($thisTabPane);
            $thisButton.appendTo($thisTabPane);
            $thisTabPane.appendTo($tabs);

            var $thisTabLink = $('<a href="#tab-' + tabIndex  + '">' + name + '</a>')

            var $thisTab = $('<li class="modal mobTab"></li>');

            var $thisCloseTabLink = $('<span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span>')

            $thisTabLink.appendTo($thisTab);
            $thisCloseTabLink.appendTo($thisTab);

            var $thisSelectedTab = $('#tabs div.ui-tabs-panel:not(.ui-tabs-hide)');

            $thisTab.droppable({
                accept: 'ul, .tabSort li.feed',
                hoverClass: 'ui-state-hover',
                drop: function (event, ui) {
                    var $item = $(this);
                    var $index = $('li.mobTab').index(this);
                    console.log('elt: ' +  $(this).get());
                    var $elements = ui.draggable.data('items');
                    var $list = $($item.find('a').attr('href'))
                        .find('.tabSort');
                    $elements.show().hide('slow');
                    ui.draggable.show().hide('slow', function () {

                        if ($('#tabDropActivate').prop('checked')) {
                            $tabs.tabs('option', 'active', $index);
                        }

                        $(this).appendTo($list).show('slow').before($elements.show('slow'));
                    });
                }
            }).appendTo('#tabs ul#tabUl');

            if(typeof feeds != 'undefined') {
                feeds.forEach(function(feed) {
                    Feed.newFeed($('#tab-' + tabIndex + ' ul.tabSort'), feed.url, feed.type, feed.limit);
                });
            };

            $tabs.tabs('refresh');
            $tabs.tabs( "option", "active", tabIndex - 1);
            tabIndex++;

            // console.log('---- TAB OK ----');
        },
        populateTabs:function($tabUl, tabList, $tabs) {

            $tabUl.empty();

            tabList.forEach(function(tab) {
                Tab.newTab($tabs, tab.name, tab.feeds);
            });

        },
        getTabs:function() {
            var myTabs = [];
            var $allTabs = $( '#tabUl li.mobTab' );

            $allTabs.each(function(i) {
                var myFeeds = [];
                var myTab = {};
                var $allFeeds = $($(this).children().attr('href') + ' ul li.feed');

                console.log('name: ' + $(this).children('a').text())

                myTab["name"] = $(this).children('a').text();

                $allFeeds.each(function(i) {
                    var myFeed = {};
                    myFeed["url"] = $(this).data('url');
                    myFeed["type"] = $(this).data('type');
                    myFeed["limit"] = $(this).data('limit');
                    myFeeds.push(myFeed);
                });
                myTab["feeds"] = myFeeds;
                myTabs.push(myTab)
            });

            return myTabs;

        },
        saveTabs:function() {
            var allTabs = Tab.getTabs()
            Prefs.writeConfig('tabs', JSON.stringify(allTabs));
        }
    };

}());
