import React from 'react'

import SuperCalcComponent from './common/SuperCalcComponent';
import SuperCalcRowDefinition from '../BackEnd/SuperCalcRowDefinition';

import TextField from '@material-ui/core/TextField';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
class InputGrid extends SuperCalcComponent {

    getItemFieldValue(item, field_name) {
        if (item) {
            if (item[field_name]) {
                return item[field_name];
            }
        }
        return "";
    }

    getItemSummary(item) {
        return this.getItemFieldValue(item, "item_name");
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
            </ExpansionPanel>
        );
    }

    renderInputList() {
        // Get the list of items
        const items_list = this.SuperCalcStatus.getItems();

        return (
            <div>
                { // Items in list
                    items_list.map(
                        (item, index) => {
                            return this.renderItemInputPanel(item, index)
                        }
                    ).concat( // New item
                        [this.renderItemInputPanel({}, items_list.length)]
                    )

                }
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