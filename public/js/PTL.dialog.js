// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.dialog = {
  kill:function($dialog) {
    $dialog.dialog('destroy');
    $('#dialogs').empty();
  },
  nagUser:function() {

    var $dialogs = $('#dialogs'),
        isOpen = $dialogs.dialog('instance') === 'undefined';

    if (isOpen) {

      // PTL.dialog.kill($dialog);

      PTL.util.console(PTL.tr('A window is already open, so not nagging'), 'warning');

    } else {


      $dialogs.load('/static/templates/dialogs.html #nagDialog', function() {

        var $dialog = $(this);

        var $nag1 = $('<div>').attr('class', 'dialogContent')
            .append($('<div>').attr('class', 'dialogImage')
                    .append($('<span>')
                            .attr('class', 'huge dialogImage')
                            .text('🍏')))
            .append($('<div>').attr('class', 'dialogText')
                    .append($('<h1>').text(PTL.tr('Pétrolette needs you')))
                    .append($('<h2>').text(PTL.tr('Help me pay the bills'))
                            .append($('<span>').attr('class', 'dialogHeaderIcon')))
                    .append($('<p>')
                            .text(PTL.tr('Pétrolette is free software. However the development requires '))
                            .append($('<a>')
                                    .attr('href', 'https://www.youtube.com/watch?v=JlbMEx9H6FE')
                                    .text(PTL.tr(' a lot of time ')))
                            .append($('<span>').text(PTL.tr(' and ')))
                            .append($('<a>').attr('href', 'https://framagit.org/yphil/petrolette/-/commits/master').text(PTL.tr(' a lot of work')))
                            .append($('<span>').text(PTL.tr('.'))))
                    .append($('<p>').text(PTL.tr('In order to keep developing Pétrolette with new features I need your help.')))
                    .append($('<p>').text(PTL.tr('Please consider to support the Pétrolette project by sending a donation. Even the smallest amount will help a lot.'))));

        var $nag2 = $('<div>').attr('class', 'dialogContent')
            .append($('<div>').attr('class', 'dialogImage')
                    .append($('<span>').attr('class', 'huge dialogImage')
                            .text('🌴')))
            .append($('<div>').attr('class', 'dialogText')
                    .append($('<h1>').text(PTL.tr('Pétrolette is cool')))
                    .append($('<h2>').text(PTL.tr('Free as the wind')))
                    .append($('<p>').text(PTL.tr('Pétrolette is designed from the outset to respect the user: It does not embed any tracker or statistical tool, and does not call on any online resource.')))
                    .append($('<p>').text(PTL.tr('Pétrolette is completely transparent, its source code is directly available.')))
                    .append($('<p>').text(PTL.tr('This site is just a test instance ; You can install Pétrolette on your own server and manage it on your own.'))));

        var $nag3 = $('<div>').attr('class', 'dialogContent')
            .append($('<div>').attr('class', 'dialogImage')
                    .append($('<span>')
                            .attr('class', 'huge dialogImage')
                            .text('🌱')))
            .append($('<div>').attr('class', 'dialogText')
                    .append($('<h1>').text(PTL.tr('Pétrolette is growing')))
                    .append($('<h2>').text(PTL.tr('Early and often')))
                    .append($('<p>').text(PTL.tr('A lot of exciting things are in the pipeline:'))
                            .append($('<ul>').attr('class', 'dialogTextList')
                                    .append($('<li>')
                                            .append($('<a>').attr('href', 'https://framagit.org/yphil/petrolette/-/issues/72')
                                                    .append($('<span>')
                                                            .attr('class', 'translate')
                                                            .text(PTL.tr('Dedicated feeds')))))
                                    .append($('<li>')
                                            .append($('<a>').attr('href', 'https://framagit.org/yphil/petrolette/-/issues/48')
                                                    .append($('<span>')
                                                            .attr('class', 'translate')
                                                            .text(PTL.tr('Even better mobile device experience')))))
                                    .append($('<li>')
                                            .append($('<a>').attr('href', 'https://framagit.org/yphil/petrolette/-/issues/59')
                                                    .append($('<span>')
                                                            .attr('class', 'translate')
                                                            .text(PTL.tr('HTTPS / SSL')))))
                                    .append($('<li>')
                                            .append($('<a>').attr('href', 'https://framagit.org/yphil/petrolette/-/issues/63')
                                                    .append($('<span>')
                                                            .attr('class', 'translate')
                                                            .text(PTL.tr('Asynchronous / infinite loading of feed items')))))
                                    .append($('<li>')
                                            .append($('<a>').attr('href', 'https://framagit.org/yphil/petrolette/-/issues/new?issue')
                                                    .append($('<span>')
                                                            .attr('class', 'translate')
                                                            .text(PTL.tr('Any improvement or proposal you have for Pétrolette')))))))
                    .append($('<p>').text(PTL.tr('In order to keep developing Pétrolette with new features I need your help.')))
                    .append($('<p>').text(PTL.tr('Please consider to support the Pétrolette project by sending a donation. Even the smallest amount will help a lot.'))));

        var $nags = [$nag1, $nag2, $nag3];

        var random = Math.floor(Math.random() * $nags.length);

        $dialogs.html('').empty().append($nags[random]);

        // $dialog.append($nags[random]);

        $dialog.dialog({
          title: PTL.tr('Support Pétrolette'),
          autoOpen: true,
          buttons: [
            {
              text: PTL.tr('Cancel'),
              title: PTL.tr('Cancel'),
              class: 'ui-state-default translate',
              click: function() {
                PTL.dialog.kill($dialog);
              }
            },
            {
              text: PTL.tr('Donate'),
              title: PTL.tr('Send your love to Pétrolette'),
              class: 'translate ui-state-focus',
              click: function(e) {
                e.preventDefault();
                window.open('https://liberapay.com/yPhil/donate');
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
    }

  },
  help:function() {

    $('#dialogs').load('/static/templates/dialogs.html #helpDialog', function() {

      var $dialog = $('#helpDialog');

      $dialog.dialog({
        title: PTL.tr('Help'),
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

          $(this).find('.help-bookmarklet').attr('href', 'javascript:void(window.open("' + window.location.href + '?add=" + window.location.href))');

          $('.help-tour').on('click', function() {
            PTL.sideMenu('close');
            PTL.dialog.kill($dialog);
            $('#tabs').tabs('option', 'active', 0);
            PTL.util.help('ui');
          });

          $('.help-kb-shortcuts').on('click', function() {
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

    $('#dialogs').load('/static/templates/dialogs.html #feedPrefs', function() {

      var $dialog = $(this),
          $dataStore = $button.parent().parent(),
          $feed = $dataStore.parent().parent(),
          allGroups = PTL.tab.list('all'),
          $thisGroup =  $feed.parent().parent(),
          $groupMenu = $dialog.find('select#feedGroup');

      var $spinner = $dialog.find('input#feedLimitSpinner').spinner({
        classes: {
          "ui-spinner": "shrink ui-corner-all"
        }
      });

      $('.help-rss').attr('href', 'https://' + PTL.language + '.wikipedia.org/wiki/RSS');

      $dialog.dialog({
        title: isNewFeed ? PTL.tr('New feed') : PTL.tr('Feed'),
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
                $feed.hide('slow', function() {
                  $(this).prependTo($('#' + $groupMenu
                                      .find(":selected")
                                      .val() + ' .column')
                                    .first())
                    .show('slow');
                  PTL.tab.saveTabs();
                });
              }

              var newUrl = $(this).find('input#feed-guess').val(),
                  newType = $('#feedType :radio:checked').attr('id');

              $dataStore
                .data('url', newUrl)
                .data('type', newType);

              if ($('input[name=kill-feed-check]:checked').val() === 'on') {

                $feed.hide('fade', 1000, function() {
                  $feed.remove();
                });

              } else {

                PTL.feed.populate($button);
              }

              PTL.tab.saveTabs();
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
            var selected = (this.pane === $thisGroup.attr('id'));
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

            $okButton.addClass('ui-state-error');
          }

          var $tabFeedId = $('li#' + $dataStore.data('id')),
              $feedRefresh = $tabFeedId.find('.feedRefresh'),
              $guessButton = $dialog.find('button#feed-guess').button(),
              $guessSpinner = $dialog.find('button#feed-guess > i'),
              $guessField = $dialog.find('input#feed-guess'),
              $okButton = $dialog.find('.ui-dialog-buttonpane'),
              $killFeedFieldset = $('fieldset#kill-feed'),
              $helpMiniButtonIcon,
              $helpMiniButton,
              oldUrl = $dataStore.data('url'),
              oldType = $dataStore.data('type'),
              oldLimit = $dataStore.data('limit');

          $helpMiniButtonIcon = $('<span>')
            .attr('class', 'ui-button-icon ui-icon ui-icon-help');

          $helpMiniButton = $('<button>')
            .attr('class', 'ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-help')
            .attr('title', PTL.tr('How does it work?'))
            .attr('type', 'button')
            .append($helpMiniButtonIcon)
            .on('click', function() {
              PTL.util.help('dialog');
            }).appendTo($dialog.parent().find('.ui-dialog-titlebar'));

          if (isNewFeed) $killFeedFieldset.remove();

          $guessButton.click(function() {

            $guessSpinner
              .removeClass('icon-checked icon-error icon-search ui-state-success ui-state-error')
              .addClass('spin icon-cog');
            $guessButton.removeClass('icon-checked ui-state-success ui-state-error');

            $.get('/discover', {
              dataType: 'json',
              url: $guessField.val(),
              searchPrefix: PTL.prefs.readConfig('searchPrefix'),
              timeout: 2000
            }).fail(function(req, status, xhr) {
              guessError();
            }).done(function(feed) {
              $guessSpinner.removeClass('spin icon-cog');

              $guessField.val(feed);

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

          $dialog.find('input#feed-guess').val(oldUrl);

          $('input:radio, input:checkbox').checkboxradio({
            icon: false
          });

          $dialog.find('input#' + oldType || 'mixed').prop('checked', true)
            .checkboxradio('refresh');

          $spinner
            .spinner( 'value', oldLimit)
            .on( 'spinstop', function() {
              $dialog.find('div#feedLimit').slider( 'option', 'value', $(this).val());
              $dialog.find('.ui-slider-handle').text($(this).val());
            });

          $dialog.find('div#feedLimit').slider({
            value: oldLimit,
            min: 1,
            max: 128,
            step: 1,
            create: function() {
              $('input#feedLimit').val(oldLimit);
              $(this).find('.ui-slider-handle').text(oldLimit);
            },
            slide: function( event, ui ) {
              $(this).val(ui.value);
              $(this).find('.ui-slider-handle').text(ui.value);
              $('input#feedLimitSpinner').val(ui.value);
            },
            change: function( event, ui ) {
              $('input#feedLimit').val(ui.value);
              $dataStore.data('limit', ui.value);
            }
          });

          $dialog.on('submit', function () {
            PTL.feed.populate($feedRefresh);
            PTL.tab.saveTabs();
            $(this).dialog('destroy');
            return false;
          });

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
  killColumn:function($button) {

    $('#dialogs').load('/static/templates/dialogs.html #questionDialog', function() {

      var $dialog = $(this),
          $column = $button.parent().parent(),
          $panel = $column.parent(),
          $columnsInTab = $panel.find('.column'),
          nbOfColumnsInTab = $columnsInTab.length,
          colIndex = $panel.find('.column').index($column),
          $feedsInCol = $column.find('.feed'),
          nbOfFeedsInCol = $feedsInCol.length,
          $icon = $dialog.find('div.dialogImage > i');

      $icon.addClass('icon-trash-empty danger');

      $dialog.dialog({
        title: PTL.tr('Delete column'),
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
              PTL.col.del($column, nbOfColumnsInTab);
            }
          }
        ],
        open: function () {

          $('.ui-widget-overlay').on('click', function() {
            PTL.dialog.kill($dialog);
          });

          $dialog.find('h1').text(PTL.tr('Really delete this column?'));
          $dialog.find('h2#name').text(PTL.tr('Index'));
          $dialog.find('p#name').text((colIndex + 1));
          $dialog.find('h2#number').text(PTL.tr('Number of feeds'));
          $dialog.find('p#number').text(nbOfFeedsInCol);

        }
      });

      $dialog.dialog('open');
    });
  },
  kbShortcuts:function() {

    $('#dialogs').load('/static/templates/dialogs.html #questionDialog', function() {

      var $dialog = $(this),
          $dialogImageDiv = $dialog.find('div.dialogImage');

      $dialogImageDiv.remove();

      $dialog.dialog({
        title: PTL.tr('Keyboard shortcuts'),
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

          var $kbShortCutsTab = $('<table>')
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

          var $kbShortCutsPanel = $('<table>')
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

          $dialog.find('h1').text(PTL.tr('Keyboard shortcuts'));
          $dialog.find('h2#name').text(PTL.tr('When focus is on a tab'));
          $dialog.find('h2#number').text(PTL.tr('When focus is in a panel'));
          $dialog.find('p#name').append($kbShortCutsTab);
          $dialog.find('p#number').append($kbShortCutsPanel);

        }
      });

      $dialog.dialog('open');
    });
  },
  addFeed:function(feedUrl) {

    $('#dialogs').load('/static/templates/dialogs.html #questionDialog', function() {

      var $dialog = $(this),
          $icon = $dialog.find('div.dialogImage > i'),
          isUrl = false,
          h1, h2;

      $icon.addClass('icon-rzz');

      // console.log('There is %s cols in the %s panel', nbOfColumnsInTab, $panel.attr('id'));

      $dialog.dialog({
        title: PTL.tr('Add feed'),
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
            text:  PTL.tr('Add'),
            title: PTL.tr('Add feed'),
            class: "translate",
            click: function() {
              PTL.feed.add($('.column').first(), feedUrl, 'mixed', 8, 'on', true, false);
              PTL.dialog.kill($dialog);
            }
          }
        ],
        open: function () {

          if (!PTL.util.isUrl(feedUrl)) {
            h1 = 'Whoops!';
            h2 = PTL.tr('Unrecognized URL: %1', feedUrl);
          } else {
            isUrl = true;
            h1 = PTL.tr('New feed');
            h2 = PTL.tr('URL');
          }

          $('.ui-widget-overlay').on('click', function() {
            PTL.dialog.kill($dialog);
          });

          $dialog.find('h1').text(h1);
          $dialog.find('h2#name').text(h2);
          $dialog.find('p#name').text((feedUrl));

        }
      });

      $dialog.dialog('open');
    });
  },
  killTab:function($button) {

    $('#dialogs').load('/static/templates/dialogs.html #questionDialog', function() {

      var $dialog = $(this),
          $tabs = $('#tabs'),
          $a = $button.prev('a.ui-tabs-anchor'),
          tabId = $a.attr('href'),
          $selectedTab = $a.parent(),
          $selectedPanel = $tabs.find(tabId),
          selectedTabIndex = $tabs.tabs('option', 'active'),
          previousTabIndex = selectedTabIndex === 0 ? 0 : selectedTabIndex -1,
          $icon = $dialog.find('div.dialogImage > i');

      $icon.addClass('icon-trash-empty danger');

      $dialog.dialog({
        title: PTL.tr('Delete tab'),
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
              } else {
                PTL.util.console(PTL.tr('Zero tabs!'), 'error');
              }

            }
          }
        ],
        open: function () {

          $('.ui-widget-overlay').on('click', function() {
            PTL.dialog.kill($dialog);
          });

          $dialog.find('h1').text(PTL.tr('Really delete this tab?'));
          $dialog.find('h2#name').text(PTL.tr('Name'));
          $dialog.find('p#name').text($a.text());
          $dialog.find('h2#number').text(PTL.tr('Number of feeds'));
          $dialog.find('p#number').text($selectedPanel.find('li.feed').length);

        }
      });

      $dialog.dialog('open');
    });
  },
  killFeed:function($button) {

    $('#dialogs').load('/static/templates/dialogs.html #questionDialog', function() {

      var $dialog = $(this),
          $thisFeed = $button.parent().parent().parent().parent(),
          thisFeedId = $button.parent().parent().parent().parent().attr('id'),
          thisFeedName = $button.parent().parent().parent().find('.feed-title').text(),
          $icon = $dialog.find('div.dialogImage > i');

      $icon.addClass('icon-trash-empty danger');

      $dialog.dialog({
        title: PTL.tr('Delete feed'),
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
            class: 'translate',
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

          $dialog.find('h1').text(PTL.tr('Really delete this feed?'));
          $dialog.find('h2#name').text(PTL.tr('Name'));
          $dialog.find('p#name').text(thisFeedName);

        }
      });

      $dialog.data('feedId', thisFeedId).dialog('open');

    });

  },
  editGroup:function($tab) {

    $('#dialogs').load('/static/templates/dialogs.html #editGroupDialog', function() {

      var $dialog = $(this);

      $dialog.dialog({
        title: PTL.tr('Tab'),
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
              $('#' + $(this).data('tabId')).text($dialog.find('#tabName').val());
              PTL.tab.saveTabs();
              PTL.dialog.kill($dialog);
            }
          }
        ],
        open: function() {

          $('.ui-widget-overlay').on('click', function() {
            PTL.dialog.kill($dialog);
          });

          var $tabName = $dialog.find('#tabName');
          var $tabNameLegend = $dialog.find('legend#tabNameLegend');

          var $tabLeft = $dialog.find('button#left');
          var $tabRight = $dialog.find('button#right');

          var $tab = $('a#' + $(this).data('tabId')).parent('li');

          $tabLeft.button().click(function() {
            PTL.util.moveEltLeft($tab);
          });

          $tabRight.button().click(function() {
            PTL.util.moveEltRight($tab);
          });

          $tabNameLegend.text(PTL.tr('Name'));

          $tabName.val($(this).data('tabName'));

          $(this).on('submit', function () {
            $('#' + $(this).data('tabId')).text($dialog.find('#tabName').val());
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
