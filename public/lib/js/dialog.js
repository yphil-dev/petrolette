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
        feedPrefs:function($button) {

            $('#mobDialogs').load('/static/templates/dialog.html #feedPrefs', function() {
                var $dialog = $('#feedPrefs')

                var $thisFeedId = $button.parent().parent().parent().parent().attr('id')

                var $feedContainer = $button.parent().parent().parent().parent();

                console.log('I: %s', $thisFeedId)

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

                            var newUrl = $dialog.find('#feedUrl').val()
                            var newType = $dialog.find('#feedType').val()
                            var newLimit = $dialog.find('#feedLimit').val()

                            console.log('U: %s', newUrl)

                            var $tabFeedId = $('li#' + $(this).data('feedId'))
                            var $mobFeedRefresh = $tabFeedId.find('.mobFeedRefresh')

                            $tabFeedId.data('url', $('#feedUrl').val())
                            $tabFeedId.data('type', $('#feedType').val())
                            $tabFeedId.data('limit', $('input#feedLimit').val())

                            $('#feedType').children('input').each(function () {
                                if ($(this).is(':checked'))
                                    $tabFeedId.data('type', $(this).attr('id'))
                            });

                            Feed.populateFeed($mobFeedRefresh);
                            Tab.saveTabs();
                            $(this).dialog( 'close' );
                        }
                    },
                    open: function( event, ui ) {

                        var $dialog = $(this)

                        var oldUrl = $dialog.data('feedUrl')
                        var oldType = $dialog.data('feedType')
                        var oldLimit = $dialog.data('feedLimit')

                        $dialog.find('input#feedUrl').val(oldUrl);

                        $dialog.find('.feedType').checkboxradio({
                            icon: false
                        });

                        $dialog.find('#' + oldType).attr("checked", true).checkboxradio("refresh");

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
                                $(this).find(".ui-slider-handle").text(oldLimit);
                            },
                            slide: function( event, ui ) {
                                $(this).val(ui.value);
                                $(this).find(".ui-slider-handle").text(ui.value);
                            },
                            change: function( event, ui ) {
                                $("input#feedLimit").val(ui.value);
                                console.log('V: %s', $("input#feedLimit").val())
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
                    .data('feedId', $thisFeedId)
                    .data('feedUrl', $feedContainer.data('url'))
                    .data('feedLimit', $feedContainer.data('limit'))
                    .data('feedType', $feedContainer.data('type'))
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
