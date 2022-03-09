const should = require('should'),
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
            .then(res => {
                res.status.should.eql(200);
            }).catch(done);
        done();
    });

    it('Pétrolette server is running', function(done) {
        fetch('http://localhost:' + PORT + '/favicon/?url=https://yphil.bitbucket.io/feed.xml')
            .then(res => {
                res.status.should.eql(200);
            }).catch(done);
        done();
    });

    it('Pétrolette is returning a favicon URL hash', function(done) {
        fetch('http://localhost:' + PORT + '/favicon/?url=https://yphil.bitbucket.io/feed.xml')
            .then(res => res.text())
            .then(text => {
                text.should.eql('a210177714b9fd9e35bfd7241eb32214');
            }).catch(done);
        done();
    });

    it('Pétrolette is returning a feed URL', function(done) {
        fetch('http://localhost:' + PORT + '/discover/?url=https://yphil.bitbucket.io/')
            .then(res => res.json())
            .then(res => {
                res[0].should.eql('https://yphil.bitbucket.io/rss/feedone.xml');
            }).catch(done);
        done();
    });

    it('Pétrolette is returning several feed URLs', function(done) {
        fetch('http://localhost:' + PORT + '/discover/?url=https://yphil.bitbucket.io/')
            .then(res => res.json())
            .then(res => {
                res.length.should.eql(2);
            }).catch(done);
        done();
    });

    it('Pétrolette is returning an actual feed', function(done) {
        fetch('http://localhost:' + PORT + '/feed/?url=https://yphil.bitbucket.io/feed.xml')
            .then(res => res.text())
            .then(text => {
                text.substring(2, 11).should.eql('feedItems');
            }).catch(done);
        done();
    });

});
