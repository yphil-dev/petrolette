// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.db = {
  getFeed: function(db, url) {
    return new Promise((resolve, reject) => {

      const txn = db.transaction(PTL.DbStore, 'readonly');
      const store = txn.objectStore(PTL.DbStore);

      let query = store.get(url);

      query.onsuccess = (event) => {
        if (!event.target.result) {
          console.log(`Feed ${url} not found`);
          resolve(null);
        } else {
          // console.table(event.target.result);
          resolve(event.target.result);
        }
      };

      query.onerror = (event) => {
        console.log('Catched in db.read: [%s]', event.target.errorCode);
        reject(event.target.errorCode);
      };

      txn.oncomplete = function () {
        db.close();
      };
    });
  },
  delete: function(db, url) {
    const txn = db.transaction(PTL.DbStore, 'readwrite');
    const store = txn.objectStore(PTL.DbStore);
    let query = store.delete(url);

    query.onsuccess = function (event) {
      console.log(event);
    };

    query.onerror = function (event) {
      console.log(event.target.errorCode);
    };

    txn.oncomplete = function () {
      db.close();
    };
  },
  insert: function(db, url, content) {

    return new Promise((resolve, reject) => {

      const txn = db.transaction(PTL.DbStore, 'readwrite');
      const store = txn.objectStore(PTL.DbStore);
      const feed = {url: url, content: content};
      let query = store.put(feed);

      query.onsuccess = function (event) {
        resolve();
        console.log(event);
      };

      query.onerror = function (event) {
        reject();
        console.log(event.target.errorCode);
      };

      txn.oncomplete = function () {
        db.close();
      };

    });

  }

};
