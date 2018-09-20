import React from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { withStyles } from '@material-ui/core/styles';

import Rational from '../BackEnd/Rational';
import SuperCalcComponent from './common/SuperCalcComponent';
import SuperCalcEngine from '../BackEnd/SuperCalcEngine';

const commonStyle = {
    fontSize: 18
}

const CustomTableCell = withStyles({
    root: {
        ...commonStyle
    },
    body: {
        ...commonStyle
    },
    footer: {
        ...commonStyle
    }
})(TableCell);



class TotalsGrid extends SuperCalcComponent {

    renderTableHead() {
        return (
            <TableHead>
                <TableRow>
                    <CustomTableCell>Destinazione</CustomTableCell>
                    <CustomTableCell numeric>Totale</CustomTableCell>
                </TableRow>
            </TableHead>
        )
    }

    renderTableBodyInside(totals_list) {
        return (
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
        )
    }

    renderTableFooter(totals_list, grand_total) {
        return (
            <TableFooter>
                <TableRow key={totals_list.length}>
                    <CustomTableCell>TOTALE</CustomTableCell>
                    <CustomTableCell numeric>
                        {grand_total}
                    </CustomTableCell>
                </TableRow>
            </TableFooter>
        )
    }

    renderTotalsTable(totals_list, grand_total, showTableFooter) {
        return (
            <Table>
                {this.renderTableHead()}
                <TableBody>
                    {this.renderTableBodyInside(totals_list)}
                </TableBody>
                {(() => {
                    if (showTableFooter) {
                        return this.renderTableFooter(totals_list, grand_total);
                    } else {
                        return null;
                    }
                })()}
            </Table>
        )
    }

    renderTotalsList(all_totals) {
        const totals_list_1 = all_totals.final_destination_1_totals;
        const totals_list_2 = all_totals.final_destination_2_totals;
        const grand_total = Rational.float(all_totals.grand_total)
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography variant="display3">{"TOTALE" + ": " + grand_total}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {this.renderTotalsTable(totals_list_1, grand_total, true)}
                    {this.renderTotalsTable(totals_list_2, grand_total, false)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
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