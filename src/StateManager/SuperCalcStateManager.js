import StateManagerBase from './StateManagerBase';

class SuperCalcStateManager extends StateManagerBase {

    // Instance management
    static appStatusInstance = null;
    constructor() {
        super()
        this.itemFieldsList = [
            "item_name",
            "unit_price",
            "quantity",
            "final_destination_1",
            "final_destination_2"
        ]
        this.status = {
            list: {
                title: "",
                items: []
            }
        };
        this.forceUpdateComponents = []

        // Working constants
        this.__BLANK = "";
    }

    getItemFieldsList() {
        return this.itemFieldsList;
    }

    setTitle(title) {
        this.status.list.title = title;
        this.__doForceUpdate();
    }

    getTitle() {
        return this.status.list.title;
    }

    setRowFieldValue(rowId, fieldName, fieldValue) {
        try {
            if (rowId === null) {
                rowId = this.status.list.items.push({}) - 1;
                console.log(rowId)
            }
            this.status.list.items[rowId][fieldName] = fieldValue
        } catch (e) {
            console.log(e)
        }
        this.__doForceUpdate();
    }

    getItems() {
        return this.status.list.items.concat();
    }

    fillWithTestData() {
        console.log("fill with test data")
        let rows = [
            {
                item: "pere",
                unit_price: 3.14,
                quantity: 1,
                final_destination_1: "tigli",
                final_destination_2: this.__BLANK
            },
            {
                item: "detersivo per piatti",
                unit_price: 5.99,
                quantity: 1,
                final_destination_1: "tigli",
                final_destination_2: this.__BLANK
            },
            {
                item: "mozzarella",
                unit_price: 2.18,
                quantity: 2,
                final_destination_1: "lago",
                final_destination_2: this.__BLANK
            }
        ];
        rows.forEach(
            (item) => {
                this.status.list.items.push(item);
            }
        )
        this.__doForceUpdate();
    }

}

const superCalcStateManager = new SuperCalcStateManager();
Object.freeze(superCalcStateManager);
export default superCalcStateManager;

/*
class SuperCalcStateManager {

    // Instance management
    static appStatusInstance = null;
    constructor() {
        this.status = {
            list: {
                title: "",
                items: []
            }
        };
        this.forceUpdateComponents = []

        // Working constants
        this.__BLANK = "";
    }

 
    static getInstance() {
        if (SuperCalcStateManager.appStatusInstance === null) {
            SuperCalcStateManager.appStatusInstance = new SuperCalcStateManager();
        }
        return SuperCalcStateManager.appStatusInstance;
    }
    __doForceUpdate() {
        this.forceUpdateComponents.forEach(element => {
            if (element.forceUpdate) {
                element.forceUpdate();
            }
        });
    }

    addForceUpdateComponent(component) {
        this.forceUpdateComponents.push(component);
    }

    setTitle(title) {
        this.status.list.title = title;
        this.__doForceUpdate();
    }

    getTitle() {
        return this.status.list.title;
    }

    addRow(row) {
        this.status.list.items.push(row);
        this.__doForceUpdate();
    }

    getItems() {
        return this.status.list.items.concat(this.getNewItemRows());
    }

    getNumberOfnewItems() {
        return 3;
    }

    getNewItemRows() {
        return ([...Array(this.getNumberOfnewItems()).keys()].map(
            (item) => { return this.getBlankRow() }
        ))
    }

    getBlankRow() {
        return {
            item: this.__BLANK,
            unit_price: this.__BLANK,
            quantity: this.__BLANK,
            final_destination_1: this.__BLANK,
            final_destination_2: this.__BLANK
        }
    }

    fillWithTestData() {
        let rows = [
            {
                item: "pere",
                unit_price: 3.14,
                quantity: 1,
                final_destination_1: "tigli",
                final_destination_2: this.__BLANK
            },
            {
                item: "detersivo per piatti",
                unit_price: 5.99,
                quantity: 1,
                final_destination_1: "tigli",
                final_destination_2: this.__BLANK
            },
            {
                item: "mozzarella",
                unit_price: 2.18,
                quantity: 2,
                final_destination_1: "lago",
                final_destination_2: this.__BLANK
            }
        ];
        rows.forEach(
            (item) => {
                this.addRow(item)
            }
        )
        this.__doForceUpdate();
    }

}

export default SuperCalcStateManager;
*/