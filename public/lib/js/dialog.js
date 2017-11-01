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

                console.log('T: %s', thisFeedName)

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

        }
    };
}());

$('#feedDialog').dialog({
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

            var $tabFeedId = $('li#' + $(this).data('feedId'))
            var $mobFeedRefresh = $tabFeedId.find('.mobFeedRefresh')

            $tabFeedId.data('url', $('#feedUrl').val())
            $tabFeedId.data('limit', $('#feedLimit').val())
            $tabFeedId.data('limit', $('#feedLimitSlider').val())

            $('.feedType').children('input').each(function () {
                if ($(this).is(':checked'))
                    $tabFeedId.data('type', $(this).attr('id'))
            });

            Feed.populateFeed($mobFeedRefresh);
            Tab.saveTabs();
            $(this).dialog( 'close' );
        }
    },
    open: function( event, ui ) {

        var $urlInput = $(this).find('input#feedUrl')

        $urlInput.select()

        $('input#feedUrl').val($(this).data('feedUrl'));
        $('.feedType #' + $(this).data('feedType')).prop('checked',true).change();

        $(this).on('submit', function () {
            Feed.populateFeed($mobFeedRefresh);
            Tab.saveTabs();

            $(this).dialog('close');
            return false;
        });
    }
});

$("#killFeedDialog").dialog({
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
        $('button:contains("Delete")').addClass('ui-state-error');
    }
});
