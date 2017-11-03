var Dialog = (function() {

    var autoOpen = false,
        resizable = true,
        height = 'auto',
        width = 400,
        modal = true

    return {
        renameTab:function($tab) {

            $('#mobDialogs').load('/static/templates/dialog.html #renameTabDialog', function() {
                var $dialog = $('#renameTabDialog')

                console.log('Imma dialog: %s', $tab.text())

                $dialog.dialog({
                    autoOpen: autoOpen,
                    resizable: resizable,
                    height: height,
                    width: width,
                    modal: modal,
                    buttons: {
                        Cancel: function() {
                            $( this ).dialog( 'close' );
                        },
                        'OK': function() {
                            $('#' + $(this).data('tabId')).text($dialog.find('#tabName').val());
                            Tab.saveTabs();
                            $(this).dialog('close');
                        }
                    },
                    open: function( event, ui ) {
                        var $tabName = $dialog.find('#tabName')
                        $tabName.val($(this).data('tabName')).select();

                        $(this).on('submit', function () {
                            $('#' + $(this).data('tabId')).text($dialog.find('#tabName').val());
                            Tab.saveTabs();
                            $(this).dialog('close');
                            return false;
                        });
                    }
                });

                $dialog
                    .data('tabName', $tab.text())
                    .data('tabId', $tab.attr('id'))
                    .dialog('open');
                return;
            })
        },
        killFeed:function($button) {

            $('#mobDialogs').load('/static/templates/dialog.html #killDialog', function() {
                var $killFeedDialog = $('#killDialog')

                var $thisFeedId = $button.parent().parent().parent().parent().attr('id')
                var thisFeedName = $button.parent().parent().prev().text()


                $killFeedDialog.dialog({
                    title: 'Kill Feed',
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
                        $dialog.children('p').append('Really delete the [' + thisFeedName + '] feed?')

                        $('button:contains("Delete")').addClass('ui-state-error');
                    }
                });

                $killFeedDialog.data('feedId', $thisFeedId).dialog('open')
            })

        },
        feedPrefs:function(id, url, type, limit) {

            $('#mobDialogs').load('/static/templates/dialog.html #feedPrefs', function() {
                var $dialog = $('#feedPrefs')

                $dialog.dialog({
                    autoOpen: false,
                    resizable: false,
                    height: 'auto',
                    width: 400,
                    modal: true,
                    buttons: {
                        Cancel: function() {
                            $( this ).dialog( 'close' );
                        },
                        'OK': function() {

                            console.log('TID: %s', $dialog.data('id'))

                            var newUrl = $(this).find('input#feedUrl').val()
                            var newType = $(this).find('#feedType').val()
                            var newLimit = $(this).find('input#feedLimit').val()

                            console.log('NewU: %s', newUrl)
                            // console.log('NewT: %s', newType)
                            // console.log('NewL: %s', newLimit)

                            var $tabFeedId = $('li#' + $dialog.data('id'))
                            var $mobFeedRefresh = $tabFeedId.find('.mobFeedRefresh')

                            $tabFeedId.data('url', newUrl)
                            $tabFeedId.data('type', newType)
                            $tabFeedId.data('limit', newLimit)

                            $mobFeedRefresh.data('url', newUrl)
                            $mobFeedRefresh.data('type', newType)
                            $mobFeedRefresh.data('limit', newLimit)

                            $('#feedType').children('input').each(function () {
                                // console.log('ID: %s Ch: %s', $(this).attr('id'), $(this).is(':checked'))
                                if ($(this).is(':checked'))
                                    $tabFeedId.data('type', $(this).attr('id'))
                            });

                            Feed.populateFeed($mobFeedRefresh, id, newUrl, newType, newLimit);
                            Tab.saveTabs();
                            $(this).dialog( 'close' );
                        }
                    },
                    open: function( event, ui ) {

                        var $dialog = $(this)
                        var $tabFeedId = $('li#' + $dialog.data('id'))
                        var $mobFeedRefresh = $tabFeedId.find('.mobFeedRefresh')

                        var oldUrl = $mobFeedRefresh.data('url')
                        var oldType = $dialog.data('type')
                        var oldLimit = $dialog.data('limit')

                        console.log('OldU: %s', oldUrl)
                        // console.log('OldT: %s', oldType)

                        $dialog.find('input#feedUrl').val(oldUrl);

                        $dialog.find('.feedType').checkboxradio({
                            icon: false
                        });

                        $dialog.find('#' + oldType).attr("checked", true).checkboxradio("refresh");

                        $dialog.find('.feedType').on("change", function(event){
                            $dialog.find('.feedType').prop( "checked", false );
                            $(this).attr("checked", true).prop( "checked", false );
                            $dialog.find('.feedType').checkboxradio("refresh");
                        });

                        // $(this).attr("checked", true).checkboxradio("refresh");

                        // $dialog.find('.feedType').each(function () {

                        //     if ($(this).attr('id') === oldType)
                        //         $(this).attr("checked", true).checkboxradio("refresh");
                        //     else
                        //         $(this).attr("checked", false).checkboxradio("refresh");
                        // });

                        $dialog.find('div#feedLimit').slider({
                            value: oldLimit,
                            min: 1,
                            max: 128,
                            step: 1,
                            create: function( event, ui ) {
                                $("input#feedLimit").val(oldLimit);
                                $(this).find(".ui-slider-handle").text(oldLimit);
                            },
                            slide: function( event, ui ) {
                                $(this).val(ui.value);
                                $(this).find(".ui-slider-handle").text(ui.value);
                            },
                            change: function( event, ui ) {
                                $("input#feedLimit").val(ui.value);
                            }
                        });

                        $dialog.on('submit', function () {
                            Feed.populateFeed($mobFeedRefresh);
                            Tab.saveTabs();

                            $(this).dialog('close');
                            return false;
                        });

                        $dialog.find('#feedUrl').select()

                    }
                });

                $dialog
                    .data('id', id)
                    .data('url', url)
                    .data('type', type)
                    .data('limit', limit)
                    .dialog('open');

            })

        },
        killTab:function($button) {

            var $a = $button.prev('a.ui-tabs-anchor')

            console.log('A: %s', $a.attr('class'))

            $('#mobDialogs').load('/static/templates/dialog.html #killDialog', function() {

                var $killTabDialog = $('#killDialog')

                $killTabDialog.dialog({
                    autoOpen: false,
                    resizable: false,
                    height: "auto",
                    title: 'Kill Tab',
                    width: 400,
                    modal: true,
                    buttons: {
                        "Delete all feeds": function() {

                            var $tabLinkId = $('#' + $(this).data('tabLinkId'))
                            var $thisPanel = $($(this).data('panelId'))

                            $thisPanel.remove()
                            $tabLinkId.parent('li').remove()
                            Tab.saveTabs();
                            $(this).dialog( "close" );
                            console.log('L now: (%s), tabs id: (%s)', $('.ui-tabs-tab').length, $tabs.attr('id'))
                            $tabs.tabs('option', 'active', $('.ui-tabs-tab').length - 1)

                        },
                        Cancel: function() {
                            $( this ).dialog( "close" );
                        }
                    },
                    open: function () {
                        var $dialog = $(this)
                        $('.ui-dialog-buttonpane').find('button:contains("Delete")').addClass('ui-state-error');                             $dialog.children('p').append('Really delete the [' + $a.text() + '] tab?')
                    }
                });

                $killTabDialog.data('tabName', $a.text())
                              .data('panelId', $a.attr('href'))
                              .data('tabLinkId', $a.prop('id'))
                              .dialog('open')
            });
        }
        };
}());
