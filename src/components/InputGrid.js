import React from 'react'
import InputGridRow from './InputGridRow';
import SuperCalcComponent from './common/SuperCalcComponent';

class InputGrid extends SuperCalcComponent {

    renderItemsList(items) {
        return items.map(
            (item, i) => {
                return (
                    <InputGridRow
                        row={item}
                        rowIndex={i}
                        key={i}>
                    </InputGridRow>
                )
            }
        ).concat([(
            < InputGridRow
                row={null}
                rowIndex={null}
                key={items.length}>
            </InputGridRow >
        )
        ])
    }

    render() {
        return (
            <table>
                <tbody>
                    {
                        this.renderItemsList(this.SuperCalcStatus.getItems())
                    }
                </tbody>
            </table>
        )

    }
}

export default InputGrid