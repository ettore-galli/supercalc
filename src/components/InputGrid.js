import React from 'react'
import InputGridRow from './InputGridRow';
import SuperCalcComponent from './common/SuperCalcComponent';
import SuperCalcEngine from '../BackEnd/SuperCalcEngine';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import SuperCalcRowDefinition from '../BackEnd/SuperCalcRowDefinition';
import StringProcessor from '../BackEnd/StringProcessor';
class InputGrid extends SuperCalcComponent {

    renderHeader() {
        return (
            <TableRow>
                {
                    SuperCalcRowDefinition.inputFields.map(
                        (item, index) => {
                            let caption = StringProcessor.createHeaderFromFieldName(item.field_name);
                            return (
                                <TableCell
                                    key={index}>
                                    <TextField
                                        readOnly={true}
                                        name={item.field_name}
                                        value={caption}>
                                    </TextField>
                                </TableCell>
                            )
                        }
                    )
                }
            </TableRow>

        )
    }
    renderItemsList(items) {
        return items.map(
            (item, i) => {
                return (
                    <InputGridRow
                        row={item}
                        rowIndex={i}
                        key={i}>
                    </InputGridRow>
                )
            }
        ).concat([(
            < InputGridRow
                row={null}
                rowIndex={null}
                key={items.length}>
            </InputGridRow >
        )
        ])
    }

    render() {
        // Get the list of items
        const items_list = this.SuperCalcStatus.getItems();
        // Render the list
        return (
            <Table>
                <TableHead>
                    {
                        this.renderHeader()
                    }
                </TableHead>
                <TableBody>
                    {
                        this.renderItemsList(items_list)
                    }
                </TableBody>
            </Table>
        )

    }
}

export default InputGrid