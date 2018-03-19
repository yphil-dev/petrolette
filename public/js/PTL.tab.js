// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.tab = {
  init:function() {

    PTL.language = PTL.prefs.readConfig('lang');

    var $tabs = $('#tabs').tabs({
      heightStyle: 'content',
      activate: function(event, ui) {

        ui.newPanel.css("display","flex");

        $(document).prop('title', $(this).find('.ui-tabs-active')
                         .text() + ' | Pétrolette');

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
      e.preventDefault();
      if (e.which === 1) {
        PTL.dialog.editGroup($(this));
      }
    });

    $tabs.on("click", "i.tab-closer", function() {
      PTL.dialog.killTab($(this));
    });

    if (PTL.util.isMobile()) {
      $tabs.find('.source-controls > div').removeClass('collapsible');
    }

    $tabs.find('.collapsible').show('fast');

    $(window).scroll(function() {
      if ($(this).scrollTop() >= 50) {
        $('#scroll-top').fadeIn(200);
      } else {
        $('#scroll-top').fadeOut(200);
      }
    });

    $('#scroll-top').click(function() {
      $('body,html').animate({
        scrollTop : 0
      }, 500);
    });

    PTL.tab.makeNewTabButton($tabs);
    PTL.sync.readSync();

    $("#theme").attr({href: '/static/css/themes/' + PTL.prefs.readConfig('theme') + '.css'});

  },
  saveTabs:function() {
    var sources = PTL.tab.list();
    PTL.prefs.writeConfig('sources', JSON.stringify(sources));
    PTL.sync.writeSync(JSON.stringify(sources));
  },
  populate:function(sources) {

    if (!sources || sources.length <= 0) {
      PTL.util.console(PTL.tr('No sources found'), 'warning');
      sources = ['empty'];
    }

    var nbOfGroups = 0,
        nbOfSources = 0,
        progress = PTL.util.buildProgress();

    sources.forEach(function(group) {
      nbOfGroups++;
      $.each(group.columns, function(k, v) {
        $.each(v, function() {
          nbOfSources++;
        });
      });
    });

    PTL.util.console(PTL.tr('Data structure OK: %1 groups containing %2 sources', nbOfGroups, nbOfSources), 'success');

    progress.init(nbOfSources);

    sources.forEach(function(group) {

      var thisGroup = {},
          allSources = [],
          thisTabCols = [];

      thisGroup.name = group.name;

      $.each(group.columns, function(k, v) {

        var thisColSources = [];

        $.each(v, function( k, v ) {
          var thisSource = {};
          thisSource.url = v.url;
          thisSource.type = v.type;
          thisSource.limit = v.limit;

          thisColSources.push(thisSource);
          allSources.push(thisColSources);

          // console.log('URL: %s, Type: %s, Limit: %s', v.url, v.type, v.limit);
        });
        thisTabCols.push(thisColSources);
      });
      PTL.tab.add($('#tabs'), thisGroup.name, thisTabCols, progress);

      // console.log('thisTabColsA: (%s)', JSON.stringify(thisTabCols));
      // console.log('Group: %s, %s cols, %s sources', ThisGroup.name, cols, sources);
    });

  },
  empty:function() {
    $('div#tabs ul li').remove();
    $('div#tabs div').remove();
  },
  add:function($tabs, name, columns, progress) {

    $('#new-group').removeClass('hidden');

    var tabIndex = $('ul#tab-names li.tab-name').length + 1;

    name = name || 'Group ' + tabIndex;

    var $tabCloser = $('<i>')
        .attr('class', 'icon-cancel tab-icon tab-closer translate dangerous hidden')
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
      accept: 'ul, .column li',
      hoverClass: 'ui-state-hover',
      drop: function (event, ui) {
        var $item = $(this);
        var $index = $('li.tab-name').index(this);
        var $elements = ui.draggable.data('items');
        var $list = $($item.find('a').attr('href'))
            .find('.column').first();
        $elements.show().hide('slow');

        ui.draggable.show().hide('fade', 300, function () {

          console.log('$list: (%s)', $item.find('a').attr('href'));

          // if ($('#tabDropActivate').prop('checked'))
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

    columns.forEach(function(sources) {

      console.log('panel: (%s) cols: %s', $tabPanel.attr('id'), nbOfColumnsInTab);

      var $column = PTL.col.add(colIndex++);

      $column.appendTo($tabPanel);

      if (!newTab) {
        sources.forEach(function(source) {

          var url = PTL.util.isUrl(source.url) ? source.url : PTL.tr('Unrecognized URL'),
              type = PTL.sourceTypes.includes(source.type) ? source.type : 'mixed',
              limit = Number.isInteger(source.limit) ? source.limit : 8;

          PTL.src.add($column, url, type, limit, false, progress);
        });
      }

      if (nbOfColumnsInTab <2) {
        $column.find('.col-del').addClass('ui-state-disabled');
      }

    });

    $tabPanel.appendTo($tabs);

    $tabs.tabs('refresh');
    $tabs.tabs( "option", "active", 0);

    // $('#ui-id-1').focus();
  },
  list:function(type) {

    var $groupNodes = $('#tab-names > li.tab-name'),
        groups = [];

    console.log('$groupNodes in: (%s)', $groupNodes.length);

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
          var source = {};

          var $dataStore = $(this).find('.dataStore');
          source.url = $dataStore.data('url');
          source.type = $dataStore.data('type');
          source.limit = $dataStore.data('limit');
          column.push(source);
        });
        columns.push(column);

      });
      group.columns = columns;
      groups.push(group);
    });

    console.log('$groupNodes out: (%s)', $groupNodes.length);

    return groups;

  },
  makeNewTabButton:function($tabs) {

    var $newTabButton = $('<li>')
        .attr('id', 'new-group')
        .attr('class', 'translate new-group hidden')
        .data('title', 'Add a new group')
        .attr('title', PTL.tr('Add a new group'));

    var $newTabButtonLink = $('<a>')
    // .attr('tabindex', '-1')
        .attr('href', '#disabled');

    var $newTabButtonIcon = $('<i>')
        .attr('class', 'icon-plus');

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
