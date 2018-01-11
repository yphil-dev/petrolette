MOB.prefs = (function() {

  var synced = false;

  var Sources = {
    name: 'sources', builder: function(privateClient, publicClient) {

      return {
        exports: {

          read: function () {
            return privateClient.getFile('petrolette.conf', false)
              .then(function (file) {
                // var blob = new Blob([file.data], { type: file.mimeType });
                // console.log('Data: (%s)', file.data);
                return file.data;
              });
          },
          write: function (sources) {
            return privateClient.storeFile('text/plain', 'petrolette.conf', sources)
              .then(() => {
                console.log("Upload done");
                return;
              });
          }

        }
      };
    }
  };

  const remoteStorage = new RemoteStorage(
    { modules: [ Sources ] }
  );

  // remoteStorage.access.claim('petrolette.conf', 'rw');

  remoteStorage.setApiKeys({
    dropbox: 'k1fou9gcp0z28j4'
  });

  remoteStorage.on('connected', function() {
    synced = true;
    console.log('Storage account has been connected, let’s roll!');
  });

  remoteStorage.on('disconnected', function() {
    synced = false;
    console.log('Storage account has been disconnected!');
  });

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
    wd:function() {
      const widget = new Widget(remoteStorage, {
        logging: true
      });

      remoteStorage.access.claim('petrolette', 'rw');

      return widget.attach();
    },
    collection:function(key) {
      return collections[key];
    },
    readConfig:function(key) {

      remoteStorage.sources.read()
        .then((data) => {
          console.log('Read sources successfully:', data);
        })
        .catch((err) => {
          console.error('Validation error:', err);
        });

      if(typeof localStorage.getItem(key) === 'undefined' || !localStorage.getItem(key)) {
        return defaults[key];
      } else {
        return localStorage.getItem(key);
      }

    },
    writeConfig:function(key, val) {

      var $loader = $('#indicatorContainer');

      $loader.fadeToggle(50);

      if (key === 'tabs') {
        remoteStorage.sources.write(val)
          .then(() => {
            console.log('Stored sources successfully (%s)', key);
          })
          .catch((err) => {
            console.error('Validation error:', err);
          });
      }

      localStorage.setItem(key, val);
      $loader.fadeToggle('fast');

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
