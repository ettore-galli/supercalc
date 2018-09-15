import React from 'react';
import SuperCalcComponent from './common/SuperCalcComponent';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';

class ControlButtons extends SuperCalcComponent {
    render() {
        return (
            <IconButton color="secondary">
                <SaveIcon
                    onClick={(event) => {
                        console.log("salvataggio...")
                        this.superCalcStatePersistence.set(this.SuperCalcStatus.getStatus()).then(
                            ()=>{console.log("salvato!")}
                        )
                    }}
                >save</SaveIcon>
            </IconButton>
        )
    }
}


export default ControlButtons;