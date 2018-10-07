import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import BaseComponent from './BaseComponent';
import superCalcStateManager from '../../BackEnd/SuperCalcStateManager';

class InputDialogField extends BaseComponent {

    renderButtonsList(fdtotals, field_name, finalDestinationCallback) {
        if (fdtotals) {
            return Object.keys(fdtotals).map(
                (value) => {
                    return (
                        <Button
                            key={value}
                            value={value}
                            onClick={
                                (event) => {
                                    finalDestinationCallback(field_name, value)
                                }
                            }
                        >{value}
                        </Button>
                    )
                }
            )
        }
    }

    render() {

        const { rowId, finalDestinationCallback, ...rest } = this.props;
        var fdlist = null;

        // Final destination buttons construction
        if (String(this.props.name).startsWith("final_destination")) {
            const all_totals = superCalcStateManager.getAllTotals();
            const total_fields_name = this.props.name + "_totals";
            fdlist = this.renderButtonsList(all_totals[total_fields_name], this.props.name, finalDestinationCallback);
        }

        // Input renderer
        return (
            <span>
                <TextField
                    {...rest}
                >
                    {this.props.children}
                </TextField>
                {fdlist}
            </span>

        );
    }
}

export default InputDialogField;