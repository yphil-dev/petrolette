// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.prefs = {

  getDefaultFeeds: function() {

    var result = null;
    $.ajax({
      url: '/static/js/default-feeds.json',
      type: 'get',
      dataType: 'json',
      async: false,
      success: function(data) {
        result = data;
      }
    });
    return result;

  },
  readConfig: function(key) {

    const defaults = {
      'gallerySlideTransition': 'fade',
      'gallerySlideshowSpeed': 3000,
      'lang': 'en',
      'searchPrefix': 'https://searx.prvcy.eu/search?categories=general&time_range=week&language=en&format=rss&q=',
      'searchPrefixDefault': 'https://searx.prvcy.eu/search?categories=general&time_range=week&language=en&format=rss&q=',
      'tabDropActivate': true,
      'brokenImages': 'hide',
      'mediaPreload': 'none',
      'theme': 'night',
      'nextNag': 0,
      'writeTime': Date.now()
    };

    if (typeof localStorage.getItem(key) === 'undefined' || !localStorage.getItem(key)) {

      if (key === 'feeds') {
        return JSON.stringify(PTL.prefs.getDefaultFeeds());
      } else {
        return defaults[key];
      }

    } else {
      return localStorage.getItem(key);
    }

  },
  writeConfig: function(key, val) {

    $('div#logoTitle i').addClass('writing');

    if (key === 'feeds') {
      localStorage.setItem('writeTime', Date.now());
    }

    localStorage.setItem(key, val);

    setTimeout(function() {
      $('div#logoTitle i').delay('slow').removeClass('writing');
    }, 300);

  },
  exportConfig: function(data, fileName) {

    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    const json = JSON.stringify(data, null, 2),
      blob = new Blob([json], { type: "application/json" }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);

  }
};
