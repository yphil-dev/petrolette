PTL.tab = {
  init:function(qstring) {

    var $tabs = $('#tabs').tabs({
      heightStyle: 'content',
      activate: function() {

        var $activeTab = $tabs.find('.ui-tabs-active');

        $(document).prop('title', $activeTab.text() + ' | Pétrolette');

        $('.tabCloser').hide();

        $activeTab.find('.tabCloser').show();
      }

    });

    $tabs.find('.ui-tabs-nav').sortable({
      axis: 'x',
      items: '> li:not(#newTabButton)',
      stop: function() {
        $tabs.tabs('refresh');
        PTL.tab.saveTabs();
      }
    });

    if (qstring) {
      PTL.qstring = qstring;
    }

    $tabs.on('mouseup', '.ui-tabs-active a', function(e){
      e.preventDefault();
      if (e.which === 1) {
        PTL.dialog.editGroup($(this));
      }
    });

    $tabs.on("click", "i.tabCloser", function() {
      PTL.dialog.killTab($(this));
    });

    if (PTL.utilities.isMobile()) {
      $tabs.find('.feedControls > div').removeClass('collapsible');
    }

    $tabs.find('.collapsible').show('fast');

    PTL.tab.makeNewTabButton($tabs);

    $(window).scroll(function() {
      if ($(this).scrollTop() >= 50) {
        $('#scrollToTop').fadeIn(200);
      } else {
        $('#scrollToTop').fadeOut(200);
      }
    });
    $('#scrollToTop').click(function() {
      $('body,html').animate({
        scrollTop : 0
      }, 500);
    });

    PTL.utilities.noSourcesButton();
    PTL.sync.readSync();

    $("#mobStyle").attr({href : '/static/css/themes/' + PTL.prefs.readConfig('theme') + '.css'});

  },
  saveTabs:function() {

    console.info('Pétrolette | Writing to local storage OK');

    var allTabs = PTL.tab.list();
    PTL.prefs.writeConfig('tabs', JSON.stringify(allTabs));
    PTL.sync.writeSync(JSON.stringify(allTabs));
  },
  empty:function() {

    $('div#tabs ul li').remove();
    $('div#tabs div').remove();
    $('#noSourcesButton').fadeIn('slow');
    PTL.tab.saveTabs();
    PTL.tab.makeNewTabButton($('div#tabs'));
  },
  populate:function(tabs, clickToRefresh, add) {

    if (add) {
      console.log('ADD!');
    } else {
      $('div#tabs div').remove();
      $('div#tabs ul li').remove();
      PTL.tab.makeNewTabButton($('div#tabs'));
    }

    var totalFeeds = 0,
        progress = PTL.utilities.buildProgress();

    tabs.forEach(function(tab) {
      totalFeeds += tab.feeds.length;
    });

    progress.init(totalFeeds);

    tabs.forEach(function(tab) {
      PTL.tab.make($('#tabs'), tab.name, tab.feeds, progress);
    });

    if (clickToRefresh) {
      $('#tabs').find('.mobFeedRefresh').click();
      PTL.tab.saveTabs();
    }

    $("div#tabs").tabs('option', 'active', 0);

    $('li.mobTab').last().addClass('lastTab');
    $('li.mobTab').first().addClass('firstTab');

  },
  list:function(type) {
    var myTabs = [],
        $allTabs = $('#tabUl > li.mobTab');

    $allTabs.each(function() {
      var myFeeds = [],
          myTab = {},
          $allFeeds = $($(this).children().attr('href') + ' ul li.feed');

      myTab.name = $(this).children('a').text();

      if (type && type === 'all')
        myTab.pane = $($(this).children().attr('href') + ' ul').attr('id');

      $allFeeds.each(function() {
        var $dataStore = $(this).find('.feedControls'),
            myFeed = {};
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

    var $newTabButton = $('<li id="newTabButton" class="translate newContentButton" data-title="Add a new group" title="Add a new group">'),
        $dummyTabLink = $('<a href="#"><i class="plusButton icon-plus-1"></i></a>').bind('click', function(e) {
          e.stopImmediatePropagation();

          PTL.tab.make($($tabs));

          return false;
    });

    $dummyTabLink.appendTo($newTabButton);
    $newTabButton.appendTo($tabs.find('ul#tabUl'));

    PTL.utilities.translate();

  },
  make:function($tabs, name, feeds, progress) {

    // $tabs.tabs();

    $('#noSourcesButton').fadeOut('fast');

    var tabIndex = $('ul#tabUl li.mobTab').length + 1;

    if (!name) name = 'Group ' + tabIndex;

    var $sortable = $('<ul>')
        .attr('class', 'tabSort')
    // .css('columns', 'auto ' + PTL.prefs.readConfig('columns'))
        .attr('id', 'sortable' + tabIndex);


    var $tabCloser = $('<i>')
        .attr('class', 'icon-cancel tabCloser translate dangerous')
        .data('title', PTL.tr('Delete the [%1] tab', name))
        .attr('title', PTL.tr('Delete the [%1] tab', name));

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
        PTL.tab.saveTabs();

      }
    }).disableSelection();

    $sortable.appendTo($tabPanel);
    $tabPanel.appendTo($tabs);

    if (PTL.qstring) {
      PTL.feed.make($('.tabSort').first(), PTL.qstring, 'mixed', 8, true);
      PTL.qstring = null;
    }

    var $thisTabLink = $('<a href="#tab-' + tabIndex  + '">' + name + '</a>');

    var $thisTab = $('<li>')
        .attr('class', 'modal mobTab translate')
        .data('title', PTL.tr('%1 | Click to rename, drag to move', name))
        .attr('title', PTL.tr('%1 | Click to rename, drag to move', name));

    $thisTabLink.appendTo($thisTab);
    $tabCloser.appendTo($thisTab);

    var $tabUl = $('#tabs ul#tabUl');

    $thisTab.droppable({
      tolerance: 'pointer',
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

          // if ($('#tabDropActivate').prop('checked'))
          $tabs.tabs('option', 'active', $index);

          $(this).prependTo($list).show('fade', 800).before($elements.show('fade', 800));

          $('body').css('cursor','auto');

          PTL.tab.saveTabs();

        });
      }
    }).appendTo($tabUl);

    $tabUl.find('#newTabButton').appendTo($tabUl);

    if(typeof feeds != 'undefined') {
      feeds.forEach(function(feed) {
        PTL.feed.make($('#tab-' + tabIndex + ' ul.tabSort'), feed.url, feed.type, feed.limit, false, progress);
      });
    }

    $tabs.tabs('refresh');
    $tabs.tabs( "option", "active", tabIndex - 1);
    tabIndex++;

  }
};
