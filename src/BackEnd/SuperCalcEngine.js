import Rational from './Rational';

class SuperCalcEngine {
    static __getRationalRow(row) {
        return {
            ...row,
            unit_price: Rational.parse(row.unit_price, Rational.__ZERO),
            quantity: Rational.parse(row.quantity, Rational.__ONE),
        }
    }
    static getRationalRow(row) {
        return SuperCalcEngine.__getRationalRow(row);
    }

    static __calcTotalPrice(row) {
        return Rational.mult(row.unit_price, row.quantity);
    }

    static getRowWithTotalPrice(row) {
        const rrow = SuperCalcEngine.__getRationalRow(row);
        return {
            ...rrow,
            total_price: SuperCalcEngine.__calcTotalPrice(rrow)
        }
    }

    static getFloatTotalPrice(row) {
        if (row) {
            return Rational.transparent_string(SuperCalcEngine.getRowWithTotalPrice(row).total_price)
        } else {
            return null
        }

    }

}

export default SuperCalcEngine