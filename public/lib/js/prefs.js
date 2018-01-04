MOB.prefs = (function() {

  var newsTabList = [
    {"name":"Actu",
     "feeds": [
       {"url":"http://www.egaliteetreconciliation.fr/spip.php?page=backend",
        "type":"text",
        "limit": 16},
       {"url":"https://feeds.feedburner.com/TechCrunch/","type":"mixed","limit": 8},
       {"url":"http://xkcd.com/rss.xml","type":"photo","limit": 4},
       {"url":"https://www.reddit.com/.rss","type":"text","limit": 8}
     ]
    },
    {"name":"News",
     "feeds": [
       {"url":"http://feeds.feedburner.com/breitbart?format=xml",
        "type":"mixed",
        "limit": 12},
       {"url":"https://feeds.feedburner.com/TechCrunch/","type":"mixed","limit": 8},
       {"url":"http://xkcd.com/rss.xml","type":"photo","limit": 4},
       {"url":"https://www.reddit.com/.rss","type":"text","limit": 8}
     ]
    }
      ];

  var miscTabList = [
    {"name":"Actu",
     "feeds": [
       {"url":"http://www.lemonde.fr/rss/une.xml",
        "type":"mixed",
        "limit": 16
       },
       {
         "url":"http://rss.liberation.fr/rss/latest/",
         "type":"mixed",
         "limit": 12
       },
       {
         "url":"http://rezo.net/backend/",
         "type":"photo",
         "limit": 4
       },
       {
         "url":"http://www.acrimed.org/spip.php?page=backend",
         "type":"text",
         "limit": 16
       }
     ]
    },
    {"name":"Culture",
     "feeds": [
       {"url":"http://www.lesinrocks.com/actualite/feed/",
        "type":"mixed",
        "limit": 12},
       {"url":"https://feeds.feedburner.com/TechCrunch/","type":"mixed","limit": 8},
       {"url":"http://xkcd.com/rss.xml","type":"photo","limit": 4},
       {"url":"https://www.reddit.com/.rss","type":"text","limit": 8}
     ]
    }
  ];

  // var newTabList = jQuery.extend(true, {}, tabList);

  var defaults = {
    'gallerySlideTransition': 'fade',
    'gallerySlideshowSpeed': 3000,
    'tabDropActivate': true,
    'theme': 'day',
    'lang': 'en',
    'explicitLang': false,
    'tabs': ''
  };

  var collections = {
    'news': JSON.stringify(newsTabList),
    'misc': JSON.stringify(miscTabList)
  };

  return {
    collection:function(key) {
      return collections[key];
    },
    readConfig:function(key) {

      if(typeof localStorage.getItem(key) === 'undefined' || !localStorage.getItem(key)) {
        return defaults[key];
      } else {
        return localStorage.getItem(key);
      }

      },
    writeConfig:function(key, val) {

      var $loader = $('#loadRadial');
      $loader.attr('class', 'c100 small green dark p100');

      $loader.children('span').text('Saving');
      $loader.fadeToggle('fast');

      localStorage.setItem(key, val);
      $loader.fadeToggle('slow');

    },
      exportConfig:function(data, fileName) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        var json = JSON.stringify(data, null, 2),
            blob = new Blob([json], {type: "application/json"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      }
  };
}());
