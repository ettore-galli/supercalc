// Framework base imports
import React from 'react';

// Framework UI Import
import AppBar from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

// Own component import
import SuperCalcComponent from './common/SuperCalcComponent';
import SaveButton from './SaveButton';
import ClearListButton from './ClearListButton';

class CustomAppBar extends SuperCalcComponent {
    render() {

        return (
            <AppBar variant={this.props.variant}>
                {this.props.children}
                {this.SuperCalcStatus.getTitle()}
                <SaveButton></SaveButton>
                <ClearListButton></ClearListButton>
                <Button
                    onClick={
                        () => {
                            this.SuperCalcStatus.applicationState.list.items = this.SuperCalcStatus.applicationState.list.items.concat(
                                [
                                    {
                                        item_name: "pere",
                                        unit_price: 1.34,
                                        final_destination_1 : "tigli"
                                    },
                                    {
                                        item_name: "mele",
                                        unit_price: 4.55,
                                        final_destination_1 : "lago"
                                    },
                                    {
                                        item_name: "detersivo per piatti",
                                        unit_price: 5.65,
                                        final_destination_1 : "lago"
                                    },
                                    {
                                        item_name: "deo spray",
                                        unit_price: 3.98,
                                        final_destination_1 : "tigli"
                                    },
                                    {
                                        item_name: "fazzoletti di carta",
                                        unit_price: 0.98,
                                        final_destination_1 : "tigli"
                                    },
                                    {
                                        item_name: "ginger",
                                        unit_price: 0.34,
                                        quantity: 6,
                                        final_destination_1 : "tigli"
                                    },
                                    {
                                        item_name: "pane mulino bianco",
                                        unit_price: 0.99,
                                        quantity: 1,
                                        final_destination_1 : "tigli"
                                    },
                                    {
                                        item_name: "mozzarella",
                                        unit_price: 2.99,
                                        final_destination_1 : "tigli"
                                    },
                                    {
                                        item_name: "zucchine",
                                        unit_price: 0.65,
                                        final_destination_1 : "lago"
                                    },

                                ]
                            );
                            this.SuperCalcStatus.doForceUpdate()
                        }
                    }
                >testdata</Button>
            </AppBar>
        );
    }
}

export default CustomAppBar;