var $menu = $('<div id="slidermenu">');

$menu.load('/static/templates/slidermenu.html', function() {

    var $slider = $(this).show('slow')
    var $handle = $slider.find('.handle')

    $slider.slideReveal({
        width: 275
    });

    $handle.click(function () {
        $slider.slideReveal("toggle", false);
        $(this).children('i').toggleClass('other')
    });

    $('button, .button').button();

    $('#saveTabs').click(function () {
        Prefs.exportConfig(Tab.getTabs(), 'mobylette.json');
    });

    $(".checkboxradio").checkboxradio();

    $(this).find('input#' + Prefs.readConfig('theme')).prop("checked", true)
           .checkboxradio('refresh');

    $('.themeSwitcher').change(function() {
        console.log('Theme: ' + '/static/css/themes/' + $(this).attr('value') + '.css')

        $("#mobStyle").attr({href : '/static/css/themes/' + $(this).attr('value') + '.css'});

        Prefs.writeConfig('theme', $(this).attr('value'));

        // if ($(this).attr('value') === 'day'){
        //     $('#css-day').prop('disabled', false)
        //     $('#css-night').prop('disabled', true)
        // } else {
        //     $('#css-night').prop('disabled', false)
        //     $('#css-day').prop('disabled', true)
        // }

        // $("#mobylette-theme").attr({href : '/static/css/themes/'
        //                                  + $(this).attr('value')
        //                                  + '/jquery-ui.theme.css'});

    });

    // $("#stylesheet").attr({href : 'https://code.jquery.com/ui/1.12.1/themes/' + Prefs.readConfig('theme') + '/jquery-ui.css'});

    var gallerySlideshowSpeed = Prefs.readConfig('gallerySlideshowSpeed');
    var gallerySlideTransition = Prefs.readConfig('gallerySlideTransition');

    $.fancybox.defaults.thumbs.autoStart = true;
    $.fancybox.defaults.transitionEffect = gallerySlideTransition;
    $.fancybox.defaults.slideShow.speed = gallerySlideshowSpeed;

    $slider.find('#gallerySlideTransition').selectmenu({
        width: 250,
        change: function( event, data ) {
            console.log('New FX: %s', data.item.value);
            $.fancybox.defaults.transitionEffect = data.item.value;
            Prefs.writeConfig('gallerySlideTransition', data.item.value);
        }
    });

    $slider.find('#gallerySlideTransition').val(gallerySlideTransition).selectmenu("refresh");

    if (Prefs.readConfig('tabDropActivate') === 'true')
        $('#tabDropActivate').prop('checked', true).checkboxradio('refresh')
    else
        $('#tabDropActivate').prop('checked', false).checkboxradio('refresh')

    $('#tabDropActivate').change(function() {
        Prefs.writeConfig('tabDropActivate', $(this).prop('checked'));
    });

    $slider.find('#gallerySlideshowSpeed').slider({
        value: gallerySlideshowSpeed,
        min: 1,
        max: 10000,
        step: 100,
        slide: function(event, ui) {
            $('#amount').val(ui.value + 'ms');
            $('#gallerySlideshowSpeedValue').text(ui.value + 'ms');

        },
        change: function(event, ui) {
            Prefs.writeConfig('gallerySlideshowSpeed', ui.value);
            $('#tabs').find("[data-fancybox]").fancybox({
                slideShow: {
                    speed: ui.value
                }
            });

        }
    });

    $('#amount').val($('#gallerySlideshowSpeed').slider('value') + 'ms');
    $('#gallerySlideshowSpeedValue').text($('#gallerySlideshowSpeed').slider('value') + 'ms');

    // File select

    $("#fileImport").change(function(evt){
        var JsonObj = null
        var files = evt.target.files
        var f = files[0];
        var reader = new FileReader();

        var $notifyArea = $slider.find('#mobNotify > p');

        if (f.type.match(/application\/json/)) {
            console.log('JSON!')
        } else {
            Utilities.notify('error', 'Not a Mobylette definition file format');
            return
        }


        reader.onload = (function(theFile) {
            return function(e) {

                function isOk(o) {
                    if (Object.prototype.toString.call(o) === '[object Array]') {
                        var isValid = o.some(obj =>
                            Array.isArray(obj.feeds) && obj.feeds.some(feed =>
                                Object.prototype.hasOwnProperty.call(feed, 'url')
                            )
                        )
                    } else {
                        var isValid = false;
                    }
                    return isValid
                }

                var y = e.target.result
                var p = JSON.parse(y);

                console.log('p Is array: %s', isOk(p))

                // if (isArray(p) === true) {
                //     let isValid = p.some(obj =>
                //         Array.isArray(obj.feeds) && obj.feeds.some(feed =>
                //             Object.prototype.hasOwnProperty.call(feed, 'url')
                //         )
                //     )
                // }

                if (isOk(p) === true){
                    Utilities.notify('success', 'Successful import');
                    Tab.populateTabs(p, true);
                } else {
                    Utilities.notify('error', 'Not a Mobylette definition file');
                }

                // console.log('Is Valid: %s', isValid)
            };
        })(f);

        reader.readAsText(f);

    });

});

$('body').append($menu);

$menu.fadeTo(2000 , 1, function() {
    // Animation complete.
});
