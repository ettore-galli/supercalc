import React from 'react'
import superCalcStateManager from '../../BackEnd/SuperCalcStateManager';

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