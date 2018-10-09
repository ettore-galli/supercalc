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
        this.forceUpdateComponents.forEach(async element => {
            if (element.forceUpdate) {
                //element.setState({ ...element.state, update: true })
                element.setState({...element.state, ...this.applicationState, toggle: !element.toggle || true})
            }
        });
    }

    /**
     * External entry point for doForceUpdate
     */
    doForceUpdate() {
        this.__doForceUpdate()
    }

    /**
     * Adds a component to the force update list
     * @param {*} component 
     */
    addForceUpdateComponent(component) {
        if (!this.forceUpdateComponents.includes(component)) {
            this.forceUpdateComponents.push(component);
        }
    }

}

export default StateManagerBase;