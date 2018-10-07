import React from 'react'

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';


class ActionConfirmDialog extends React.Component {

    render() {

        const { dialogtitle, okcallback, cancelcallback, ...rest } = this.props

        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={this.props.open}
                {...rest}
            >
                <DialogTitle>{dialogtitle}</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelcallback} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={okcallback} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ActionConfirmDialog;