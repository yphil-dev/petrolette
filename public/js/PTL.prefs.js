// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.prefs = (function() {

  var newList = [
    {"name":"news",
     "columns": [
       [
         {"url":"https://www.sciencemag.org/rss/weekly_news_email.xml","name":"scy","type":"photo","limit": 200,"status":"on"},
         {"url":"https://www.youtube.com/feeds/videos.xml?channel_id=UCAYKj_peyESIMDp5LtHlH2A","name":"","type":"mixed","limit": 140,"status":"on"},
         {"url":"https://www.popsci.com/arcio/rss/","name":"","type":"mixed","limit": 300,"status":"on"},

         {"url":"https://www.wired.com/category/science/feed","name":"","type":"mixed","limit": 300,"status":"on"}
       ],
       [
         {"url":"https://rss.art19.com/apology-line","name":"","type":"text","limit": 40,"status":"off"},
         {"url":"http://feeds.feedburner.com/sciencealert-latestnews","name":"","type":"mixed","limit": 300,"status":"on"},
         {"url":"https://www.npr.org/rss/rss.php?id=1001","name":"","type":"mixed","limit": 400,"status":"off"},
         {"url":"https://simpleflying.com/feed/","name":"","type":"mixed","limit": 400,"status":"on"}
       ],
       [
         {"url":"http://comicfeeds.chrisbenard.net/view/dilbert/default","name":"","type":"photo","limit": 200,"status":"on"},
         {"url":"http://xkcd.com/rss.xml","name":"","type":"photo","limit": 400,"status":"on"},
         {"url":"http://explainxkcd.com/rss.xml","name":"","type":"photo","limit": 60,"status":"off"}
       ],
       [
         {"url":"http://faif.us/feeds/cast-ogg/","name":"","type":"text","limit": 250,"status":"on"},
         {"url":"https://www.yellowtrace.com.au/category/architecture/feed/","name":"","type":"photo","limit": 200,"status":"off"},
         {"url":"https://www.ignant.com/category/architecture/feed/","name":"","type":"photo","limit": 300,"status":"on"}
       ]
     ]
    },
    {"name":"tek",
     "columns": [
       [
         {"url":"http://feeds.bbci.co.uk/news/technology/rss.xml","name":"","type":"mixed","limit": 300,"status":"on"},
         {"url":"http://feeds.feedburner.com/hackaday/LgoM/","name":"","type":"mixed","limit": 300,"status":"on"},

         {"url":"https://hackernoon.com/feed","name":"","type":"mixed","limit": 300,"status":"off"}
       ],
       [
         {"url":"https://hacks.mozilla.org/feed/","name":"","type":"mixed","limit": 400,"status":"on"},
         {"url":"http://feeds.arstechnica.com/arstechnica/index","name":"","type":"mixed","limit": 300,"status":"on"}
       ],
       [
         {"url":"https://www.technologyreview.com/topnews.rss","name":"","type":"mixed","limit": 400,"status":"on"},
         {"url":"https://www.techmeme.com/feed.xml?x=1","name":"","type":"mixed","limit": 400,"status":"on"},

         {"url":"http://feeds.feedburner.com/thechangelog","name":"","type":"text","limit": 400,"status":"off"}
       ]
     ]
    },
    {"name":"img",
     "columns": [
       [
         {"url":"http://cabinporn.com/rss/","name":"","type":"photo","limit": 450,"status":"off"},
         {"url":"https://iso.500px.com/feed/","name":"","type":"photo","limit": 350,"status":"on"}
       ],
       [
         {"url":"http://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss","name":"","type":"photo","limit": 450,"status":"off"},
         {"url":"https://mastodon.social/@256.rss","name":"","type":"photo","limit": 220,"status":"on"}
       ]

     ]
    },
    {"name":"social",
     "columns": [
       [
         {"url":"https://mastodon.social/@Gargron.rss","name":"","type":"mixed","limit": 300,"status":"off"},
         {"url":"https://tenforward.social/@packetcat/tagged/nowplaying.rss","name":"","type":"mixed","limit": 300,"status":"on"}
       ],
       [
         {"url":"https://framasphere.org/public/librazik.atom","name":"","type":"mixed","limit": 240,"status":"on"},
         {"url":"https://botsin.space/@hackaday","name":"","type":"photo","limit": 250,"status":"on"}

       ],
       [
         {"url":"https://mastodon.social/@unfa.rss","name":"","type":"mixed","limit": 300,"status":"on"},
         {"url":"https://botsin.space/@tinyskylines.rss","name":"","type":"photo","limit": 280,"status":"on"}
       ]
     ]
    },
    {"name":"music",
     "columns": [
       [
         {"url":"http://planet.linuxaudio.org/rss20.xml","name":"","type":"mixed","limit": 300,"status":"on"},
         {"url":"https://www.youtube.com/feeds/videos.xml?channel_id=UCAYKj_peyESIMDp5LtHlH2A","name":"","type":"mixed","limit": 300,"status":"on"}
       ],
       [
         {"url":"https://www.rollingstone.com/music/rss","name":"","type":"photo","limit": 200,"status":"on"},
         {"url":"http://www.premierguitar.com/rss/1","name":"","type":"mixed","limit": 200,"status":"on"}
       ],
       [
         {"url":"https://feeds.feedburner.com/dangerousminds/dot/net","name":"","type":"photo","limit": 600,"status":"on"}
       ]
     ]
    }
  ];

  var defaults = {
    'gallerySlideTransition': 'fade',
    'gallerySlideshowSpeed': 3000,
    'lang': 'en',
    'searchPrefix': 'https://search.modalogi.com/searx/search?categories=news&language=en-US&format=rss&q=',
    'searchPrefixDefault': 'https://search.modalogi.com/searx/search?categories=news&language=en-US&format=rss&q=',
    'feeds': JSON.stringify(newList),
    'tabDropActivate': true,
    'brokenImages': 'hide',
    'mediaPreload': 'none',
    'theme': 'night',
    'nextNag': 0,
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
