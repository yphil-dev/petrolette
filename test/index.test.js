const should  = require('should'),
      fs = require('fs'),
      pjson = require('../package.json'),
      fetch = require('node-fetch');

const PORT = pjson.HTTP_PORT;

describe('Pétrolette', function() {

  it('Favicon cache dir exists', function(done) {
    fs.access(pjson.FAVICONS_CACHE_DIR, function(err) {
      if (err) return done(err);
      done();
    });
  });

  it('Favicon cache dir is writeable', function(done) {
    fs.access(pjson.FAVICONS_CACHE_DIR, fs.constants.W_OK, function(err) {
      if (err) return done(err);
      done();
    });
  });

  it('Pétrolette server is running', function(done) {
    fetch('http://localhost:' + PORT)
      .then(function (res) {
        res.status.should.eql(200);
      done();
    }).catch(done);
  });

  it('Pétrolette is returning a feed', function(done) {
    fetch('http://localhost:' + PORT + '/discover/?url=http://lemonde.fr')
      .then(async res => {
        await res.text().should.eventually.eql('https://www.lemonde.fr/rss/une.xml');
      }).catch(done);
    done();
  });

});
