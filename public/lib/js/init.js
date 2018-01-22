// $("#mobStyle").attr({href : '/static/css/themes/' + MOB.prefs.readConfig('theme') + '.css'});

var $indicatorContainer = $('#indicatorContainer').hide();

var $menu = $('#menu');

var $menuHandle = $('#petrolette');

$menuHandle.click(function () {
  $menu.toggleClass('expanded');
  $('#logoTitle').fadeToggle('slow');

  $('i#handle').toggleClass('close');

});

$indicatorContainer.click(function() {
  $(this).fadeOut('slow');
});

$indicatorContainer.radialIndicator({
  radius: 30,
  barWidth: 6,
  barBgColor: 'transparent',
  barColor: '#FF4B03',
  roundCorner : true,
  displayNumber: false,
  percentage: true
});

$( document ).keydown(function( event ) {
  if ( event.keyCode === $.ui.keyCode.ESCAPE ) {
    $( ".tabSort" ).sortable( "cancel" );
  }
});

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

// INIT

if (MOB.utilities.isMobile()) {
  $tabs.find('.feedControls > div').removeClass('collapsible');
}

$tabs.find('.collapsible').show('fast');

MOB.tab.makeNewTabButton($tabs);

MOB.sync.readSync();

// if ($.parseJSON(MOB.sync.readSync()).length > 0) {
//   MOB.tab.populate(JSON.parse(MOB.sync.readSync()));
// } else if ($.parseJSON(MOB.prefs.readConfig('tabs')).length > 0) {
//   MOB.tab.populate(JSON.parse(MOB.prefs.readConfig('tabs')));
// } else {
//   $('#noSourcesButton').fadeIn('slow');
// }

setTimeout(function() {

  $('#tabs').fadeIn(350);
  $('#menu').fadeIn(600);

}, 1000);
