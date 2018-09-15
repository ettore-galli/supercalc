/**
 * Simplified key/value store 
 */

class MockStore {
    constructor() { 
        console.log("*** MockStore ***")
        this.__store = [] }
    transaction() { return this }
    objectStore() { return this }
    get(key) { return this.__store[key] }
    set(key, val) { this.__store[key] = val; }
    put(val, key) { this.set(key, val) }
    delete(key) { delete this.__store[key] }
    clear() { this.__store = {} }
    keys() { return Object.keys(this.__store) }
}

class SimpleKeyStore {


    constructor(dbName = 'keyval-store', storeName = 'keyval') {
        this.storeName = storeName;
        if (window.indexedDB) {
            this._dbp = new Promise((resolve, reject) => {
                const openreq = indexedDB.open(dbName, 1);
                openreq.onerror = () => reject(openreq.error);
                openreq.onsuccess = () => resolve(openreq.result);
                // First time setup: create an empty object store
                openreq.onupgradeneeded = () => {
                    openreq.result.createObjectStore(storeName);
                };
            });
        } else {
            this._dbp = new Promise((resolve, reject) => {
                resolve(new MockStore())
            });
        }
    }

    _withIDBStore(type, callback) {
        return this._dbp.then(db => new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, type);
            transaction.oncomplete = () => resolve();
            transaction.onabort = transaction.onerror = () => reject(transaction.error);
            callback(transaction.objectStore(this.storeName));
        }));
    }


    get(key) {
        let req;
        return this._withIDBStore('readonly', store => {
            req = store.get(key);
        }).then(() => req.result);
    }

    set(key, value) {
        return this._withIDBStore('readwrite', store => {
            store.put(value, key);
        });
    }
    del(key) {
        return this._withIDBStore('readwrite', store => {
            store.delete(key);
        });
    }
    clear() {
        return this._withIDBStore('readwrite', store => {
            store.clear();
        });
    }

}

export default SimpleKeyStore