/*!
 * @base: public/js/PTL.sync.js
 *
 * @Source: PTL.sync.js
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2018  Philippe Y Coatmeur
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

PTL.sync = (function() {

  PTL.synchronized = false;

  var syncDirectory = 'petrolette';

  var Sources = {
    name: syncDirectory, builder: function(privateClient, publicClient) {

      return {
        exports: {
          read: function () {
            return privateClient.getFile('petrolette.conf', (Date.now() - PTL.prefs.readConfig('writeTime')))
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
    PTL.synchronized = true;
    console.info('Pétrolette | ' + PTL.tr('Connected to remote storage'));
  });

  remoteStorage.on('not-connected', function() {
    PTL.synchronized = false;
    console.info('Pétrolette | ' + PTL.tr('NOT connected to remote storage'));
  });

  remoteStorage.on('disconnected', function() {
    PTL.synchronized = false;
    console.warn('Pétrolette | ' + PTL.tr('Disconnected from remote storage'));
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

          if (PTL.utilities.isValidSourcesFile(JSON.parse(data))) {

            console.info('Pétrolette | ' + PTL.tr('Remote file validation OK'));

            return PTL.tab.populate(JSON.parse(data));

          } else {

            console.warn('Pétrolette | ' + PTL.tr('Remote file validation NOT OK (error [%1]) now reading from browser cache', data));
            PTL.tab.populate(JSON.parse(PTL.prefs.readConfig('tabs')));

          }

        })
        .catch((err) => {

          // console.log('sources in sync: ', JSON.parse(PTL.prefs.readConfig('sources')));


          console.warn('Pétrolette | ' + PTL.tr('Remote file validation NOT OK (error [%1]) now reading from browser cache', err));
          PTL.tab.newPopulate(JSON.parse(PTL.prefs.readConfig('sources')));
          PTL.tab.populate(JSON.parse(PTL.prefs.readConfig('tabs')));

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
