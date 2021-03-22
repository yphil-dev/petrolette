const should  = require('should'),
      fs = require('fs'),
      pjson = require('../package.json'),
      fetch = require('node-fetch');

describe('Pétrolette', function() {

  it('Favicon cache created', function(done) {
    fs.access(pjson.FAVICONS_CACHE_DIR, function(err) {
      if (err) return done(err);
      done();
    });
  });

  it('Favicon cache dir writeable', function(done) {
    fs.access(pjson.FAVICONS_CACHE_DIR, fs.constants.W_OK, function(err) {
      if (err) return done(err);
      done();
    });
  });

  // it('Pétrolette server is running', function(done) {
  //   request('http://localhost:8000', { json: true }, (err, res, body) => {
  //     if (err) return done(err);
  //     res.statusCode.should.eql(200);
  //     done();
  //   });
  // });

  it('Pétrolette server is running', function(done) {
    fetch('http://localhost:8000').then(function (res) {
      res.status.should.eql(200);
      done();
    }).catch(done);
  });

  // it('Pétrolette is returning a feed', function(done) {
  //   request('http://localhost:8000/discover/?url=http://lemonde.fr', { json: true }, (err, res, body) => {
  //     if (err) return done(err);
  //     body.should.eql('https://www.lemonde.fr/rss/une.xml');
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
