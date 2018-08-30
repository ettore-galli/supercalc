import React from 'react'
import Input from '@material-ui/core/Input';

import SuperCalcComponent from './common/SuperCalcComponent';
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
                    this.SuperCalcStatus.getItemFieldsList().map(
                        (field_name, index) => {
                            return (
                                <td key={index}>
                                    <Input
                                        onChange={(event) => { 
                                            this.SuperCalcStatus.setRowFieldValue(this.props.rowIndex, field_name, event.target.value) 
                                        }}
                                        name={field_name}
                                        value={this.getRowFieldValue(this.props.row, field_name)}>
                                    </Input>
                                </td>
                            )
                        }
                    )
                }
            </tr>
        );
    }
}

export default InputGridRow