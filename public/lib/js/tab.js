MOB.tab = {
  saveTabs:function() {
    var allTabs = MOB.tab.all();
    MOB.prefs.writeConfig('tabs', JSON.stringify(allTabs));
  },
  populate:function(tabs, clickToRefresh) {

    $('div#tabs ul li').remove();
    $('div#tabs div').remove();

    var totalFeeds = 0;

    MOB.tab.makeNewTabButton($('div#tabs'));

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
  all:function() {
    var myTabs = [];
    var $allTabs = $('#tabUl > li.mobTab');

    $allTabs.each(function() {
      var myFeeds = [];
      var myTab = {};
      var $allFeeds = $($(this).children().attr('href') + ' ul li.feed');

      myTab.name = $(this).children('a').text();

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

    var $newTabButton = $('<li id="newTabButton" class="translate" data-title="New group" title="New group">').click(function () {
      MOB.tab.make($tabs);
      return false;
    });

    var $dummyTabLink = $('<a href="#"><i class="plusButton icon-plus-1"></i></a>').bind('click', function(e){
      e.preventDefault();
      // return false;
    });

    $dummyTabLink.appendTo($newTabButton);
    $newTabButton.appendTo($tabs.find('ul#tabUl'));
    $tabs.tabs('refresh');
  },
  make:function($tabs, name, feeds, progress) {

    var tabIndex = $('ul#tabUl li.mobTab').length + 1;

    if (!name) name = 'Tab ' + tabIndex;

    var $sortable = $('<ul>')
        .attr('class', 'tabSort')
        .attr('id', 'sortable' + tabIndex);

    var $newFeedButton = $('<div>')
        .html('<i class="icon-plus-1 rotate"></i>')
        .attr('class', 'handle newFeed ui-corner-left translate')
        .data('title', MOB.tr('Add a new source to [%1]', name))
        .attr('title', MOB.tr('Add a new source to [%1]', name));

    $newFeedButton.on("click", function() {
      MOB.feed.make($sortable, 'New Feed', 'mixed', 8, true);
      return false;
    });

    var $tabCloser = $('<i>')
        .attr('class', 'icon-cancel-circled tabCloser translate dangerous')
        .data('title', MOB.tr('Delete the [%1] tab', name))
        .attr('title', MOB.tr('Delete the [%1] tab'));

    var $tabPanel = $('<div class="tab" id="tab-' + tabIndex + '"></div>')
        .attr('id', 'tab-' + tabIndex)
        .attr('class', 'tab');

    $sortable.sortable({
      cursor: 'move',
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

    $newFeedButton.appendTo($tabPanel);
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
        ui.draggable.show().hide('slow', function () {

          if ($('#tabDropActivate').prop('checked'))
            $tabs.tabs('option', 'active', $index);

          $(this).prependTo($list).show('slow').before($elements.show('slow'));

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
