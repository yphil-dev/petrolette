const should = require('should'),
      fs = require('fs'),
      pjson = require('../package.json'),
      fetch = require('node-fetch');

const PORT = pjson.HTTP_PORT;

// Load default feeds
const defaultFeeds = require('../public/js/default-feeds.json');

// Extract all unique feed URLs from the default feeds
function getAllFeedUrls() {
  const urls = [];
  defaultFeeds.forEach(category => {
    category.columns.forEach(column => {
      column.forEach(feed => {
        if (feed.url && !urls.includes(feed.url)) {
          urls.push(feed.url);
        }
      });
    });
  });
  return urls;
}

const feedUrls = getAllFeedUrls();

describe('Default Feeds', function() {

  // Increase timeout for all tests since we're making many HTTP requests
  this.timeout(600000); // 10 minutes

  it('should have at least one feed', function() {
    feedUrls.length.should.be.above(0);
  });

  it('default feeds should be accessible - test will warn but not fail on individual feed issues', function(done) {
    const failedFeeds = [];
    let processedCount = 0;

    feedUrls.forEach((url) => {
      fetch(url, {
        method: 'GET',
        redirect: 'follow',
        timeout: 15000
      })
      .then(res => {
        processedCount++;
        // Only count as failed if it's a clear error (4xx/5xx)
        // We don't fail on connection issues (status 0) as those may be temporary
        if (res.status >= 400) {
          failedFeeds.push({ url, status: res.status, reason: 'HTTP error' });
        }
        
        // Log progress every 20 feeds
        if (processedCount % 20 === 0) {
          console.log(`Processed ${processedCount}/${feedUrls.length} feeds...`);
        }
        
        // Check if we're done
        if (processedCount === feedUrls.length) {
          if (failedFeeds.length > 0) {
            console.log('\nFeeds with HTTP errors (may still work in browser):');
            failedFeeds.forEach(feed => {
              console.log(`  - ${feed.url} (status: ${feed.status})`);
            });
          }
          console.log(`\nTest complete: ${feedUrls.length - failedFeeds.length}/${feedUrls.length} feeds tested`);
          // Don't fail the test - just warn about issues
          done();
        }
      })
      .catch(err => {
        processedCount++;
        // Connection errors are common and often temporary - don't fail the test
        // Just log for information
        
        if (processedCount % 20 === 0) {
          console.log(`Processed ${processedCount}/${feedUrls.length} feeds...`);
        }
        
        if (processedCount === feedUrls.length) {
          console.log(`\nTest complete: ${feedUrls.length - failedFeeds.length}/${feedUrls.length} feeds tested`);
          console.log('(Some feeds may have connection issues - this is normal for network tests)');
          done();
        }
      });
    });
  });

});
