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
        
        $.get('localfeeds', 'text')
          .then(function(data, err) {

            try {
              PTL.tab.populate(JSON.parse(data));
            } catch (err) {
              console.error('err: (%s)', err);
            } 
            
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('feeds NOT read, using defs (%s)', JSON.stringify(jqXHR), JSON.stringify(textStatus), JSON.stringify(errorThrown));
            PTL.tab.populate(JSON.parse(PTL.prefs.readConfig('feeds')));
          });
        
      } else {
        
        remoteStorage.petrolette.read()
          .then((data) => {

            if (PTL.util.isValidPTLFile(JSON.parse(data))) {
              
              PTL.tab.populate(JSON.parse(data));

            } else {

              console.warn('Pétrolette | ' + PTL.tr('Remote file validation NOT OK (error [%1]) now reading defaults'));
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

      if (PTL.instanceType == 'monoUser') {
        PTL.sync.writeLocal(PTL.tab.list());        
      } else {
        remoteStorage.petrolette.write(feeds)
          .catch((err) => {
            PTL.util.say(PTL.tr('There was a problem writing to remote storage: %1', err), 'warning');
          });
      }
    },
    attachMonoUserButton:function() {

      const $monoUserButton = $('<button>')
            .attr({'id': 'monoUserButton',
                   'class': 'grow ui-button ui-corner-all translate unique',
                   'data-content' : 'Save feeds'})
            .text('Save feeds')
            .click(function(){
              PTL.sync.writeLocal(PTL.tab.list());
            });

      return $monoUserButton;
    },
    writeLocal:function(feeds) {

      $.post({
        url        : 'localfeeds',
        data       : JSON.stringify(feeds),
        contentType: 'application/json; charset=utf-8',
        dataType   : 'json',
        success    : function(res) {
          if(res.status === "success") {
            console.log('Pure jQuery Pure JS object');
          } else if(res.status === "error") {
            console.error('jqXHR, textStatus, errorThrown: (%s)');
          }
        }
      });
    }
  };
}());
