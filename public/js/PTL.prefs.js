// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.prefs = (function() {

  var newList =
      [
        {"name":"News",
         "columns": [
           [
             {"url":"http://xkcd.com/rss.xml","type":"mixed","limit": 8}
           ],
           [
             {"url":"https://hackernoon.com/feed","type":"mixed","limit": 8},
             {"url":"https://www.reddit.com/.rss","type":"photo","limit": 4}
           ],
           [
             {"url":"http://www.lemonde.fr/rss/une.xml","type":"photo","limit": 4},
             {"url":"http://superphazed.tumblr.com/rss","type":"photo","limit": 8}
           ]
         ]
        },
        {"name":"Comics",
         "columns": [
           [
             {"url":"http://feeds.nature.com/nature/rss/current","type":"text","limit": 16},
             {"url":"http://feeds.feedburner.com/hackaday/LgoM/","type":"mixed","limit": 16},
             {"url":"http://createdigitalmusic.com/feed/","type":"mixed","limit": 16},

             {"url":"http://superphazed.tumblr.com/rss","type":"photo","limit": 8}
           ]
         ]
        },
        {"name":"Two",
         "columns": [
           [
             {"url":"http://phdcomics.com/gradfeed.php","type":"photo","limit": 4}
           ],
           [
             {"url":"http://xkcd.com/rss.xml","type":"photo","limit": 8},
             {"url":"http://superphazed.tumblr.com/rss","type":"photo","limit": 8}
           ]
         ]
        }
  ];

  var defaults = {
    'gallerySlideTransition': 'fade',
    'gallerySlideshowSpeed': 3000,
    'lang': 'en',
    'sources': JSON.stringify(newList),
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

      if (key === 'sources') {
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
