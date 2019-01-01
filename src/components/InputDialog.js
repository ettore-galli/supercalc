import React from 'react'

import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import superCalcStateManager from '../BackEnd/SuperCalcStateManager';
import SuperCalcRowDefinition from '../BackEnd/SuperCalcRowDefinition';
import InputDialogField from './common/InputDialogField';
import BaseComponent from './common/BaseComponent';


class InputDialog extends BaseComponent {
    __EMPTY = "";

    componentDidMount() {
        if (this.props.autoupdate || false) {
            superCalcStateManager.addForceUpdateComponent(this);
        }
    }



    buildRowFromInput() {
        return this.getAllFields();
    }

    renderItemInputPanel() {
        // Columns list 
        const loadInputFields = SuperCalcRowDefinition.inputFields;
        // Render
        return (
            <Dialog
                open={this.props.open}

                onEntering={
                    () => {
                        if (this.props.rowId === null) {
                            this.clearFields();
                        } else {
                            let row = superCalcStateManager.getRow(this.props.rowId);
                            this.setAllFields(row);
                        }
                    }
                }

            >
                <DialogTitle>{this.props.dialogtitle || "GESTIONE VOCE"}</DialogTitle>
                <DialogContent>
                    <Grid container>
                        {loadInputFields.map((column, column_index) => {
                            return (
                                <Grid
                                    key={column_index}
                                    item xs={12}>
                                    <InputDialogField
                                        rowId={this.props.rowId}
                                        label={column.description}
                                        onChange={(event) => {
                                            this.setFieldValue(
                                                column.field_name,
                                                event.target.value)
                                        }}
                                        name={column.field_name}
                                        value={this.getFieldValue(column.field_name)}
                                        type={column.type}
                                        step={column.step}
                                        finalDestinationCallback={(field_name, value) => { this.setFieldValue(field_name, value) }}
                                    >
                                    </InputDialogField>
                                </Grid>
                            );
                        })}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="default" onClick={
                        () => {
                            this.props.cancelcallback();
                        }
                    }>CANCEL</Button>
                    <Button color="default" onClick={
                        () => {
                            let row = this.buildRowFromInput();
                            superCalcStateManager.setRow(
                                this.props.rowId,
                                row
                            );
                            this.props.okcallback();
                        }
                    }>SAVE</Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        return this.renderItemInputPanel(this.props.rowId);
    }
}

export default InputDialog