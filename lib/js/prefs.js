var NWS = (function() {

    var defaults = {'background-color':'#333333', 'tabDropActivate': true};

    return {
        readConfig:function(key) {

            if(typeof localStorage.getItem(key) === 'undefined' || !localStorage.getItem(key)) {
                return defaults[key];
            } else {
                return localStorage.getItem(key);
            }

        },
        writeConfig:function(key, val) {
            localStorage.setItem(key, val);
        }
    };
}());

$('body').css('background-color', '#' + NWS.readConfig('background-color'));

$('#tabDropActivate').val(NWS.readConfig('tabDropActivate'));

$('#tabDropActivate').change(function() {
    NWS.writeConfig('tabDropActivate', $(this).prop('checked'));
});

$('#bgcolor').change(function() {
    NWS.writeConfig('background-color', $(this).val());
    $('body').css('background-color', '#' + NWS.readConfig('background-color'));
});
