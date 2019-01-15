// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.prefs = (function() {

  var newList = [
    {"name":"news",
     "columns": [
       [
         {"url":"http://rss.nytimes.com/services/xml/rss/nyt/World.xml","type":"mixed","limit": 4}
       ],
       [
         {"url":"https://www.reddit.com/r/worldnews.rss","type":"mixed","limit": 8},
         {"url":"http://feeds.reuters.com/Reuters/worldNews","type":"text","limit": 16}
       ],
       [
         {"url":"http://www.lemonde.fr/rss/une.xml","type":"mixed","limit": 4}
       ]
     ]
    },
    {"name":"tek",
     "columns": [
       [
         {"url":"http://feeds.feedburner.com/hackaday/LgoM/","type":"mixed","limit": 8},
         {"url":"https://hackernoon.com/feed","type":"mixed","limit": 8}
       ],
       [
         {"url":"https://hacks.mozilla.org/feed/","type":"mixed","limit": 4},
         {"url":"https://thepiratebay.org/rss/top100/202","type":"text","limit": 12}
       ],
       [
         {"url":"https://www.reddit.com/.rss","type":"mixed","limit": 4},
         {"url":"http://feeds.feedburner.com/thechangelog","type":"text","limit": 4}
       ]
     ]
    },
    {"name":"img",
     "columns": [
       [
         {"url":"https://www.reddit.com/r/EarthPorn.rss","type":"photo","limit": 16},
         {"url":"http://cabinporn.com/rss/","type":"photo","limit": 16}
       ]
     ]
    },
    {"name":"comics",
     "columns": [
       [
         {"url":"http://xkcd.com/rss.xml","type":"photo","limit": 8}
       ],
       [
         {"url":"http://comicfeeds.chrisbenard.net/view/dilbert/default","type":"photo","limit": 8}
       ]
     ]
    },
    {"name":"music",
     "columns": [
       [
         {"url":"http://createdigitalmusic.com/feed/","type":"mixed","limit": 8},
         {"url":"https://www.youtube.com/feeds/videos.xml?channel_id=UC3I2GFN_F8WudD_2jUZbojA","type":"mixed","limit": 8}
       ],
       [
         {"url":"https://www.rollingstone.com/music/rss","type":"photo","limit": 4},
         {"url":"http://planet.linuxaudio.org/rss20.xml","type":"mixed","limit": 12}
       ],
       [
         {"url":"https://dangerousminds.net/atom","type":"photo","mixed": 12}
       ]
     ]
    }
  ];

  var defaults = {
    'gallerySlideTransition': 'fade',
    'gallerySlideshowSpeed': 3000,
    'lang': 'en',
    'feeds': JSON.stringify(newList),
    'tabDropActivate': true,
    'theme': 'night',
    'writeTime': Date.now()
  };

  return {
    readConfig:function(key) {

      if(typeof localStorage.getItem(key) === 'undefined' || !localStorage.getItem(key)) {
        return defaults[key];
      } else {
        return localStorage.getItem(key);
      }

    },
    writeConfig:function(key, val) {

      $('div#logo-title i').addClass('writing');

      if (key === 'feeds') {
        localStorage.setItem('writeTime', Date.now());
      }

      localStorage.setItem(key, val);
      setTimeout(function () {
        $('div#logo-title i').delay('slow').removeClass('writing');
      }, 300);

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
