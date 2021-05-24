// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.dialog = {
    kill:function($dialog) {
        $dialog.dialog('destroy');
        $('#ptlDialogs').empty();
    },
    resetTabs:function($button) {

        $('#ptlDialogs').load('/static/templates/dialogs.html #questionDialog', function() {

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
                            window.location.reload(true);
                        }
                    }
                ],
                open: function () {

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
    beg:function() {

        $('#ptlDialogs').load('/static/templates/dialogs.html #beggarDialog', function() {

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
                open: function () {

                    $('.ui-widget-overlay').on('click', function() {
                        PTL.dialog.kill($dialog);
                    });

                }
            });

            $dialog.dialog('open');

        });
    },
    notify:function(title, text) {

        const $notify = $('#notify'),
              $h4 = $('#notify > h4').text(title),
              $text = $('#notify > p').text(text);

        $notify.fadeIn('fast', 'linear', function() {
            setTimeout(function() {
                $notify.fadeOut('slow');}, 5000);
        });

        $notify.click(function () {
            $(this).fadeOut('fast');
        });

    },
    about:function(versionNumber) {

        $('#ptlDialogs').load('/static/templates/dialogs.html #questionDialog', function() {

            const $dialog = $(this),
                  $content = $dialog.find('div.flexBox'),
                  $icon = $dialog.find('div#icon > i');

            $icon.addClass('icon-petrolette');
            $content.css('flex-direction', 'column');
            $content.find('div#dialogText').css('text-align', 'center'),

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
                open: function () {

                    $('.ui-widget-overlay').on('click', function() {
                        PTL.dialog.kill($dialog);
                    });

                    $dialog.find('h1').text('Pétrolette').addClass('logoTitle')
                        .next('p#dialogBlurb').text(PTL.tr("The news page that doesn't know you"))
                        .next('h2').text(versionNumber)
                        .next('p')
                        .append($('<a>')
                                .attr('href', 'https://liberapay.com/yPhil/')
                                .text(PTL.tr('By yPhil')));

                }
            });

            $dialog.dialog('open');
        });
    },
    help:function() {

        $('#ptlDialogs').load('/static/templates/dialogs.html #helpDialog', function() {

            const $dialog = $(this);

            $dialog.dialog({
                title: PTL.tr('Help'),
                width: PTL.util.isMobile() ? 'auto' : 800,
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
                open: function () {

                    $('.ui-widget-overlay').on('click', function() {
                        PTL.dialog.kill($dialog);
                    });

                    $(this).find('.help-button').button();

                    $(this).find('.helpBookmarklet')
                        .attr('href', 'javascript:void(window.open("' + window.location.href + '?add=" + window.location.href))');

                    $('.helpTour').on('click', function() {
                        PTL.dialog.kill($dialog);
                        $('#tabs').tabs('option', 'active', 0);
                        PTL.util.help('ui');
                    });

                    $('.helpKbShortcuts').on('click', function() {
                        PTL.sideMenu('close');
                        PTL.dialog.kill($dialog);
                        PTL.dialog.kbShortcuts();
                    });

                }
            });

            $dialog.dialog('open');
        });
    },
    feedPrefs:function($button, isNewFeed) {

        $('#ptlDialogs').load('/static/templates/dialogs.html #feed-prefs', function() {

            const $dialog = $(this),
                  $dataStore = $button.parent().parent(),
                  $feed = $dataStore.parent().parent(),
                  $feedBody = $dataStore.parent().next('div.feedBody'),
                  allGroups = PTL.tab.list('all'),
                  $thisGroup =  $feed.parent().parent(),
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

                            if (isNewFeed) {
                                $feed.hide('fade', 1000, function() {
                                    $feed.remove();
                                });
                            }

                        }
                    },
                    {
                        text: PTL.tr('OK'),
                        title: PTL.tr('OK'),
                        class: 'translate button-ok',
                        click: function() {

                            if ($groupMenu.find(":selected").val() !== $thisGroup.attr('id')) {
                                $feed.hide('fade', 1000, function() {
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
                                $feed.hide('fade', 1000, function() {$feed.remove();});
                            } else {
                                PTL.feed.populate($button);
                            }

                            // PTL.tab.saveTabs();
                            PTL.dialog.kill($dialog);

                        }
                    }
                ],
                open: function() {

                    $('.ui-widget-overlay, .ui-dialog-titlebar-close').on('click', function() {
                        PTL.dialog.kill($dialog);
                        if (isNewFeed) {
                            $feed.hide('fade', 1000, function() {
                                $feed.remove();
                            });
                        }
                    });

                    $(document).keyup(function(event) {
                        if (event.keyCode === 27) {
                            if (isNewFeed) {
                                $feed.hide('fade', 1000, function() {
                                    $feed.remove();
                                });
                            }
                        }
                    });

                    $.each(allGroups, function() {
                        const selected = (this.pane === $thisGroup.attr('id'));
                        $groupMenu.append($('<option>', {
                            value: this.pane,
                            selected: selected,
                            text : this.name
                        }));
                    });

                    function guessError () {
                        $guessSpinner.removeClass('icon-cog spin ui-state-success')
                            .addClass('icon-error');

                        $guessButton
                            .addClass('ui-state-error')
                            .attr('title', PTL.tr('No valid feed found at this address')) ;
                    }

                    const $tabFeedId = $('li#' + $dataStore.data('id')),
                          $feedRefresh = $tabFeedId.find('.feedRefresh'),
                          $guessButton = $dialog.find('button#feedGuessButton').button(),
                          $guessSpinner = $dialog.find('button#feedGuessButton > i'),
                          $feedGuessInput = $dialog.find('input#feedGuessInput'),
                          $feedNameInput = $dialog.find('input#feedNameInput'),
                          $okButton = $('.ui-dialog-buttonpane').find('.button-ok'),
                          $killFeedFieldset = $('fieldset#killFeedFieldset'),
                          $killFeedLegend = $('legend#killFeedLegend'),
                          $helpMiniButton = $('<button>'),
                          oldUrl = $dataStore.data('url'),
                          oldName = $dataStore.data('name'),
                          oldType = $dataStore.data('type'),
                          oldLimit = $dataStore.data('limit'),
                          oldNbItems = $dataStore.data('nbitems'),
                          $feedLimitInput = $('input#feedLimit'),
                          $feedLimitSlider = $('div#feedLimitSlider'),
                          $feedLimitSpinner = $dialog.find('input#feedLimitSpinner').spinner({
                              classes: {
                                  "ui-spinner": "shrink ui-corner-all"
                              }
                          }),
                          $feedNbItemsInput = $('input#feedNbItems'),
                          $feedNbItemsSlider = $('div#feedNbItemsSlider'),
                          $feedLimitSliderHandle = $dialog.find('div#feedLimitSlider > .ui-slider-handle'),
                          $feedNbItemsSliderHandle = $dialog.find('div#feedNbItemsSlider > .ui-slider-handle'),
                          $feedNbItemsSpinner = $dialog.find('input#feedNbItemsSpinner').spinner({
                              classes: {
                                  "ui-spinner": "shrink ui-corner-all"
                              }
                          });

                    $feedGuessInput.on('keypress',function(e) {
                        if (e.which == 13) {
                            $okButton.click();
                        }
                    });

                    $feedNameInput.on('keypress',function(e) {
                        if (e.which == 13) {
                            $okButton.click();
                        }
                    });

                    $helpMiniButton
                        .attr('class', 'ui-button ui-corner-all ui-widget')
                        .attr('id', 'helpMiniButton')
                        .attr('title', PTL.tr('How does it work?'))
                        .attr('type', 'button')
                        .text(PTL.tr('Help'))
                        .on('click', function() {
                            PTL.util.help('dialog');
                        }).appendTo($dialog.parent().find('.ui-dialog-titlebar'));

                    if (isNewFeed || !PTL.util.isMobile()) {
                        $killFeedLegend.remove();
                        $killFeedFieldset.remove();
                    }

                    $guessButton.click(function() {

                        $guessSpinner
                            .removeClass('icon-checked icon-error icon-search ui-state-success ui-state-error')
                            .addClass('spin icon-cog');
                        $guessButton.removeClass('icon-checked ui-state-success ui-state-error');

                        $.get('/discover', {
                            dataType: 'json',
                            url: $feedGuessInput.val(),
                            searchPrefix: PTL.prefs.readConfig('searchPrefix'),
                            timeout: 2000
                        }).fail(function(req, status, xhr) {
                            guessError();
                        }).done(function(feed) {
                            $guessSpinner.removeClass('spin icon-cog');

                            $feedGuessInput.val(feed);

                            $guessSpinner
                                .removeClass('ui-state-error')
                                .addClass('icon-checked ui-state-success');

                            $guessButton
                                .addClass('ui-state-success')
                                .attr('title', PTL.tr('Valid feed found! Now just press OK')) ;

                        }).always(function(req, status, xhr) {
                            if (status === 'error') guessError();
                        });

                    });

                    $feedGuessInput.val(oldUrl);
                    $dialog.find('input#feedNameInput').val(oldName);

                    $('input:radio, input:checkbox').checkboxradio({
                        icon: false
                    });

                    $dialog.find('input#' + oldType || 'mixed').prop('checked', true)
                        .checkboxradio('refresh');

                    $feedLimitSpinner
                        .spinner( 'value', oldLimit)
                        .on( 'spinstop', function() {
                            $feedLimitSlider.slider( 'option', 'value', $(this).val());
                            $dialog.find('div#feedNbItemsSpinner > .ui-slider-handle').text($(this).val());
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
                        slide: function( event, ui ) {
                            $(this).val(ui.value);
                            $(this).find('.ui-slider-handle').text(ui.value);
                            $feedBody.css('height', ui.value + 'px');
                            $feedLimitSpinner.val(ui.value);
                        },
                        change: function( event, ui ) {
                            $feedLimitInput.val(ui.value);
                            $dataStore.data('limit', ui.value);
                        }
                    });

                    $feedNbItemsSpinner
                        .spinner( 'value', oldNbItems)
                        .on('spinstop', function() {
                            $feedNbItemsSlider.slider( 'option', 'value', $(this).val());
                            $feedNbItemsSliderHandle.text($(this).val());
                        });

                    $feedNbItemsSlider.slider({
                        value: oldNbItems,
                        min: 1,
                        max: 100,
                        step: 1,
                        create: function() {
                            $feedNbItemsInput.val(oldNbItems);
                            $(this).find('.ui-slider-handle').text(oldNbItems);
                        },
                        slide: function( event, ui ) {
                            $(this).val(ui.value);
                            $(this).find('.ui-slider-handle').text(ui.value);
                            $feedNbItemsSpinner.val(ui.value);
                        },
                        change: function( event, ui ) {
                            $feedNbItemsInput.val(ui.value);
                            $dataStore.data('nbitems', ui.value);
                        }
                    });

                }
            });

            $dialog.dialog('open');
        });

    },
    killColumn:function($button) {

        $('#ptlDialogs').load('/static/templates/dialogs.html #questionDialog', function() {

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
                open: function () {

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
    kbShortcuts:function() {

        $('#ptlDialogs').load('/static/templates/dialogs.html #questionDialog', function() {

            const $dialog = $(this),
                  $iconDiv = $dialog.find('div#icon');

            $iconDiv.remove();

            $dialog.dialog({
                title: PTL.tr('Keyboard shortcuts'),
                width: PTL.util.isMobile() ? 'auto' : 630,
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
                open: function () {

                    $('.ui-widget-overlay').on('click', function() {
                        PTL.dialog.kill($dialog);
                    });

                    const $kbShortCutsTab = $('<table>')
                          .attr('class', 'keyboard-shortcuts')
                          .append($('<tr>')
                                  .append($('<th>')
                                          .text('Key'))
                                  .append($('<th>')
                                          .text('Command')))
                          .append($('<tr>')
                                  .append($('<td>')
                                          .html('<kbd><kbd class="key">UP</kbd>/<kbd class="key">LEFT</kbd></kbd>'))
                                  .append($('<td>')
                                          .text(PTL.tr('Move focus to the previous tab. If on first tab, moves focus to last tab. Activate focused tab after a short delay.'))))
                          .append($('<tr>')
                                  .append($('<td>')
                                          .html('<kbd><kbd class="key">DOWN</kbd>/<kbd class="key">RIGHT</kbd></kbd>'))
                                  .append($('<td>')
                                          .text(PTL.tr('Move focus to the next tab. If on last tab, moves focus to first tab. Activate focused tab after a short delay.'))))
                          .append($('<tr>')
                                  .append($('<td>')
                                          .html('<kbd><kbd class="key">CTRL</kbd>+<kbd class="key">DOWN</kbd>/<kbd class="key">RIGHT</kbd></kbd>'))
                                  .append($('<td>')
                                          .text(PTL.tr('Move focus to the next tab. If on last tab, moves focus to first tab. The focused tab must be manually activated.'))))
                          .append($('<tr>')
                                  .append($('<td>')
                                          .html('<kbd><kbd class="key">HOME</kbd></kbd>'))
                                  .append($('<td>')
                                          .text(PTL.tr('Move focus to the first tab. Activate focused tab after a short delay.'))))
                          .append($('<tr>')
                                  .append($('<td>')
                                          .html('<kbd><kbd class="key">END</kbd></kbd>'))
                                  .append($('<td>')
                                          .text(PTL.tr('Move focus to the last tab. Activate focused tab after a short delay.'))))
                          .append($('<tr>')
                                  .append($('<td>')
                                          .html('<kbd><kbd class="key">CTRL</kbd>+<kbd class="key">HOME</kbd></kbd>'))
                                  .append($('<td>')
                                          .text(PTL.tr('Move focus to the first tab. The focused tab must be manually activated.'))))
                          .append($('<tr>')
                                  .append($('<td>')
                                          .html('<kbd><kbd class="key">CTRL</kbd>+<kbd class="key">END</kbd></kbd>'))
                                  .append($('<td>')
                                          .text(PTL.tr('Move focus to the last tab. The focused tab must be manually activated.'))))
                          .append($('<tr>')
                                  .append($('<td>')
                                          .html('<kbd><kbd class="key">SPACE</kbd></kbd>'))
                                  .append($('<td>')
                                          .text(PTL.tr('Activate panel associated with focused tab.'))))
                          .append($('<tr>')
                                  .append($('<td>')
                                          .html('<kbd><kbd class="key">ENTER</kbd></kbd>'))
                                  .append($('<td>')
                                          .text(PTL.tr('Activate or toggle panel associated with focused tab.'))))
                          .append($('<tr>')
                                  .append($('<td>')
                                          .html('<kbd><kbd class="key">ALT</kbd>/<kbd class="key">OPTION</kbd>+<kbd class="key">PAGE UP</kbd></kbd>'))
                                  .append($('<td>')
                                          .text(PTL.tr('Move focus to the previous tab and immediately activate.'))))
                          .append($('<tr>')
                                  .append($('<td>')
                                          .html('<kbd><kbd class="key">ALT</kbd>/<kbd class="key">OPTION</kbd>+<kbd class="key">PAGE&nbsp;DOWN</kbd></kbd>'))
                                  .append($('<td>')
                                          .text(PTL.tr('Move focus to the next tab and immediately activate.'))));

                    const $kbShortCutsPanel = $('<table>')
                          .attr('class', 'keyboard-shortcuts')
                          .append($('<tr>')
                                  .append($('<th>')
                                          .text('Key'))
                                  .append($('<th>')
                                          .text('Command')))
                          .append($('<tr>')
                                  .append($('<td>')
                                          .html('<kbd><kbd class="key">CTRL</kbd>+<kbd class="key">UP</kbd></kbd>'))
                                  .append($('<td>')
                                          .text(PTL.tr('Move focus to associated tab.'))))
                          .append($('<tr>')
                                  .append($('<td>')
                                          .html('<kbd><kbd class="key">ALT</kbd>/<kbd class="key">OPTION</kbd>+<kbd class="key">PAGE UP</kbd></kbd>'))
                                  .append($('<td>')
                                          .text(PTL.tr('Move focus to the previous tab and immediately activate.'))))
                          .append($('<tr>')
                                  .append($('<td>')
                                          .html('<kbd><kbd class="key">ALT</kbd>/<kbd class="key">OPTION</kbd>+<kbd class="key">PAGE&nbsp;DOWN</kbd></kbd>'))
                                  .append($('<td>')
                                          .text(PTL.tr('Move focus to the next tab and immediately activate.'))));

                    $dialog.find('h1').text(PTL.tr('Keyboard shortcuts'))
                        .next('p#dialogBlurb').text(PTL.tr('A click on the Pétrolette logo puts the focus on the current tab'))
                        .next('h2').text(PTL.tr('When focus is on a tab'))
                        .next('p')
                        .append($kbShortCutsTab)
                        .next('h2').text(PTL.tr('When focus is in a panel'))
                        .next('p')
                        .append($kbShortCutsPanel);

                }
            });

            $dialog.dialog('open');
        });
    },
    killTab:function($button) {

        $('#ptlDialogs').load('/static/templates/dialogs.html #questionDialog', function() {

            const $dialog = $(this),
                  $tabs = $('#tabs'),
                  $a = $button.prev('a.ui-tabs-anchor'),
                  tabId = $a.attr('href'),
                  $selectedTab = $a.parent(),
                  $selectedPanel = $tabs.find(tabId),
                  $icon = $dialog.find('div#icon > i'),
                  selectedTabIndex = $tabs.tabs('option', 'active'),
                  previousTabIndex = selectedTabIndex === 0 ? 0 : selectedTabIndex -1;

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
                open: function () {

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
    killFeed:function($button) {

        $('#ptlDialogs').load('/static/templates/dialogs.html #questionDialog', function() {

            const $dialog = $(this),
                  $thisFeed = $button.parent().parent().parent().parent(),
                  thisFeedId = $button.parent().parent().parent().parent().attr('id'),
                  thisFeedName = $button.parent().parent().parent().find('.feedTitle').text(),
                  thisFeedUrl = $button.parent().parent().parent().find('.dataStore').data('url'),
                  $icon = $dialog.find('div#icon > i');

            $icon.addClass('icon-trash-empty danger');

            $dialog.dialog({
                title: PTL.tr('Delete feed'),
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
                        text: PTL.tr('Delete'),
                        title: PTL.tr('Wait! Are you sure?'),
                        class: 'dangerous translate',
                        click: function() {
                            $thisFeed.hide('fade', 1000, function() {
                                $(this).remove();
                                PTL.tab.saveTabs();
                            });
                            PTL.dialog.kill($dialog);
                        }
                    }
                ],
                open: function () {

                    $('.ui-widget-overlay').on('click', function() {
                        PTL.dialog.kill($dialog);
                    });

                    $dialog.find('h1').text(PTL.tr('Delete this feed?'))
                        .next('p#dialogBlurb')
                        .addClass('dangerous')
                        .text(PTL.tr('This action cannot be undone.'))
                        .next('h2').text(PTL.tr('Name'))
                        .next('p').text(thisFeedName);

                }
            });

            $dialog.data('feedId', thisFeedId).dialog('open');

        });

    },
    importFeeds:function(existingFeeds, importedFeedsFile) {

        $('#ptlDialogs').load('/static/templates/dialogs.html #questionDialog', function() {

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
                open: function () {

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
    editTab:function($tab) {

        $('#ptlDialogs').load('/static/templates/dialogs.html #editTabDialog', function() {

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

                    $(this).on('submit', function () {
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
    }
};
