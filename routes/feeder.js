const fetch = require('node-fetch'),
      zlib = require('zlib'),
      iconv = require('iconv-lite'),
      FeedParser = require('feedparser');

exports.getFeed = getFeed;

function maybeTranslate (res, charset) {
  var iconvStream;
  // Decode using iconv-lite if its not utf8 already.
  if (!iconvStream && charset && !/utf-*8/i.test(charset)) {
    try {
      iconvStream = iconv.decodeStream(charset);
      console.error('ICONV: Converting from charset %s to utf-8', charset);
      iconvStream.on('error', () => {return;});
      res = res.pipe(iconvStream);
    } catch(err) {
      res.emit('error', err);
    }
  }
  return res;
}

function getParams(str) {
  var params = str.split(';').reduce(function (params, param) {
    var parts = param.split('=').map(function (part) { return part.trim(); });
    if (parts.length === 2) {
      params[parts[0]] = parts[1];
    }
    return params;
  }, {});
  return params;
}

function handleErrors(response) {
  console.error('## FetchErr: %s (%s)');
    if (!response.ok) throw new Error(response.status);
    return response;
}

function getFeed (feedUrl, lastItem, callback) {

  const options = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml',
    'redirect': 'follow'
  }

  var req = fetch(feedUrl);
  var feedparser = new FeedParser(options);
  var feedItems = [];

  req.then(function(res) {
    if (res.status !== 200) {
      console.error('## fetchErr: %s (%s)', feedUrl);
      // throw new Error('Bad status code');
      callback(res.status);
    }
    else {
      // The response `body` -- res.body -- is a stream
      res.body.pipe(feedparser);
    }
  }, function(error) {
    console.error('## fetchErrOtherErr: %s (%s)', error, feedUrl);
    callback(error);
  }).catch(e => {return false;});

  feedparser.on('error', function (error) {
    console.error('## XfeedparserErr: %s (%s)', error, feedUrl);
    // always handle errors
    callback(error);
  });

  feedparser.on('readable', function() {
    try {
      let item;
      while ((item = this.read())) {
        if (item !== null) {
	  feedItems.push(item);	
        }
      }
    }
    catch (err) {
      console.error('## feedParserCatchErr: %s (%s)', err, feedUrl);
    }
  }).on ('end', function () {

	  var newLastItem;
	  var totalNewItems;
	  var i = 0;

	  feedItems.forEach(countItems);

	  function countItems(item) {
	    i++;
	    // console.error('item: %s', item.link);
	    if (newLastItem == undefined) newLastItem = item.link;
	    if (item.link == lastItem) {
	      totalNewItems = i - 1;
	      console.error('Wopop: %s [%s] (%s)', item.link, totalNewItems, i);
	    }
	  }

	  if (totalNewItems == undefined) totalNewItems = i;
	  
	  var meta = this.meta;
          // console.error('### Return i:%s, lastItem: [%s], totalNewItems: %d thereArenewItems: [%s]', i, lastItem, totalNewItems);
          return callback(null, feedItems, meta.title || 'Untitled', meta.link || feedUrl, newLastItem, totalNewItems);
        });
  
  // fetch(feedUrl, {
  //     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
  //     'accept': 'text/html,application/xhtml+xml',
  //     redirect: 'follow'
  //   }).then(function (res) {

  //     if (!res) console.error('## No res: %s (%s)');
      
  //     console.error('## res: %s (%s)', JSON.stringify(res), feedUrl);
      
  // 	if (res.status !== 200) {
  // 	  new Error('Bad status code');
  //         callback({error:'error', errno:res.status, message:'error.message'});
  // 	}
	
  //     var feedparser = new FeedParser();
  //     var feedItems = [];
  //     var charset = getParams(res.headers.get('content-type') || '').charset;
  //     var responseStream = res.body;
  //     responseStream = maybeTranslate(responseStream, charset);
  //     responseStream.pipe(feedparser);
      
  //     return new Promise((resolve, reject) => {
  //       feedparser.on('error', function(error) {
  //         console.error('## feedParserErr: %s (%s)', error.message, feedUrl);
  //         reject('woopsie');
  //         return callback({error:error, errno:res.status, message:error.message});
  //       }).on('readable', function() {
  //         try {
  //           let item;
  //           while ((item = this.read())) {
  //             if (item !== null) {
  // 		feedItems.push(item);	
  //             }
  //           }
  //         }
  //         catch (err) {
  //           console.error('## feedParserCatchErr: %s (%s)', err, feedUrl);
  //         }
  //       }).on ('end', function () {

  // 	  var newLastItem;
  // 	  var totalNewItems;
  // 	  var i = 0;

  // 	  feedItems.forEach(countItems);

  // 	  function countItems(item) {
  // 	    i++;
  // 	    // console.error('item: %s', item.link);
  // 	    if (newLastItem == undefined) newLastItem = item.link;
  // 	    if (item.link == lastItem) {
  // 	      totalNewItems = i - 1;
  // 	      console.error('Wopop: %s [%s] (%s)', item.link, totalNewItems, i);
  // 	    }
  // 	  }

  // 	  if (totalNewItems == undefined) totalNewItems = i;
	  
  // 	  var meta = this.meta;
  //         resolve();
  //         // console.error('### Return i:%s, lastItem: [%s], totalNewItems: %d thereArenewItems: [%s]', i, lastItem, totalNewItems);
  //         return callback(null, feedItems, meta.title || 'Untitled', meta.link || feedUrl, newLastItem, totalNewItems);
  //       });
  //     });

  //   }).catch((error) => {
  //     console.error('Whooaps: %s (%s)', error.message, error.errno);
  //     return callback(error);
  //   });

}
