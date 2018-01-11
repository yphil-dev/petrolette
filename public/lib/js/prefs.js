MOB.prefs = (function() {

  var synchronized = false;

  var syncDirectory = 'petrolette';

  var Sources = {
    name: syncDirectory, builder: function(privateClient, publicClient) {

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

  const remoteStorage = new RemoteStorage({
    logging: false,
    // cordovaRedirectUri: 'http://test.petrolette.space' // defaults to undefined
    modules: [ Sources ]
  });

  // remoteStorage.access.claim('petrolette.conf', 'rw');

  remoteStorage.setApiKeys({
    dropbox: 'jyss37l88l4ural',
    googledrive: '228755392285-87kkpdod9op50nmnrvnvo6eofr5d3ehl.apps.googleusercontent.com'
  });

  remoteStorage.on('connected', function() {
    synchronized = true;
    console.log('Storage account has been connected, let’s roll!');
    MOB.tab.populate(JSON.parse(MOB.prefs.readConfig('tabs')));
  });

  remoteStorage.on('disconnected', function() {
    synchronized = false;
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
        // logging: true
      });

      remoteStorage.access.claim('petrolette', 'rw');

      return widget.attach();
    },
    collection:function(key) {
      return collections[key];
    },
    isValidSourcesFile:function(sources) {
      var isValid = false;
      if (Object.prototype.toString.call(sources) === '[object Array]') {
        isValid = sources.some(obj => Array.isArray(obj.feeds) && obj.feeds.some(feed => Object.prototype.hasOwnProperty.call(feed, 'url')));
      } else {
        isValid = false;
      }
      return isValid;
    },
    readConfig:function(key) {

      if (synchronized) {
        console.log('synchronized');

        remoteStorage.petrolette.read()
          .then((data) => {
            console.log('Read sources successfully:', data);

            if (MOB.prefs.isValidSourcesFile(JSON.parse(data))) {
              console.log('VALID sources');
            } else {
              console.log('INVALID sources');
            }

          })
          .catch((err) => {
            console.error('Validation error:', err);
          });

      } else {
        console.log('NOT synchronized');
      }

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
        remoteStorage.petrolette.write(val)
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
