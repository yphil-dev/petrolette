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

            $('#' + $(this).data('tabId')).text($('#tabName').val());
            Tab.saveTabs();
            $( this ).dialog( 'close' );
        }
    },
    open: function( event, ui ) {

        $('#tabName').val($(this).data('tabName'));

        $(this).on('submit', function () {
            $('#' + $(this).data('tabId')).text($('#tabName').val());
            Tab.saveTabs();
            $(this).dialog('close');
            return false;
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

        $('input#feedUrl').select()

        $('input#feedUrl').val($(this).data('feedUrl'));
        $('input#feedLimit').val(feedLimit);
        $('input#feedLimit').val($(this).data('feedLimit'));
        $('input#feedLimitSlider').val($(this).data('feedLimit'));
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
