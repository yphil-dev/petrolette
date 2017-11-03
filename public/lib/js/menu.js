$('#slidermenu').load('/static/templates/slidermenu.html', function() {

    var $slider = $(this)
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

    $( ".checkboxradio" ).checkboxradio();

    $('.themeSwitcher').change(function() {
        console.log('Theme: ' + $(this).attr('value'))
        $("#mobylette-theme").attr({href : $(this).attr('value')});
    });

    // $("#stylesheet").attr({href : 'https://code.jquery.com/ui/1.12.1/themes/' + Prefs.readConfig('theme') + '/jquery-ui.css'});

    $('#gallerySlideTransition').selectmenu({
        change: function( event, data ) {
            console.log('Value: ' + data.item.value)
            $.fancybox.defaults.transitionEffect = data.item.value
            Prefs.writeConfig('gallerySlideTransition', data.item.value);
        }
    });

    $('#gallerySlideTransition').val(gallerySlideTransition).selectmenu("refresh");

    if (Prefs.readConfig('tabDropActivate') === 'true')
        $('#tabDropActivate').prop('checked', true).checkboxradio('refresh')
    else
        $('#tabDropActivate').prop('checked', false).checkboxradio('refresh')

    $('#tabDropActivate').change(function() {
        Prefs.writeConfig('tabDropActivate', $(this).prop('checked'));
    });

    $('.controlGroup').controlgroup();

    var gallerySlideshowSpeed = Prefs.readConfig('gallerySlideshowSpeed');
    var gallerySlideTransition = Prefs.readConfig('gallerySlideTransition');

    $.fancybox.defaults.transitionEffect = gallerySlideTransition
    $.fancybox.defaults.clickOutside = 'close'
    // $.fancybox.defaults.clickSlide = 'zoom'

    $.fancybox.defaults.slideShow = {
        autoStart: false,
        speed: gallerySlideshowSpeed
    }

    $.fancybox.defaults = {
        clickSlide : 'zoom'
    }

    $('#sslider').slider({
        value: gallerySlideshowSpeed,
        min: 1,
        max: 10000,
        step: 100,
        slide: function( event, ui ) {
            $('#amount').val(ui.value + 'ms');
            $('#gallerySlideshowSpeedValue').text(ui.value + 'ms');

        },
        change: function( event, ui ) {
            Prefs.writeConfig('gallerySlideshowSpeed', ui.value);
            $.fancybox.defaults.slideShow = {
                speed     : ui.value
            }
        }
    });

    $('#amount').val($('#sslider').slider('value') + 'ms');
    $('#gallerySlideshowSpeedValue').text($('#sslider').slider('value') + 'ms');

    // File select

    $("#imgInp").change(function(evt){
        var JsonObj = null
        var files = evt.target.files
        var f = files[0];
        var reader = new FileReader();

        if (f.type.match(/application\/json/)) {
            console.log('JSON!')
        } else {
            console.log('Error!')
            return
        }

        console.log('Text!: %s Arr: %s', f.type, $.isArray(f))

        reader.onload = (function(theFile) {
            return function(e) {

                var y = e.target.result
                var p = JSON.parse(y);

                let isValid = p.some(obj =>
                    Array.isArray(obj.feeds) && obj.feeds.some(feed =>
                        Object.prototype.hasOwnProperty.call(feed, 'url')
                    )
                )

                if (isValid === true)
                    Tab.populateTabs(p)

                // console.log('Is Valid: %s', isValid)
            };
        })(f);

        reader.readAsText(f);

    });

});
