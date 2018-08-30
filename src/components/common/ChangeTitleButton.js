import React from 'react'
import Button from '@material-ui/core/Button';
import SuperCalcComponent from './SuperCalcComponent';

class ChangeTitleButton extends SuperCalcComponent {
    render() {
        return (
            <Button
                variant="raised"
                onClick={() => this.SuperCalcStatus.setTitle(this.props.newTitle)}
            >{this.SuperCalcStatus.getTitle()}</Button>
        )
    }
}

export default ChangeTitleButton