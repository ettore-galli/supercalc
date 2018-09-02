import StateManagerBase from './StateManagerBase';
import SimpleKeyStore from './SimpleKeyStore';

class SuperCalcStateManager extends StateManagerBase {

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
        this.__loadApplicationStateAndUpdate()
    }

    __loadApplicationState() {
        return this.store.get(SuperCalcStateManager.__STATUS_KEY).then(
            (appState) => {
                this.applicationState = appState;
                return appState;
            }
        )
    }

    __loadApplicationStateAndUpdate() {
        return this.__loadApplicationState().then(
            () => {
                this.__doForceUpdate();
            }
        )
    }

    __storeApplicationState(state) {
        console.log("__storeApplicationState", state)
        return this.store.set(SuperCalcStateManager.__STATUS_KEY, state)
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
        // return this.__loadApplicationState().then(
        //     (appState) => {
        //         appState.list.title = title;
        //         return appState
        //     }
        // ).then(
        //     (appState) => {
        //         this.__storeApplicationStateAndUpdate(
        //             appState
        //         )
        //     }
        // )
    }

    getTitle() {
        return this.applicationState.list.title;
    }

    setRowFieldValue(rowId, fieldName, fieldValue) {
        return this.__setStateWorkflow(
            (appState) => {
                try {
                    if (rowId === null) {
                        rowId = appState.list.items.push({}) - 1;
                    }
                    appState.list.items[rowId][fieldName] = fieldValue
                } catch (e) {
                    console.log(e)
                }
                return appState
            }
        )
        // return this.__loadApplicationState().then(
        //     (appState) => {
        //         try {
        //             if (rowId === null) {
        //                 rowId = appState.list.items.push({}) - 1;
        //             }
        //             appState.list.items[rowId][fieldName] = fieldValue
        //         } catch (e) {
        //             console.log(e)
        //         }
        //         return appState
        //     }
        // ).then(
        //     (appState) => {
        //         this.__storeApplicationStateAndUpdate(
        //             appState
        //         )
        //     }
        // )
    }

    getItems() {
        return this.applicationState.list.items.concat();
    }

}

const store = new SimpleKeyStore("supercalc-db", "supercalc-store");
const superCalcStateManager = new SuperCalcStateManager(store);
//Object.freeze(superCalcStateManager);
export default superCalcStateManager;
