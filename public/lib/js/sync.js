MOB.sync = (function() {

  var synchronized = false;

  var syncDirectory = 'petrolette';

  var Sources = {
    name: syncDirectory, builder: function(privateClient, publicClient) {

      return {
        exports: {
          read: function () {
            return privateClient.getFile('petrolette.conf', 999999)
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
    cordovaRedirectUri: 'http://petrolette.space',
    modules: [ Sources ]
  });

  // remoteStorage.setApiKeys({
  //   dropbox: 'jyss37l88l4ural',
  //   googledrive: '228755392285-87kkpdod9op50nmnrvnvo6eofr5d3ehl.apps.googleusercontent.com'
  // });

  remoteStorage.on('connected', function() {
    synchronized = true;
    console.info('Petrolette | Connected to remote storage');
  });

  remoteStorage.on('disconnected', function() {
    synchronized = false;
    console.info('Petrolette | Disconnected from remote storage');
  });

  return {
    rs:function() {
      const widget = new Widget(remoteStorage, {
        // logging: true
      });

      remoteStorage.access.claim('petrolette', 'rw');

      return widget.attach();
    },
    readSync:function() {

      remoteStorage.petrolette.read()
        .then((data) => {

          if (MOB.prefs.isValidSourcesFile(JSON.parse(data))) {

            console.info('Petrolette | Validation OK');

            return MOB.tab.populate(JSON.parse(data));

          } else {

            console.error('Petrolette | Validation NOT OK: Default sources');

            MOB.tab.populate(JSON.parse(MOB.prefs.readConfig('tabs')));
          }

        })
        .catch((err) => {
          console.error('Petrolette | Validation error:', err);
        });

    },
    writeSync:function(sources) {

      var $loader = $('#indicatorContainer');

      $loader.fadeToggle(50);

      remoteStorage.petrolette.write(sources)
        .then(() => {
          console.info('Petrolette | Writing to remote storage OK');
        })
        .catch((err) => {
          console.error('Petrolette | Validation error:', err);
        });

      // localStorage.setItem(key, val);
      $loader.fadeToggle('fast');

    }
  };
}());
