PTL.sync = (function() {

  var synchronized = false;

  var syncDirectory = 'petrolette';

  var Sources = {
    name: syncDirectory, builder: function(privateClient, publicClient) {

      return {
        exports: {
          read: function () {
            return privateClient.getFile('petrolette.conf', 9999999999)
              .then(function (file) {
                return file.data;
              });
          },
          write: function (sources) {
            return privateClient.storeFile('text/plain', 'petrolette.conf', sources);
          }
        }
      };
    }
  };

  const remoteStorage = new RemoteStorage({
    // logging: true,
    // cordovaRedirectUri: 'http://petrolette.space',
    modules: [ Sources ]
  });

  // remoteStorage.setApiKeys({
  //   dropbox: 'jyss37l88l4ural',
  //   googledrive: '228755392285-87kkpdod9op50nmnrvnvo6eofr5d3ehl.apps.googleusercontent.com'
  // });

  remoteStorage.on('connected', function() {
    synchronized = true;
    console.info('Pétrolette | Connected to remote storage');
  });

  remoteStorage.on('disconnected', function() {
    synchronized = false;
    console.info('Pétrolette | Disconnected from remote storage');
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

      remoteStorage.petrolette.read()
        .then((data) => {

          if (PTL.prefs.isValidSourcesFile(JSON.parse(data))) {

            console.info('Pétrolette | Remote file validation OK');

            return PTL.tab.populate(JSON.parse(data));

          } else {

            console.error('Pétrolette | Remote file validation NOT OK(%s) Tryin browser cache', data);

            if (PTL.prefs.isValidSourcesFile(JSON.parse(PTL.prefs.readConfig('tabs')))) {
              console.log('plop');
              PTL.tab.populate(JSON.parse(PTL.prefs.readConfig('tabs')));
            } else {
              localStorage.setItem("tabs", "");
            }

          }

        })
        .catch((err) => {

          if (PTL.prefs.isValidSourcesFile(JSON.parse(PTL.prefs.readConfig('tabs')))) {
            PTL.tab.populate(JSON.parse(PTL.prefs.readConfig('tabs')));
          } else {
            localStorage.setItem("tabs", "");
          }

        });

    },
    writeSync:function(sources) {

      remoteStorage.petrolette.write(sources)
        .then(() => {
          console.info('Pétrolette | Writing to remote storage OK');
        })
        .catch((err) => {
          console.error('Pétrolette | Remote file validation error:', err);
        });

    }
  };
}());
