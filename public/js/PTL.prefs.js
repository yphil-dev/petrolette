PTL.prefs = (function() {

  var emptyTabList = [
    {"name":"News",
     "feeds": [
       {"url":"http://rss.nytimes.com/services/xml/rss/nyt/World.xml","type":"mixed","limit": 8},
       {"url":"http://feeds.nature.com/nature/rss/current","type":"text","limit": 16},
       {"url":"http://feeds.feedburner.com/hackaday/LgoM/","type":"mixed","limit": 16},
       {"url":"http://createdigitalmusic.com/feed/","type":"mixed","limit": 16},
       {"url":"https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss","type":"photo","limit": 4}
     ]
    },
    {"name":"Comics",
     "feeds": [
       {"url":"http://comicfeeds.chrisbenard.net/view/dilbert/default","type":"photo","limit": 8},
       {"url":"http://xkcd.com/rss.xml","type":"photo","limit": 8},
       {"url":"http://superphazed.tumblr.com/rss","type":"photo","limit": 8},
       {"url":"http://phdcomics.com/gradfeed.php","type":"photo","limit": 4}
     ]
    },
    {"name":"Movies",
     "feeds": [
       {"url":"https://thepiratebay.org/rss/top100/201","type":"text","limit": 18},
       {"url":"http://www.newyorker.com/feed/culture/richard-brody","type":"mixed","limit": 8},
       {"url":"http://www.metacritic.com/rss/features","type":"mixed","limit": 4}
     ]
    },
    {"name":"Group 3",
     "feeds": [
       {"url":"http://www.economist.com/sections/europe/rss.xml","type":"photo","limit": 8},
       {"url":"https://feeds.feedburner.com/TechCrunch/","type":"photo","limit": 8},
       {"url":"http://feeds.bbci.co.uk/news/technology/rss.xml?edition=uk","type":"mixed","limit": 8},
       {"url":"https://hackernoon.com/feed","type":"mixed","limit": 8},
       {"url":"https://www.reddit.com/.rss","type":"photo","limit": 4}
     ]
    }
  ];

  var defaults = {
    'gallerySlideTransition': 'fade',
    'gallerySlideshowSpeed': 3000,
    'tabDropActivate': true,
    'theme': 'night',
    'columns': 3,
    'lang': 'en',
    'explicitLang': false,
    'tabs': JSON.stringify(emptyTabList)
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

      $('div#logoTitle i').addClass('writing');
      localStorage.setItem(key, val);
      setTimeout(function () {
        $('div#logoTitle i').delay('slow').removeClass('writing');
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
