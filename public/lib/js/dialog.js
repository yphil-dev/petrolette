$('#tabDialog').dialog({
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

            console.log('yp: ' + $('#tabName'))

            $('#' + $(this).data('tabId')).text($('#tabName').val());
            $( this ).dialog( 'close' );
            Tab.saveTabs();
        }
    },
    open: function( event, ui ) {

        $('#tabName').val($(this).data('tabName'));

        $(this).on('submit', function () {
            $('#' + $(this).data('tabId')).text($('#tabName').val());
            $(this).dialog('close');
            Tab.saveTabs();
        });
    }
});

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

            $('.feedType').children('input').each(function () {
                if ($(this).is(':checked')) {
                    console.log('type: ' + $(this).attr('id')); // "this" is the current element in the loop
                    $tabFeedId.data('type', $(this).attr('id'))
                }

            });

            // $tabFeedId.data('type', $(this).data('feedType'))

            Feed.populateFeed($mobFeedRefresh);
            Tab.saveTabs();

            $(this).dialog( 'close' );
        }
    },
    open: function( event, ui ) {

        $('#feedUrl').val($(this).data('feedUrl'));
        $('#feedLimit').val($(this).data('feedLimit'));
        $('.feedType #' + $(this).data('feedType')).prop('checked',true).change();

        $(this).on('submit', function () {
            Feed.populateFeed($mobFeedRefresh);
            Tab.saveTabs();

            $(this).dialog('close');
            return false;
        });

    }
});

$( "#killTabDialog" ).dialog({
    autoOpen: false,
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
        "Delete all feeds": function() {

            var $tabLinkId = $('#' + $(this).data('tabLinkId'))

            var $thisPanel = $($(this).data('panelId'))

            $thisPanel.remove()

            $tabLinkId.parent('li').remove()

            $tabs.tabs('refresh');

            Tab.saveTabs();

            $(this).dialog( "close" );
            return;

        },
        Cancel: function() {
            $( this ).dialog( "close" );
        }
    },
    open: function () {
        $('.ui-dialog-buttonpane').find('button:contains("Delete")').addClass('ui-state-error');
    }
});

$( "#killFeedDialog" ).dialog({
    autoOpen: false,
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
        "Delete feed": function() {

            var $tabFeedId = $('#' + $(this).data('feedId'))

            console.log('data: ' + $tabFeedId.text())

            $tabFeedId.remove()

            Tab.saveTabs()

            $(this).dialog( "close" );

        },
        Cancel: function() {
            $( this ).dialog( "close" );
        }
    },
    open: function () {
        $('.ui-dialog-buttonpane').find('button:contains("Delete")').addClass('ui-state-error');
    }
});
