var Dialog = (function() {

    return {
        renameTab:function($tab) {

            $('#mobDialogs').load('/static/templates/dialogs.html #renameTabDialog', function() {
                var $dialog = $('#renameTabDialog')

                console.log('Imma dialog: %s', $tab.text())

                $dialog.dialog({
                    autoOpen: false,
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
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

            $('#mobDialogs').load('/static/templates/dialogs.html #killDialog', function() {
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

                            $tabFeedId.hide('fade', 1000, function() {
                                $tabFeedId.remove()
                            });

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
        feedPrefs:function($feedPrefsButton, isNewFeed) {

            $('#mobDialogs').load('/static/templates/dialogs.html #feedPrefs', function() {
                var $dialog = $(this).find('#feedPrefs')

                var $spinner = $(this).find('#spinner').spinner();

                $spinner.on( "spinstop", function(event, ui) {
                    $dialog.find('div#feedLimit').slider( "option", "value", $(this).val());
                    $dialog.find(".ui-slider-handle").text($(this).val());
                });

                var $dataStore = $feedPrefsButton.parent().parent()

                var $feed = $dataStore.parent().parent();

                $dialog.dialog({
                    autoOpen: false,
                    resizable: false,
                    height: 'auto',
                    width: 400,
                    modal: true,
                    buttons: {
                        Cancel: function() {
                            $(this).dialog( 'close' );

                            if (isNewFeed) {
                                $feed.hide('slide', 1000, function() { $feed.remove() });
                            }

                        },
                        'OK': function() {

                            var newUrl = $(this).find('input#feedGuess').val();
                            var newType = $("#feedType :radio:checked").attr('id');

                            $dataStore.data('url', newUrl)
                                      .data('type', newType)

                            Feed.populateFeed($feedPrefsButton);
                            Tab.saveTabs();

                            $(this).dialog( 'destroy' );

                            $('#mobDialogs').empty();
                        }
                    },
                    open: function(event, ui) {

                        var $dialog = $(this),
                            $tabFeedId = $('li#' + $dataStore.data('id')),
                            $mobFeedRefresh = $tabFeedId.find('.mobFeedRefresh'),
                            $guessButton = $dialog.find('button#feedGuess').button(),
                            $guessSpinner = $dialog.find('button#feedGuess > i'),
                            $guessField = $dialog.find('input#feedGuess'),
                            $guessGroup = $dialog.find('div#feedGuess').controlgroup(),
                            $urlGroup = $guessGroup.parent(),
                            $okButton = $('.ui-dialog-buttonpane').find('button:contains("OK")').addClass('okButton');

                        var oldUrl = $dataStore.data('url'),
                            oldType = $dataStore.data('type'),
                            oldLimit = $dataStore.data('limit');

                        $guessButton.click(function(event) {
                            console.log('\nGuess: %s', $guessField.val());

                            $guessSpinner.removeClass('icon-ok icon-cancel-circled icon-flashlight')
                                         .addClass('spinner icon-cog');
                            $guessButton.removeClass('ui-state-success ui-state-error');

                            $.get("/discover", {
                                url: $guessField.val(),
                                dataType: "json",
                                timeout: 1200
                            }, function(feed, status) {
                                $guessSpinner.removeClass('spinner icon-cog');
                            }).done(function(feed, status) {
                                console.log( 'OK %s (status %s)', feed, status);
                                $guessField.val(feed);
                                $guessSpinner.addClass('icon-ok');
                                $guessButton.addClass('ui-state-success');

                                $okButton.removeClass('ui-state-error')
                                         .addClass("ui-state-success");

                            }).fail(function(feed, status) {
                                console.log( 'ERROR %s (status: %s)', $guessField.val(), status);
                                $guessSpinner.removeClass('icon-cog spinner')
                                             .addClass('icon-cancel-circled');
                                $guessButton.addClass('ui-state-error');
                                $okButton.addClass("ui-state-error");

                            }).always(function(feed, status) {
                                console.log( 'Always %s (status: %s)', $guessField.val(), status);
                            });

                        });

                        $spinner.spinner( "value", oldLimit);

                        $dialog.find('input#feedGuess').val(oldUrl);

                        // $dialog.find('.feedType').checkboxradio();

                        $("input:radio, input:checkbox").checkboxradio({
                            icon: true
                        });

                        $dialog.find('input#' + oldType || 'mixed').prop("checked", true)
                               .checkboxradio('refresh');

                        $dialog.find('#feedType').controlgroup();

                        // $dialog.find('.feedType').on("change", function(event){
                        //     console.log("CHANGE EVENT!", $(this).attr('id'));
                        //     $(this).attr("checked","checked").change();
                        // });

                        // $dialog.find('.feedType').click(function(event){
                        //     console.log("CHANGE EVENT!", $(this).attr('id'));
                        //     $dialog.find('#feedType').controlgroup('refresh');
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
                                $("input#spinner").val(ui.value);
                            },
                            change: function( event, ui ) {
                                $("input#feedLimit").val(ui.value);
                                $dataStore.data('limit', ui.value);
                            }
                        });

                        $dialog.on('submit', function () {
                            Feed.populateFeed($mobFeedRefresh);
                            Tab.saveTabs();

                            $(this).dialog('close');
                            return false;
                        });

                        $dialog.find('#feedGuess').select()

                    }
                });

                $dialog
                    .data('id', $dataStore.data('id'))
                    .data('url', $dataStore.data('url'))
                    .data('type', $dataStore.data('type'))
                    .data('limit', $dataStore.data('limit'))
                    .dialog('open');
            });

        },
        killTab:function($button) {

            var $tabs = $('#tabs');
            var $a = $button.prev('a.ui-tabs-anchor');
            var tabId = $a.attr('href');

            var $selectedTab = $a.parent();
            var $selectedPanel = $tabs.find(tabId);

            var selectedTabIndex = $tabs.tabs('option', 'active');
            var previousTabIndex = selectedTabIndex === 0 ? 0 : selectedTabIndex -1;

            $('#mobDialogs').load('/static/templates/dialogs.html #killDialog', function() {

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

                            $selectedTab.remove();
                            $selectedPanel.remove();

                            Tab.saveTabs();
                            $(this).dialog( "close" );
                            $tabs.tabs('option', 'active', previousTabIndex).tabs('refresh');
                        },
                        Cancel: function() {
                            $(this).dialog( "close" );
                        }
                    },
                    open: function () {
                        $(this).find('button:contains("Delete")').addClass('ui-state-error');
                        $(this).children('p').append('Really delete the [' + $a.text() + '] tab?')
                    }
                });

                $killTabDialog.dialog('open')
            });
        }
    };
}());
