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
            .then(function(res) {
                res.status.should.eql(200);
                done();
            }).catch(done);
    });

    // it('Pétrolette is returning a feed', function(done) {
    //     fetch('http://localhost:' + PORT + '/discover/?url=https://yphil.bitbucket.io/')
    //         .then(res => res.json())
    //         .then(res => {
    //             res[0].should.eql('https://yphil.bitbucket.io/rss/feedone.xml');
    //         }).catch(done);
    //     done();
    // });

    // it('Pétrolette is returning several feeds', function(done) {
    //     fetch('http://localhost:' + PORT + '/discover/?url=https://yphil.bitbucket.io/')
    //         .then(res => res.json())
    //         .then(res => {
    //             res.length.should.eql(2);
    //         }).catch(done);
    //     done();
    // });

});
