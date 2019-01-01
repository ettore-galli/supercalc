import React from 'react'

import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import BaseComponent from './common/BaseComponent';

import superCalcStateManager from '../BackEnd/SuperCalcStateManager';


class CompareDialog extends BaseComponent {
    __NCOMPARE = 3;

    componentDidMount() {
        if (this.props.autoupdate || false) {
            superCalcStateManager.addForceUpdateComponent(this);
        }
    }

    qFieldName(index) {
        return "QT_" + String(index);
    }

    tFieldName(index) {
        return "TOT_" + String(index);
    }

    uFieldName(index) {
        return "UNI_" + String(index);
    }

    qLabel(index) {
        return "Quantità " + String(index + 1);
    }

    tLabel(index) {
        return "Totale" + String(index + 1);
    }

    uLabel(index) {
        return "Pr. unitario" + String(index + 1);
    }

    recalc(index) {
        const ndec = 5;
        const decfact = 10 ** ndec;
        try {

            let q = this.getFieldValue(this.qFieldName(index));
            let t = this.getFieldValue(this.tFieldName(index));
            let u = Math.round(decfact * (t / q)) / decfact;
            this.setFieldValue(this.uFieldName(index), u)
        } catch (e) {
            console.log(e)
            this.setFieldValue(this.uFieldName(index), "")
        }
    }

    setQuantity(index, q) {
        this.setFieldValue(
            this.qFieldName(index),
            q,
            () => { this.recalc(index) }
        )
    }

    setTotal(index, t) {
        this.setFieldValue(
            this.tFieldName(index),
            t,
            () => { this.recalc(index) }
        )
    }

    getUnit(index) {
        return this.getFieldValue(this.uFieldName(index));
    }

    renderItemInputPanel() {

        // Render
        return (
            <Dialog
                open={this.props.open}

                onEntering={
                    () => {
                    }
                }

            >
                <DialogTitle>{this.props.dialogtitle || "CONFRONTO"}</DialogTitle>
                <DialogContent>
                    {Array(this.__NCOMPARE).fill(0).map((v, i) => { return i }).map((index) => {
                        let q_field_name = this.qFieldName(index);
                        let t_field_name = this.tFieldName(index);
                        let u_field_name = this.uFieldName(index);

                        return (
                            <Grid container key={index} spacing={32}>
                                <Grid
                                    key={q_field_name}
                                    item xs={4}>
                                    <TextField
                                        fullWidth={false}
                                        label={this.qLabel(index)}
                                        onChange={(event) => {
                                            this.setQuantity(
                                                index,
                                                event.target.value)
                                        }}
                                        name={q_field_name}
                                        value={this.getFieldValue(q_field_name)}
                                        type={"number"}
                                        step={2}
                                    >
                                    </TextField>
                                </Grid>

                                <Grid
                                    key={t_field_name}
                                    item xs={4}>
                                    <TextField
                                        fullWidth={false}
                                        label={this.tLabel(index)}
                                        onChange={(event) => {
                                            this.setTotal(
                                                index,
                                                event.target.value)
                                        }}
                                        name={t_field_name}
                                        value={this.getFieldValue(t_field_name)}
                                        type={"number"}
                                        step={2}
                                    >
                                    </TextField>
                                </Grid>

                                <Grid
                                    key={u_field_name}
                                    item xs={4}>
                                    <TextField
                                        disabled={true}
                                        label={this.uLabel(index)}
                                        name={u_field_name}
                                        value={this.getUnit(index)}
                                    >
                                    </TextField>
                                </Grid>

                            </Grid>
                        );
                    })}
                </DialogContent>
                <DialogActions>
                    <Button color="default" onClick={
                        () => {
                            this.props.closecallback();
                        }
                    }>CLOSE</Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        return this.renderItemInputPanel(this.props.rowId);
    }
}

export default CompareDialog