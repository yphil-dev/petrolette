// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.col = {
  del: function($column) {


    var $panel = $column.parent();

    var nbOfColumnsInTab = $panel.find('.column').length;

    $column.hide('fast', function() {

      if (nbOfColumnsInTab <= 2) {
        $panel.find('.col-del').addClass('ui-state-disabled');
      }

      $(this).remove();

      PTL.tab.saveTabs();

    });
  },
  add: function(colIndex, newCol) {

    var $colButtons = $('<div>')
        .attr('class', 'buttons flex-box');

    var $colLegend = $('<legend>')
        .attr('class', 'legend legend-col unique translate')
        .data('title', 'Column')
        .data('content', 'Column')
        .text(PTL.tr('Column'));

    var $srcLegend = $('<legend>')
        .data('title', 'Feed')
        .data('content', 'Feed')
        .attr('class', 'legend unique translate')
        .text(PTL.tr('Feed'));

    var $column = $('<ul>')
        .attr('class', 'column')
        .append($colButtons);

    var $srcNewButton = $('<button>')
        .attr('title', PTL.tr('Add a feed to this column'))
        .data('title', 'Add a feed to this column')
        .attr('class', 'icon-plus unique translate new-feed-button button-column last')
        .button()
        .data('colIndex', colIndex);

    var $colNewButton = $('<button>')
        .attr('title', PTL.tr('Add a column'))
        .data('title', 'Add a column')
        .attr('class', 'icon-plus twin translate last')
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
          $feedsInCol = $column.find('.feed'),
          nbOfFeedsInCol = $feedsInCol.length;

      if (nbOfFeedsInCol < 1) {
        PTL.col.del($column);
      } else {
        PTL.dialog.killColumn($(this));
      }

    });

    $colNewButton.bind('click', function() {

      var $column = $(this).parent().parent(),
            $panel = $column.parent(),
            colIndex = $panel.find('.column').index($column);

      var $newColumn = PTL.col.add(colIndex, true);

      $panel.find('button.col-del').removeClass('ui-state-disabled');

      $newColumn.insertAfter($column);

    });

    $column.sortable({
      cursor: 'move',
      handle: ".feed-handle",
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
        $('i.feed-select').removeClass('icon-ok').addClass('icon-uncheck');

        PTL.tab.saveTabs();
      }
      }).disableSelection();

    $colButtons.append($colLegend,
                       $colDelButton,
                       $colNewButton,
                       $srcLegend,
                       $srcNewButton);

    return $column;
  }
};
