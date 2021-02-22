const should  = require('should'),
      fs = require('fs'),
      assert = require('assert'),
      pjson = require('../package.json'),
      main = require(__dirname + '/../public/js/PTL.main.js'),

      request = require('request');

describe('Pétrolette', function() {

  it('should return -1 when the value is not present', function(){

    PTL.tr('Feed')
    assert.equal(-1, [1,2,3].indexOf(4));
  });

  it('Favicon cache created', function(done) {
    fs.access(pjson.FAVICONS_CACHE_DIR, function(err) {
      if (err) return done(err);
      done();
    });
  });

  // it('Favicon cache dir writeable', function(done) {
  //   fs.access(pjson.FAVICONS_CACHE_DIR, fs.constants.W_OK, function(err) {
  //     if (err) return done(err);
  //     done();
  //   });
  // });

  // it('Pétrolette server is running', function(done) {
  //   request('http://localhost:8000', { json: true }, (err, res, body) => {
  //     if (err) return done(err);
  //     res.statusCode.should.eql(200);
  //     done();
  //   });
  // });

  // it('Pétrolette is returning a feed', function(done) {
  //   request('http://localhost:8000/discover/?url=http://lemonde.fr', { json: true }, (err, res, body) => {
  //     if (err) return done(err);
  //     body.should.eql('https://www.lemonde.fr/rss/une.xml');
  //     done();
  //   });
  // });

  // it('Pétrolette is returning a feed', function(done) {
  //   PTL.tr('Feed', function(err, url) {
  //     if (err) return done(err);
  //     url.should.eql('https://ssl.gstatic.com/gnews/logo/google_news_40.png');
  //     done();
  //   });
  // });

  // it('Pétrolette is returning a favicon', function(done) {
  //   request('http://localhost:8000/favicon/?url=http://lemonde.fr', { json: true }, (err, res, body) => {
  //     if (err) return done(err);
  //     body.should.eql('https://www.lemonde.fr/favicon.ico');
  //     done();
  //   });
  // });

});
