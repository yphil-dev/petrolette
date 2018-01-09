var $indicatorContainer = $('#indicatorContainer').hide();

var $menu = $('#menu');

var $menuHandle = $('#petrolette');

$menuHandle.click(function () {
  $menu.toggleClass('expanded');
  $(this).children('i').toggleClass('close');
});

$indicatorContainer.click(function() {
  $(this).fadeOut('slow');
});

$indicatorContainer.radialIndicator({
  radius: 30,
  barWidth: 6,
  barBgColor: 'transparent',
  barColor: '#FF9009',
  roundCorner : true,
  displayNumber: false,
  percentage: true
});

$.notify.defaults({
  // whether to hide the notification on click
  clickToHide: true,
  // whether to auto-hide the notification
  autoHide: true,
  // if autoHide, hide after milliseconds
  autoHideDelay: 3000,
  // default style
  style: 'bootstrap',
  // show the arrow pointing at the element
  arrowShow: true,
  // arrow size in pixels
  arrowSize: 5,
  // show animation
  showAnimation: 'slideDown',
  // show animation duration
  showDuration: 400,
  // hide animation
  hideAnimation: 'slideUp',
  // hide animation duration
  hideDuration: 200,
  // padding between element and notification
  gap: 2
});

$( document ).keydown(function( event ) {
  if ( event.keyCode === $.ui.keyCode.ESCAPE ) {
    $( ".tabSort" ).sortable( "cancel" );
  }
});

$("#mobStyle").attr({href : '/static/css/themes/' + MOB.prefs.readConfig('theme') + '.css'});

var $tabs = $('#tabs').tabs({
  heightStyle: 'content',
  activate: function() {

    var $activeTab = $tabs.find('.ui-tabs-active');

    $(document).prop('title', $activeTab.text() + ' | Petrolette');

    $('.tabCloser').hide();

    $activeTab.find('.tabCloser').show();
  }

});

$tabs.find('.ui-tabs-nav').sortable({
  axis: 'x',
  items: '> li:not(#newTabButton)',
  stop: function() {
    $tabs.tabs('refresh');
    MOB.tab.saveTabs();
  }
});

$tabs.on('mouseup', '.ui-tabs-active a', function(e){
  e.preventDefault();
  if (e.which === 1) {
    MOB.dialog.editGroup($(this));
  }
});

$tabs.on("click", "i.tabCloser", function() {
  MOB.dialog.killTab($(this));
});

MOB.utilities.noSourcesButton();

$('#noSourcesButton button').button().click(function() {
  MOB.dialog.newContent();
});

// INIT

if (MOB.utilities.isMobile()) {
  $tabs.find('.feedControls > div').removeClass('collapsible');
}

$tabs.find('.collapsible').show('fast');

MOB.tab.makeNewTabButton($tabs);

if ($.parseJSON(MOB.prefs.readConfig('tabs')).length > 0) {
  MOB.tab.populate(JSON.parse(MOB.prefs.readConfig('tabs')));
} else {
  $('#noSourcesButton').fadeIn('slow');
}

setTimeout(function() {

  $('#tabs').fadeIn(350);
  $('#menu').fadeIn(600);

}, 1000);
