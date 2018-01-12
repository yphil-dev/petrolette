MOB.tab = {
  saveTabs:function() {

    console.log('Saving sources...')

    var allTabs = MOB.tab.list();
    MOB.prefs.writeConfig('tabs', JSON.stringify(allTabs));
    MOB.sync.writeSync(JSON.stringify(allTabs));
  },
  empty:function() {
    $('div#tabs ul li').remove();
    $('div#tabs div').remove();
    $('#noSourcesButton').fadeIn('slow');
    $('#indicatorContainer').fadeOut('fast');
    MOB.tab.saveTabs();
    MOB.tab.makeNewTabButton($('div#tabs'));
  },
  populate:function(tabs, clickToRefresh, add) {

    if (add) {
      console.log('ADD!');
    } else {
      $('div#tabs div').remove();
      $('div#tabs ul li').remove();
      MOB.tab.makeNewTabButton($('div#tabs'));
    }

    var totalFeeds = 0;

    tabs.forEach(function(tab) {
      totalFeeds += tab.feeds.length;
    });

    var progress = MOB.utilities.buildProgress();
    progress.init(totalFeeds);

    tabs.forEach(function(tab) {
      MOB.tab.make($('#tabs'), tab.name, tab.feeds, progress);
    });

    // console.log('Total: %s', progress)

    // $("div#tabs").tabs("refresh");

    if (clickToRefresh) {
      $('#tabs').find('.mobFeedRefresh').click();
      MOB.tab.saveTabs();
    }

    $("div#tabs").tabs('option', 'active', 0);

    $('li.mobTab').last().addClass('lastTab');
    $('li.mobTab').first().addClass('firstTab');

  },
  list:function(type) {
    var myTabs = [];
    var $allTabs = $('#tabUl > li.mobTab');

    $allTabs.each(function() {
      var myFeeds = [];
      var myTab = {};
      var $allFeeds = $($(this).children().attr('href') + ' ul li.feed');

      myTab.name = $(this).children('a').text();

      if (type && type === 'all')
        myTab.pane = $($(this).children().attr('href') + ' ul').attr('id');

      $allFeeds.each(function() {
        var $dataStore = $(this).find('.feedControls');
        var myFeed = {};
        myFeed.url = $dataStore.data('url');
        myFeed.type = $dataStore.data('type');
        myFeed.limit = $dataStore.data('limit');
        myFeeds.push(myFeed);
      });
      myTab.feeds = myFeeds;
      myTabs.push(myTab);
    });

    return myTabs;

  },
  makeNewTabButton:function($tabs) {

    var $newTabButton = $('<li id="newTabButton" class="translate newContentButton" data-title="Add source" title="Add source">');

    // $newTabButton.click(function (e) {
    //   // MOB.tab.make($tabs);
    //   // MOB.dialog.newContent();
    //   // console.log('plop');
    //   e.preventDefault();
    //   return false;
    // });

    var $dummyTabLink = $('<a href="#"><i class="plusButton icon-plus-1"></i></a>').bind('click', function(e) {
      // e.preventDefault();
      e.stopImmediatePropagation();
      MOB.dialog.newContent();
      return false;
    });

    $dummyTabLink.appendTo($newTabButton);
    $newTabButton.appendTo($tabs.find('ul#tabUl'));
    // $tabs.tabs('refresh');
  },
  make:function($tabs, name, feeds, progress) {

    $tabs.tabs();

    $('#noSourcesButton').fadeOut('fast');

    var tabIndex = $('ul#tabUl li.mobTab').length + 1;

    if (!name) name = 'Group ' + tabIndex;

    var $sortable = $('<ul>')
        .attr('class', 'tabSort')
        .attr('id', 'sortable' + tabIndex);

    var $tabCloser = $('<i>')
        .attr('class', 'icon-cancel-1 tabCloser translate dangerous')
        .data('title', MOB.tr('Delete the [%1] tab', name))
        .attr('title', MOB.tr('Delete the [%1] tab'));

    var $tabPanel = $('<div class="tab" id="tab-' + tabIndex + '"></div>')
        .attr('id', 'tab-' + tabIndex)
        .attr('class', 'tab');

    $sortable.sortable({
      cursor: 'move',
      handle: ".feedHandle",
      cursorAt: {top: 10, left: 150},
      receive: function(e, ui) {
        ui.helper.first().removeAttr('style'); // undo styling set by jqueryUI
      },
      helper: function (e, item) { //create custom helper
        if (!item.hasClass('selected')) item.addClass('selected');

        // clone selected items before hiding
        var $elements = $('.selected').not('.ui-sortable-placeholder').clone();
        //hide selected items
        item.siblings('.selected').addClass('hidden');
        var $helper = $('<ul class="feedHelper">');

        return $helper.append($elements);
      },
      start: function (e, ui) {
        // Drag begins
        var $elements = ui.item.siblings('.selected.hidden').not('.ui-sortable-placeholder');
        // Store the selected items to item being dragged
        ui.item.data('items', $elements);

        // Size the placeHolder
        $('.ui-sortable-placeholder').css('height', ui.item.height());

      },
      update: function (e, ui) {
        //manually add the selected items before the one actually being dragged
        ui.item.before(ui.item.data('items'));
      },
      stop: function (e, ui) {
        //show the selected items after the operation
        ui.item.siblings('.selected').removeClass('hidden');
        //unselect since the operation is complete
        $('.selected').removeClass('selected ui-state-hover');
        $(this).find('i.feedSelect').removeClass('icon-ok').addClass('icon-check-empty-1');
        MOB.tab.saveTabs();

      }
    }).disableSelection();

    $sortable.appendTo($tabPanel);
    $tabPanel.appendTo($tabs);

    var $thisTabLink = $('<a href="#tab-' + tabIndex  + '">' + name + '</a>');

    var $thisTab = $('<li>')
        .attr('class', 'modal mobTab translate')
        .data('title', MOB.tr('%1 | Click to rename, drag to re-order', name))
        .attr('title', MOB.tr('%1 | Click to rename, drag to re-order', name));

    $thisTabLink.appendTo($thisTab);
    $tabCloser.appendTo($thisTab);

    var $tabUl = $('#tabs ul#tabUl');

    $thisTab.droppable({
      tolerance: 'pointer',
      over: function(event, ui) {
        console.log('OVER (%s)', $(this).attr('class'));
        // ui.item.css('cursor','copy');
      },
      out: function(event, ui) {
        console.log('OUT');
        // ui.item.css('cursor','auto');
      },
      accept: 'ul, .tabSort li',
      hoverClass: 'ui-state-hover',
      drop: function (event, ui) {
        var $item = $(this);
        var $index = $('li.mobTab').index(this);
        var $elements = ui.draggable.data('items');
        var $list = $($item.find('a').attr('href'))
            .find('.tabSort');
        $elements.show().hide('slow');

        ui.draggable.show().hide('fade', 300, function () {

          if ($('#tabDropActivate').prop('checked'))
            $tabs.tabs('option', 'active', $index);

          $(this).prependTo($list).show('fade', 800).before($elements.show('fade', 800));

          $('body').css('cursor','auto');

          MOB.tab.saveTabs();

        });
      }
    }).appendTo($tabUl);

    $tabUl.find('#newTabButton').appendTo($tabUl);

    if(typeof feeds != 'undefined') {
      feeds.forEach(function(feed) {
        MOB.feed.make($('#tab-' + tabIndex + ' ul.tabSort'), feed.url, feed.type, feed.limit, false, progress);
      });
    }

    $tabs.tabs('refresh');
    $tabs.tabs( "option", "active", tabIndex - 1);
    tabIndex++;

    // console.log('---- TAB OK ----');
  }
};
