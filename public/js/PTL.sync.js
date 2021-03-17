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

  var Feeds = {
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
    // logging: true,
    // cordovaRedirectUri: 'http://petrolette.space',
    modules: [ Feeds ]
  });

  remoteStorage.setApiKeys({
    dropbox: 'jyss37l88l4ural',
    googledrive: '228755392285-dqv31f6ul5ja16va84t9iuvjtcnkvh2a.apps.googleusercontent.com'
  });

  remoteStorage.on('connected', function() {
    PTL.synchronized = true;
    PTL.util.say(PTL.tr('Connected to remote storage'), 'ok');
  });

  remoteStorage.on('not-connected', function() {
    PTL.synchronized = false;
    PTL.util.say(PTL.tr('NOT connected to remote storage'), 'warning');
  });

  remoteStorage.on('disconnected', function() {
    PTL.synchronized = false;
    PTL.util.say(PTL.tr('Disconnected from remote storage'), 'warning');

  });

  return {
    attachWidget:function() {
      const widget = new Widget(remoteStorage, {
        leaveOpen: true
        // logging: true
      });

      remoteStorage.access.claim('petrolette', 'rw');

      return widget.attach('sync-box');
    },
    readSync:function() {

      remoteStorage.petrolette.read()
        .then((data) => {

          if (PTL.util.isValidFeedsFile(JSON.parse(data))) {

            PTL.tab.populate(JSON.parse(data));

          } else {

            console.warn('Pétrolette | ' + PTL.tr('Remote file validation NOT OK (error [%1]) now reading defaults', data));
            PTL.tab.populate(JSON.parse(PTL.prefs.readConfig('feeds')));

          }

        })
        .catch((err) => {

          PTL.util.say(PTL.tr('Remote file validation NOT OK (error [%1]) now reading from browser cache', err), 'warning');

          PTL.tab.populate(JSON.parse(PTL.prefs.readConfig('feeds')));

        });

    },
    writeSync:function(feeds) {

      remoteStorage.petrolette.write(feeds)
        .catch((err) => {
          PTL.util.say(PTL.tr('There was a problem writing to remote storage: %1', err), 'warning');
        });

    }
  };
}());
