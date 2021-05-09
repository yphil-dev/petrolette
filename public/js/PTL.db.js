// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.db = {
    delete: function(url) {
        return new Promise((resolve, reject) => {

            let dbOpen = indexedDB.open(PTL.DbName, PTL.DbVersion);

            dbOpen.onsuccess = event => {

                var db = event.target.result;

                const txn = db.transaction(PTL.DbStore, 'readwrite');
                const store = txn.objectStore(PTL.DbStore);
                let query = store.delete(url);

                query.onsuccess = function (event) {
                    console.log(event);
                    console.log('DEL OK: %s (%s)', event);
                };

                query.onerror = function (event) {
                    console.log('DEL NOK: %s (%s)', event.target.errorCode);
                };

                txn.oncomplete = function () {
                    db.close();
                };
            };
        });
    },
    getFeed: function(url) {

        return new Promise((resolve, reject) => {

            let dbOpen = indexedDB.open(PTL.DbName, PTL.DbVersion);

            dbOpen.onsuccess = event => {

                var db = event.target.result;

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
            };

        });
        },
        putFeed: function(url, content) {

            return new Promise((resolve, reject) => {

                let dbOpen = indexedDB.open(PTL.DbName, PTL.DbVersion);
                dbOpen.onsuccess = event => {

                    var db = event.target.result;

                    const txn = db.transaction(PTL.DbStore, 'readwrite');
                    const store = txn.objectStore(PTL.DbStore);
                    const feed = {url: url, content: content};
                    let query = store.put(feed);

                    query.onsuccess = event => {
                        resolve();
                        // console.log(event);
                    };

                    query.onerror = event => {
                        reject();
                        // console.log(event.target.errorCode);
                    };

                    txn.oncomplete = () => {
                        db.close();
                    };
                };
            });
        }
};
