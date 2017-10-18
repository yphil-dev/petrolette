var Prefs = (function() {

    var tabList =
        [{"name":"Actu",
          "feeds":[
              {"url":"http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml","type":"photo","limit":16},
              {"url":"http://feeds.bbci.co.uk/news/rss.xml?edition=int","type":"photo","limit":16},
              {"url":"http://feeds.reuters.com/reuters/environment","type":"text","limit":16}
          ]},
         {"name":"News",
          "feeds": [
              {"url":"http://feeds.reuters.com/news/artsculture","type":"text","limit": 12},
              {"url":"http://feeds.reuters.com/reuters/businessNews","type":"mixed","limit": 8}
          ]},
         {"name":"plup",
          "feeds": [
              {"url":"https://www.sciencedaily.com/rss/matter_energy/engineering.xml","type":"text","limit": 12},
              {"url":"https://feeds.feedburner.com/TechCrunch/","type":"mixed","limit": 8},
              {"url":"http://xkcd.com/rss.xml","type":"photo","limit": 4},
              {"url":"https://www.reddit.com/.rss","type":"text","limit": 8}
          ]}
        ];

    // var newTabList = jQuery.extend(true, {}, tabList);

    var defaults = {'gallerySlideTransition': 'fade', 'gallerySlideshowSpeed': 3000, 'tabDropActivate': true, 'theme': 'base', 'tabs': JSON.stringify(tabList)};

    return {
        readConfig:function(key) {


            // defaults.tab = {}; jQuery.extend( true, defaults.tab, tabList );

            if(typeof localStorage.getItem(key) === 'undefined' || !localStorage.getItem(key)) {

                return defaults[key];
            } else {
                return localStorage.getItem(key);
            }

        },
        writeConfig:function(key, val) {
            $('#savingIcon').fadeToggle('fast');
            localStorage.setItem(key, val);
            $('#savingIcon').fadeToggle('slow');
        }
    };
}());
