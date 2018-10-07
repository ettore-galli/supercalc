import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';

import SuperCalcConstants from '../BackEnd/SuperCalcConstants';
import superCalcStateManager from '../BackEnd/SuperCalcStateManager';
import superCalcStatePersistence from '../BackEnd/SuperCalcStatePersistence';


class SaveButton extends React.Component {

    componentDidMount() {
        if (this.props.autoupdate || false) {
            superCalcStateManager.addForceUpdateComponent(this);
        }
    }

    saveIconColor() {
        if (superCalcStateManager.getSaving() === SuperCalcConstants.__SAVING_STATUS_NEEDED) {
            return "secondary";
        } else if (superCalcStateManager.getSaving() === SuperCalcConstants.__SAVING_STATUS_PROGRESS) {
            return "secondary"
        } else if (superCalcStateManager.getSaving() === SuperCalcConstants.__SAVING_STATUS_DONE) {
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
                        superCalcStateManager.setSaving(SuperCalcConstants.__SAVING_STATUS_PROGRESS);
                        superCalcStatePersistence.set(superCalcStateManager.getStatus()).then(
                            () => {
                                superCalcStateManager.setSaving(SuperCalcConstants.__SAVING_STATUS_DONE);
                            }
                        )
                    }}
                >save</SaveIcon>
            </IconButton>
        )
    }
}


export default SaveButton;