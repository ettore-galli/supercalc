import React from 'react'
import superCalcStateManager from '../../StateManager/SuperCalcStateManager';

/**
 * Super component with state manager embedded
 */
class SuperCalcComponent extends React.Component {
    constructor(props) {
        super(props)
        this.SuperCalcStatus = superCalcStateManager;
    }
}
export default SuperCalcComponent