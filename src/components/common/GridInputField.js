import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SuperCalcComponent from './SuperCalcComponent';
import SuperCalcEngine from '../../BackEnd/SuperCalcEngine';

class GridInputField extends SuperCalcComponent {


    renderButtonsList(fdtotals, rowId, fieldName) {
        if (fdtotals) {
            console.log(fdtotals)
            return Object.keys(fdtotals).map(
                (item) => {
                    return (
                        <Button
                            key={item}
                            value={item}
                            onClick={
                                (event) => {
                                    this.SuperCalcStatus.setRowFieldValue(rowId, fieldName, item)
                                }
                            }
                        >{item}
                        </Button>
                    )
                }
            )
        }
    }

    render() {
        const { rowId, ...rest } = this.props;
        var fdlist = null;

        // Final destination buttons
        if (String(this.props.name).startsWith("final_destination")) {
            // Calculate Totals
            const items_list = this.SuperCalcStatus.getItems();
            const all_totals = SuperCalcEngine.listFullProcessing(items_list);
            // Prepare buttons list
            fdlist = this.renderButtonsList(all_totals[this.props.name + "_totals"], rowId, this.props.name);
        }
        // Input renderer
        return (
            <span>
                <TextField
                    {...this.props}
                >
                    {this.props.children}
                </TextField>
                {fdlist}
            </span>

        );
    }
}

export default GridInputField;