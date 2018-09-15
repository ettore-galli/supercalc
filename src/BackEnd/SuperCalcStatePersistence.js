import SimpleKeyStore from './SimpleKeyStore';

class SuperCalcStatePersistence {
    static __STATUS_KEY = "status";

    constructor(store) {
        this.store = store;
    }
    
    get() {
        return this.store.get(SuperCalcStatePersistence.__STATUS_KEY);
    }

    set(value) {
        return this.store.set(SuperCalcStatePersistence.__STATUS_KEY, value);
    }

    del() {
        return this.store.del(SuperCalcStatePersistence.__STATUS_KEY);
    }

}

const store = new SimpleKeyStore("supercalc-db", "supercalc-store");
const superCalcStatePersistence = new SuperCalcStatePersistence(store);
export default superCalcStatePersistence;
