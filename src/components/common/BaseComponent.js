import React from 'react'

class BaseComponent extends React.Component {
    __EMPTY_FIELD_VALUE = "";

    state = {
        component_fields: {}
    };

    getFieldValue(field_name) {
        if (this.state) {
            if (this.state.component_fields[field_name]) {
                return this.state.component_fields[field_name];
            } else {
                return this.__EMPTY_FIELD_VALUE;
            }
        } else {
            return this.__EMPTY_FIELD_VALUE;
        }
    }

    setAllFields(fields) {
        this.setState(
            (state) => {
                let newState = Object.assign({}, state);
                newState.component_fields = fields;
                return newState;
            }
        )
    }

    getAllFields() {
        if (this.state) {
            return this.state.component_fields;
        } else {
            return {};
        }
    }

    setFieldValue(field_name, value, callback) {
        this.setState(
            (state) => {
                let newState = Object.assign({}, state);
                if (!newState.component_fields){
                    newState.component_fields = {};
                }
                newState.component_fields[field_name] = value;
                return newState;
            },
            callback
        )
    }

    clearFields(){
        this.setState(
            (state) => {
                let newState = Object.assign({}, state);
                newState.component_fields = {};
                return newState;
            }
        )
    }

}

export default BaseComponent