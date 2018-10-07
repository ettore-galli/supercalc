import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

import ActionConfirmDialog from './common/ActionConfirmDialog';
import superCalcStateManager from '../BackEnd/SuperCalcStateManager';

class DeleteItemButton extends React.Component {
    state = {
        deleteItemConfirmDialogOpen: false
    };
    componentDidMount() {
        if (this.props.autoupdate || false) {
            superCalcStateManager.addForceUpdateComponent(this);
        }
    }
    closeDeleteItemDialog() {
        this.setState({ ...this.state, deleteItemConfirmDialogOpen: false })
    }

    doDeleteItemCallback(id) {
        superCalcStateManager.deleteRowByIndex(this.props.rowId);
        this.closeDeleteItemDialog();
    }

    cancelDeleteItemCallback() {
        this.closeDeleteItemDialog();
    }

    render() {
        return (
            <span>
                <IconButton color="primary">
                    <Delete
                        color="error"
                        onClick={(event) => {
                            this.setState(
                                {
                                    ...this.state,
                                    deleteItemConfirmDialogOpen: true,
                                    deleteItemConfirmDialogTitle: "Cancellare l'elemento " + this.props.itemSummary + "?"
                                }
                            )
                        }}
                    >clear</Delete>
                </IconButton>
                <ActionConfirmDialog
                    dialogtitle={this.state.deleteItemConfirmDialogTitle}
                    open={this.state.deleteItemConfirmDialogOpen}
                    okcallback={() => { this.doDeleteItemCallback(this.state.idToDelete) }}
                    cancelcallback={() => { this.cancelDeleteItemCallback() }}
                >
                </ActionConfirmDialog>
            </span>
        )
    }
}


export default DeleteItemButton;