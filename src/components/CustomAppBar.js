// Framework base imports
import React from 'react';

// Framework UI Import
import AppBar from '@material-ui/core/Typography'

// Own component import
import SaveButton from './SaveButton';
import ClearListButton from './ClearListButton';
import NewItemButton from './NewItemButton';

class CustomAppBar extends React.Component {
    render() {

        return (
            <AppBar variant={this.props.variant}>
                {this.props.children}
                {"LISTA"}
                <SaveButton
                    autoupdate={true}
                ></SaveButton>
                <ClearListButton
                    autoupdate={true}
                ></ClearListButton>
            </AppBar>
        );
    }
}

export default CustomAppBar;