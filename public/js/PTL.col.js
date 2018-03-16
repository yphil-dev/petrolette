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

    var $colLegend = $('<span>')
          .attr('class', 'legend')
          .text('Column ' + colIndex);

      var $column = $('<ul>')
          .attr('id', 'column-' + (colIndex - 1))
          .attr('class', 'column')
          .append($colLegend);

      var $colNewButton = $('<button>')
          .attr('class', 'col-new icon-plus')
          .button()
          .data('colIndex', colIndex);

      var $colDelButton = $('<button>')
          .attr('class', 'col-del icon-minus')
          .data('colIndex', colIndex)
          .button();

      $colDelButton.bind('click', function() {

        var $column = $(this).parent().parent(),
            $sourcesInCol = $column.find('.feed'),
            nbOfSourcesInCol = $sourcesInCol.length;

        console.log('nbOfSourcesInCol : (%s)', nbOfSourcesInCol);
        PTL.dialog.killColumn($(this));
      });

      $colNewButton.bind('click', function() {

        var $column = $(this).parent().parent(),
            $panel = $column.parent(),
            $columnsInTab = $panel.find('.column'),
            nbOfColumnsInTab = $columnsInTab.length,
            colIndex = $panel.find('.column').index($column);

        var $newColumn = PTL.col.add(colIndex, nbOfColumnsInTab, true);

        $panel.find('button.col-del').show();

        console.log('$column: (%s) nbOfColumnsInTab: (%s)', $column.attr('id'), nbOfColumnsInTab);

        $newColumn.insertAfter($column);

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

    if (nbOfColumnsInTab > 1 || newCol)
      $colLegend.append($colDelButton);

    $colLegend.append($colNewButton);

    return $column;
    }
};
