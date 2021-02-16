// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.tab = {
  init:function() {

    $('#load-spinner').fadeIn('fast');

    PTL.language = PTL.prefs.readConfig('lang');

    PTL.util.translate();

    var $tabs = $('#tabs').tabs({
      heightStyle: 'content',
      activate: function(event, ui) {
        ui.newPanel.css("display","flex");
          $('.tab-icon').show();
      }
    });

    $tabs.find('.ui-tabs-nav').sortable({
      axis: 'x',
      items: '> li:not(#new-group)',
      stop: function() {
        $tabs.tabs('refresh');
        PTL.tab.saveTabs();
      }
    });

    $tabs.on('mouseup', '.ui-tabs-active a', function(e){
      console.log('plop!: %s (%s)');
      e.preventDefault();
      if (e.which === 1) {
        PTL.dialog.editGroup($(this));
      }
    });

    $tabs.on("click", "i.tab-closer", function() {
      PTL.dialog.killTab($(this));
    });

    if (PTL.util.isMobile()) {
      $tabs.find('.feed-controls > div').removeClass('collapsible');
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
        scrollTop : 0
      }, 500);
    });

    $('#new-group').bind('click', function(event) {
      event.stopImmediatePropagation();
      PTL.tab.add($tabs);
    });

    PTL.tab.makeNewTabButton($tabs);

    PTL.sync.readSync();

    $("#theme").attr({href: '/static/css/themes/' + PTL.prefs.readConfig('theme') + '.css'});

    $('#load-spinner').fadeOut(999);

  },
  saveTabs:function() {
    var feeds = PTL.tab.list();
    PTL.prefs.writeConfig('feeds', JSON.stringify(feeds));
    PTL.sync.writeSync(JSON.stringify(feeds));
  },
  populate:function(feeds) {

    $('h1.rs-big-headline, h3.rs-small-headline').text(PTL.tr('Connection to storage'));
    $('div.rs-sign-in-error, span.rs-sub-headline').text(PTL.tr('To synchronize the feeds across devices'));
    $('input.rs-connect')
      .val(PTL.tr('Synchronize'))
      .button();
    $('a.rs-help').text(PTL.tr(' More info'));

    if (!feeds || feeds.length <= 0) {
      PTL.util.console(PTL.tr('No feeds found'), 'warning');
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

    PTL.util.console(PTL.tr('Data structure OK: %1 groups containing %2 feeds', nbOfGroups, nbOfFeeds), 'success');

    progress.init(nbOfFeeds);

    feeds.forEach(function(group) {

      var thisGroup = {},
          allFeeds = [],
          thisTabCols = [];

      thisGroup.name = group.name;

      $.each(group.columns, function(k, v) {

        var thisColFeeds = [];

        $.each(v, function( k, v ) {
          var thisFeed = {};
          thisFeed.url = v.url;
          thisFeed.type = v.type;
          thisFeed.limit = v.limit;
          thisFeed.status = v.status;

          thisColFeeds.push(thisFeed);
          allFeeds.push(thisColFeeds);

        });
        thisTabCols.push(thisColFeeds);
      });
      PTL.tab.add($('#tabs'), thisGroup.name, thisTabCols, progress);
    });

    $('#new-group').removeClass('hidden');

    $('#tabs').find('li[tabindex="0"]:first-child').focus();

  },
  empty:function(callback) {
    $('div#tabs ul li').remove();
    $('div#tabs div').remove();
    callback();
  },
  add:function($tabs, name, columns, progress) {

    var tabIndex = $('ul#tab-names li.tab-name').length + 1;

    name = name || 'Tab ' + tabIndex;

    var $tabCloser = $('<i>')
        .attr('class', 'icon-cancel tab-icon tab-closer translate hidden')
        .data('title', PTL.tr('Delete the [%1] tab', name))
        .attr('title', PTL.tr('Delete the [%1] tab', name));

    var $tabPanel = $('<div>')
        .attr('id', 'tab-' + tabIndex)
        .attr('class', 'tab panel');

    var $tabLink = $('<a>')
        .attr('href', '#tab-' + tabIndex)
        .append(name);

    var $tab = $('<li>')
        .attr('class', 'modal tab-name translate')
        .data('id', 'tab-' + tabIndex++)
        .data('title', PTL.tr('%1 | Click to rename, drag to move', name))
        .attr('title', PTL.tr('%1 | Click to rename, drag to move', name));

    var $tabNames = $('#tabs ul#tab-names');

    $tab.droppable({
      tolerance: 'pointer',
      accept: 'li.feed.selected',
      hoverClass: 'ui-state-hover',
      drop: function (event, ui) {
        var $item = $(this);
        var $index = $('li.tab-name').index(this);
        var $elements = ui.draggable.data('items');
        var $list = $($item.find('a').attr('href'))
            .find('.column').first();
        $elements.show().hide('slow');

        ui.draggable.show().hide('fade', 300, function () {

          $item.find('.collapsible').show('fade', 'fast');

          if (PTL.prefs.readConfig('tabDropActivate') === 'true')
            $tabs.tabs('option', 'active', $index);

          $(this).prependTo($list).show('fade', 800).before($elements.show('fade', 800));

          $('body').css('cursor','auto');

          PTL.tab.saveTabs();

        });
      }
    });

    $tab.append($tabLink,
                $tabCloser);

    $tab.appendTo($tabNames);
    $tabNames.find('#new-group').appendTo($tabNames);

    var newTab = false;

    if (!columns || columns.length <= 0) {
      newTab = true;
      columns = ['empty'];
    }

    var colIndex = 1,
        nbOfColumnsInTab = columns.length;

    columns.forEach(function(feeds) {

      var $column = PTL.col.add(colIndex++);

      $column.appendTo($tabPanel);

      if (PTL.queryString) {
        PTL.feed.add($column, encodeURI(PTL.queryString), 'mixed', 8, 'on', true, true);
        PTL.queryString = null;
      }

      if (!newTab) {
        feeds.forEach(function(feed) {
          var type = PTL.feedTypes.includes(feed.type) ? feed.type : 'mixed',
              limit = Number.isInteger(feed.limit) ? feed.limit : 8;
          PTL.feed.add($column, feed.url, type, limit, feed.status, false, false, progress);
        });
      }

      if (nbOfColumnsInTab <2) $column.find('.col-del').addClass('ui-state-disabled');

    });

    $tabPanel.appendTo($tabs);

    $tabs.tabs('refresh');
    $tabs.tabs( "option", "active", 0);
  },
  list:function(type) {

    var $groupNodes = $('#tab-names > li.tab-name'),
        groups = [];

    $groupNodes.each(function() {

      var group = {},
          columns = [],
          $groupNode = $(this),
          $columnNodes = $($groupNode.children().attr('href') + ' ul.column');

      group.name = $groupNode.children('a').text();

      if (type && type === 'all')
        group.pane = $groupNode.data('id');

      $columnNodes.each(function() {

        var column = [],
            $srcNodes = $(this).children('li.feed');

        $srcNodes.each(function() {
          var feed = {};

          var $dataStore = $(this).find('.dataStore');
          feed.url = $dataStore.data('url');
          feed.type = $dataStore.data('type');
          feed.limit = $dataStore.data('limit');
          feed.status = $dataStore.data('status');

          column.push(feed);

        });
        columns.push(column);

      });
      group.columns = columns;
      groups.push(group);
    });

    return groups;
  },
  makeNewTabButton:function($tabs) {

    var $newTabButton = $('<li>')
        .attr('id', 'new-group')
        .attr('class', 'translate new-group hidden')
        .data('title', 'Add a new tab')
        .attr('title', PTL.tr('Add a new tab'));

    var $newTabButtonLink = $('<a>')
    // .attr('tabindex', '-1')
        .attr('href', '#disabled');

    var $newTabButtonIcon = $('<i>')
        .attr('class', 'icon-plus');

    $newTabButton.focus(function() {

      $('#newTabButtonTooltip').tooltip().css('display', 'inline').fadeOut(2500);

    });

    $newTabButtonLink.bind('click', function(event) {
      event.stopImmediatePropagation();

      PTL.tab.add($tabs);

      return false;
    });

    $newTabButtonIcon.appendTo($newTabButtonLink);
    $newTabButtonLink.appendTo($newTabButton);
    $newTabButton.appendTo($tabs.find('ul#tab-names'));


  }
};
