let Parser = require('rss-parser');
let parser = new Parser();

exports.getFeed = getFeed;

function getFeed (feedUrl, lastItem, maxItems, callback) {

  (async () => {

    var feedItems = [];

    let feed = await parser.parseURL(feedUrl);
    var newLastItem;

    console.log(feed.title);

    feed.items.every(function(item, index) {
      console.log(item.title);

      feedItems.push(item);

      if (typeof newLastItem === 'undefined') {
        newLastItem = item.link;
      }

      if (item.link === lastItem) return false;
      else return true;

    });

    callback (null, feedItems, feed.title || 'Untitled', feed.link || feedUrl, newLastItem);

  })();

}
