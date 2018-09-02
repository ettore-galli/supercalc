import React from 'react'
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SuperCalcComponent from './common/SuperCalcComponent';
import SuperCalcRowDefinition from '../BackEnd/SuperCalcRowDefinition';
import SuperCalcEngine from '../BackEnd/SuperCalcEngine';
import Rational from '../BackEnd/Rational';

class InputGridRow extends SuperCalcComponent {

    getRowFieldValue(row, field_name) {
        if (row) {
            if (row[field_name]) {
                return row[field_name];
            }
        }
        return "";
    }

    render() {
        return (
            <tr>
                {
                    SuperCalcRowDefinition.inputFields.map(
                        (row, index) => {
                            let field_name = row.field_name;
                            return (
                                <td key={index}>
                                    <TextField
                                        onChange={(event) => {
                                            this.SuperCalcStatus.setRowFieldValue(this.props.rowIndex, field_name, event.target.value)
                                        }}
                                        name={field_name}
                                        value={this.getRowFieldValue(this.props.row, field_name)}>
                                    </TextField>
                                </td>
                            )
                        }
                    )
                        .concat([
                            <td key={SuperCalcRowDefinition.inputFields.length + 1}>
                                <Typography
                                    name="total_price"
                                >{SuperCalcEngine.getFloatTotalPrice(this.props.row)}
                                </Typography>
                            </td>
                        ])
                }
            </tr>
        );
    }
}

export default InputGridRow