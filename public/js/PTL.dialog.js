// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.dialog = {
    kill: function($dialog) {
        $dialog.dialog('close');
        $('div#ptlDialogs').empty();
    },
    feedPrefs: function($button, isNewFeed) {

        $('div#ptlDialogs').load('/static/templates/dialogs.html #feedPrefsDialog', function() {

            const $dialog = $(this),
                  $dataStore = $button.parent().parent(),
                  $feed = $dataStore.parent().parent(),
                  $feedBody = $dataStore.parent().next('div.feedBody'),
                  allGroups = PTL.tab.list('all'),
                  $thisGroup = $feed.parent().parent(),
                  $groupMenu = $dialog.find('select#feedTabSelect');

            $('.help-rss').attr('href', 'https://' + PTL.language + '.wikipedia.org/wiki/RSS');

            $dialog.dialog({
                title: isNewFeed ? PTL.tr('New feed') : PTL.tr('Feed'),
                width: PTL.util.isMobile() ? 'auto' : 630,
                buttons: [
                    {
                        text: PTL.tr('Cancel'),
                        title: PTL.tr('Cancel'),
                        class: 'translate',
                        click: function() {
                            PTL.dialog.kill($dialog);
                        }
                    },
                    {
                        text: PTL.tr('OK'),
                        title: PTL.tr('OK'),
                        class: 'translate button-ok',
                        click: function() {

                            const feedUrl = DOMPurify.sanitize($dialog.find('input#feedGuessInput').val()),
                                  $messageTitle = $dialog.find('div#messageZone > .messageTitle'),
                                  $messageText = $dialog.find('div#messageZone > .messageText');

                            if (feedUrl == '') {

                                $messageTitle
                                    .addClass('warning')
                                    .text(PTL.tr('Warning'));
                                $messageText
                                    .text(PTL.tr('This field cannot be empty'));

                                return;
                            }

                            if ($groupMenu.find(":selected").val() !== $thisGroup.attr('id')) {
                                $feed.hide('fade', 250, function() {
                                    $(this).prependTo($('#' + $groupMenu
                                                        .find(":selected")
                                                        .val() + ' .column')
                                                      .first())
                                        .show('slow');
                                    PTL.tab.saveTabs();
                                });
                            }

                            var newUrl = DOMPurify.sanitize($(this).find('input#feedGuessInput').val()),
                                newName = DOMPurify.sanitize($(this).find('input#feedNameInput').val()),
                                newType = $('#feedTypeDiv :radio:checked').attr('id');

                            $dataStore
                                .data('url', newUrl)
                                .data('name', newName)
                                .data('type', newType);

                            if ($('input[name=killFeedCheckbox]:checked').val() === 'on') {
                                $feed.hide('fade', 250, function() {
                                    $feed.remove();
                                });
                            } else {

                                $feed.show('fade', 250, function() {
                                    PTL.feed.populate($button);
                                });

                                PTL.tab.saveTabs();

                            }

                            PTL.dialog.kill($dialog);

                        }
                    }
                ],
                open: function() {

                    $('.ui-widget-overlay, .ui-dialog-titlebar-close').on('click', function() {
                        PTL.dialog.kill($dialog);
                    });

                    $.each(allGroups, function() {
                        const selected = (this.pane === $thisGroup.attr('id'));
                        $groupMenu.append($('<option>', {
                            value: this.pane,
                            selected: selected,
                            text: this.name
                        }));
                    });

                    function guessError(errorMessage) {

                        const thisMesg = errorMessage || PTL.tr('No feed found at this URL');

                        $guessSpinner.removeClass('icon-refresh spin ui-state-success')
                            .addClass('icon-error');

                        $guessButton
                            .addClass('ui-state-error')
                            .attr('title', thisMesg);

                        $messageTitle
                            .removeClass('warning')
                            .addClass('error')
                            .text(PTL.tr('Error'));
                        $messageText.text(errorMessage || thisMesg);

                    }

                    const $guessButton = $dialog.find('button#feedGuessButton').button(),
                          $guessSpinner = $dialog.find('button#feedGuessButton > i'),
                          $feedGuessInput = $dialog.find('input#feedGuessInput'),
                          $feedNameInput = $dialog.find('input#feedNameInput'),
                          $okButton = $('.ui-dialog-buttonpane').find('.button-ok'),
                          $killFeedFieldset = $('fieldset#killFeedFieldset'),
                          $killFeedLegend = $('legend#killFeedLegend'),
                          oldUrl = $dataStore.data('url'),
                          oldName = $dataStore.data('name'),
                          oldType = $dataStore.data('type'),
                          oldLimit = $dataStore.data('limit'),
                          oldNbItems = $dataStore.data('nbitems'),
                          $messageTitle = $dialog.find('div#messageZone > .messageTitle'),
                          $messageText = $dialog.find('div#messageZone > .messageText'),
                          $feedLimitInput = $('input#feedLimit'),
                          $feedLimitSlider = $('div#feedLimitSlider'),
                          $feedLimitSpinner = $dialog.find('input#feedLimitSpinner').spinner({
                              classes: {
                                  "ui-spinner": "shrink ui-corner-all"
                              }
                          }),
                          $feedNbItemsInput = $('input#feedNbItems'),
                          $feedNbItemsSlider = $('div#feedNbItemsSlider'),
                          $feedNbItemsSpinner = $dialog.find('input#feedNbItemsSpinner').spinner({
                              classes: {
                                  "ui-spinner": "shrink ui-corner-all"
                              }
                          });

                    $('.helpTourDialogItem').each(function() {
                        const step = $(this).data('step');
                        $(this)
                            .parent()
                            .prev()
                            .append($('<i>')
                                    .attr('class', 'icon-help helpIcon')
                                    .attr('title', step)
                                    .on('click', function() {
                                        PTL.dialog.tour('feedPrefs', step);
                                    }));
                    });

                    if (isNewFeed || !PTL.util.isMobile()) {
                        $killFeedLegend.remove();
                        $killFeedFieldset.remove();
                    }

                    $guessButton.click(function() {

                        const feedUrl = DOMPurify.sanitize($feedGuessInput.val());

                        if (feedUrl == '') {

                            $messageTitle
                                .addClass('warning')
                                .text(PTL.tr('Warning'));
                            $messageText
                                .text(PTL.tr('This field cannot be empty'));

                            return;
                        }

                        $guessSpinner
                            .removeClass('icon-checked icon-error icon-search ui-state-success ui-state-error')
                            .addClass('spin icon-refresh');
                        $guessButton.removeClass('icon-checked ui-state-success ui-state-error');

                        $.get('/discover', {
                            dataType: 'json',
                            url: feedUrl,
                            searchPrefix: PTL.prefs.readConfig('searchPrefix'),
                            timeout: 2000
                        }).fail(function(_req, _status, _xhr) {
                            guessError();
                        }).done(function(feeds) {
                            $guessSpinner.removeClass('spin icon-refresh');

                            $feedGuessInput.val(feeds[0]);

                            $guessSpinner
                                .removeClass('ui-state-error')
                                .addClass('icon-checked ui-state-success');

                            $guessButton
                                .addClass('ui-state-success')
                                .attr('title', PTL.tr('Valid feed found! Now just press OK'));

                        }).always(function(_req, status, _xhr) {
                            if (status === 'error') guessError();
                        });

                    });

                    $feedGuessInput.val(oldUrl);
                    $dialog.find('input#feedNameInput').val(oldName);

                    $('input:radio, input:checkbox').checkboxradio({
                        icon: false
                    });

                    $dialog.find('input#' + oldType || 'mixed')
                        .prop('checked', true)
                        .checkboxradio('refresh');

                    $feedLimitSpinner
                        .spinner('value', oldLimit)
                        .on('spinstop', function() {
                            $feedLimitSlider.slider('option', 'value', $(this).val());
                            $dialog.find('div#feedLimitSlider > .ui-slider-handle').text($(this).val());
                        });

                    $feedLimitSlider.slider({
                        value: oldLimit,
                        min: 1,
                        max: 600,
                        step: 1,
                        create: function() {
                            $feedLimitInput.val(oldLimit);
                            $(this).find('.ui-slider-handle').text(oldLimit);
                        },
                        slide: function(_event, ui) {
                            $(this).val(ui.value);
                            $(this).find('.ui-slider-handle').text(ui.value);
                            $feedBody.css('height', ui.value + 'px');
                            $feedLimitSpinner.val(ui.value);
                        },
                        change: function(_event, ui) {
                            $feedLimitInput.val(ui.value);
                            $dataStore.data('limit', ui.value);
                        }
                    });

                    $feedNbItemsSpinner
                        .spinner('value', oldNbItems)
                        .on('spinstop', function() {
                            $feedNbItemsSlider.slider('option', 'value', $(this).val());
                            $dialog.find('div#feedNbItemsSlider > .ui-slider-handle').text($(this).val());
                        });

                    $feedNbItemsSlider.slider({
                        value: oldNbItems,
                        min: 0,
                        max: 100,
                        step: 1,
                        create: function() {
                            $feedNbItemsInput.val(oldNbItems);
                            $(this).find('.ui-slider-handle').text(oldNbItems);
                        },
                        slide: function(_event, ui) {
                            $(this).val(ui.value);
                            $(this).find('.ui-slider-handle').text(ui.value);
                            $feedNbItemsSpinner.val(ui.value);
                        },
                        change: function(_event, ui) {
                            $feedNbItemsInput.val(ui.value);
                            $dataStore.data('nbitems', ui.value);
                        }
                    });

                    $feedNameInput.on('keypress', function(e) {
                        if (e.which == 13) {
                            $okButton.click();
                        }
                    });

                    $feedGuessInput.on('keypress', function(e) {
                        if (e.which == 13) {
                            $okButton.click();
                        }
                    });

                },
                close: function(_event, _ui) {

                    if (isNewFeed) {

                        $feed.hide('fade', 250, function() {
                            $feed.remove();
                        });
                    } else {
                        $feed.show();
                    }

                    PTL.dialog.kill($dialog);

                }
            });

            $dialog.dialog('open');

        });

    },
    feedAddError: function($dialog, xhr) {

        const $addButton = $dialog.find('button#feedAddButton').button(),
              $addButtonText = $addButton.find('span.buttonText').text(PTL.tr('Add')),
              $feedAddInput = $dialog.find('input#feedAddInput'),
              $addButtonIcon = $addButton.find('i'),
              $messageTitle = $dialog.find('div#messageZone > .messageTitle'),
              $messageText = $dialog.find('div#messageZone > .messageText');

        $messageTitle.empty();
        $messageText.empty();

        $messageTitle.append($('<i>').attr('class', 'icon-warning dangerous'));

        if (xhr == 'empty') {
            $messageText.text(PTL.tr('This field cannot be empty'));

            $addButton.attr('title', PTL.tr('This field cannot be empty'));

        } else {

            $messageText
                .append($('<span>')
                        .attr('class', 'messageTitleErrorCode')
                        .text(xhr.statusText + ' ('))
                .append($('<a>')
                        .attr({
                            'href': 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/' + xhr.status,
                            'class': 'docLink'
                        })
                        .text(xhr.status))
                .append($('<span>').text(') ' + xhr.responseText));

            $addButtonIcon
                .hide()
                .removeClass('icon-refresh icon-checked spin');

            $addButton.attr('title', PTL.tr('Add anyway'));

            $('form#feedNewDialogForm').submit(function() {

                const feedUrl = DOMPurify.sanitize($feedAddInput.val());
                if (feedUrl == '') PTL.dialog.feedAddError($dialog, feedUrl, 'empty');
                PTL.feed.add(PTL.util.firstColumn(), feedUrl, '', 'mixed', 220, 'on', '', 16, '', true);
                PTL.dialog.kill($dialog);

            });

        }

        $addButton.addClass('ui-state-error');
        $addButtonText.text(PTL.tr('Add'));

    },
    suggestionList: function(tabs) {

        const $masterList = $('<ul>');
        
        tabs.forEach(function(tab) {
            console.error('tab.name: %s (%s)', tab.name);

            const $tabLi = $('<li>')
                  .attr('class', 'tabLi')
                  .appendTo($masterList)
                  .on('click', function() {

                      $(this).children('ul').children('li.feedLi').show('slow');
                      
                  });

            const $feedUl = $('<ul>')
                  .attr('class', 'tabUl')
                  .appendTo($tabLi);

            const $feedLi = $('<li>')
                          .attr('class', 'feedLi hidden')
                          .appendTo($feedUl);

            $feedUl.append($('<li>')
                           .attr('class', 'tabTitle')
                           .text(tab.name));
            
            $.each(tab.columns, function(i, col) {

                $.each(col, function(i, feed) {

                    $feedUl.append($('<li>')
                                   .attr('class', 'feedLi hidden')
                                   .text(feed.name)
                                   .on('click', function() {
                                       PTL.dialog.tour('feedNew');
                                   }));                       

                    console.error('feed: %s (%s)', feed.name, i);
                });
                
            });
            $feedUl.appendTo($tabLi);
        });

        return $masterList;

    },
    feedNew: function(url) {

        $('div#ptlDialogs').load('/static/templates/dialogs.html #feedNewDialog', function() {

            const $dialog = $(this);

            $dialog.dialog({
                title: PTL.tr('New feed'),
                width: PTL.util.isMobile() ? 'auto' : 630,
                modal: true,
                buttons: [
                    {
                        text: PTL.tr('Suggestions'),
                        title: PTL.tr('Suggestions'),
                        class: 'translate',
                        click: function() {
                            $('div#feedNewListDiv').html(PTL.dialog.suggestionList(PTL.prefs.getDefaultFeeds()));
                        }
                    },
                    {
                        text: PTL.tr('Close'),
                        title: PTL.tr('Close'),
                        class: 'translate',
                        click: function() {
                            PTL.dialog.kill($dialog);
                        }
                    }
                ],
                open: function() {

                    const $addButton = $dialog.find('button#feedAddButton').button(),
                          $addButtonText = $addButton.find('span.buttonText').text(PTL.tr('Add')),
                          $addButtonIcon = $addButton.find('i'),
                          $feedAddInput = $dialog.find('input#feedAddInput'),
                          $messageTitle = $dialog.find('div#messageZone > .messageTitle'),
                          $messageText = $dialog.find('div#messageZone > .messageText');

                    $feedAddInput.focus(function() {
                        $addButton.removeClass('ui-state-error');
                        $messageTitle.empty();
                        $messageText.empty();
                    });

                    $dialog.find("form").on("submit", function(e) {
                        e.preventDefault();
                    });

                    $('.helpTourDialogItem')
                        .append($('<i>')
                                .attr('class', 'icon-help helpIcon')
                                .attr('title', PTL.tr('Help') + ' - ' + PTL.tr('Three options'))
                                .on('click', function() {
                                    PTL.dialog.tour('feedNew');
                                }));

                    $('.ui-widget-overlay, .ui-dialog-titlebar-close').on('click', function() {
                        PTL.dialog.kill($dialog);
                    });

                    $('form#feedNewDialogForm').submit(function() {

                        let feedUrl;

                        $('div#feedNewListDiv').empty();

                        if (url) {
                            feedUrl = DOMPurify.sanitize(url);
                            $feedAddInput.val(feedUrl);
                        } else {
                            feedUrl = DOMPurify.sanitize($feedAddInput.val());
                        }

                        if (feedUrl == '') {
                            PTL.dialog.feedAddError($dialog, feedUrl, 'empty');
                            return;
                        }

                        $addButtonIcon
                            .removeClass('icon-checked icon-error ui-state-error')
                            .addClass('spin icon-refresh');
                        $addButton
                            .removeClass('ui-state-error');

                        $addButtonText.text('');

                        $.get('/discover', {
                            dataType: 'json',
                            url: feedUrl,
                            searchPrefix: PTL.prefs.readConfig('searchPrefix'),
                            timeout: 2000
                        }).fail(function(xhr) {
                            PTL.dialog.feedAddError($dialog, feedUrl, xhr);
                        }).done(function(feeds) {

                            $messageTitle.empty();
                            $messageText.empty();

                            $feedAddInput.val(feeds[0]);

                            $addButtonIcon.removeClass('spin icon-error');

                            $addButton.removeClass('ui-state-error');

                            if (feeds.length > 1) {

                                var $feedsAddDivList = $('<ul>')
                                    .attr({
                                        'class': ' flexBox',
                                        'id': 'feedsAddDivList'
                                    });

                                $('div#feedNewListDiv')
                                    .show()
                                    .append($('<p>')
                                            .attr('class', 'feedsAddDivListP translate')
                                            .text(PTL.tr('Pétrolette found %1 feeds at this URL', feeds.length))
                                            .data('content', 'Pétrolette found %1 feeds at this URL'));

                                feeds.forEach(function(feed) {

                                    let $feedRow = $('<div>')
                                        .attr('class', 'flexBox feedsListDiv')
                                        .append($('<div>')
                                                .attr({ 'class': 'feedsAddDivName grow', 'title': feed })
                                                .append($('<div>')
                                                        .attr('class', 'flexBox')
                                                        .append($('<div>')
                                                                .attr('class', 'shrink feedsListIcon flexBox')
                                                                .append($('<i>').attr('class', 'icon-rss')))
                                                        .append($('<div>')
                                                                .attr('class', 'grow feedsListLink flexBox')
                                                                .append($('<a>').attr('href', feed).text(feed)))))
                                        .append($('<button>')
                                                .attr('class', 'ui-button ui-corner-all buttonText translate feedsAddDivName shrink')
                                                .data('content', 'Add')
                                                .click(function(e) {
                                                    e.preventDefault();
                                                    PTL.feed.add(PTL.util.firstColumn(), feed, '', 'mixed', 220, 'on', '', 16, '', true);
                                                })
                                                .text(PTL.tr('Add')));

                                    // .append($('<i>').attr('class', 'icon-rss feedsListIcon'))
                                    // .append($('<a>').attr('href', feed).text(feed));

                                    $feedsAddDivList.append($feedRow);

                                });

                                $('div#feedNewListDiv').append($feedsAddDivList);

                                $addButtonIcon.removeClass('spin icon-refresh');

                                $addButtonText.text(PTL.tr('Add'));

                            } else {

                                PTL.feed.add(PTL.util.firstColumn(), feeds[0], '', 'mixed', 220, 'on', '', 16, '', true);
                                PTL.dialog.kill($dialog);

                            }
                        });
                    });
                }
            });
            $dialog.dialog('open');
        });

    },
    killColumn: function($button) {

        $('div#ptlDialogs').load('/static/templates/dialogs.html #questionDialog', function() {

            const $dialog = $(this),
                  $column = $button.parent().parent(),
                  $panel = $column.parent(),
                  $icon = $dialog.find('div#icon > i'),
                  colIndex = $panel.find('.column').index($column),
                  $feedsInCol = $column.find('.feed'),
                  nbOfFeedsInCol = $feedsInCol.length;

            $icon.addClass('icon-trash-empty danger');

            $dialog.dialog({
                title: PTL.tr('Delete column'),
                width: PTL.util.isMobile() ? 'auto' : 630,
                buttons: [
                    {
                        text: PTL.tr('Cancel'),
                        title: PTL.tr('Cancel'),
                        class: 'translate ui-state-focus',
                        click: function() {
                            PTL.dialog.kill($dialog);
                        }
                    },
                    {
                        text: PTL.tr('Delete'),
                        title: PTL.tr('Wait! Are you sure?'),
                        class: "dangerous translate",
                        click: function() {
                            PTL.dialog.kill($dialog);
                            PTL.col.del($column);
                        }
                    }
                ],
                open: function() {

                    $('.ui-widget-overlay').on('click', function() {
                        PTL.dialog.kill($dialog);
                    });

                    $dialog.find('h1').text(PTL.tr('Delete this column and all of its content?'))
                        .next('p#dialogBlurb')
                        .addClass('dangerous')
                        .text(PTL.tr('This action cannot be undone.'))
                        .next('h2').text(PTL.tr('Index'))
                        .next('p').text((colIndex + 1))
                        .next('h2').text(PTL.tr('Number of feeds'))
                        .next('p').text(nbOfFeedsInCol);

                }
            });

            $dialog.dialog('open');
        });
    },
    kbShortcuts: function() {

        $('div#ptlDialogs').load('/static/templates/dialogs.html #kbShortcuts', function() {

            const $dialog = $(this);

            $dialog.dialog({
                title: PTL.tr('Documentation'),
                width: PTL.util.isMobile() ? 'auto' : '90%',
                buttons: [
                    {
                        text: PTL.tr('Ok'),
                        title: PTL.tr('Ok'),
                        class: 'translate',
                        click: function() {
                            PTL.dialog.kill($dialog);
                        }
                    }
                ],
                open: function() {

                    $('.ui-widget-overlay').on('click', function() {
                        PTL.dialog.kill($dialog);
                    });

                    $('kbd#kbShortcutNewFeed').text(PTL.kbShortcutNewFeed);
                    $('kbd#kbShortcutFocusTab').text(PTL.kbShortcutFocusTab);
                    $('kbd#kbShortcutFocusSearch').text(PTL.kbShortcutFocusSearch);
                }
            });

            $dialog.dialog('open');
        });
    },
    killTab: function($button) {

        $('div#ptlDialogs').load('/static/templates/dialogs.html #questionDialog', function() {

            const $dialog = $(this),
                  $tabs = $('#tabs'),
                  $a = $button.prev('a.ui-tabs-anchor'),
                  tabId = $a.attr('href'),
                  $selectedTab = $a.parent(),
                  $selectedPanel = $tabs.find(tabId),
                  $icon = $dialog.find('div#icon > i'),
                  selectedTabIndex = $tabs.tabs('option', 'active'),
                  previousTabIndex = selectedTabIndex === 0 ? 0 : selectedTabIndex - 1;

            $icon.addClass('icon-trash-empty danger');

            $dialog.dialog({
                title: PTL.tr('Delete tab'),
                width: PTL.util.isMobile() ? 'auto' : 630,
                buttons: [
                    {
                        text: PTL.tr('Cancel'),
                        title: PTL.tr('Cancel'),
                        class: 'translate ui-state-focus',
                        click: function() {
                            PTL.dialog.kill($dialog);
                        }
                    },
                    {
                        text: PTL.tr('Delete'),
                        title: PTL.tr('Wait! Are you sure?'),
                        class: "dangerous translate",
                        click: function() {

                            $selectedTab.remove();
                            $selectedPanel.remove();

                            PTL.tab.saveTabs();
                            PTL.dialog.kill($dialog);

                            if ($.parseJSON(PTL.prefs.readConfig('feeds')).length > 0) {
                                $tabs.tabs('option', 'active', previousTabIndex).tabs('refresh');
                            }
                        }
                    }
                ],
                open: function() {

                    $('.ui-widget-overlay').on('click', function() {
                        PTL.dialog.kill($dialog);
                    });

                    $dialog.find('h1').text(PTL.tr('Delete this tab and all of its content?'))
                        .next('p#dialogBlurb')
                        .addClass('dangerous')
                        .text(PTL.tr('This action cannot be undone.'))
                        .next('h2').text(PTL.tr('Name'))
                        .next('p').text($a.text())
                        .next('h2').text(PTL.tr('Number of feeds'))
                        .next('p').text($selectedPanel.find('li.feed').length);

                }
            });

            $dialog.dialog('open');
        });
    },
    killFeed: function($button, $selectedFeeds) {

        $('div#ptlDialogs').load('/static/templates/dialogs.html #questionDialog', function() {

            const $dialog = $(this),
                  thisFeedId = $button.parent().parent().parent().parent().attr('id'),
                  $icon = $dialog.find('div#icon > i');

            $icon.addClass('icon-trash-empty danger');

            function cancelDialog() {
                PTL.dialog.kill($dialog);
                $selectedFeeds.removeClass('selected');
            }

            $dialog.dialog({
                title: ($selectedFeeds.length > 1) ? PTL.tr('Delete feeds') : PTL.tr('Delete feed'),
                width: PTL.util.isMobile() ? 'auto' : 630,
                close: cancelDialog,
                buttons: [
                    {
                        text: PTL.tr('Cancel'),
                        title: PTL.tr('Cancel'),
                        class: 'translate',
                        click: cancelDialog
                    },
                    {
                        text: PTL.tr('Delete'),
                        title: PTL.tr('Wait! Are you sure?'),
                        class: 'dangerous translate',
                        click: function() {
                            $selectedFeeds.hide('fade', 250, function() {
                                $(this).remove();
                                PTL.tab.saveTabs();
                            });
                            PTL.dialog.kill($dialog);
                        }
                    }
                ],
                open: function() {

                    let $names = $('<ul>').addClass('feedNames');

                    $selectedFeeds.each(function() {

                        $names.append($('<li>')
                                      .text($(this)
                                            .children()
                                            .children('.feedTitle')
                                            .children('a')
                                            .attr('title')));

                    });

                    $('.ui-widget-overlay').on('click', cancelDialog);

                    $dialog.find('h1').text(($selectedFeeds.length > 1) ? PTL.tr('Delete those feeds?') : PTL.tr('Delete this feed?'))
                        .next('p#dialogBlurb')
                        .addClass('dangerous')
                        .text(PTL.tr('This action cannot be undone.'))
                        .next('h2').text(($selectedFeeds.length > 1) ? PTL.tr('Names') : PTL.tr('Name'))
                        .next('p').html($names);

                }
            });

            $dialog.data('feedId', thisFeedId).dialog('open');

        });

    },
    importFeeds: function(existingFeeds, importedFeedsFile) {

        $('div#ptlDialogs').load('/static/templates/dialogs.html #questionDialog', function() {

            const $dialog = $(this),
                  $icon = $dialog.find('div#icon > i');

            $icon.addClass('icon-upload');

            $dialog.dialog({
                title: PTL.tr('Open / import'),
                width: PTL.util.isMobile() ? 'auto' : 630,
                buttons: [
                    {
                        text: PTL.tr('Cancel'),
                        title: PTL.tr('Cancel'),
                        class: 'translate',
                        click: function() {
                            PTL.dialog.kill($dialog);
                        }
                    },
                    {
                        text: PTL.tr('Replace'),
                        title: PTL.tr('Replace'),
                        class: 'translate dangerous',
                        click: function() {
                            PTL.tab.empty(function() {
                                PTL.tab.populate(JSON.parse(importedFeedsFile));
                            });
                            PTL.dialog.kill($dialog);
                        }
                    },
                    {
                        text: PTL.tr('Merge'),
                        title: PTL.tr('Merge'),
                        click: function() {
                            PTL.tab.empty(function() {
                                PTL.tab.populate(existingFeeds.concat(JSON.parse(importedFeedsFile)));
                            });
                            PTL.dialog.kill($dialog);
                        }
                    }
                ],
                open: function() {

                    $('.ui-widget-overlay').on('click', function() {
                        PTL.dialog.kill($dialog);
                    });

                    $dialog.find('h1').text(PTL.tr('Open / import tabs and feeds'))
                        .next('p#dialogBlurb')
                        .addClass('dangerous')
                        .text(PTL.tr('This action cannot be undone.'))
                        .next('h2').text(PTL.tr('Replace or merge?'))
                        .next('p').text(PTL.tr('Replace existing feeds with the new ones, or merge them together?'));

                }
            });

            $dialog.dialog('open');

        });

    },
    editTab: function($tab) {

        $('div#ptlDialogs').load('/static/templates/dialogs.html #editTabDialog', function() {

            const $dialog = $(this);

            $dialog.dialog({
                title: PTL.tr('Edit tab'),
                width: PTL.util.isMobile() ? 'auto' : 630,
                buttons: [
                    {
                        text: PTL.tr('Cancel'),
                        title: PTL.tr('Cancel'),
                        class: 'translate',
                        click: function() {
                            PTL.dialog.kill($dialog);
                        }
                    },
                    {
                        text: PTL.tr('Ok'),
                        title: PTL.tr('Ok'),
                        class: 'translate',
                        click: function() {
                            $('#' + $(this).data('tabId')).text($dialog.find('#tabNameInput').val());
                            PTL.tab.saveTabs();
                            PTL.dialog.kill($dialog);
                        }
                    }
                ],
                open: function() {

                    $('.ui-widget-overlay').on('click', function() {
                        PTL.dialog.kill($dialog);
                    });

                    const $tabNameInput = $dialog.find('input#tabNameInput');
                    const $tabNameLegend = $dialog.find('legend#tabNameLegend');

                    const $tabLeft = $dialog.find('button#left');
                    const $tabRight = $dialog.find('button#right');

                    const $tab = $('a#' + $(this).data('tabId')).parent('li');

                    $tabLeft.button().click(function() {
                        PTL.util.moveEltLeft($tab);
                    });

                    $tabRight.button().click(function() {
                        PTL.util.moveEltRight($tab);
                    });

                    $tabNameLegend.text(PTL.tr('Name'));

                    $tabNameInput.val($(this).data('tabName'));

                    $(this).on('submit', function() {
                        $('#' + $(this).data('tabId')).text($tabNameInput.val());
                        PTL.tab.saveTabs();
                        PTL.dialog.kill($dialog);
                    });

                }
            });

            $dialog
                .data('tabName', $tab.text())
                .data('tabId', $tab.attr('id'))
                .dialog('open');
            return;
        });
    },
    help: function() {

        $('div#ptlDialogs').load('/static/templates/dialogs.html #helpDialog', function() {

            const $dialog = $(this);

            $dialog.dialog({
                title: PTL.tr('Documentation'),
                width: PTL.util.isMobile() ? 'auto' : '90%',
                buttons: [
                    {
                        text: PTL.tr('Ok'),
                        title: PTL.tr('Ok'),
                        class: 'translate',
                        click: function() {
                            PTL.dialog.kill($dialog);
                        }
                    }
                ],
                open: function() {

                    $('.ui-widget-overlay').on('click', function() {
                        PTL.dialog.kill($dialog);
                    });


                    $('a.instanceUrl')
                        .attr('href', window.location.href)
                        .text(window.location.href);

                    const ptlUrl = [location.protocol, '//', location.host, location.pathname].join('');

                    $('.helpBookmarklet')
                        .attr('href', 'javascript:void(window.open("' + ptlUrl + '?add="+encodeURIComponent(location.href)))');
                    $('button.helpTour').on('click', function() {
                        PTL.dialog.kill($dialog);
                        PTL.dialog.tour('ui');
                    });

                    $('button.helpKbShortcuts').on('click', function() {
                        PTL.sideMenu('close');
                        PTL.dialog.kill($dialog);
                        PTL.dialog.kbShortcuts();
                    });

                }
            });

            $dialog.dialog('open');
        });
    }, resetTabs: function() {

        $('div#ptlDialogs').load('/static/templates/dialogs.html #questionDialog', function() {

            const $dialog = $(this),
                  $icon = $dialog.find('div#icon > i');

            $icon.addClass('icon-refresh danger');

            $dialog.dialog({
                title: PTL.tr('Reset tabs and feeds'),
                width: PTL.util.isMobile() ? 'auto' : 630,
                buttons: [
                    {
                        text: PTL.tr('Cancel'),
                        title: PTL.tr('Cancel'),
                        class: 'translate',
                        click: function() {
                            PTL.dialog.kill($dialog);
                        }
                    },
                    {
                        text: PTL.tr('Reset'),
                        title: PTL.tr('Wait! Are you sure?'),
                        class: 'dangerous translate',
                        click: function() {
                            localStorage.clear();
                            PTL.util.say(PTL.tr('All tabs and feeds restored to defaults'), 'success', true);
                            PTL.dialog.kill($dialog);
                            window.location.reload();
                        }
                    }
                ],
                open: function() {

                    $('.ui-widget-overlay').on('click', function() {
                        PTL.dialog.kill($dialog);
                    });

                    $dialog.find('h1')
                        .text(PTL.tr('Reset all tabs and feeds to defaults?'))
                        .next('p#dialogBlurb').addClass('dangerous')
                        .text(PTL.tr('This action cannot be undone.'));
                }
            });

            $dialog.dialog('open');

        });

    },
    beg: function() {

        $('div#ptlDialogs').load('/static/templates/dialogs.html #beggarDialog', function() {

            const $dialog = $(this);

            $dialog.dialog({
                title: PTL.tr('Pétrolette needs you'),
                width: PTL.util.isMobile() ? 'auto' : 430,
                buttons: [
                    {
                        text: PTL.tr('Donate'),
                        title: PTL.tr('Send your love to Pétrolette'),
                        class: 'translate',
                        click: function() {
                            window.open('https://liberapay.com/yPhil/donate');
                            PTL.dialog.kill($dialog);
                        }
                    },
                    {
                        text: PTL.tr('Ok'),
                        title: PTL.tr('Ok'),
                        class: 'translate',
                        click: function() {
                            PTL.dialog.kill($dialog);
                        }
                    }
                ],
                open: function() {

                    $('.ui-widget-overlay').on('click', function() {
                        PTL.dialog.kill($dialog);
                    });

                }
            });

            $dialog.dialog('open');

        });
    },
    notify: function(title, text) {

        const $notify = $('#notify');

        $('#notify > h4').text(title),
        $('#notify > p').text(text);

        $notify.fadeIn('fast', 'linear', function() {
            setTimeout(function() {
                $notify.fadeOut('slow');
            }, 5000);
        });

        $notify.click(function() {
            $(this).fadeOut('fast');
        });

    },
    about: function(petroletteVersion, favratVersion, feedratVersion) {

        $('div#ptlDialogs').load('/static/templates/dialogs.html #aboutDialog', function() {

            const $dialog = $(this);

            $dialog.dialog({
                title: PTL.tr('About Pétrolette'),
                width: PTL.util.isMobile() ? 'auto' : 360,
                buttons: [
                    {
                        text: PTL.tr('Source code'),
                        title: PTL.tr('Source code'),
                        class: 'translate',
                        click: function() {
                            PTL.dialog.kill($dialog);
                            window.open('https://framagit.org/yphil/petrolette');
                        }
                    },
                    {
                        text: PTL.tr('Changelog'),
                        title: PTL.tr('Changelog'),
                        class: 'translate',
                        click: function() {
                            PTL.dialog.kill($dialog);
                            window.open('https://framagit.org/yphil/petrolette/-/blob/master/CHANGELOG.md');
                        }
                    },
                    {
                        text: PTL.tr('Ok'),
                        title: PTL.tr('Ok'),
                        class: 'translate',
                        click: function() {
                            PTL.dialog.kill($dialog);
                        }
                    }
                ],
                open: function() {

                    $dialog.find('#petroletteVersion').text(petroletteVersion);
                    $dialog.find('#feedratVersion').text(feedratVersion);
                    $dialog.find('#favratVersion').text(favratVersion);

                }
            });

            $dialog.dialog('open');
        });
    },
    tour: function(type, step) {

        const feedPrefs = introJs(),
              feedNew = introJs(),
              menu = introJs(),
              ui = introJs();

        ui.setOptions({
            steps: [
                {
                    title: PTL.tr('Welcome to Pétrolette'),
                    intro: PTL.tr('Learn to use it in a few easy steps') + ' 👋'
                },
                {
                    title: PTL.tr("That's what it's all about"),
                    element: 'li.feed',
                    intro: PTL.tr('This is an RSS feed.') + ' <a class="docLink icon" href="https://' + PTL.language + '.wikipedia.org/wiki/RSS"><i class="icon-globe"></i></a>'
                },
                {
                    title: PTL.tr('New feed') + ' (<kbd class="key">' + PTL.kbShortcutNewFeed + '</kbd>)',
                    element: 'div#newFeedButton',
                    intro: PTL.tr('Click to add a feed.')
                },
                {
                    title: PTL.tr('Feeds in tabs'),
                    element: 'li[aria-controls=tab-1]',
                    intro: PTL.tr('This is a tab. Tabs contain columns, that contain feeds.') + '<p>' + PTL.tr('Click on a tab to display it ; Click the current/selected tab to change its name and position, drag to move it.') + '</p>'
                },
                {
                    title: PTL.tr('Columns'),
                    element: 'div.colButtons',
                    intro: PTL.tr('Click + to add a column, and - to delete it.')
                },
                {
                    title: PTL.tr('Refresh / reload this feed'),
                    element: '.feedRefresh',
                    intro: PTL.tr('Get the latest articles.')
                },
                {
                    title: PTL.tr('Configure this feed'),
                    element: '.feedPrefs',
                    intro: PTL.tr('Configure this feed: URL, Name, Type (text, media, or both) and height / Nb of items.')
                },
                {
                    title: PTL.tr('Delete feed'),
                    element: '.feed-delete',
                    intro: PTL.tr('Delete all the selected feeds.')
                },
                {
                    title: PTL.tr('Select this feed'),
                    element: '.feedSelect',
                    intro: PTL.tr('Select this feed (for moving and deletion).')
                },
                {
                    title: PTL.tr('Grip handle'),
                    element: '.feedHandle',
                    intro: PTL.tr('Grab this handle to move this feed (and all other selected feeds) within this tab, or into another.')
                },
                {
                    title: PTL.tr('Open / close this feed'),
                    element: 'div.feedToggle',
                    intro: PTL.tr('Closed feeds are not loaded at startup, so as to speed things up.')
                },
                {
                    title: PTL.tr('Search in feeds') + ' (<kbd class="key">' + PTL.kbShortcutFocusSearch + '</kbd>)',
                    element: 'div#ptlSearch > i',
                    intro: PTL.tr('Press ENTER to go to last result, ESCAPE to cancel.')
                },
                {
                    title: PTL.tr('Tab control') + ' (<kbd class="key">' + PTL.kbShortcutFocusTab + '</kbd>)',
                    element: 'div#logoTitle > div.logoTitle',
                    intro: PTL.tr('Focus the current tab.') + '<p>' + PTL.tr('Very useful to browse tabs using the arrow keys.'),
                    position: 'left'
                },
                {
                    title: PTL.tr('You are home') + ' 🏠',
                    element: 'div#menuButton',
                    intro: PTL.tr('Use the menu to configure your Pétrolette.')
                }
            ]
        });

        feedPrefs.setOptions({
            steps: [
                {
                    title: PTL.tr('Location of the feed'),
                    element: '#feedGuessDiv',
                    intro: '<p><span class="translate" data-content="Enter a website address URL and click search, then OK, or simply enter the URL of the">' + PTL.tr('Enter a website address/URL and click search, then OK, or simply enter the URL of the') + '</span> <a class="help-rss docLink" href="https://' + PTL.language + '.wikipedia.org/wiki/RSS">' + PTL.tr('feed') + '</a>.</p><p><span class="translate" data-content="If what you enter is not a regular URL (an internet location in the form of \"http...\") Pétrolette will build a search feed using the words">' + PTL.tr('If what you enter is not a regular URL (an internet location in the form of \"http...\") Pétrolette will build a search feed using the words') + '.</span><p>',
                    position: 'bottom'
                },
                {
                    title: PTL.tr('Feed name (optional)'),
                    element: 'input#feedNameInput',
                    intro: PTL.tr('Name the feed of this website, if it is not informative enough ; leave blank to get the default feed title.'),
                    position: 'left'
                },
                {
                    title: PTL.tr('Keep everything tidy'),
                    element: '#feedTabSelect',
                    intro: PTL.tr('Move this feed to another tab ; Use this menu when drag & drop is not available, like on a phone or a TV.'),
                    position: 'bottom'
                },
                {
                    title: PTL.tr('Feed type'),
                    element: '#feedTypeDiv',
                    intro: PTL.tr('The type of feed: It can be all text, all image, or mixed.'),
                    position: 'top'
                },
                {
                    title: PTL.tr('Height of the feed'),
                    element: '#feedHeightDiv',
                    intro: PTL.tr('Height of the feed\'s viewport.'),
                    position: 'top'
                },
                {
                    title: PTL.tr('Number of items'),
                    element: '#feedMaxItemsDiv',
                    intro: PTL.tr('Number of items to load ; 0 loads all items.'),
                    position: 'top'
                },
                {
                    title: PTL.tr('Have a nice read ☕ 📰'),
                    element: '.button-ok',
                    intro: PTL.tr('I think that\'s about it...') + ' <a href="https://framagit.org/yphil/petrolette/-/issues">' + PTL.tr('Any questions?') + '</a>',
                    position: 'left'
                }
            ]
        });

        menu.setOptions({
            steps: [
                {
                    title: PTL.tr('Feeds'),
                    element: 'fieldset.feedsMenuForm',
                    intro: '<h4>' + PTL.tr('Open') + '</h4>' + PTL.tr('Load / import a feeds file') + ' ; ' + PTL.tr('to append to or replace the existing feeds.') + '<h4>' + PTL.tr('Save') + '</h4>' + PTL.tr('Save / export a feeds file.') + '<h4>' + PTL.tr('Reset') + '</h4>' + PTL.tr('Reset Pétrolette with the default feeds.') + '<h4>' + PTL.tr('Connection to storage') + '</h4>' + PTL.tr('Connection to the cloud to synchronize tabs and feeds on all devices.'),
                    position: 'right'
                },
                {
                    title: PTL.tr('Search prefix'),
                    element: 'fieldset.searchPrefixFieldset',
                    intro: '<h4>' + PTL.tr('Search prefix') + '</h4>' + PTL.tr('Preferred Search engine for building search feeds.') + '<h4>' + PTL.tr('Restore default') + '</h4>' + PTL.tr('Restore default search prefix') + '.',
                    position: 'right'
                },
                {
                    title: 'Pétrolette',
                    element: 'fieldset.ptlFieldset',
                    intro: '<h4>' + PTL.tr('Bookmark to quickly add a website\'s feed to Pétrolette') + '</h4>' + PTL.tr('Bookmark this link, and use it to add a website\'s feed to Pétrolette.') + '<iframe width="320" sandbox="allow-same-origin allow-scripts allow-popups" src="https://exode.me/videos/embed/' + PTL.tr('e9156a58-a059-430d-ad36-4b14ab3b00bf') + '" frameborder="0" allowfullscreen style="margin-top:0.3em;"></iframe>' + '<h4>' + PTL.tr('Source') + '</h4>' + PTL.tr('Use the force, read the source') + '.' + '<h4>' + PTL.tr('License') + '</h4>' + PTL.tr('JavaScript licensing information') + '.',
                    position: 'right'
                },
                {
                    title: PTL.tr('Pétrolette needs you'),
                    element: 'fieldset#support',
                    intro: '<p>' + PTL.tr('Pétrolette is free software. However the development requires') + ' <a class="docLink" href="https://www.youtube.com/watch?v=JlbMEx9H6FE">' + PTL.tr('a lot of time') + '</a> ' + PTL.tr('and') + ' <a class="translate docLink" data-content="a lot of work." href="https://framagit.org/yphil/petrolette/-/commits/master">' + PTL.tr('a lot of work.') + '</a> ' + PTL.tr('In order to keep maintaining Pétrolette and developing her with new features I need your help.') + '</p>' + '<p>' + PTL.tr('Please consider to support the Pétrolette project by sending a donation. Even the smallest amount will help a lot.') + '</p>',
                    position: 'right'
                }
            ]
        });

        feedNew.setOptions({
            steps: [
                {
                    title: PTL.tr('Three options'),
                    element: 'input#feedAddInput',
                    intro: '<h4>' + PTL.tr('The valid URL of a feed') + '</h4>' + PTL.tr('The feed will be added to the current tab.') + '<h4>' + PTL.tr('The valid URL of a website') + '</h4>' + PTL.tr('Pétrolette will search for a feed at this URL, then add it to the current tab.') + '<h4>' + PTL.tr('A list of words') + '</h4>' + PTL.tr('Pétrolette will build a search feed (using the configured search engine) that will display the last news about those words.'),
                    position: 'top'
                }
            ]
        });

        ui.setOption('prevLabel', PTL.tr('Prev'));
        ui.setOption('nextLabel', PTL.tr('Next'));
        ui.setOption('skipLabel', 'x');
        ui.setOption('doneLabel', PTL.tr('Got it!'));

        feedPrefs.setOption('prevLabel', PTL.tr('Prev'));
        feedPrefs.setOption('nextLabel', PTL.tr('Next'));
        feedPrefs.setOption('skipLabel', 'x');
        feedPrefs.setOption('doneLabel', PTL.tr('Got it!'));

        menu.setOption('prevLabel', PTL.tr('Prev'));
        menu.setOption('nextLabel', PTL.tr('Next'));
        menu.setOption('skipLabel', 'x');
        menu.setOption('doneLabel', PTL.tr('Got it!'));

        feedPrefs.setOption('overlayOpacity', 0);
        ui.setOption('overlayOpacity', 0.2);

        feedPrefs.setOption('hideNext', true);
        feedPrefs.setOption('hidePrev', true);

        feedNew.setOption('hideNext', true);
        feedNew.setOption('hidePrev', true);
        feedNew.setOption('showBullets', false);

        if (step) {

            if (type === 'feedPrefs') {
                PTL.sideMenu('close');
                ui.exit();
                menu.exit();
                feedPrefs.goToStepNumber(step).start();
            }

            if (type === 'menu') {
                ui.exit();
                feedPrefs.exit();
                menu.goToStepNumber(step).start();
            }

        } else if (type == 'ui') {
            PTL.sideMenu('close');
            feedPrefs.exit();
            menu.exit();
            $('#menu > .handle').click();
            $('#tabs').tabs('option', 'active', 0);
            $('.feed').first().find('.collapsible').show('fade', 'fast');
            ui.start();
        } else {
            // feedNew.start();
            feedNew.goToStepNumber(1).start();

        }

        // $('.introjs-button').button();

    }
};
