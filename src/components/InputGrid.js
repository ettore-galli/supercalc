import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Grid from "@material-ui/core/Grid";

import SuperCalcComponent from './common/SuperCalcComponent';
import SuperCalcRowDefinition from '../BackEnd/SuperCalcRowDefinition';
import ActionConfirmDialog from './ActionConfirmDialog';
import SuperCalcEngine from '../BackEnd/SuperCalcEngine';

class InputGrid extends SuperCalcComponent {
    state = {
        deleteConfirmDialogTitle: "",
        deleteConfirmDialogOpen: false,
        idToDelete: null
    };

    closeDeleteItemDialog() {
        this.setState({ ...this.state, deleteConfirmDialogOpen: false })
    }

    doDeleteItemCallback(id) {
        this.SuperCalcStatus.deleteRowByIndex(id);
        this.closeDeleteItemDialog();
    }

    cancelDeleteItemCallback() {
        this.closeDeleteItemDialog();
    }

    getItemFieldValue(item, field_name) {
        if (item) {
            if (item[field_name]) {
                return item[field_name];
            }
        }
        return "";
    }

    getItemSummary(item) {

        if (item && (item.item_name || item.quantity || item.unit_price)) {
            let total_price = SuperCalcEngine.getFloatTotalPrice(item);
            let total_price_summary = String(total_price) || "";
            return (item.item_name || "") + " " + total_price_summary;
        } else {
            return "Nuovo..."
        }

    }



    renderItemInputPanel(item, row_index) {
        // Columns list 
        const loadInputFields = SuperCalcRowDefinition.inputFields;

        return (
            <ExpansionPanel key={row_index}>
                <ExpansionPanelSummary>{this.getItemSummary(item)}</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        {loadInputFields.map((column, column_index) => {
                            return (
                                <Grid
                                    key={column_index}
                                    item xs={12}>
                                    <TextField
                                        label={column.field_name}
                                        onChange={(event) => {
                                            this.SuperCalcStatus.setRowFieldValue(
                                                row_index,
                                                column.field_name,
                                                event.target.value)
                                        }}
                                        name={column.field_name}
                                        value={this.getItemFieldValue(item, column.field_name)}>
                                    </TextField>
                                </Grid>
                            );
                        })}
                    </Grid>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    <Button color="default" onClick={
                        () => {
                            this.setState(
                                {
                                    ...this.state,
                                    deleteConfirmDialogOpen: true,
                                    idToDelete: row_index,
                                    deleteConfirmDialogTitle: "Cancellare l'articolo " + item.item_name + "?"
                                }
                            )
                        }
                    }>DELETE</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        );
    }

    renderInputList() {
        // Get the list of items
        const items_list = this.SuperCalcStatus.getItems();
        // Build the list of rendered items made of the exsisting items plus the "blank" one; 
        // Each item of this list is a rendered element
        // Start with an empty list
        let rendered_items = []
        // Add the blank item first
        rendered_items.push(
            this.renderItemInputPanel({}, items_list.length)
        );
        // Add the exsisting items
        rendered_items = rendered_items.concat(
            items_list.map(
                (item, index) => {
                    return this.renderItemInputPanel(item, index)
                }
            )
        )
        return (
            <div>
                <ActionConfirmDialog
                    dialogtitle={this.state.deleteConfirmDialogTitle}
                    open={this.state.deleteConfirmDialogOpen}
                    id={this.state.idToDelete}
                    okcallback={() => { this.doDeleteItemCallback(this.state.idToDelete) }}
                    cancelcallback={() => { this.cancelDeleteItemCallback() }}
                >
                </ActionConfirmDialog>
                {rendered_items}
            </div>
        )
    }

    render() {
        // Get the list of items¯
        const items_list = this.SuperCalcStatus.getItems();
        // Render the list
        return this.renderInputList(items_list);
    }
}

export default InputGrid