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
        $('button:contains("Delete")').addClass('ui-state-error');
    }
});
