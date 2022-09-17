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
	      console.error('Local!');
        
        $.get('localfeeds', 'text')
          .then(function(data, err) {

            try {


              data = data.replace(/\\"/g, '"');
              console.error('err, data: %s %s, (%s)', err, typeof data);
              
              // PTL.tab.populate(JSON.parse(data));
              
            } catch (err) {
              console.error('err: (%s)', err);
            } finally {
              
            }

            
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('feeds NOT read, using defs (%s)', JSON.stringify(jqXHR), JSON.stringify(textStatus), JSON.stringify(errorThrown));
            PTL.tab.populate(JSON.parse(PTL.prefs.readConfig('feeds')));

            // console.error('err: %s %s %s', JSON.stringify(jqXHR), textStatus, errorThrown);
          })
          .done(function() {
            console.log( "second success");
          });

        // $.get({
        //   url: 'localfeeds',
        //   dataType: 'json',
        //   success: function(data){

        //     console.log('just data: ', data);
            
        //     // console.log('JSON.parse(data): ', JSON.parse(data));


        //     try {
              
        //       JSON.parse(JSON.stringify(data)).forEach(function(element) {
        //         if (element.columns) console.log('YUP: ');
        //       });
              
        //     } catch (err) {
        //       console.log('err: ', err);
        //     }
            
            
        //     if (PTL.util.isValidPTLFile(data)) {

        //       console.log('yep: ');
              
        //       PTL.tab.populate(data);

        //     } else {

        //       console.warn('Pétrolette | ' + PTL.tr('Local file validation NOT OK (error [%1]) now reading defaults'));
        //       PTL.tab.populate(JSON.parse(PTL.prefs.readConfig('feeds')));

        //     }
        //   },
        //   error: function(xhr, desc, err) {
        //     console.log('feeds NOT read, using defs (%s)', JSON.stringify(err));
        //     PTL.tab.populate(JSON.parse(PTL.prefs.readConfig('feeds')));
        //   }
        // });

        
        // $.get('localfeeds', function(data, status){

        //   console.error('JSON.parse(data.feeds): (%s)', JSON.stringify(data));
          
        //   if (PTL.util.isValidPTLFile(JSON.parse(data))) {

        //     PTL.tab.populate(JSON.parse(data));

        //   } else {

        //     console.warn('Pétrolette | ' + PTL.tr('Local file validation NOT OK (error [%1]) now reading defaults'));
        //     PTL.tab.populate(JSON.parse(PTL.prefs.readConfig('feeds')));

        //   }

        // });
        
      } else {
        
        remoteStorage.petrolette.read()
          .then((data) => {

            if (PTL.util.isValidPTLFile(JSON.parse(data))) {

              console.error('YO, synced: (%s)');
              
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

      remoteStorage.petrolette.write(feeds)
        .catch((err) => {
          PTL.util.say(PTL.tr('There was a problem writing to remote storage: %1', err), 'warning');
        });
      
    },
    attachMonoUserButton:function() {

      const $monoUserButton = $('<button>')
            .attr({'id': 'monoUserButton',
                   'class': 'grow ui-button ui-corner-all translate unique',
                   'data-content' : 'Save feeds'})
            .text('Save feeds')
            .click(function(){
              
              PTL.sync.writeLocal(PTL.tab.list());
            
              
              // PTL.util.say(PTL.tr('Tabs and feeds saved'), 'success', true);
            });

      return $monoUserButton;
    },
    writeLocal:function(feeds) {

      console.error('in Local: %s (%s)', JSON.stringify(feeds));
      
      // $.post({
      //   url: 'localfeeds',
      //   dataType: 'text',
      //   data: JSON.stringify(feeds),
      //   success: function(data){
      //     console.log('feeds written, apparently %s', data);
      //   },
      //   error: function(xhr, desc, err) {
      //     console.log('feeds NOT written, apparently (%s)', JSON.stringify(err));
      //   }
      // });

      $.post({
        url : "localfeeds",
        data: JSON.stringify(feeds),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success    : function(){
          console.log("Pure jQuery Pure JS object");
        }
      });
      
      // $.post('localfeeds', JSON.stringify(feeds), 'application/json; charset=utf-8')
      //   .then(function(err) {
      //     console.log('then: ', err);
      //   })
      //   .fail(function(jqXHR, textStatus, errorThrown) {
      //     console.log('err: %s %s %s', JSON.stringify(jqXHR), textStatus, errorThrown);
      //   })
      //   .done(function() {
      //     console.log( "second success");
      //   });
      
    }
  };
}());
