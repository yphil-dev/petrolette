var htmlElem = document.querySelector('html');
var pElem = document.querySelector('p');

var $bgcolorForm = $('#bgcolor');
var fontForm = document.getElementById('font');
// var tabForm = document.getElementById('tabDropActivate');
//
function savePrefs() {
    // localStorage.setItem('tabDropActivate', true);
    localStorage.setItem('bgcolor', document.getElementById('bgcolor').value);
    localStorage.setItem('font', document.getElementById('font').value);

    setPrefs();
}

function setPrefs() {
    var currentColor = localStorage.getItem('bgcolor');
    var currentFont = localStorage.getItem('font');
    // var currentConfTab = localStorage.getItem('tabDropActivate');

    // document.getElementById('tabDropActivate').value = currentConfTab;
    $('#bgcolor').value = currentColor;
    document.getElementById('font').value = currentFont;

    htmlElem.style.backgroundColor = '#' + currentColor;
    pElem.style.fontFamily = currentFont;
}

// $bgcolorForm.onchange = savePrefs;
fontForm.onchange = savePrefs;

var NWS = (function() {

    var defaults = {'background-color':'#333333', 'tabDropActivate': true};

    return {
        readConfig:function(key) {

            console.log('Reading Key: ' + localStorage.getItem(key));

            if(typeof localStorage.getItem(key) === 'undefined' || !localStorage.getItem(key)) {
                console.log('Unfound Key: ' + key + ', So default val: ' + defaults[key]);
                return defaults[key];
            } else {
                console.log('Found Key: ' + key + ', Stored Val: ' + localStorage.getItem(key));
                return localStorage.getItem(key);
            }

        },
        writeConfig:function(key, val) {
            console.log('Writing Key: ' + key + ', Val: ' + val)

            localStorage.setItem(key, val);
        }
    }
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

$('#bgcolor').on('input',function(e){
    console.log('plop');
});

console.log('LS: ' + localStorage.getItem('tabDropActivate'));
