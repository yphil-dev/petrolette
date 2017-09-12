<?php
/*
   index : View all feeds

   This script is part of NeWS
   https://bitbucket.org/yassinphilip/nws

 */

$feeds = 'libs/feeds2.xml';

?>

<!DOCTYPE html>
<html>
    <head>
        <title>NeWS</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="robots" content="noindex,nofollow">
        <link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico" />
        
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />

        <!-- <link href="https://code.jquery.com/ui/1.12.1/themes/eggplant/jquery-ui.css" rel="stylesheet" type="text/css" /> -->
        <link id="jquery-ui-css" href="https://code.jquery.com/ui/1.12.1/themes/dot-luv/jquery-ui.css" rel="stylesheet" type="text/css" />
        <!-- <link href="https://code.jquery.com/ui/1.12.1/themes/black-tie/jquery-ui.css" rel="stylesheet" type="text/css" /> -->
        <!-- <link href="https://code.jquery.com/ui/1.12.1/themes/excite-bike/jquery-ui.css" rel="stylesheet" type="text/css" /> -->
        <!-- <link href="https://code.jquery.com/ui/1.12.1/themes/flick/jquery-ui.css" rel="stylesheet" type="text/css" /> -->
        <!-- <link href="https://code.jquery.com/ui/1.12.1/themes/hot-sneaks/jquery-ui.css" rel="stylesheet" type="text/css" /> -->
        
        <style type="text/css" media="screen">@import "libs/nws-style.css";</style>
        <base target='_blank' />
    </head>
    <body class="ui-state-default">

        <script
            src="https://code.jquery.com/jquery-3.2.1.min.js"
            integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
            crossorigin="anonymous"></script>
        
        <script
            src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
            integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
            crossorigin="anonymous"></script>

        <script
            src="https://code.jquery.com/jquery-migrate-3.0.0.min.js"
            integrity="sha256-JklDYODbg0X+8sPiKkcFURb5z7RvlNMIaE3RA2z97vw="
            crossorigin="anonymous"></script>

        <script>

         $(document).ready(function() {

             $( document ).tooltip({
                 position: {
                     my: "center bottom-20",
                     at: "center top",
                     using: function( position, feedback ) {
                         $( this ).css( position );
                         $( "<div>" )
                             .addClass( "arrow" )
                             .addClass( feedback.vertical )
                             .addClass( feedback.horizontal )
                             .appendTo( this );
                     }
                 }
             });
             
             /* 
              *              $('.expose').click(function(e){
              *                  $(this).css('z-index','99999');
              *                  $('#overlay').fadeIn(300);
              *              });
              * 
              *              $('#overlay').click(function(e){
              *                  $('#overlay').fadeOut(300, function(){
              *                      $('.expose').css('z-index','1');
              *                  });
              *              });*/

             $("#nav li a").click(function() { 
		 $("link#jquery-ui-css").attr("href",$(this).attr('rel'));
		 return false;
	     });
             
             $('.innerContainer').on({
                 mouseenter: function () {
                     $(this).addClass('ui-state-hover');
                 },
                 mouseleave: function () {
                     $(this).removeClass('ui-state-hover');
                 }
             }, "li.nws-feed-link");

             $('button').click(function() {
                 window.open($(this).data("url"));
             });

             
             $('.nws-button-col-wrapping-block').click(function() {
                 $(this).parent().removeClass('nws-tab-feeds-col').addClass('nws-tab-feeds-block');
                 $(this).parent().children('.outerContainer').removeClass('outerContainer-col outerContainer-phone').addClass('outerContainer-block');
             });

             $('.nws-button-col-wrapping-col').click(function() {
                 $(this).parent().removeClass('nws-tab-feeds-block').addClass('nws-tab-feeds-col');
                 $(this).parent().children('.outerContainer').removeClass('outerContainer-block outerContainer-phone').addClass('outerContainer-col');
             });
             
             $('.nws-button-col-wrapping-phone').click(function() {
                 $(this).parent().removeClass('nws-tab-feeds-col');
                 $(this).parent().children('.outerContainer').removeClass('outerContainer-block outerContainer-col').addClass('outerContainer-phone');
             });

             $('.innerContainer').on("click", '.nws-feed-link', function (e) {
                 /* alert($(this).data("url"))*/
                 window.open($(this).data("url"));
                 // e.stopPropagation();
             });

             $('.innerContainer').on("click", '.nws-feed-link-img', function (e) {
                 /* alert($(this).data("url"))*/
                 window.open($(this).data("url"));
                 e.stopPropagation();
             });
             
             $.ajaxSetup ({ cache: true });

             $( "#tabs" ).tabs().find( ".ui-tabs-nav" ).sortable({ axis: "x" });

             var totaltabs = $(".tabulators").find( "li" ).size();
             var direction = null;
             var ajax_loader = 'libs/nws-load-feed.php';
             var feed_max_age = 3600;
             var ajax_spinner = '<img src="img/ellipsis.svg" class="nws-loading-anim" alt="loading..." />';
             
             $('body').keyup(function(e) {

                 direction = null;

                 if (e.keyCode == 71) {
                     if( $("#viewer").is(':visible') ) {
                         $("#img-name a").trigger('click');
                         window.location = $("#img-name a").attr('href');
                     } else {
                         alert("plop");
                     };
                 };
                 
                 if (e.keyCode == 37) {
                     if( $("#viewer").is(':visible') ) {
                         $("#prev").trigger('click');
                         direction = null;
                     } else {
                         direction = 'prev';
                     };
                 }


                 if (e.keyCode == 39) {
                     if( $("#viewer").is(':visible') ) {
                         $("#next").trigger('click');
                         direction = null;
                     } else {
                         direction = 'next';
                     };
                 }

                 if (e.keyCode == 27) {
                     close_viewer();
                 };

                 var active_tab = $("#tabs").tabs("option", "active");
                 
                 if (direction != null)
                     if (direction == 'next')
                         if (active_tab < totaltabs -1)
                             $("#tabs").tabs("option", "active", active_tab + 1);
                 else
                     $("#tabs").tabs("option", "active", 0);
                 else
                     if (active_tab != 0)
                         $("#tabs").tabs("option", "active", active_tab - 1);
                 else
                     $("#tabs").tabs("option", "active", totaltabs - 1);
             });

             
             $("#tabs").bind("tabsactivate", function (event, ui) {
                 document.title = ui.newTab.text() + " | NeWS"
             });

             function pulse() {
                 $('.mns-vc-moved').fadeIn(8000);
                 $('.mns-vc-moved').fadeOut(200);
             };
             setInterval(pulse, 150);

             $('.nws-button-reload').click(function(){
                 var div_to_reload = $(this).parent();
                 var feed_url = encodeURIComponent(div_to_reload.attr('title'));
                 var feed_num_item = div_to_reload.attr('data-numItems');
                 var feed_img_mode = div_to_reload.attr('data-img');
                 var feed_photo_mode = div_to_reload.attr('data-photo');
                 div_to_reload.children('div.innerContainer')
                              .html(ajax_spinner)
                              .load(ajax_loader, "n="
                                               + feed_num_item
                                               + "&i="
                                               + feed_img_mode
                                               + "&p="
                                               + feed_photo_mode
                                               + "&age="
                                               + feed_max_age
                                               + "&z="
                                               + feed_url);
             });

             // GALLERY

             var viewport_width = $(window).width()
             var viewport_height = $(window).height()
             var i
             var timeOut = null
             var msg = "empty"

             $("#viewer").css("top", ((viewport_height / 2) - 150) + "px")
             $("#viewer").css("left", ((viewport_width / 2) - 250) + "px")

             $('#play').click(function (e, simulated) {
                 if (!simulated) {
                     auto_play()
                     $("#pause").css("display", "block")
                     $("#play").css("display", "none")
                 }
             })

             function auto_play() {
                 $('#next').trigger('click', [true]);
                 timeOut = setTimeout(auto_play, 3000);
             }

             $('#pause, #prev, #next, #cross').click(function (e, simulated) {
                 if (!simulated) {
                     clearTimeout(timeOut);
                     $("#pause").css("display", "none");
                     $("#play").css("display", "block");
                 };
             });

             function img_gallery(i, div_id, tab_id) {

                 viewport_width = $(window).width();
                 viewport_height = $(window).height();

                 msg = "";

                 if (!tab_id == '') {
                     var images = $( "#" + tab_id).find('img').not('.favicon img');
                     $("#viewer-img").attr("data-tab", tab_id);
                 } else {
                     var images = $( "#" + div_id).find('img').not('.favicon img');
                 };

                 var count = images.length;

                 if (!count) {
                     $("#overlay").html('<div id="error"><i class="fa fa-ambulance" aria-hidden="true"></i> No images</div>');
                     $('#overlay #error').css({position:'absolute',
                                               left: ($(window).width() - $('#error').outerWidth())/2,
                                               top: ($(window).height() - $('#error').outerHeight())/2
                     });
                     exit;
                 };

                 var current_img = images.eq(i);

                 var site_url = current_img.attr("data-url").substring(7, current_img.attr("data-url").length);
                 var first_slash = site_url.indexOf("/");

                 var img = new Image();
                 img.src = current_img.attr("src");

                 var curr_img_width = img.width;
                 var curr_img_height = img.height;

                 $("#viewer-img").fadeOut(0);

                 if (curr_img_width > curr_img_height)
                     var acceptable_min_width = 320;
                 else
                     var acceptable_min_width = 230;
                 
                 if (curr_img_width < acceptable_min_width) {
                     $("#viewer").css("width", acceptable_min_width + "px");
                     $("#viewer").css("height", 240 + "px");
                     $("#viewer-img").css("width", acceptable_min_width + "px");
                     $("#viewer-img").css("height", 240 + "px");
                     $("#viewer-img").css("height", "");
                 } else {
                     $("#viewer").css("width", (curr_img_width - 5) + "px");
                     $("#viewer").css("height", (curr_img_height - 5) + "px");
                     $("#viewer-img").css("width", (curr_img_width - 5) + "px");
                     $("#viewer-img").css("height", (curr_img_height - 5) + "px");
                 };

                 if (curr_img_height > viewport_height) {
                     $("#viewer").css("max-height", viewport_height + "px");
                     $("#viewer-img").css("height", (viewport_height - 5) + "px" + "!important");
                     $("#viewer-img").css("max-height", (viewport_height - 2) + "px");
                     $("#viewer-img").css("width", "");
                 };

                 if (curr_img_width > viewport_width) {
                     $("#viewer").css("max-width", viewport_width + "px");
                     $("#viewer-img").css("width", (viewport_width - 5) + "px" + "!important");
                     $("#viewer-img").css("max-width", (viewport_width - 2) + "px");
                     $("#viewer-img").css("height", "");
                 };

                 $("#viewer").css("display", "block");
                 $("#viewer-img").attr("src", current_img.attr("src"));
                 $("#viewer-img").attr("data-index", i);
                 $("#viewer-img").attr("data-count", count);
                 $("#viewer-img").attr("data-id", div_id);
                 $("#img-name a").text(msg + "[#" + i + " of " + count + "] " + current_img.attr("alt"));
                 $("#buttons").text("[#" + i + " of " + count + "] ");
                 $("#img-name a").attr("href", current_img.attr("data-url"));
                 $("#img-name a").attr("title", current_img.attr("alt"));
                 $("#link-img").attr("href", current_img.attr("src"));

                 $("#viewer-img").fadeIn(400);
             };

             $('.nws-button-gallery-feed').click(function(){
                 $("#overlay").show();
                 var div_id = $(this).parent().attr("id");
                 var tab_id = '';
                 img_gallery(0, div_id, tab_id);
             });

             $('.nws-button-gallery-tab').click(function(){
                 $("#overlay").show();
                 var div_id = $(this).parent().children("div").first().attr("id");
                 var tab_id = $(this).parent().attr("id");
                 img_gallery(0, div_id, tab_id);
             });

             // Reposition and resize the image according to viewport
             $(window).resize(function () {
                 viewport_width = $(window).width();
                 viewport_height = $(window).height();

                 $("#viewer").css("top", ((viewport_height / 2) - 150) + "px");
                 $("#viewer").css("left", ((viewport_width / 2) - 250) + "px");

                 if (viewport_width < 500) {
                     $("#viewer").css("left", "0px");
                     $("#viewer").css("width", viewport_width + "px");
                     $("#viewer-img").css("width", (viewport_width - 10) + "px");
                 };
             });

             $("#prev").click(function () {

                 var myindex = $(this).parent().find("img").attr("data-index");
                 var mycount = $(this).parent().find("img").attr("data-count");
                 var mytab = $(this).parent().find("img").attr("data-tab");
                 var mydiv_id = $("#viewer-img").attr("data-id");
                 myindex = parseInt(myindex);
                 mycount = parseInt(mycount);
                 
                 if (myindex > mycount) {
                     myindex = mycount;
                 } else {
                     if (myindex > 0) {
                         myindex = (myindex - 1);
                     } else {
                         myindex = (mycount - 1);
                     };
                 };
                 img_gallery(myindex, mydiv_id, mytab);
             });
             
             $("#next").click(function () {

                 var myindex = $(this).parent().find("img").attr("data-index");
                 var mycount = $(this).parent().find("img").attr("data-count");
                 var mytab = $(this).parent().find("img").attr("data-tab");
                 var mydiv_id = $("#viewer-img").attr("data-id");
                 myindex = parseInt(myindex);

                 if (myindex < (mycount -1)) {
                     myindex = (myindex + 1);
                 } else {
                     myindex = 0;
                 };

                 // msg = " tab: (" + mytab + ")" + " div: (" + mydiv_id + ")"

                 // alert(msg)

                 img_gallery(myindex, mydiv_id, mytab);
             });

             $("#cross").click(function () {
                 close_viewer();
             });
             
             $("#overlay").click(function () {
                 close_viewer();
             });
             
             function close_viewer() {
                 clearTimeout(timeOut);
                 $("#pause").css("display", "none");
                 $("#play").css("display", "block");
                 $("#viewer").css("display", "none");
                 $("#overlay").hide();
                 $("#overlay").html('');
                 images = null;
             };
             
             $('.nws-button-reload').trigger('click');
             feed_max_age = 10; // allow to force reloading the feed
         });

        </script>

        <div id="tabs" class="ui-widget-content">

            <?php

            $urls = simplexml_load_file($feeds);
            $img_modes=array('none'=> 'none', 'all'=> 'all', 'first'=> 'first');

            function outerContainer($u, $numItems, $img, $photo) {

                /* $div_id = substr(htmlspecialchars($u, ENT_QUOTES), 7, strlen(htmlspecialchars($u, ENT_QUOTES))); */
                $div_id = substr($u, 7, strlen($u));

                $illegal_chars = array(".", "?", "=", "/", "&", "_", "-", ";", ",", "+");

                $pos = strlen($div_id);
                /* $div_id = str_replace($illegal_chars, "", substr($div_id, 0, $pos)); */

                $div_id = htmlspecialchars(str_replace($illegal_chars, "", substr($div_id, 0, $pos)), ENT_QUOTES);

                echo '
        <div class="outerContainer outerContainer-col ui-corner-top ui-widget-content" title ="'.htmlspecialchars($u, ENT_QUOTES).'" data-numItems="'.$numItems.'" data-img="'.$img.'" data-photo="'.$photo.'" id="'.$div_id.'">
<i class="nws-button-reload fa fa-refresh fa-fw" title="Reload '.htmlspecialchars($u).'" aria-hidden="true"></i>
<i class="nws-button-gallery-feed fa fa-file-image-o fa-fw" title="View '.htmlspecialchars($u).' images" aria-hidden="true"></i>
            <div class="innerContainer"></div>
        </div>
';
            }

            if (empty($urls)) {
                echo '<p>No feeds found in ' . getcwd() . "/" . $feeds . '</p>';
            } else {

                foreach ($urls->url as $url) {
                    $myAttributes = $url->attributes();
                    $numItems = "16";
                    $img = 'all';
                    $photo = '';
                    $tab=NULL;
                    foreach($myAttributes as $attr => $val) {
                        if ($attr == 'numItems')
                            $numItems = $val;
                        if ($attr == 'tab')
                            $tab = $val;
                        if ($attr == 'img')
                            $img = $val;
                        if ($attr == 'photo')
                            $photo = $val;
                    }

                    if (isset($tab)) {
                        $myTabs[] = array('tab'=> (string) $tab, 'url'=> (string) $url, 'numItems'=> (string) $numItems , 'img'=> (string) $img, 'photo'=> (string) $photo);
                    }
                }

                foreach($myTabs as $aRow)
                $tabGroups[$aRow['tab']][] = array('url'=> $aRow['url'], 'numItems'=> $aRow['numItems'], 'img'=> $aRow['img'], 'photo'=> $aRow['photo']);

                echo '
    <ul class="tabulators">';

                foreach (array_keys($tabGroups) as $tabName) {
                    echo '
        <li><a title="'.$tabName.', Drag to re-order" href="#tab-'.$tabName.'"><span class="tabName">'.$tabName.'</span></a></li>';
                }

                echo '
    </ul>';

                foreach (array_keys($tabGroups) as $tabName) {
                    echo '
    <div id="tab-'.$tabName.'" class="nws-tab-feeds nws-tab-feeds-col">
<i class="nws-button-col-wrapping-block fa fa-columns" title="Set ['.$tabName.'] flowing style to block" aria-hidden="true"></i>
<i class="nws-button-col-wrapping-col fa fa-newspaper-o" title="Set ['.$tabName.'] flowing style to column" aria-hidden="true"></i>
<i class="nws-button-col-wrapping-phone fa fa-mobile" title="Set ['.$tabName.'] flowing style to phone" aria-hidden="true"></i>
<i class="nws-button-gallery-tab fa fa-picture-o" title="View all images in the ['.$tabName.'] tab" aria-hidden="true"></i>
';
                    foreach ($tabGroups[$tabName] as $tabUrl)
                    outerContainer($tabUrl['url'],$tabUrl['numItems'],$tabUrl['img'],$tabUrl['photo']);
                    echo '
    </div>';
                }

                echo '
    <div id="viewer" class="expose">
      <a id="link-img">
        <img id="viewer-img" alt="Gallery viewer" src="#" />
      </a>
      <span id="cross" title="Close" aria-hidden="true" class="icon-close"></span>
      <span id="img-name"><a></a></span>
        <span id="prev" title="Previous" aria-hidden="true" class="icon-prev"></span>
        <span id="next" title="next" aria-hidden="true" class="icon-next"></span>
        <span id="pause" title="Pause Slideshow" aria-hidden="true" class="icon-pause playpause"></span>
        <span id="play" title="Start Slideshow" aria-hidden="true" class="icon-play playpause"></span>
    </div>
<button data-url="libs/nws-manage.php" id="button" class="ui-button ui-corner-all ui-widget"><img src="img/nws.png" alt="Manage feeds link" style="margin-top:.5em" /> Feeds</button>
</div>
';

            }
            ?>
            <ul id="nav">
	        <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">base</a></li>
	        <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/black-tie/jquery-ui.css">black-tie</a></li>
	        <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/blitzer/jquery-ui.css">blitzer</a></li>

                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/cupertino/jquery-ui.css">cupertino</a></li>
	        <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/dark-hive/jquery-ui.css">dark-hive</a></li>
	        <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/dot-luv/jquery-ui.css">dot-luv</a></li>
	        <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/eggplant/jquery-ui.css">eggplant</a></li>
	        <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/excite-bike/jquery-ui.css">excite-bike</a></li>
	        <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/flick/jquery-ui.css">flick</a></li>
	        <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/hot-sneaks/jquery-ui.css">hot-sneaks</a></li>

                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/humanity/jquery-ui.css">humanity</a></li>
                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/le-frog/jquery-ui.css">le-frog</a></li>
                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/mint-choc/jquery-ui.css">mint-choc</a></li>
                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/overcast/jquery-ui.css">overcast</a></li>
                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/pepper-grinder/jquery-ui.css">pepper-grinder</a></li>
                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/redmond/jquery-ui.css">redmond</a></li>
                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">smoothness</a></li>
                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/south-street/jquery-ui.css">south-street</a></li>
                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/start/jquery-ui.css">start</a></li>
                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/sunny/jquery-ui.css">sunny</a></li>
                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/swanky-purse/jquery-ui.css">swanky-purse</a></li>
                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/trontastic/jquery-ui.css">trontastic</a></li>
                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/ui-darkness/jquery-ui.css">ui-darkness</a></li>
                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/ui-lightness/jquery-ui.css">ui-lightness</a></li>
                <li><a href="#" rel="https://code.jquery.com/ui/1.12.1/themes/vader/jquery-ui.css"></a></li>
            </ul>
            
            <div id="overlay"></div>
    </body>
</html>
