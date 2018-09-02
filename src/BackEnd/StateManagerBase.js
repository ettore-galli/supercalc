class StateManagerBase {

    // Instance management
    constructor() {
        this.applicationState = {};
        this.forceUpdateComponents = []
    }

    /**
     * Forces the update of all registered components
     */
    __doForceUpdate() {
        this.forceUpdateComponents.forEach(element => {
            if (element.forceUpdate) {
                element.forceUpdate();
            }
        });
    }

    /**
     * Adds a component to the force update list
     * @param {*} component 
     */
    addForceUpdateComponent(component) {
        this.forceUpdateComponents.push(component);
    }

}

export default StateManagerBase;