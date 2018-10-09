import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';

import superCalcStateManager from '../BackEnd/SuperCalcStateManager';
import InputDialog from './InputDialog';

class NewItemButton extends React.Component {
    state = {
        newItemDialogOpen: false
    };

    componentDidMount() {
        if (this.props.autoupdate || false) {
            superCalcStateManager.addForceUpdateComponent(this);
        }
    }

    openInputDialog() {
        this.setState({ ...this.state, newItemDialogOpen: true })
    }

    closeInputDialog() {
        this.setState({ ...this.state, newItemDialogOpen: false })
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
                    <Add
                        onClick={(event) => {
                            this.openInputDialog()
                        }}
                    >new</Add>
                </IconButton>
                <InputDialog
                    rowId={null}
                    dialogtitle={this.state.newItemConfirmDialogTitle}
                    open={this.state.newItemDialogOpen || false}
                    okcallback={() => { this.doSaveCallback() }}
                    cancelcallback={() => { this.cancelEditCallback() }}
                >
                </InputDialog>
            </span>
        )
    }
}


export default NewItemButton;