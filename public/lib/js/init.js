// var $menu = $('#menu');

// var $menuButton = $('#menuButton'),
//     $newSourceButton = $('#newSourceButton');

// $menuButton
//   .data('title', MOB.tr('Options'))
//   .attr('title', MOB.tr('Options'));

// $newSourceButton
//   .data('title', MOB.tr('Add a source'))
//   .attr('title', MOB.tr('Add a source'));

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

// ===== Scroll to Top ====
$(window).scroll(function() {
  if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
    $('#return-to-top').fadeIn(200);    // Fade in the arrow
  } else {
    $('#return-to-top').fadeOut(200);   // Else fade out the arrow
  }
});
$('#return-to-top').click(function() {      // When arrow is clicked
  $('body,html').animate({
    scrollTop : 0                       // Scroll to top of body
  }, 500);
});
