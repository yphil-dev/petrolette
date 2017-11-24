MOB.dialog = {
  kill:function($dialog) {
    console.info('Kill!');
    $dialog.dialog( 'destroy' );
    $('#mobDialogs').empty();
  },
  feedPrefs:function($feedPrefsButton, isNewFeed) {

    $('#mobDialogs').load('/static/templates/dialogs.html #feedPrefs', function() {
      var $dialog = $(this).find('#feedPrefs');

      MOB.utilities.translate();

      $('.rssDocLink').attr('href', 'https://' + MOB.language + '.wikipedia.org/wiki/RSS');

      var $spinner = $(this).find('#spinner').spinner();

      $spinner.on( 'spinstop', function() {
        $dialog.find('div#feedLimit').slider( 'option', 'value', $(this).val());
        $dialog.find('.ui-slider-handle').text($(this).val());
      });

      var $dataStore = $feedPrefsButton.parent().parent();

      var $feed = $dataStore.parent().parent();

      $dialog.dialog({
        title: MOB.tr('Feed: Parameters'),
        autoOpen: false,
        closeOnEscape: true,
        resizable: true,
        height: 'auto',
        width: 500,
        modal: true,
        buttons: {
          Cancel: function() {
            MOB.dialog.kill($dialog);

            if (isNewFeed) {
              $feed.hide('slide', 1000, function() {
                $feed.remove();
              });
            }

          },
          'OK': function() {

            var newUrl = $(this).find('input#feedGuess').val();
            var newType = $('#feedType :radio:checked').attr('id');

            $dataStore.data('url', newUrl)
              .data('type', newType);

            MOB.feed.populate($feedPrefsButton);
            MOB.tab.saveTabs();
            MOB.dialog.kill($dialog);
          }
        },
        open: function() {

          $('.ui-widget-overlay').on('click', function() {
            MOB.dialog.kill($dialog);
          });

          var $dialog = $(this),
              $tabFeedId = $('li#' + $dataStore.data('id')),
              $mobFeedRefresh = $tabFeedId.find('.mobFeedRefresh'),
              $guessButton = $dialog.find('button#feedGuess').button(),
              $guessSpinner = $dialog.find('button#feedGuess > i'),
              $guessField = $dialog.find('input#feedGuess'),
              $okButton = $('.ui-dialog-buttonpane');

          $okButton
            .find('button:contains("OK")')
            .addClass('okButton');

          var oldUrl = $dataStore.data('url'),
              oldType = $dataStore.data('type'),
              oldLimit = $dataStore.data('limit');

          $guessButton.click(function() {
            console.log('\nGuess: %s', $guessField.val());

            $guessSpinner
              .removeClass('icon-ok icon-cancel-circled icon-flashlight')
              .addClass('spinner icon-cog');
            $guessButton.removeClass('ui-state-success ui-state-error');

            $.get('/discover', {
              url: $guessField.val(),
              dataType: 'json',
              timeout: 1200
            }, function() {
              $guessSpinner.removeClass('spinner icon-cog');
            }).done(function(feed, status) {
              console.log( 'OK %s (status %s)', feed, status);
              $guessField.val(feed);
              $guessSpinner.addClass('icon-ok');
              $guessButton.addClass('ui-state-success');

              $okButton.removeClass('ui-state-error')
                .addClass('ui-state-success');

            }).fail(function(feed, status) {
              console.log( 'ERROR %s (status: %s)', $guessField.val(), status);
              $guessSpinner.removeClass('icon-cog spinner')
                .addClass('icon-cancel-circled');
              $guessButton.addClass('ui-state-error');
              $okButton.addClass('ui-state-error');

            }).always(function(feed, status) {
              console.log( 'Always %s (status: %s)', $guessField.val(), status);
            });

          });

          $spinner.spinner( 'value', oldLimit);

          $dialog.find('input#feedGuess').val(oldUrl);

          // $dialog.find('.feedType').checkboxradio();

          $('input:radio, input:checkbox').checkboxradio({
            icon: true
          });

          $dialog.find('input#' + oldType || 'mixed').prop('checked', true)
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
            create: function() {
              $('input#feedLimit').val(oldLimit);
              $(this).find('.ui-slider-handle').text(oldLimit);
            },
            slide: function( event, ui ) {
              $(this).val(ui.value);
              $(this).find('.ui-slider-handle').text(ui.value);
              $('input#spinner').val(ui.value);
            },
            change: function( event, ui ) {
              $('input#feedLimit').val(ui.value);
              $dataStore.data('limit', ui.value);
            }
          });

          $dialog.on('submit', function () {
            MOB.feed.populate($mobFeedRefresh);

            MOB.tab.saveTabs();

            $(this).dialog('destroy');
            return false;
          });

          // $dialog.find('#feedGuess').select();

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

      var $dialog = $('#killDialog');

      $dialog.dialog({
        title: MOB.tr('Tab: Kill'),
        autoOpen: false,
        closeOnEscape: true,
        resizable: false,
        height: 'auto',
        width: 400,
        modal: true,
        buttons: [
          {
            text: MOB.tr('Delete'),
            icon: "ui-icon-alert",
            class: "dangerous",
            click: function() {

              $selectedTab.remove();
              $selectedPanel.remove();

              MOB.tab.saveTabs();
              MOB.dialog.kill($dialog);
              $tabs.tabs('option', 'active', previousTabIndex).tabs('refresh');

            }
          },
          {
            text: MOB.tr('Cancel'),
            click: function() {
              MOB.dialog.kill($dialog);
            }
          }
        ],
        open: function () {

          $('.ui-widget-overlay').on('click', function() {
            MOB.dialog.kill($dialog);
          });

          $dialog.children('p').append(MOB.tr('Really delete this tab? (%1, %2 feeds)', $a.text(), $selectedPanel.find('li.feed').length));

        }
      });

      $dialog.dialog('open');
    });
  },
  killFeed:function($button) {

    $('#mobDialogs').load('/static/templates/dialogs.html #killDialog', function() {
      var $dialog = $('#killDialog');

      var $thisFeedId = $button.parent().parent().parent().parent().attr('id');
      var thisFeedName = $button.parent().parent().prev().text();

      console.log('ID: %s', $thisFeedId);

      $dialog.dialog({
        title: MOB.tr('Feed: Kill'),
        autoOpen: false,
        closeOnEscape: true,
        resizable: false,
        height: 'auto',
        width: 400,
        modal: true,
        buttons: [
          {
            text: MOB.tr('Delete'),
            icon: "ui-icon-alert",
            class: "dangerous",
            click: function() {

              var $tabFeedId = $('#' + $(this).data('feedId'));

              $tabFeedId.hide('fade', 1000, function() {
                $tabFeedId.remove();
                MOB.tab.saveTabs();
              });

              MOB.dialog.kill($dialog);

            }
          },
          {
            text: MOB.tr('Cancel'),
            click: function() {
              MOB.dialog.kill($dialog);
            }
          }
        ],
        open: function () {

          $('.ui-widget-overlay').on('click', function() {
            MOB.dialog.kill($dialog);
          });

          $dialog.children('p').append(MOB.tr('Really delete this feed? (%1)', thisFeedName));

        }
      });

      $dialog.data('feedId', $thisFeedId).dialog('open');
    });

  },
  renameTab:function($tab) {

    $('#mobDialogs').load('/static/templates/dialogs.html #renameTabDialog', function() {
      var $dialog = $('#renameTabDialog');

      $dialog.dialog({
        title: MOB.tr('Rename tab'),
        autoOpen: false,
        closeOnEscape: true,
        resizable: false,
        height: 'auto',
        width: 400,
        modal: true,
        buttons: {
          Cancel: function() {
            MOB.dialog.kill($dialog);
          },
          'OK': function() {
            $('#' + $(this).data('tabId')).text($dialog.find('#tabName').val());
            MOB.tab.saveTabs();
            // MOB.dialog.kill($dialog);
            MOB.dialog.kill($dialog);
          }
        },
        open: function() {

          $('.ui-widget-overlay').on('click', function() {
            MOB.dialog.kill($dialog);
          });

          var $tabName = $dialog.find('#tabName');
          var $tabNameLegend = $dialog.find('legend#tabNameLegend');

          $tabNameLegend.text(MOB.tr('Tab name'));

          $tabName.val($(this).data('tabName')).select();

          $(this).on('submit', function () {
            $('#' + $(this).data('tabId')).text($dialog.find('#tabName').val());
            MOB.tab.saveTabs();
            MOB.dialog.kill($dialog);
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
  question:function(qn) {

    var questions = [
      'a FASCIST',
      'a LEFTIST',
      'ALL OF THAT',
      'NONE OF THAT'
    ];

    $('#mobDialogs').load('/static/templates/dialogs.html #questionDialog', function() {
      var $dialog = $('#questionDialog');

      $dialog.dialog({
        title: MOB.tr('Just answer the question'),
        position: {
          my: 'center',
          at: 'center',
          of: window
        },
        autoOpen: false,
        closeOnEscape: true,
        resizable: false,
        height: 'auto',
        width: 'auto',
        modal: true,
        show: 'slide',
        hide: 'explode',
        // buttons: [
        //   {
        //     text: MOB.tr('Delete'),
        //     icon: "ui-icon-alert",
        //     class: "ui-state-error",
        //     click: function() {

        //       var $tabFeedId = $('#' + $(this).data('feedId'));

        //       $tabFeedId.hide('fade', 1000, function() {
        //         $tabFeedId.remove();
        //         MOB.tab.saveTabs();
        //       });

        //       MOB.dialog.kill($dialog);

        //     }
        //   },
        //   {
        //     text: MOB.tr('Cancel'),
        //     click: function() {
        //       MOB.dialog.kill($dialog);
        //     }
        //   }
        // ],
        buttons: {
          'What? No': function() {
            MOB.dialog.kill($dialog);

            MOB.dialog.question(qn++);
          },
          'Heck, Yes': function() {
            MOB.dialog.kill($dialog);
          },
          'Huh, Skip': function() {
            MOB.dialog.kill($dialog);
          }
        },
        open: function() {

          $('.ui-widget-overlay').on('click', function() {
            MOB.dialog.kill($dialog);
          });

          $dialog.find('p').html('Are you<br />' + questions[qn++] + '?');
        }
      });

      $dialog.dialog('open');
      return;

    });

  }
};
