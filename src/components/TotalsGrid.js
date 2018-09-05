import React from 'react'
import SuperCalcComponent from './common/SuperCalcComponent';
import SuperCalcEngine from '../BackEnd/SuperCalcEngine';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Rational from '../BackEnd/Rational';
class TotalsGrid extends SuperCalcComponent {

    renderTotalsList(all_totals) {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Destinazione</TableCell>
                        <TableCell numeric>Totale</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Object.keys(all_totals.final_destination_1_totals).map(
                            (entry, id) => {
                                return (
                                    <TableRow key={id}>
                                        <TableCell>
                                            {entry}
                                        </TableCell>
                                        <TableCell numeric>
                                            {Rational.float(all_totals.final_destination_1_totals[entry])}
                                        </TableCell>
                                    </TableRow>
                                )
                            }

                        )
                    }
                    <TableRow>
                        <TableCell>Totale</TableCell>
                        <TableCell numeric>
                            {Rational.float(all_totals.grand_total)}
                        </TableCell>
                    </TableRow>
                </TableBody>
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