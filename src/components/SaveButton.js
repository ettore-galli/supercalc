import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';


import SuperCalcComponent from './common/SuperCalcComponent';
import SuperCalcConstants from '../BackEnd/SuperCalcConstants';

class SaveButton extends SuperCalcComponent {

    saveIconColor() {
        if (this.SuperCalcStatus.getSaving() === SuperCalcConstants.__SAVING_STATUS_NEEDED) {
            return "secondary";
        } else if (this.SuperCalcStatus.getSaving() === SuperCalcConstants.__SAVING_STATUS_PROGRESS) {
            return "secondary"
        } else if (this.SuperCalcStatus.getSaving() === SuperCalcConstants.__SAVING_STATUS_DONE) {
            return "primary";
        } else {
            return "primary";
        }
    }

    render() {
        return (
            <IconButton color={this.saveIconColor()}>
                <SaveIcon
                    onClick={(event) => {
                        var __this = this;
                        this.SuperCalcStatus.setSaving(SuperCalcConstants.__SAVING_STATUS_PROGRESS);
                        this.superCalcStatePersistence.set(this.SuperCalcStatus.getStatus()).then(
                            () => {
                                __this.SuperCalcStatus.setSaving(SuperCalcConstants.__SAVING_STATUS_DONE);
                            }
                        )
                    }}
                >save</SaveIcon>
            </IconButton>
        )
    }
}


export default SaveButton;