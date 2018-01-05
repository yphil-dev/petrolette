MOB.prefs = (function() {


  var emptyTabList = [
    {"name":"Group 1",
     "feeds": [
       {"url":"http://www.androidpolice.com/feed","type":"mixed","limit": 4}
     ]
    }
  ];

  var newsTabList = [
    {"name":"World",
     "feeds": [
       {"url":"http://feeds.bbci.co.uk/news/world/rss.xml","type":"mixed","limit":8},
       {"url":"http://www.nytimes.com/services/xml/rss/nyt/World.xml","type":"mixed","limit": 4},
       {"url":"http://feeds.reuters.com/Reuters/worldNews","type":"text","limit": 16},
       {"url":"http://feeds.reuters.com/reuters/USVideoWorldNews","type":"photo","limit": 16},
       {"url":"http://www.economist.com/sections/international/rss.xml","type":"text","limit": 8},

       {"url":"https://www.reddit.com/.rss","type":"text","limit": 8}
     ]
    },
    {"name":"Europe",
     "feeds": [
       {"url":"http://www.economist.com/sections/europe/rss.xml", "type":"text", "limit": 12},
       {"url":"https://feeds.feedburner.com/TechCrunch/","type":"mixed","limit": 8},
       {"url":"http://xkcd.com/rss.xml","type":"photo","limit": 4},
       {"url":"https://www.reddit.com/.rss","type":"text","limit": 8}
     ]
    }
  ];

  var miscTabList = [
    {"name":"Tech",
     "feeds": [
       {"url":"https://feeds.feedburner.com/TechCrunch/","type":"mixed","limit": 8},
       {"url":"http://feeds.reuters.com/reuters/technologyNews", "type":"text", "limit": 16},
       {"url":"https://www.sciencedaily.com/rss/matter_energy/engineering.xml", "type":"mixed", "limit": 12},
       {"url":"https://www.theengineer.co.uk/feed", "type":"mixed", "limit": 14},
       {"url":"http://feed.cnet.com/feed/topics/tech-industry", "type":"mixed", "limit": 14},

       {"url":"https://spectrum.ieee.org/rss/videos", "type":"mixed", "limit": 16}
     ]
    },
    {"name":"Computing",
     "feeds": [
       {"url":"http://feeds.reuters.com/reuters/technologyNews", "type":"text", "limit": 16},
       {"url":"https://spectrum.ieee.org/rss/computing/fulltext", "type":"mixed", "limit": 12},
       {"url":"https://www.technologyreview.com/c/computing/rss/", "type":"photo", "limit": 4},

       {"url":"http://www.economist.com/blogs/gametheory/index.xml","type":"mixed","limit": 8},

       {"url":"http://rss.slashdot.org/Slashdot/slashdot", "type":"mixed", "limit": 4},
       {"url":"http://rss.slashdot.org/Slashdot/slashdot", "type":"mixed", "limit": 4},
       {"url":"http://rss.slashdot.org/Slashdot/slashdot", "type":"mixed", "limit": 4},

       {"url":"http://www.economist.com/topics/computer-technology/index.xml", "type":"text", "limit": 16}
     ]
    },
    {"name":"Science",
     "feeds": [
       {"url":"http://feeds.bbci.co.uk/news/science_and_environment/rss.xml", "type":"mixed", "limit": 6},
       {"url":"https://feeds.feedburner.com/TechCrunch/","type":"mixed","limit": 8},
       {"url":"https://spectrum.ieee.org/rss/biomedical/fulltext","type":"mixed","limit": 4},
       {"url":"https://www.technologyreview.com/topnews.rss","type":"mixed","limit": 4},

       {"url":"https://www.technologyreview.com/c/biomedicine/rss/","type":"mixed","limit": 4},
       {"url":"https://www.technologyreview.com/c/energy/rss/","type":"mixed","limit": 4},
       {"url":"https://spectrum.ieee.org/rss/blog/energywise/fulltext","type":"mixed","limit": 4},
       {"url":"https://spectrum.ieee.org/rss/blog/automaton/fulltext","type":"mixed","limit": 4},


       {"url":"https://www.reddit.com/.rss","type":"text","limit": 8}
     ]
    },
    {"name":"Comics",
     "feeds": [
       {"url":"http://xkcd.com/rss.xml","type":"photo","limit": 8},
       {"url":"http://thisisindexed.com/feed","type":"photo","limit": 8},
       {"url":"http://what-if.xkcd.com/feed.atom","type":"photo","limit": 8},
       {"url":"http://phdcomics.com/gradfeed.php","type":"photo","limit": 8},
       {"url":"http://comicfeeds.chrisbenard.net/view/pennyarcade/default","type":"photo","limit": 8},

       {"url":"http://comicfeeds.chrisbenard.net/view/dilbert/default","type":"photo","limit": 8}
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
    'tabs': JSON.stringify(emptyTabList)
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

      var $loader = $('#indicatorContainer');

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
