import StateManagerBase from './StateManagerBase';

class SuperCalcStateManager extends StateManagerBase {

    // Instance management
    static appStatusInstance = null;

    // Constants
    static __BLANK_STATUS = {
        list: {
            title: "",
            items: []
        }
    };
    // Constructor
    constructor() {
        super()
        this.applicationState = { ...SuperCalcStateManager.__BLANK_STATUS };
    }

    __setStateWorkflow(stateUpdatecallback) {
        stateUpdatecallback(this.applicationState) // stateUpdatecallback(appState)
        this.__doForceUpdate();
    }

    setInitialStateWithNoForceUpdate(wholeAppState) {
        if (wholeAppState){
            this.applicationState = wholeAppState;
        } else {
            this.applicationState = SuperCalcStateManager.__BLANK_STATUS;
        }
        
    }

    setTitleCallback(appState, title) {
        appState.list.title = title;
        return appState;
    }

    setTitle(title) {
        return this.__setStateWorkflow(
            (appState) => {
                return this.setTitleCallback(appState, title)
            }
        )
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
        return this.__setStateWorkflow(
            (appState) => {
                return this.setRowFieldValueCallback(appState, rowId, fieldName, fieldValue)
            }
        )
    }

    deleteRowByIndexCallback(appState, rowId) {
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

    getTitle() {
        return this.applicationState.list.title;
    }

    getItems() {
        return this.applicationState.list.items.concat();
    }

    getStatus() {
        return this.applicationState;
    }

}

const superCalcStateManager = new SuperCalcStateManager();
export default superCalcStateManager;
