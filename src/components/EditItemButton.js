import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';


import superCalcStateManager from '../BackEnd/SuperCalcStateManager';
import InputDialog from './InputDialog';

class EditItemButton extends React.Component {
    state = {
        editItemDialogTitle: "Modifica articolo",
        editItemConfirmDialogOpen: false,
        editRow: null
    };

    componentDidMount() {
        if (this.props.autoupdate || false) {
            superCalcStateManager.addForceUpdateComponent(this);
        }
    }

    openInputDialog() {
        this.setState(
            {
                ...this.state,
                editItemConfirmDialogOpen: true
            }
        )
    }

    closeInputDialog() {
        this.setState(
            {
                ...this.state,
                editItemConfirmDialogOpen: false
            }
        )
    }

    doSaveCallback() {
        this.closeInputDialog();
    }

    cancelEditCallback() {
        this.closeInputDialog();
    }

    render() {
        return (
            <span>
                <IconButton color="primary" style={this.props.innerStyle}>
                    <Edit
                        onClick={(event) => {
                            this.openInputDialog()
                        }}
                    >edit</Edit>
                </IconButton>
                <InputDialog
                    autoupdate={true}
                    dialogTitle={this.state.editItemDialogTitle + " " + this.state.rowId}
                    open={this.state.editItemConfirmDialogOpen}
                    rowId={this.props.rowId}
                    row={this.props.row}
                    okcallback={() => { this.doSaveCallback() }}
                    cancelcallback={() => { this.cancelEditCallback() }}
                >
                </InputDialog>
            </span>
        )
    }
}


export default EditItemButton;