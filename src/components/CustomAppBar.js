// Framework base imports
import React from 'react';

// Framework UI Import
import AppBar from '@material-ui/core/Typography'

//
import SuperCalcComponent from './common/SuperCalcComponent';

class CustomAppBar extends SuperCalcComponent {
    render() {
        return (
            <AppBar
                {...this.props}
            >
                {this.props.children}
                {this.SuperCalcStatus.getTitle()}
            </AppBar>
        );
    }
}

export default CustomAppBar;