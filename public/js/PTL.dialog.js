// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.dialog = {
  kill:function($dialog) {
    $dialog.dialog('destroy');
    $('#dialogs').empty();
  },
  help:function() {

    $('#dialogs').load('/static/templates/dialogs.html #helpDialog', function() {

      var $dialog = $('#helpDialog');

      $dialog.dialog({
        title: PTL.tr('Help'),
        autoOpen: false,
        closeOnEscape: true,
        resizable: false,
        height: 'auto',
        width: PTL.utilities.vWidth(),
        modal: true,
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

          PTL.utilities.translate();

          $('.ui-widget-overlay').on('click', function() {
            PTL.dialog.kill($dialog);
          });

          $(this).find('.help-button').button();

          $('.help-tour').on('click', function() {
            PTL.sideMenu('close');
            PTL.dialog.kill($dialog);
            $('#tabs').tabs('option', 'active', 0);
            PTL.utilities.help('ui');
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

      PTL.utilities.translate();

      var $dialog = $(this),
          $dataStore = $button.parent().parent(),
          $feed = $dataStore.parent().parent(),
          feedId = $feed.attr('id'),
          feedName = $feed.find('.source-title').text(),
          allGroups = PTL.tab.list('all'),
          $thisGroup =  $feed.parent().parent(),
          $groupMenu = $dialog.find('select#feedGroup');

      var $spinner = $dialog.find('input#feedLimitSpinner').spinner({
        classes: {
          "ui-spinner": "shrink ui-corner-all"
        }
      });

      $('.rssDocLink').attr('href', 'https://' + PTL.language + '.wikipedia.org/wiki/RSS');

      $dialog.dialog({
        title: PTL.tr('Source'),
        autoOpen: false,
        closeOnEscape: true,
        resizable: true,
        height: 'auto',
        width: PTL.utilities.vWidth(),
        modal: true,
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
            text: PTL.tr('Ok'),
            title: PTL.tr('Ok'),
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

              if ($('input[name=killFeedChbox]:checked').val() === 'on') {
                console.log('Yep!');

                PTL.dialog.killFeed(feedId, feedName);

              } else {

                PTL.src.populate($button);
              }

              PTL.tab.saveTabs();
              PTL.dialog.kill($dialog);

            }
          }
        ],
        open: function() {

          // $('.ui-dialog :button').focus();

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
              .addClass('icon-cancel-circled');

            $guessButton
              .addClass('ui-state-error')
              .attr('title', PTL.tr('No valid source found at this address')) ;

            $okButton.addClass('ui-state-error');
          }

          var $tabFeedId = $('li#' + $dataStore.data('id')),
              $sourceRefresh = $tabFeedId.find('.sourceRefresh'),
              $guessButton = $dialog.find('button#feed-guess').button(),
              $guessSpinner = $dialog.find('button#feed-guess > i'),
              $guessField = $dialog.find('input#feed-guess'),
              $okButton = $dialog.find('.ui-dialog-buttonpane'),
              $helpButton = $('<button type="button" class="ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-close ui-dialog-titlebar-help" title="Help"><span class="ui-button-icon ui-icon ui-icon-help"></span><span class="ui-button-icon-space"> </span>Help</button>');

          $('#killFeedChbox').button();

          $dialog.parent().find('.ui-dialog-titlebar').append($helpButton);

          if (!PTL.utilities.isMobile()) {
            $guessField.click(function() {
              $(this).select();
            });
          }

          $helpButton.on('click', function() {

            PTL.utilities.help('dialog');

          });

          var oldUrl = $dataStore.data('url'),
              oldType = $dataStore.data('type'),
              oldLimit = $dataStore.data('limit');

          $guessButton.click(function() {

            $guessSpinner
              .removeClass('icon-ok icon-cancel-circled icon-flashlight ui-state-success ui-state-error')
              .addClass('spin icon-cog');
            $guessButton.removeClass('icon-ok ui-state-success ui-state-error');

            $.get('/discover', {
              url: $guessField.val(),
              dataType: 'json',
              timeout: 1200
            }, function() {
              $guessSpinner.removeClass('spin icon-cog');

            }).done(function(feed, status) {

              $guessField.val(feed);

              $guessSpinner
                .removeClass('ui-state-error')
                .addClass('icon-ok ui-state-success');

              $guessButton
                .addClass('ui-state-success')
                .attr('title', PTL.tr('Valid source found! Now just press OK')) ;

            }).fail(function(feed, status) {
              guessError();

            });

          });

          $dialog.find('input#feed-guess').val(oldUrl);

          $('input:radio, input:checkbox').checkboxradio({
            icon: false
          });

          $dialog.find('input#' + oldType || 'mixed').prop('checked', true)
            .checkboxradio('refresh');

          $spinner.on( 'spinstop', function() {
            $dialog.find('div#feedLimit').slider( 'option', 'value', $(this).val());
            $dialog.find('.ui-slider-handle').text($(this).val());
          });

          $spinner.spinner( 'value', oldLimit);

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
            PTL.src.populate($sourceRefresh);

            PTL.tab.saveTabs();

            $(this).dialog('destroy');
            return false;
          });

          // $dialog.find('#feed-guess').select();

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

    $('#dialogs').load('/static/templates/dialogs.html #question-dialog', function() {

      var $dialog = $(this),
          $column = $button.parent().parent(),
          $panel = $column.parent(),
          $columnsInTab = $panel.find('.column'),
          nbOfColumnsInTab = $columnsInTab.length,
          colIndex = $panel.find('.column').index($column),
          $sourcesInCol = $column.find('.feed'),
          nbOfSourcesInCol = $sourcesInCol.length,
          $icon = $dialog.find('div.icon > i');

      $icon.addClass('icon-trash-empty danger');

      console.log('There is %s sources', nbOfSourcesInCol);

      $dialog.dialog({
        title: PTL.tr('Delete column'),
        autoOpen: false,
        closeOnEscape: true,
        resizable: false,
        height: 'auto',
        width: PTL.utilities.vWidth(),
        modal: true,
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
            class: "dangerous translate",
            click: function() {
              PTL.dialog.kill($dialog);
              PTL.col.del($column, nbOfColumnsInTab);
            }
          }
        ],
        open: function () {

          console.log('NB : (%s)', nbOfColumnsInTab);

          $('.ui-widget-overlay').on('click', function() {
            PTL.dialog.kill($dialog);
          });

          $dialog.find('h1').text(PTL.tr('Really delete this column?'));
          $dialog.find('h2#name').text(PTL.tr('Index'));
          $dialog.find('p#name').text((colIndex + 1));
          $dialog.find('h2#number').text(PTL.tr('Number of sources'));
          $dialog.find('p#number').text(nbOfSourcesInCol);

        }
      });

      $dialog.dialog('open');
    });
  },
  kbShortcuts:function() {

    $('#dialogs').load('/static/templates/dialogs.html #question-dialog', function() {

      var $dialog = $(this),
          $iconDiv = $dialog.find('div.icon');

      $iconDiv.remove();

      $dialog.dialog({
        title: PTL.tr('Keyboard shortcuts'),
        autoOpen: false,
        closeOnEscape: true,
        resizable: false,
        height: 'auto',
        width: '95%',
        modal: true,
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
                              .html('<kbd><kbd class="key">ALT</kbd>/<kbd class="key">OPTION</kbd>+<kbd class="key">PAGE DOWN</kbd></kbd>'))
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
                              .html('<kbd><kbd class="key">ALT</kbd>/<kbd class="key">OPTION</kbd>+<kbd class="key">PAGE DOWN</kbd></kbd>'))
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
  addSource:function(sourceUrl) {

    $('#dialogs').load('/static/templates/dialogs.html #question-dialog', function() {

      var $dialog = $(this),
          $icon = $dialog.find('div.icon > i'),
          isUrl = false,
          h1, h2;

      $icon.addClass('icon-rss');

      // console.log('There is %s cols in the %s panel', nbOfColumnsInTab, $panel.attr('id'));

      $dialog.dialog({
        title: PTL.tr('Add source'),
        autoOpen: false,
        closeOnEscape: true,
        resizable: false,
        height: 'auto',
        width: PTL.utilities.vWidth(),
        modal: true,
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
            title: PTL.tr('Add source'),
            class: "translate",
            click: function() {
              PTL.src.add($('.column').first(), sourceUrl, 'mixed', 8, true);
              PTL.dialog.kill($dialog);
            }
          }
        ],
        open: function () {

          if (!PTL.utilities.isUrl(sourceUrl)) {
            h1 = 'Whoops!';
            h2 = PTL.tr('Unrecognized URL: %1', sourceUrl);
          } else {
            isUrl = true;
            h1 = PTL.tr('New source');
            h2 = PTL.tr('URL');
          }

          $('.ui-widget-overlay').on('click', function() {
            PTL.dialog.kill($dialog);
          });

          $dialog.find('h1').text(h1);
          $dialog.find('h2#name').text(h2);
          $dialog.find('p#name').text((sourceUrl));

        }
      });

      $dialog.dialog('open');
    });
  },
  killTab:function($button) {

    $('#dialogs').load('/static/templates/dialogs.html #question-dialog', function() {

      var $dialog = $(this),
          $tabs = $('#tabs'),
          $a = $button.prev('a.ui-tabs-anchor'),
          tabId = $a.attr('href'),
          $selectedTab = $a.parent(),
          $selectedPanel = $tabs.find(tabId),
          selectedTabIndex = $tabs.tabs('option', 'active'),
          previousTabIndex = selectedTabIndex === 0 ? 0 : selectedTabIndex -1,
          $icon = $dialog.find('div.icon > i');

      $icon.addClass('icon-trash-empty danger');

      $dialog.dialog({
        title: PTL.tr('Delete group'),
        autoOpen: false,
        closeOnEscape: true,
        resizable: false,
        height: 'auto',
        width: PTL.utilities.vWidth(),
        modal: true,
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
            class: "dangerous translate",
            click: function() {

              $selectedTab.remove();
              $selectedPanel.remove();

              PTL.tab.saveTabs();
              PTL.dialog.kill($dialog);

              if ($.parseJSON(PTL.prefs.readConfig('tabs')).length > 0) {
                $tabs.tabs('option', 'active', previousTabIndex).tabs('refresh');
              } else {
                console.error('Zero tabs!');
                PTL.utilities.console(PTL.tr('Zero tabs!'), 'error');

                $('#noSourcesButton').fadeIn('slow');
              }

            }
          }
        ],
        open: function () {

          $('.ui-widget-overlay').on('click', function() {
            PTL.dialog.kill($dialog);
          });

          $dialog.find('h1').text(PTL.tr('Really delete this group?'));
          $dialog.find('h2#name').text(PTL.tr('Name'));
          $dialog.find('p#name').text($a.text());
          $dialog.find('h2#number').text(PTL.tr('Number of sources'));
          $dialog.find('p#number').text($selectedPanel.find('li.feed').length);

        }
      });

      $dialog.dialog('open');
    });
  },
  killFeed:function($button) {

    $('#dialogs').load('/static/templates/dialogs.html #question-dialog', function() {

      var $dialog = $(this),
          $thisFeed = $button.parent().parent().parent().parent(),
          thisFeedId = $button.parent().parent().parent().parent().attr('id'),
          thisFeedName = $button.parent().parent().parent().find('.source-title').text(),
          $icon = $dialog.find('div.icon > i');

      $icon.addClass('icon-trash-empty danger');

      console.log('feedId: %s, thisFeedName: %s', thisFeedId, thisFeedName);

      $dialog.dialog({
        title: PTL.tr('Delete source'),
        autoOpen: false,
        closeOnEscape: true,
        resizable: false,
        height: 'auto',
        width: PTL.utilities.vWidth(),
        modal: true,
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

          $dialog.find('h1').text(PTL.tr('Really delete this source?'));
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
        title: PTL.tr('Group'),
        autoOpen: false,
        closeOnEscape: true,
        resizable: false,
        height: 'auto',
        width: PTL.utilities.vWidth(),
        modal: true,
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
              // PTL.dialog.kill($dialog);
              PTL.dialog.kill($dialog);

            }
          }
        ],
        open: function() {

          PTL.utilities.translate();

          $('.ui-widget-overlay').on('click', function() {
            PTL.dialog.kill($dialog);
          });

          var $tabName = $dialog.find('#tabName');
          var $tabNameLegend = $dialog.find('legend#tabNameLegend');

          var $tabLeft = $dialog.find('button#left');
          var $tabRight = $dialog.find('button#right');

          var $tab = $('a#' + $(this).data('tabId')).parent('li');

          $tabName.click(function() {
            $(this).select();
          });

          $tabLeft.button().click(function() {
            PTL.utilities.moveEltLeft($tab);
          });

          $tabRight.button().click(function() {
            PTL.utilities.moveEltRight($tab);
          });

          $tabNameLegend.text(PTL.tr('Group name'));

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
