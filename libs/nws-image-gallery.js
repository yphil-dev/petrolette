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
