import React from 'react'
import SuperCalcComponent from './common/SuperCalcComponent';
import SuperCalcEngine from '../BackEnd/SuperCalcEngine';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Rational from '../BackEnd/Rational';
import { withStyles } from '@material-ui/core/styles';

const tableCellCommonStyle = {
    fontSize: 18
}

const CustomTableCell = withStyles({
    root: {
        ...tableCellCommonStyle
    },
    body: {
        ...tableCellCommonStyle
    },
    footer: {
        ...tableCellCommonStyle
    }
})(TableCell);


class TotalsGrid extends SuperCalcComponent {


    renderTotalsList(all_totals) {
        const totals_list = all_totals.final_destination_1_totals;
        console.log((<TableCell></TableCell>));
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <CustomTableCell>Destinazione
                        </CustomTableCell>
                        <CustomTableCell numeric>Totale
                        </CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Object.keys(totals_list).map(
                            (entry, id) => {
                                return (
                                    <TableRow key={id}>
                                        <CustomTableCell>
                                            {entry}
                                        </CustomTableCell>
                                        <CustomTableCell numeric>
                                            {Rational.float(totals_list[entry])}
                                        </CustomTableCell>
                                    </TableRow>
                                )
                            }

                        )
                    }
                </TableBody>
                <TableFooter>
                    <TableRow key={totals_list.length}>
                        <CustomTableCell>TOTALE</CustomTableCell>
                        <CustomTableCell numeric>
                            {Rational.float(all_totals.grand_total)}
                        </CustomTableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        )
    }

    render() {
        // Calculate Totals
        const items_list = this.SuperCalcStatus.getItems();
        const all_totals = SuperCalcEngine.listFullProcessing(items_list);
        // Render
        return this.renderTotalsList(all_totals)

    }
}

export default TotalsGrid