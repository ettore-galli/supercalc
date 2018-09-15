import React from 'react'
import superCalcStateManager from '../../BackEnd/SuperCalcStateManager';
import superCalcStatePersistence from '../../BackEnd/SuperCalcStatePersistence';

/**
 * Super component with state manager and persistence embedded
 */
class SuperCalcComponent extends React.Component {
    constructor(props) {
        super(props)
        this.SuperCalcStatus = superCalcStateManager;
        this.superCalcStatePersistence = superCalcStatePersistence;
    }

    componentDidMount() {
        if (this.props.autoupdate) {
            this.SuperCalcStatus.addForceUpdateComponent(this);
        }
    }

    shouldComponentUpdate() {
        return this.props.autoupdate || false;
    }

    saveDataWorkflow() {
        return this.superCalcStatePersistence.set(
            this.SuperCalcStatus.getStatus()
        ).then(
            (loadedAppState) => {
                this.SuperCalcStatus.setInitialStateWithNoForceUpdate(loadedAppState);
                this.SuperCalcStatus.doForceUpdate()
            }
        )
    }
}
export default SuperCalcComponent