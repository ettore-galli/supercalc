import StateManagerBase from './StateManagerBase';
import superCalcStatePersistence from './SuperCalcStatePersistence';

class SuperCalcStateManager__old extends StateManagerBase {

    // Instance management
    static appStatusInstance = null;

    // Constants
    static __STATUS_KEY = "status"
    static __BLANK_STATUS = {
        list: {
            title: "",
            items: []
        }
    };
    // Constructor
    constructor(store) {
        super()
        this.store = store;
        this.applicationState = { ...SuperCalcStateManager.__BLANK_STATUS };
        this.__loadApplicationState().then(
            () => {
                this.__doForceUpdate();
            }
        )
    }

    __initApplicationState() {
        if (this.applicationState === undefined) {
            this.applicationState = { ...SuperCalcStateManager.__BLANK_STATUS };
        }
    }

    __loadApplicationState() {
        return this.store.get().then(
            (appState) => {
                this.applicationState = appState;
                this.__initApplicationState();
                return this.applicationState;
            }
        )
    }

    __storeApplicationState(state) {
        return this.store.set(state)
    }

    __storeApplicationStateAndUpdate(state) {
        return this.__storeApplicationState(state).then(
            () => {
                this.__loadApplicationState();
            }
        ).then(
            () => {
                this.__doForceUpdate();
            }
        )
    }

    __setStateWorkflow(stateUpdatecallback) {
        return this.__loadApplicationState().then(
            stateUpdatecallback // stateUpdatecallback(appState)
        ).then(
            (appState) => {
                this.__storeApplicationStateAndUpdate(
                    appState
                )
            }
        )
    }

    setTitle(title) {
        return this.__setStateWorkflow(
            (appState) => {
                appState.list.title = title;
                return appState
            }
        )
    }

    getTitle() {
        return this.applicationState.list.title;
    }

    setRowFieldValueCallback(appState, rowId, fieldName, fieldValue) {
        try {
            if (appState.list.items[rowId] === undefined) {
                appState.list.items.push({});
            }
            appState.list.items[rowId][fieldName] = fieldValue
        } catch (e) {
            console.log(e)
        }
        return appState
    }

    setRowFieldValue(rowId, fieldName, fieldValue) {
        console.log("setRowFieldValue", rowId, fieldName, fieldValue)
        return this.__setStateWorkflow(
            (appState) => {
                return this.setRowFieldValueCallback(appState, rowId, fieldName, fieldValue)
            }
        )
    }

    deleteRowByIndexCallback(appState, rowId){
        try {
            appState.list.items.splice(rowId, 1)
        } catch (e) {
            console.log(e)
        }
        return appState
    }

    deleteRowByIndex(rowId) {
        return this.__setStateWorkflow(
            (appState) => {
                return this.deleteRowByIndexCallback(appState, rowId);
            }
        )
    }

    getItems() {
        return this.applicationState.list.items.concat();
    }

}

// const store = new SimpleKeyStore("supercalc-db", "supercalc-store");
// const superCalcStateManager = new SuperCalcStateManager(store);
const superCalcStateManager = new SuperCalcStateManager(superCalcStatePersistence);

export default superCalcStateManager;
