// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.tab = {
  init: function() {

    $('div#newFeedButton').attr('title', PTL.tr('New feed') + ' (' + PTL.kbShortcutNewFeed + ')');
    $('div#logoTitle > div.logoTitle').attr('title', PTL.tr('Click to focus current tab') + ' (' + PTL.kbShortcutFocusTab + ')');
    $('#ptlSearch').attr('title', PTL.tr('Search in feeds') + ' (' + PTL.kbShortcutFocusSearch + ') ' + PTL.tr('Press ENTER to go to last result, ESCAPE to cancel.'));

    $('#loadSpinner').fadeIn('fast');

    const $tabs = $('#tabs').tabs({
      heightStyle: 'content',
      activate: function(event, ui) {
        ui.newPanel.css("display", "flex");
        $('.tabIcon').show();
      }
    });

    $tabs.find('.ui-tabs-nav').sortable({
      axis: 'x',
      items: '> li:not(#newTabTab)',
      stop: function() {
        $tabs.tabs('refresh');
        PTL.tab.saveTabs();
      }
    });

    $tabs.on('mouseup', '.ui-tabs-active a', function(e) {
      e.preventDefault();
      if (e.which === 1) {
        PTL.dialog.editTab($(this));
      }
    });

    $tabs.on('mouseup', '.ui-tabs-tab', function(e) {
      // e.preventDefault();
      // alert('wopop! Elt:' + $(this).prop('nodeName') + ' class:' + $(this).prop('class'));
      $(this).focus();
     
    });

    $tabs.on("click", "i.tabCloser", function() {

      const $tabs = $('#tabs'),
            $a = $(this).prev('a.ui-tabs-anchor'),
            tabName = $a.text(),
            tabId = $a.attr('href'),
            $selectedTab = $a.parent(),
            $selectedPanel = $tabs.find(tabId),
            numberOfFeeds = $selectedPanel.find('li.feed').length;

      if (numberOfFeeds) {
        PTL.dialog.killTab($(this), $a.text(), $selectedTab, $selectedPanel, numberOfFeeds);
      } else {
        $selectedTab.remove();
        $selectedPanel.remove();
        PTL.tab.saveTabs();
      }
      
    });

    if (PTL.util.isMobile()) {
      $tabs.find('.feedControls > div').removeClass('collapsible');
    }

    $tabs.find('.collapsible').show('fast');

    $(window).scroll(function() {
      if ($(this).scrollTop() >= 50) {
        $('#backToTop').fadeIn(200);
      } else {
        $('#backToTop').fadeOut(200);
      }
    });

    $('#backToTop').click(function() {
      $('body,html').animate({
        scrollTop: 0
      }, 500);
    });

    $('#newTabTab').bind('click', function(event) {
      event.stopImmediatePropagation();
      PTL.tab.add($tabs);
    });

    PTL.sync.readSync();

    $("#theme").attr({ href: '/static/css/themes/' + PTL.prefs.readConfig('theme') + '.css' });

    $('#loadSpinner').fadeOut(999);

  },
  saveTabs: function(isSilent) {
    const feeds = PTL.tab.list();
    PTL.prefs.writeConfig('feeds', JSON.stringify(feeds));
    PTL.sync.writeSync(JSON.stringify(feeds));
    if (!isSilent) PTL.util.say(PTL.tr('Tabs and feeds saved'), 'success');
  },
  populate: function(feeds) {

    const $tabs = $('#tabs');

    PTL.tab.makeNewTabButton($tabs);

    if (!feeds || feeds.length <= 0) {
      PTL.util.say(PTL.tr('No feeds found'), 'error');
      feeds = ['empty'];
    }

    var nbOfGroups = 0,
      nbOfFeeds = 0,
      progress = PTL.util.buildProgress();

    feeds.forEach(function(group) {
      nbOfGroups++;
      $.each(group.columns, function(k, v) {
        $.each(v, function() {
          nbOfFeeds++;
        });
      });
    });

    PTL.util.say(PTL.tr('Data structure OK: %1 tab(s) containing %2 feed(s)', nbOfGroups, nbOfFeeds), 'success');

    progress.init(nbOfFeeds);

    feeds.forEach(function(group) {

      const thisGroup = {},
        allFeeds = [],
        thisTabCols = [];

      thisGroup.name = group.name;

      $.each(group.columns, function(k, v) {

        const thisColFeeds = [];

        $.each(v, function(k, v) {
          const thisFeed = {};
          thisFeed.url = v.url;
          thisFeed.name = v.name;
          thisFeed.type = v.type;
          thisFeed.limit = v.limit;
          thisFeed.status = v.status;
          thisFeed.iconhash = v.iconhash;
          thisFeed.nbitems = v.nbitems;
          thisFeed.lastitem = v.lastitem;

          thisColFeeds.push(thisFeed);
          allFeeds.push(thisColFeeds);

        });
        thisTabCols.push(thisColFeeds);
      });
      PTL.tab.add($tabs, thisGroup.name, thisTabCols, progress);
    });

    $('#newTabTab').removeClass('hidden');

    $tabs.find('li[tabindex="0"]:first-child').focus();

    PTL.util.say(PTL.tr('Pétrolette init finished'), 'success');

    PTL.tab.saveTabs();

  },
  empty: function(callback) {
    $('div#tabs ul li').remove();
    $('div#tabs div').remove();
    callback();
  },
  add: function($tabs, name, columns, progress) {

    var tabIndex = $('ul#tabNamesUl li.tabName').length + 1;

    name = name || 'Tab ' + tabIndex;

    const $tabCloser = $('<i>')
      .attr('class', 'icon-cancel tabIcon tabCloser translate')
      .data('title', PTL.tr('Delete the [%1] tab', name))
      .attr('title', PTL.tr('Delete the [%1] tab', name));

    const $tabPanel = $('<div>')
      .attr('id', 'tab-' + tabIndex)
      .attr('class', 'tab panel');

    const $tabLink = $('<a>')
      .attr('href', '#tab-' + tabIndex)
      .append(name);

    const $tab = $('<li>')
      .attr('class', 'modal tabName translate')
      .data('id', 'tab-' + tabIndex++)
      .data('title', PTL.tr('%1 | Click to rename, drag to move', name))
      .attr('title', PTL.tr('%1 | Click to rename, drag to move', name));

    const $tabNames = $('#tabs ul#tabNamesUl');

    $tab.droppable({
      tolerance: 'pointer',
      accept: 'li.feed.selected',
      hoverClass: 'ui-state-hover',
      drop: function(event, ui) {
        const $item = $(this);
        const $index = $('li.tabName').index(this);
        const $elements = ui.draggable.data('items');
        const $list = $($item.find('a').attr('href'))
          .find('.column').first();
        $elements.show().hide('slow');

        ui.draggable.show().hide('fade', 300, function() {

          $item.find('.collapsible').show('fade', 'fast');

          if (PTL.prefs.readConfig('tabDropActivate') === 'true')
            $tabs.tabs('option', 'active', $index);

          $(this).prependTo($list).show('fade', 800).before($elements.show('fade', 800));

          $('body').css('cursor', 'auto');

          PTL.tab.saveTabs();

        });
      }
    });

    $tab.append($tabLink,
      $tabCloser);

    $tab.appendTo($tabNames);
    $tabNames.find('#newTabTab').appendTo($tabNames);

    var newTab = false;

    if (!columns || columns.length <= 0) {
      newTab = true;
      columns = ['empty'];
    }

    var colIndex = 1,
      nbOfColumnsInTab = columns.length;

    columns.forEach(function(feeds) {

      const $column = PTL.col.add(colIndex++);

      $column.appendTo($tabPanel);

        if (PTL.queryString) {
            PTL.dialog.feedNew(encodeURI(PTL.queryString));
            PTL.queryString = null;
        }

      if (!newTab) {
        feeds.forEach(function(feed) {
          const type = PTL.feedTypes.includes(feed.type) ? feed.type : 'mixed',
            nbitems = Number.isInteger(feed.nbitems) ? feed.nbitems : 10,
            limit = Number.isInteger(feed.limit) ? feed.limit : 260,
            lastItem = feed.lastitem;

          if (!feed.url == "") {
            PTL.feed.add($column, feed.url, feed.name, type, limit, feed.status, feed.iconhash, nbitems, lastItem, false, progress);
          }

        });
      }

      if (nbOfColumnsInTab < 2) $column.find('.col-del').addClass('ui-state-disabled');

    });

    $tabPanel.appendTo($tabs);

    $tabs.tabs('refresh');
    $tabs.tabs("option", "active", 0);
  },
  list: function(type) {

    const $groupNodes = $('#tabNamesUl > li.tabName'),
      groups = [];

    $groupNodes.each(function() {

      const group = {},
        columns = [],
        $groupNode = $(this),
        $columnNodes = $($groupNode.children().attr('href') + ' ul.column');

      group.name = $groupNode.children('a').text();

      if (type && type === 'all')
        group.pane = $groupNode.data('id');

      $columnNodes.each(function() {

        const column = [],
          $srcNodes = $(this).children('li.feed');

        $srcNodes.each(function() {
          const feed = {};

          const $dataStore = $(this).find('.dataStore');
          feed.url = $dataStore.data('url');
          feed.name = $dataStore.data('name');
          feed.type = $dataStore.data('type');
          feed.limit = $dataStore.data('limit');
          feed.status = $dataStore.data('status');
          feed.iconhash = $dataStore.data('iconhash');
          feed.nbitems = $dataStore.data('nbitems');
          feed.lastitem = $dataStore.data('lastitem');

          column.push(feed);

        });
        columns.push(column);

      });
      group.columns = columns;
      groups.push(group);
    });

    return groups;
  },
  makeNewTabButton: function($tabs) {

    const $newTabButton = $('<li>')
      .attr('id', 'newTabTab')
      .attr('class', 'translate hidden')
      .data('title', 'Add a new tab')
      .attr('title', PTL.tr('Add a new tab'))
      .focus(function() {
        PTL.util.say(PTL.tr("Click this button to add a tab"), 'info', true, 'Tip');
      });

    const $newTabButtonLink = $('<a>')
      .attr('href', '#disabled')
      .bind('click', function(event) {
        event.stopImmediatePropagation();
        PTL.tab.add($tabs);
        return false;
      }).append($('<i>')
        .attr('class', 'icon-plus'));

    $newTabButtonLink.appendTo($newTabButton);
    $newTabButton.appendTo($tabs.find('ul#tabNamesUl'));

  }
};
