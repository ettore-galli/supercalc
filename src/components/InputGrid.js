import React from 'react'
import InputGridRow from './InputGridRow';
import SuperCalcComponent from './common/SuperCalcComponent';
import SuperCalcEngine from '../BackEnd/SuperCalcEngine';
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
        // Get the list of items
        const items_list = this.SuperCalcStatus.getItems();
        // Render the list
        return (
            <table>
                <tbody>
                    {
                        this.renderItemsList(items_list)
                    }
                </tbody>
            </table>
        )

    }
}

export default InputGrid