MOB.sync = (function() {

  var synchronized = false;

  var syncDirectory = 'petrolette';

  var Sources = {
    name: syncDirectory, builder: function(privateClient, publicClient) {

      return {
        exports: {

          read: function () {
            return privateClient.getFile('petrolette.conf', 50000)
              .then(function (file) {
                // var blob = new Blob([file.data], { type: file.mimeType });
                // console.log('Data: (%s)', file.data);
                return file.data;
              });
          },
          write: function (sources) {
            return privateClient.storeFile('text/plain', 'petrolette.conf', sources)
              .then(() => {
                console.log("Upload done");
                return;
              });
          }

        }
      };
    }
  };

  const remoteStorage = new RemoteStorage({
    // logging: true,
    // cordovaRedirectUri: 'http://test.petrolette.space' // defaults to undefined
    modules: [ Sources ]
  });

  // remoteStorage.setApiKeys({
  //   dropbox: 'jyss37l88l4ural',
  //   googledrive: '228755392285-87kkpdod9op50nmnrvnvo6eofr5d3ehl.apps.googleusercontent.com'
  // });

  remoteStorage.on('connected', function() {
    synchronized = true;
    console.log('Storage account has been connected, let’s roll!');
    // $.notify(MOB.tr('Loading of [%s] OK', 'success'));
    // MOB.tab.populate(p, true);
    // MOB.tab.populate(MOB.sync.readSync(), true);
    MOB.sync.readSync();
  });

  remoteStorage.on('disconnected', function() {
    synchronized = false;
    console.log('Storage account has been disconnected!');
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

      if (synchronized) {
        console.log('synchronized');

        remoteStorage.petrolette.read()
          .then((data) => {
            // console.log('Read sources successfully:', data);

            if (MOB.prefs.isValidSourcesFile(JSON.parse(data))) {
              console.log('VALID sources');
              // return data;
              return MOB.tab.populate(JSON.parse(data), true, false);
              // return;

            } else {
              MOB.tab.populate(JSON.parse(MOB.prefs.readConfig('tabs')));
              // console.log('INVALID sources');
            }

          })
          .catch((err) => {
            console.error('Validation error:', err);
          });

      } else {
        console.log('NOT synchronized');
      }

    },
    writeSync:function(sources) {

      var $loader = $('#indicatorContainer');

      $loader.fadeToggle(50);

      remoteStorage.petrolette.write(sources)
        .then(() => {
          console.log('Stored sources successfully (%s)');
        })
        .catch((err) => {
          console.error('Validation error:', err);
        });

      // localStorage.setItem(key, val);
      $loader.fadeToggle('fast');

    }
  };
}());
