var Tab = (function() {

    return {
        newTab:function($tabs, name, feeds) {

            var tabIndex = $('#tabs ul').length;

            if (!name) {
                var name = 'Tab ' + tabIndex;
            }

            var $thisSortable = $('<ul id="sortable' + tabIndex + '" class="tabSort"></ul>');

            var $thisButton = $('<button class="addFeed"><i class="fa fa-plus" aria-hidden="true"></i> Add Feed</button>').button();

            $thisButton.on( "click", function() {
                Feed.newFeed($(this).prev(), '//url100', 'photo', 8);
            });

            var $thisTabPane = $('<div class="tab" id="tab-' + tabIndex + '"></div>');

            $thisSortable.on('click', 'input', function () {
                $(this).parent().toggleClass('selected ui-state-hover');
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
                    // $elements.css({'width': $(this).first().width(), 'height': $(this).first().height()});

                    //hide selected items
                    item.siblings('.selected').addClass('hidden');
                    var helper = $('<ul/>');
                    return helper.append($elements);
                },
                start: function (e, ui) {
                    console.log('yow!');

                    // ui.helper.first().removeAttr('style'); // undo styling set by jqueryUI

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
                    $(this).find('input:checked').prop('checked',false);
                }
            }).disableSelection();

            $thisSortable.appendTo($thisTabPane);
            $thisButton.appendTo($thisTabPane);
            $thisTabPane.appendTo($tabs);

            var $thisTabLink = $('<a href="#tab-' + tabIndex  + '">' + name + '</a>')

            var $thisTab = $('<li class="modal"></li>');

            $thisTabLink.appendTo($thisTab);

            var $thisSelectedTab = $("#tabs div.ui-tabs-panel:not(.ui-tabs-hide)");

            $thisTab.droppable({
                accept: "ul, .tabSort li",
                hoverClass: "ui-state-hover",
                drop: function (event, ui) {
                    var $item = $(this);
                    var $index = $( "li" ).index( this );
                    console.log('elt: ' + $index);
                    var $elements = ui.draggable.data('items');
                    var $list = $($item.find("a").attr("href"))
                        .find(".tabSort");
                    $elements.show().hide('slow');
                    ui.draggable.show().hide("slow", function () {

                        if ($('#tabDropActivate').prop('checked')) {
                            $tabs.tabs("option", "active", $index);
                        }

                        $(this).appendTo($list).show("slow").before($elements.show("slow"));
                    });
                }
            }).appendTo('#tabs ul#theTabs');

            if(typeof feeds != 'undefined') {
                feeds.forEach(function(feed) {
                    // newFeed($('#tab-' + tabIndex + ' ul'), feed.url, feed.type, feed.limit);
                    Feed.newFeed($('#tab-' + tabIndex + ' ul'), feed.url, feed.type, feed.limit);
                });
            };

            $tabs.tabs('refresh');
            $tabs.tabs( "option", "active", tabIndex - 1);
            tabIndex++;

            // console.log('---- TAB OK ----');
        }


    };

}());
