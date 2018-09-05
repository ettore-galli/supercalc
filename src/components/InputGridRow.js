import React from 'react'
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
            <TableRow>
                {
                    SuperCalcRowDefinition.inputFields.map(
                        (row, index) => {
                            let field_name = row.field_name;
                            return (
                                <TableCell
                                    key={index}>
                                    <TextField
                                        onChange={(event) => {
                                            this.SuperCalcStatus.setRowFieldValue(this.props.rowIndex, field_name, event.target.value)
                                        }}
                                        name={field_name}
                                        value={this.getRowFieldValue(this.props.row, field_name)}>
                                    </TextField>
                                </TableCell>
                            )
                        }
                    )
                        .concat([
                            <TableCell
                                key={SuperCalcRowDefinition.inputFields.length + 1}
                            >
                                <TextField
                                    name="total_price"
                                    readOnly={true}
                                    value={SuperCalcEngine.getFloatTotalPrice(this.props.row)}
                                >
                                </TextField>
                            </TableCell>
                        ])
                }
            </TableRow>
        );
    }
}

export default InputGridRow