import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import ClearAll from '@material-ui/icons/ClearAll';

import superCalcStateManager from '../BackEnd/SuperCalcStateManager';
import ActionConfirmDialog from './common/ActionConfirmDialog';

class ClearListButton extends React.Component {
    state = {
        deleteListConfirmDialogOpen: false
    };

    closeDeleteItemDialog() {
        this.setState({ ...this.state, deleteListConfirmDialogOpen: false })
    }

    doDeleteItemCallback(id) {
        superCalcStateManager.deleteList();
        this.closeDeleteItemDialog();
    }

    cancelDeleteItemCallback() {
        this.closeDeleteItemDialog();
    }

    render() {
        return (
            <span>
                <IconButton color="primary">
                    <ClearAll
                        color="error"
                        onClick={(event) => {
                            this.setState(
                                {
                                    ...this.state,
                                    deleteListConfirmDialogOpen: true,
                                    deleteListConfirmDialogTitle: "Cancellare la lista?"
                                }
                            )
                        }}
                    >clear</ClearAll>
                </IconButton>
                <ActionConfirmDialog
                    dialogtitle={this.state.deleteListConfirmDialogTitle}
                    open={this.state.deleteListConfirmDialogOpen}
                    okcallback={() => { this.doDeleteItemCallback(this.state.idToDelete) }}
                    cancelcallback={() => { this.cancelDeleteItemCallback() }}
                >
                </ActionConfirmDialog>
            </span>
        )
    }
}


export default ClearListButton;