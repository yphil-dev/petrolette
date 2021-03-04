// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.prefs = (function() {

  var newList = [
    {"name":"news",
     "columns": [
       [
         {"url":"https://www.sciencemag.org/rss/weekly_news_email.xml","type":"photo","limit": 200,"status":"off"},
         {"url":"https://www.popsci.com/arcio/rss/","type":"mixed","limit": 300,"status":"on"},

         {"url":"https://www.wired.com/category/science/feed","type":"mixed","limit": 300,"status":"on"}
       ],
       [
         {"url":"https://rss.art19.com/apology-line","type":"text","limit": 40,"status":"off"},
         {"url":"http://feeds.feedburner.com/sciencealert-latestnews","type":"mixed","limit": 300,"status":"on"},
         {"url":"https://www.npr.org/rss/rss.php?id=1001","type":"mixed","limit": 400,"status":"on"}
       ],
       [
         {"url":"http://comicfeeds.chrisbenard.net/view/dilbert/default","type":"photo","limit": 200,"status":"on"},
         {"url":"http://xkcd.com/rss.xml","type":"photo","limit": 400,"status":"on"},
         {"url":"http://explainxkcd.com/rss.xml","type":"photo","limit": 60,"status":"on"}
       ],
       [
         {"url":"https://www.yellowtrace.com.au/category/architecture/feed/","type":"photo","limit": 200,"status":"off"},
         {"url":"https://www.ignant.com/category/architecture/feed/","type":"photo","limit": 300,"status":"on"}
       ]
     ]
    },
    {"name":"tek",
     "columns": [
       [
         {"url":"http://feeds.bbci.co.uk/news/technology/rss.xml","type":"mixed","limit": 300,"status":"on"},
         {"url":"http://feeds.feedburner.com/hackaday/LgoM/","type":"mixed","limit": 300,"status":"on"},

         {"url":"https://hackernoon.com/feed","type":"mixed","limit": 300,"status":"off"}
       ],
       [
         {"url":"https://hacks.mozilla.org/feed/","type":"mixed","limit": 400,"status":"on"},
         {"url":"http://feeds.arstechnica.com/arstechnica/index","type":"mixed","limit": 300,"status":"on"}
       ],
       [
         {"url":"https://www.technologyreview.com/topnews.rss","type":"mixed","limit": 400,"status":"on"},
         {"url":"https://www.techmeme.com/feed.xml?x=1","type":"mixed","limit": 400,"status":"on"},

         {"url":"http://feeds.feedburner.com/thechangelog","type":"text","limit": 400,"status":"off"}
       ]
     ]
    },
    {"name":"img",
     "columns": [
       [
         {"url":"http://cabinporn.com/rss/","type":"photo","limit": 450,"status":"off"},
         {"url":"https://iso.500px.com/feed/","type":"photo","limit": 350,"status":"on"}
       ],
       [
         {"url":"http://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss","type":"photo","limit": 450,"status":"off"},
         {"url":"https://mastodon.social/@256.rss","type":"photo","limit": 220,"status":"on"}
       ]

     ]
    },
    {"name":"social",
     "columns": [
       [
         {"url":"https://mastodon.social/@Gargron.rss","type":"mixed","limit": 300,"status":"off"},
         {"url":"https://tenforward.social/@packetcat/tagged/nowplaying.rss","type":"mixed","limit": 300,"status":"on"}
       ],
       [
         {"url":"https://framasphere.org/public/librazik.atom","type":"mixed","limit": 240,"status":"on"},
         {"url":"https://botsin.space/@hackaday","type":"photo","limit": 250,"status":"on"}

       ],
       [
         {"url":"https://mastodon.social/@unfa.rss","type":"mixed","limit": 300,"status":"on"},
         {"url":"https://botsin.space/@tinyskylines.rss","type":"photo","limit": 280,"status":"on"}
       ]
     ]
    },
    {"name":"music",
     "columns": [
       [
         {"url":"http://planet.linuxaudio.org/rss20.xml","type":"mixed","limit": 300,"status":"on"},
         {"url":"https://www.youtube.com/feeds/videos.xml?channel_id=UCAYKj_peyESIMDp5LtHlH2A","type":"mixed","limit": 300,"status":"on"}
       ],
       [
         {"url":"https://www.rollingstone.com/music/rss","type":"photo","limit": 200,"status":"on"},
         {"url":"http://www.premierguitar.com/rss/1","type":"mixed","limit": 200,"status":"on"}
       ],
       [
         {"url":"https://feeds.feedburner.com/dangerousminds/dot/net","type":"photo","limit": 600,"status":"on"}
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
