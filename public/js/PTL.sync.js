// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.sync = (function() {

  PTL.synchronized = false;

  const syncDirectory = 'petrolette';

  const Feeds = {
    name: syncDirectory, builder: function(privateClient, publicClient) {

      return {
        exports: {
          read: function () {
            return privateClient.getFile('petrolette.conf', (Date.now() - PTL.prefs.readConfig('writeTime')))
              .then(function (file) {
                return file.data;
              });
          },
          write: function (feeds) {
            return privateClient.storeFile('text/plain', 'petrolette.conf', feeds);
          }
        }
      };
    }
  };

  const remoteStorage = new RemoteStorage({
    modules: [ Feeds ]
  });

  remoteStorage.setApiKeys({
    dropbox: '8szbmg1lt21r5mx',
    googledrive: '780509727159-374mgusci0u7npve4c8rlviaag3egab4.apps.googleusercontent.com'
  });

  remoteStorage.on('connected', function() {
    PTL.synchronized = true;
    PTL.util.say(PTL.tr('Connected to remote storage'), 'success');
  });

  remoteStorage.on('not-connected', function() {
    PTL.synchronized = false;
    PTL.util.say(PTL.tr('Not connected to remote storage'), 'warning');
  });

  remoteStorage.on('disconnected', function() {
    PTL.synchronized = false;
    PTL.util.say(PTL.tr('Disconnection from remote storage'), 'warning');

  });

  return {
    attachWidget:function() {
      const widget = new Widget(remoteStorage, {
        leaveOpen: true
        // logging: true
      });

      remoteStorage.access.claim('petrolette', 'rw');

      return widget.attach('syncBox');
    },
    readSync:function() {

      if (PTL.instanceType == 'monoUser') {

        // console.error('Sync: %s (%s)', PTL.instanceType);

        $.get('/localfeeds', {
          dataType: 'json',
          timeout: 2000
        }).fail(function(_req, _status, _xhr) {
          // console.error('Ah, shoot: %s (%s)');
          PTL.tab.populate(JSON.parse(PTL.prefs.readConfig('feeds')));          
        }).done(function(feeds) {
          console.log('feeds read, apparently');
          // console.error('Ah, yes: %s (%s)', feeds);
          PTL.tab.populate(JSON.parse(feeds));
        });
 
      } else {

        remoteStorage.petrolette.read()
          .then((data) => {

            if (PTL.util.isValidPTLFile(JSON.parse(data))) {

              PTL.tab.populate(JSON.parse(data));

            } else {

              console.warn('Pétrolette | ' + PTL.tr('Remote file validation NOT OK (error [%1]) now reading defaults', data));
              PTL.tab.populate(JSON.parse(PTL.prefs.readConfig('feeds')));

            }

          })
          .catch((err) => {

            PTL.util.say(PTL.tr('Remote file validation NOT OK (error [%1]) now reading from browser storage', err), 'warning');

            PTL.tab.populate(JSON.parse(PTL.prefs.readConfig('feeds')));

          });

      }
      
    },
    writeSync:function(feeds) {

      // console.error('Trying to SEnd (%s)', feeds.substring(1, 20));        
      
      $.post('/localfeeds', {
        feeds: feeds,
        timeout: 2000
      }).fail(function(_req, _status, _xhr) {
        console.error('Ah, shoot (w): %s (%s)');
      }).done(function(jqXHR, textStatus, errorThrown) {
        // PTL.tab.populate(feeds);
        console.log('feeds written, apparently %s', textStatus);
      });

      remoteStorage.petrolette.write(feeds)
        .catch((err) => {
          PTL.util.say(PTL.tr('There was a problem writing to remote storage: %1', err), 'warning');
        });

    }
  };
}());
