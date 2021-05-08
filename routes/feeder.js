let Parser = require('rss-parser');

let parser = new Parser({
  // timeout: 5000,
  headers: {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml'
  },
  maxRedirects: 100,
  requestOptions: {
    rejectUnauthorized: false
  },
  defaultRSS: 2.0,
  xml2js: {
    emptyTag: 'media:community',
  },
  customFields: {
    item: [
      ['media:community', 'media:content', {keepArray: true}],
    ]
  }
});

exports.getFeed = getFeed;

function getFeed (feedUrl, lastItem, maxItems, callback) {

  const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

  (async () => {

    var feedItems = [];
    var reached = false;
    var newItems = 0;

    parser.parseURL(feedUrl).then((feed) => {
      var newLastItem;

      console.log(feed.title);

      feed.items.every(function(item, index) {
        console.log(item.title);

        feedItems.push(item);

        newLastItem = item.link;

        console.error('item.link: %s (%s)',item.link);

        newItems = index;

        if (item.link === lastItem) {
          reached = true;
          return false;
        }

        return true;

      });

      console.error('### FEEDER: lastItem [%s] newLastItem [%s] newItems [%s] reached: [%s]', lastItem, newLastItem, newItems, reached);

      callback (null, feedItems, feed.title || 'Untitled', feed.link || feedUrl, newLastItem);

    }).catch((e) => {
      console.error('Catched Error: %s (%s)', e);
      callback (e);
    });

  })();

}
