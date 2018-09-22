// Framework base imports
import React from 'react';

// Framework UI Import
import AppBar from '@material-ui/core/Typography'

// Own component import
import SuperCalcComponent from './common/SuperCalcComponent';
import SaveButton from './SaveButton';
import ClearListButton from './ClearListButton';

class CustomAppBar extends SuperCalcComponent {
    render() {

        return (
            <AppBar variant={this.props.variant}>
                {this.props.children}
                {"LISTA DELLA SPESA"}
                <SaveButton></SaveButton>
                <ClearListButton></ClearListButton>
            </AppBar>
        );
    }
}

export default CustomAppBar;