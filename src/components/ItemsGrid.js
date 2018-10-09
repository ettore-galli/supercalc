import React from 'react'

import ActionConfirmDialog from './common/ActionConfirmDialog';
import SuperCalcEngine from '../BackEnd/SuperCalcEngine';
import SuperCalcFrontEndEngine from '../BackEnd/SuperCalcFrontEndEngine';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import EditItemButton from './EditItemButton';
import DeleteItemButton from './DeleteItemButton';
import NewItemButton from './NewItemButton';

import superCalcStateManager from '../BackEnd/SuperCalcStateManager';

class ItemsGrid extends React.Component {

    componentDidMount() {
        if (this.props.autoupdate || false) {
            superCalcStateManager.addForceUpdateComponent(this);
        }
    }

    getItemFieldValue(item, field_name) {
        if (item) {
            if (item[field_name]) {
                return item[field_name];
            }
        }
        return "";
    }

    getItemSummary(item) {

        if (item && (item.item_name || item.quantity || item.unit_price)) {
            let total_price = SuperCalcEngine.getFloatTotalPrice(item);
            let full_row = SuperCalcEngine.getRowWithTotalPrice(item);
            let total_price_summary = String(total_price) || "";
            let summary = (item.item_name || "") + " " + total_price_summary;
            if (full_row.final_destination_1) {
                summary += " " + full_row.final_destination_1;
            }
            if (full_row.final_destination_1 && full_row.final_destination_2) {
                summary += "/";
            }
            if (full_row.final_destination_2) {
                summary += " " + full_row.final_destination_2;
            }
            return summary;
        } else {
            return "Nuovo..."
        }

    }

    getItemStyle(item, all_totals) {
        let style = {
            fontSize: 18,
            background: ''
        };

        // Background color
        let color = SuperCalcFrontEndEngine.getItemColor(item, all_totals)
        style.background = color;

        return style;
    }

    renderItemRow(index, item, all_totals) {
        let item_summary = this.getItemSummary(item);
        return (
            <TableRow
                key={index}
            >
                <TableCell
                    style={this.getItemStyle(item, all_totals)}
                >
                    {item_summary}
                </TableCell>
                <TableCell
                    style={this.getItemStyle(item, all_totals)}
                >
                    <EditItemButton
                        autoupdate={true}
                        rowId={index}
                        row={item}
                        innerStyle={{ marginLeft: 'auto' }}
                    ></EditItemButton>
                    <DeleteItemButton
                        autoupdate={true}
                        rowId={index}
                        itemSummary={item_summary}
                        innerStyle={{ marginLeft: 'auto' }}
                    ></DeleteItemButton>
                </TableCell>
            </TableRow>
        )
    }

    renderNewItemRow() {
        let item_summary = "";
        return (
            <TableRow key={"new"}>
                <TableCell>
                    {item_summary}
                </TableCell>
                <TableCell>
                    <NewItemButton
                        autoupdate={true}
                        innerStyle={{ marginLeft: 'auto' }}
                    ></NewItemButton>
                </TableCell>
            </TableRow>
        )
    }


    renderItemsList(items_list, all_totals) {
        let rendered_items = items_list.map(
            (item, index) => {
                return this.renderItemRow(index, item, all_totals)
            }
        )
        let new_item_row = this.renderNewItemRow();
        return (
            <Table>
                <TableBody>
                    {new_item_row}
                    {rendered_items}
                </TableBody>
            </Table>
        )
    }

    render() {
        // Get the list of items¯
        let items_list = superCalcStateManager.getItems();
        // Calculate Totals
        const all_totals = superCalcStateManager.getAllTotals();
        // Render the list
        return this.renderItemsList(items_list, all_totals);
    }
}

export default ItemsGrid