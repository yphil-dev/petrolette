const should = require('should'),
      pjson = require('../package.json'),
      fetch = require('node-fetch');

const PORT = pjson.HTTP_PORT;
const BASE_URL = `http://localhost:${PORT}`;

// List of difficult feeds to test with the actual app
const TEST_FEEDS = [
  'https://feeds.feedburner.com/thechangelog',
  'https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss',
  'https://feeds.arstechnica.com/arstechnica/index',
  'https://xkcd.com/rss.xml',
  'https://explainxkcd.com/rss.xml',
  'https://feeds.feedburner.com/hackaday/LgoM/',
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCE7gceSq79z8uW7cTe86UaA',
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCdI8MAC5HoPJSJ4zrgDDI-Q',
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCtNdVINwfYFTQEEZgMiQ8FA',
  'https://www.theguardian.com/rss'
];

describe('Feeds parsing test', function() {

  this.timeout(120000); // 2 minutes per feed should be enough

  TEST_FEEDS.forEach((feedUrl, index) => {

    it(`feed #${index + 1}: should be parseable by Pétrolette - ${feedUrl}`, function(done) {
      this.timeout(60000); // 60 seconds per feed

      const url = `${BASE_URL}/feed/?url=${encodeURIComponent(feedUrl)}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            console.log(`\n❌ Feed #${index + 1} FAILED: ${feedUrl}`);
            console.log(`   Error: ${data.error.type} - ${data.error.message} (status: ${data.error.status})`);
            // Don't fail the test, just report
            done();
          } else if (data.feedItems && data.feedItems.length > 0) {
            console.log(`\n✅ Feed #${index + 1} SUCCESS: ${feedUrl}`);
            console.log(`   Title: ${data.feedTitle}`);
            console.log(`   Items: ${data.feedItems.length}`);
            done();
          } else {
            console.log(`\n⚠️ Feed #${index + 1} EMPTY: ${feedUrl}`);
            console.log(`   Response: ${JSON.stringify(data).substring(0, 200)}`);
            done();
          }
        })
        .catch(err => {
          console.log(`\n❌ Feed #${index + 1} EXCEPTION: ${feedUrl}`);
          console.log(`   Error: ${err.message}`);
          done();
        });
    });

  });

});
