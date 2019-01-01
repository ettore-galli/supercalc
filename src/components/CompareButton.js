import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Help from '@material-ui/icons/Help';


import superCalcStateManager from '../BackEnd/SuperCalcStateManager';
import CompareDialog from './CompareDialog';

class CompareButton extends React.Component {
    state = {
        compareDialogTitle: "Comparazione prezzi",
        compareConfirmDialogOpen: false
    };

    componentDidMount() {
        if (this.props.autoupdate || false) {
            superCalcStateManager.addForceUpdateComponent(this);
        }
    }

    openInputDialog() {
        this.setState(
            {
                ...this.state,
                compareConfirmDialogOpen: true
            }
        )
    }

    closeInputDialog() {
        this.setState(
            {
                ...this.state,
                compareConfirmDialogOpen: false
            }
        )
    }

    closeCallback() {
        this.closeInputDialog();
    }

    render() {
        return (
            <span>
                <IconButton color="primary" style={this.props.innerStyle}>
                    <Help
                        onClick={(event) => {
                            this.openInputDialog()
                        }}
                    >edit</Help>
                </IconButton>
                <CompareDialog
                    autoupdate={true}
                    dialogtitle={this.state.compareDialogTitle}
                    open={this.state.compareConfirmDialogOpen}
                    closecallback={() => { this.closeCallback() }}
                >
                </CompareDialog>
            </span>
        )
    }
}


export default CompareButton;