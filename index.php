<?php
/*
   index : View all feeds

   This script is part of NeWS
   https://bitbucket.org/yassinphilip/nws

 */

$feeds = 'feeds.xml';

?>

<!DOCTYPE html>
<html>
    <head>
        <title>NeWS</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="robots" content="noindex,nofollow">
        <link rel="shortcut icon" type="image/x-icon" href="img/nws.png" />

        <link href="https://code.jquery.com/ui/1.12.1/themes/eggplant/jquery-ui.css" rel="stylesheet" type="text/css" />
        
        <style type="text/css" media="screen">@import "nws-style.css";</style>
        <base target='_blank' />
    </head>
    <body>

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



             function detectmob() { 
                 if( navigator.userAgent.match(/Android/i)
                  || navigator.userAgent.match(/webOS/i)
                  || navigator.userAgent.match(/iPhone/i)
                  || navigator.userAgent.match(/iPad/i)
                  || navigator.userAgent.match(/iPod/i)
                  || navigator.userAgent.match(/BlackBerry/i)
                  || navigator.userAgent.match(/Windows Phone/i)
                 ){
                     return true;
                     alert('Mobile!')
                 }
                 else {
                     return false;
                     alert('Not Mobile!')
                 }
             }

             if (navigator.userAgent.match(/Android/i)
                 || navigator.userAgent.match(/webOS/i)
                 || navigator.userAgent.match(/iPhone/i)
                 || navigator.userAgent.match(/iPad/i)
                 || navigator.userAgent.match(/iPod/i)
                 || navigator.userAgent.match(/BlackBerry/i)
                 || navigator.userAgent.match(/Windows Phone/i))
                 {
                     alert('Mobile!')
                 }
             else {
                 alert('Not Mobile!')
             }
             
             $.ajaxSetup ({ cache: true })

             $( "#tabs" ).tabs().find( ".ui-tabs-nav" ).sortable({ axis: "x" })

             var totaltabs = $(".tabulators").find( "li" ).size()
             var direction = null
             var ajax_loader = 'nws-load-feed.php'
             var feed_max_age = 3600;
             var ajax_spinner = '<img src="img/loading.gif" class="loading" alt="loading..." />'
             $('body').keyup(function(e) {

                 direction = null;
                 
                 if (e.keyCode == 71) {
                     if( $("#viewer").is(':visible') ) {
                         $("#img-name a").trigger('click')
                         window.location = $("#img-name a").attr('href');
                     } else {
                         alert("plop")
                     }
                 }

                 if (e.keyCode == 37)
                     if( $("#viewer").is(':visible') ) {
                         $("#prev").trigger('click')
                         direction = null
                     } else {
                         direction = 'prev'
                     }

                 if (e.keyCode == 39)
                     if( $("#viewer").is(':visible') ) {
                         $("#next").trigger('click')
                         direction = null
                     } else {
                         direction = 'next'
                     }


                 if (e.keyCode == 27) {
                     close_viewer()
                 }

                 var active_tab = $("#tabs").tabs("option", "active")

                 if (direction != null)
                     if (direction == 'next')
                         if (active_tab < totaltabs -1)
                             $("#tabs").tabs("option", "active", active_tab + 1)
                 else
                     $("#tabs").tabs("option", "active", 0)
                 else
                     if (active_tab != 0)
                         $("#tabs").tabs("option", "active", active_tab - 1)
                 else
                     $("#tabs").tabs("option", "active", totaltabs - 1)
             })


             $("#tabs").bind("tabsactivate", function (event, ui) {
                 document.title = ui.newTab.text() + " | NeWS"
             });


             function pulse() {
                 $('.moved').fadeIn(8000)
                 $('.moved').fadeOut(200)
             }
             setInterval(pulse, 150)

             $('.reload').click(function(){
                 var div_to_reload = $(this).parent()
                 var feed_url = encodeURIComponent(div_to_reload.attr('title'))
                 var feed_num_item = div_to_reload.attr('data-numItems')
                 var feed_img_mode = div_to_reload.attr('data-img')
                 var feed_photo_mode = div_to_reload.attr('data-photo')
                 div_to_reload.children('div.innerContainer')
                                                    .html(ajax_spinner)
                                                    .load(ajax_loader, "n=" + feed_num_item + "&i="+feed_img_mode+"&p="+feed_photo_mode+"&age="+feed_max_age+"&z=" + feed_url)
             })

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
                     $("#pause").css("display", "none")
                     $("#play").css("display", "block")
                 }
             })

             function img_gallery(i, div_id, tab_id) {

                 viewport_width = $(window).width()
                 viewport_height = $(window).height()

                 msg = ""

                 if (!tab_id == '') {
                     var images = $( "#" + tab_id).find('img').not('.favicon img')
                     $("#viewer-img").attr("data-tab", tab_id)
                     // msg = "tab_id: " + tab_id + " div_id: " + div_id
                 } else {
                     var images = $( "#" + div_id).find('img').not('.favicon img')
                 }

                 var count = images.length

                 if (!count) {
                     $("#overlay").html('<div id="error">☹ No images ☹</div>')
                     $('#overlay #error').css({
                         position:'absolute',
                         left: ($(window).width() - $('#error').outerWidth())/2,
                         top: ($(window).height() - $('#error').outerHeight())/2
                     });
                     exit
                 }

                 var current_img = images.eq(i)

                 var site_url = current_img.attr("data-link").substring(7, current_img.attr("data-link").length)
                 var first_slash = site_url.indexOf("/");

                 // msg = "(" + site_url.substring(0, first_slash) + ") "
                 // msg = "(tab " + div_id + ") " + "(div " + tab_id + ")"

                 var img = new Image()
                 img.src = current_img.attr("src")

                 var curr_img_width = img.width
                 var curr_img_height = img.height

                 $("#viewer-img").fadeOut(0)

                 if (curr_img_width > curr_img_height)
                     var acceptable_min_width = 320
                 else
                     var acceptable_min_width = 230

                 if (curr_img_width < acceptable_min_width) {
                     // msg = msg + " - resized - "
                     $("#viewer").css("width", acceptable_min_width + "px")
                     $("#viewer").css("height", 240 + "px")
                     $("#viewer-img").css("width", acceptable_min_width + "px")
                     $("#viewer-img").css("height", 240 + "px")
                     $("#viewer-img").css("height", "")
                 } else {
                     $("#viewer").css("width", (curr_img_width - 5) + "px")
                     $("#viewer").css("height", (curr_img_height - 5) + "px")

                     $("#viewer-img").css("width", (curr_img_width - 5) + "px")
                     $("#viewer-img").css("height", (curr_img_height - 5) + "px")
                 }

                 if (curr_img_height > viewport_height) {
                     $("#viewer").css("max-height", viewport_height + "px")
                     $("#viewer-img").css("height", (viewport_height - 5) + "px" + "!important")
                     $("#viewer-img").css("max-height", (viewport_height - 2) + "px")
                     $("#viewer-img").css("width", "")
                 }

                 if (curr_img_width > viewport_width) {
                     $("#viewer").css("max-width", viewport_width + "px")
                     $("#viewer-img").css("width", (viewport_width - 5) + "px" + "!important")
                     $("#viewer-img").css("max-width", (viewport_width - 2) + "px")
                     $("#viewer-img").css("height", "")
                 }

                 $("#viewer").css("display", "block")
                 $("#viewer-img").attr("src", current_img.attr("src"))

                 $("#viewer-img").attr("data-index", i)
                 $("#viewer-img").attr("data-count", count)
                 $("#viewer-img").attr("data-id", div_id)
                 $("#img-name a").text(msg + "[#" + i + " of " + count + "] " + current_img.attr("alt"))
                 $("#buttons").text("[#" + i + " of " + count + "] ")
                 $("#img-name a").attr("href", current_img.attr("data-link"))
                 $("#img-name a").attr("title", current_img.attr("alt"))
                 $("#link-img").attr("href", current_img.attr("src"))

                 $("#viewer-img").fadeIn(400)
             }

             $('.gallery-feed').click(function(){
                 $("#overlay").show()
                 var div_id = $(this).parent().attr("id")
                 var tab_id = ''
                 img_gallery(0, div_id, tab_id)
             })

             $('.gallery-tab').click(function(){
                 $("#overlay").show()
                 var div_id = $(this).parent().children("div").first().attr("id")
                 // var div_id = ''
                 var tab_id = $(this).parent().attr("id")
                 // alert("plop " + div_id)
                 img_gallery(0, div_id, tab_id)
             })

             // Reposition and resize the image according to viewport
             $(window).resize(function () {
                 viewport_width = $(window).width()
                 viewport_height = $(window).height()

                 $("#viewer").css("top", ((viewport_height / 2) - 150) + "px")
                 $("#viewer").css("left", ((viewport_width / 2) - 250) + "px")

                 if (viewport_width < 500) {
                     $("#viewer").css("left", "0px")
                     $("#viewer").css("width", viewport_width + "px")
                     $("#viewer-img").css("width", (viewport_width - 10) + "px")
                 }

             })

             $("#prev").click(function () {

                 var myindex = $(this).parent().find("img").attr("data-index")
                 var mycount = $(this).parent().find("img").attr("data-count")
                 var mytab = $(this).parent().find("img").attr("data-tab")
                 var mydiv_id = $("#viewer-img").attr("data-id")
                 myindex = parseInt(myindex)
                 mycount = parseInt(mycount)

                 if (myindex > mycount) {
                     myindex = mycount
                 } else {
                     if (myindex > 0) {
                         myindex = (myindex - 1)
                     } else {
                         myindex = (mycount - 1)
                     }
                 }
                 img_gallery(myindex, mydiv_id, mytab)
             })

             $("#next").click(function () {

                 var myindex = $(this).parent().find("img").attr("data-index")
                 var mycount = $(this).parent().find("img").attr("data-count")
                 var mytab = $(this).parent().find("img").attr("data-tab")
                 var mydiv_id = $("#viewer-img").attr("data-id")
                 myindex = parseInt(myindex)

                 if (myindex < (mycount -1)) {
                     myindex = (myindex + 1)
                 }
                 else {
                     myindex = 0
                 }

                 // msg = " tab: (" + mytab + ")" + " div: (" + mydiv_id + ")"

                 // alert(msg)

                 img_gallery(myindex, mydiv_id, mytab)
             })

             $("#cross").click(function () {
                 close_viewer()
             })

             $("#overlay").click(function () {
                 close_viewer()
             })

             function close_viewer() {
                 clearTimeout(timeOut);
                 $("#pause").css("display", "none")
                 $("#play").css("display", "block")
                 $("#viewer").css("display", "none");
                 $("#overlay").hide()
                 $("#overlay").html('')
                 images = null
             }

             $('.reload').trigger('click')
             feed_max_age = 10; // allow to force reloading the feed
         })

        </script>

        <div id="tabs">

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
        <div class="outerContainer" style="" title ="'.htmlspecialchars($u, ENT_QUOTES).'" data-numItems="'.$numItems.'" data-img="'.$img.'" data-photo="'.$photo.'" id="'.$div_id.'">
            <span class="reload" title="Reload '.htmlspecialchars($u).'">&#9889;</span>
            <span class="gallery-feed" title="View '.htmlspecialchars($u).' images">►</span>
            <div class="innerContainer"></div>
        </div>
';
            }

            if (empty($urls)) {
                echo '<p class="moved">No feeds found in ' . getcwd() . "/" . $feeds . '</p>';
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
    <div id="tab-'.$tabName.'" class="nws-tab-feeds">
    <span class="gallery-tab" title="View all images in the ['.$tabName.'] tab">►</span>
';
                    foreach ($tabGroups[$tabName] as $tabUrl)
                    outerContainer($tabUrl['url'],$tabUrl['numItems'],$tabUrl['img'],$tabUrl['photo']);
                    echo '
    </div>';
                }

                echo '
    <div id="viewer">
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
</div>
<a href="nws-manage.php"><img src="img/nws.png" alt="manage" style="margin-top:.5em" /> Manage feeds</a>
';

            }
            ?>
    </body>
</html>
