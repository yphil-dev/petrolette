var Prefs = (function() {

    var defaults = {'background-color':'#333333', 'tabDropActivate': true, 'theme': 'base'};

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
