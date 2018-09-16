import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import ClearAll from '@material-ui/icons/ClearAll';


import SuperCalcComponent from './common/SuperCalcComponent';
import SuperCalcConstants from '../BackEnd/SuperCalcConstants';
import ActionConfirmDialog from './ActionConfirmDialog';

class ClearListButton extends SuperCalcComponent {
    state = {
        deleteListConfirmDialogOpen: false
    };

    closeDeleteItemDialog() {
        this.setState({ ...this.state, deleteListConfirmDialogOpen: false })
    }

    doDeleteItemCallback(id) {
        this.SuperCalcStatus.deleteList();
        this.closeDeleteItemDialog();
    }

    cancelDeleteItemCallback() {
        this.closeDeleteItemDialog();
    }

    render() {
        return (
            <span>
                <IconButton>
                    <ClearAll
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