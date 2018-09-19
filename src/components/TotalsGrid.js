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

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

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

    renderTotalsList(final_destination_totals_list, grand_total) {
        const totals_list = final_destination_totals_list;
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    {this.props.title}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Table>
                        {this.renderTableHead()}
                        <TableBody>
                            {this.renderTableBodyInside(totals_list)}
                        </TableBody>
                        {(() => {
                            if (this.props.showTableFooter) {
                                return this.renderTableFooter(totals_list, grand_total);
                            } else {
                                return null;
                            }
                        })()}
                    </Table>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }

    render() {
        // Calculate Totals
        const items_list = this.SuperCalcStatus.getItems();
        const all_totals = SuperCalcEngine.listFullProcessing(items_list);
        // Render
        return this.renderTotalsList(
            // all_totals.final_destination_1_totals,
            all_totals[this.props.finalDestinationTotalsField],
            Rational.float(all_totals.grand_total)
        )

    }
}

export default TotalsGrid