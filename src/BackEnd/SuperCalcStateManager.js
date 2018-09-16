import StateManagerBase from './StateManagerBase';
import SuperCalcConstants from './SuperCalcConstants';

class SuperCalcStateManager extends StateManagerBase {



    // Instance management
    static appStatusInstance = null;

    // Constants
    static __BLANK_STATUS = {
        list: {
            title: "",
            items: []
        },
        runStatus: {
            saving: SuperCalcConstants.__SAVING_STATUS_UNDEFINED
        }
    };
    // Constructor
    constructor() {
        super()
        this.applicationState = { ...SuperCalcStateManager.__BLANK_STATUS };
    }



    __setStateWorkflow(stateUpdatecallback) {
        this.setSavingNoForceUpdate(SuperCalcConstants.__SAVING_STATUS_NEEDED);
        stateUpdatecallback(this.applicationState) // stateUpdatecallback(appState)
        this.__doForceUpdate();
    }

    setInitialStateWithNoForceUpdate(wholeAppState) {
        if (wholeAppState) {
            this.applicationState = wholeAppState;
        } else {
            this.applicationState = SuperCalcStateManager.__BLANK_STATUS;
        }

    }

    setTitleCallback(appState, title) {
        appState.list.title = title;
        return appState;
    }

    setSavingCallback(appState, saving) {
        if (!appState.runStatus) {
            appState.runStatus = {};
        }
        if (saving !== undefined) {
            appState.runStatus.saving = saving;
        } else {
            appState.runStatus.saving = SuperCalcConstants.__SAVING_STATUS_UNDEFINED;
        }
    }
    setSavingNoForceUpdate(saving) {
        this.setSavingCallback(this.applicationState, saving);
    }
    setSaving(saving) {
        return this.__setStateWorkflow(
            (appState) => {
                this.setSavingCallback(appState, saving)
            }
        )
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

    deleteListCallback(appState) {
        appState.list.items = [];
    }

    deleteList() {
        return this.__setStateWorkflow(
            (appState) => {
                return this.deleteListCallback(appState);
            }
        )
    }

    getTitle() {
        return this.applicationState.list.title;
    }

    getItems() {
        return this.applicationState.list.items.concat();
    }

    getSaving() {
        if (this.applicationState.runStatus !== undefined) {
            return this.applicationState.runStatus.saving;
        } else {
            return SuperCalcConstants.__SAVING_STATUS_UNDEFINED;
        }
    }

    getStatus() {
        return this.applicationState;
    }

}

const superCalcStateManager = new SuperCalcStateManager();
export default superCalcStateManager;
