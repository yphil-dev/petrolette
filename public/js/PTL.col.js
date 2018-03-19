// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.col = {
  del: function($column, nbOfColumnsInTab) {

    var $panel = $column.parent();

    $column.hide('fast', function() {

      $(this).remove();
      if (nbOfColumnsInTab <= 2) {
        $panel.find('button.col-del').hide();
      }

      PTL.tab.saveTabs();

    });
  },
  add: function(colIndex, nbOfColumnsInTab, newCol) {

    var $colButtons = $('<div>')
        .attr('class', 'buttons flex-box');

    var $colLegend = $('<legend>')
        .attr('class', 'legend legend-col unique')
        .text(PTL.tr('Column'));

    var $srcLegend = $('<legend>')
        .attr('class', 'legend unique')
        .text(PTL.tr('Source'));

    var $column = $('<ul>')
        .attr('class', 'column')
        .append($colButtons);

    var $srcNewButton = $('<button>')
        .attr('title', PTL.tr('Add a source to this column'))
        .data('title', 'Add a source to this column')
        .attr('class', 'icon-plus unique translate new-source-button button-column')
        .button()
        .data('colIndex', colIndex);

    var $colNewButton = $('<button>')
        .attr('title', PTL.tr('Add a column'))
        .data('title', 'Add a column')
        .attr('class', 'icon-plus twin translate')
        .button()
        .data('colIndex', colIndex);

    var $colDelButton = $('<button>')
        .attr('title', PTL.tr('Remove this column'))
        .data('title', 'Remove this column')
        .attr('class', 'col-del icon-minus twin')
        .data('colIndex', colIndex)
        .button();

    $colDelButton.bind('click', function() {

      var $column = $(this).parent().parent(),
          $sourcesInCol = $column.find('.feed'),
          nbOfSourcesInCol = $sourcesInCol.length;

      console.log('nbOfSourcesInCol : (%s)', nbOfSourcesInCol);

      if (nbOfSourcesInCol < 1) {
        PTL.col.del($column, nbOfColumnsInTab);
      } else {
        PTL.dialog.killColumn($(this));
      }

    });

      $colNewButton.bind('click', function() {

        var $column = $(this).parent().parent(),
            $panel = $column.parent(),
            $columnsInTab = $panel.find('.column'),
            nbOfColumnsInTab = $columnsInTab.length,
            colIndex = $panel.find('.column').index($column);

        var $newColumn = PTL.col.add(colIndex, nbOfColumnsInTab, true);

        PTL.util.reOrderColButtons($(this));

        $panel.find('button.col-del').show();

        $newColumn.insertAfter($column);

        // PTL.util.reOrderColButtons($(this));

      });

    $column.sortable({
      cursor: 'move',
      handle: ".source-handle",
      connectWith: ".column",
      cursorAt: {top: 10, left: 32},
      receive: function(e, ui) {
        if (ui.helper)
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
        $(this).find('i.source-select').removeClass('icon-ok').addClass('icon-check-empty-1');
        PTL.tab.saveTabs();
      }
      }).disableSelection();


    $colButtons.append($colLegend);

    if (nbOfColumnsInTab > 1 || newCol) $colButtons.append($colDelButton);


    $colButtons.append($colNewButton);

    $colButtons.append($srcLegend);

    $colButtons.append($srcNewButton);

    // PTL.tab.saveTabs();

    return $column;
  }
};
