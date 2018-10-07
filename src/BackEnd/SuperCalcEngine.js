import Rational from './Rational';

class SuperCalcEngine {
    static __NO_FINAL_DESTINATION = "";


    static __parseFinalDestination(fd) {
        if (fd) {
            return fd.trim().toUpperCase();
        } else {
            return SuperCalcEngine.__NO_FINAL_DESTINATION;
        }
    }

    static parseFinalDestination(fd) {
        return SuperCalcEngine.__parseFinalDestination(fd);
    }

    static __getPreprocessedRow(row) {
        return {
            ...row,
            unit_price: Rational.parse(row.unit_price, Rational.__ZERO),
            quantity: Rational.parse(row.quantity, Rational.__ONE),
            final_destination_1: SuperCalcEngine.__parseFinalDestination(row.final_destination_1),
            final_destination_2: SuperCalcEngine.__parseFinalDestination(row.final_destination_2)
        }
    }
    static getRationalRow(row) {
        return SuperCalcEngine.__getPreprocessedRow(row);
    }

    static __calcTotalPrice(row) {
        return Rational.mult(row.unit_price, row.quantity);
    }

    static getRowWithTotalPrice(row) {
        const rrow = SuperCalcEngine.__getPreprocessedRow(row);
        return {
            ...rrow,
            total_price: SuperCalcEngine.__calcTotalPrice(rrow)
        }
    }

    static getFloatTotalPrice(row) {
        if (row) {
            return Rational.transparent_string(SuperCalcEngine.getRowWithTotalPrice(row).total_price)
        } else {
            return ""
        }
    }

    static __getFinalDestinationsSubtotals = function (list, final_destination_field_name) {
        return list.reduce(
            function (finalDestinationTotals, item) {
                if (!finalDestinationTotals.hasOwnProperty(item[final_destination_field_name])) {
                    finalDestinationTotals[item[final_destination_field_name]] = Rational.__ZERO;
                }
                finalDestinationTotals[item[final_destination_field_name]] = Rational.add(
                    finalDestinationTotals[item[final_destination_field_name]],
                    item.total_price
                )
                return finalDestinationTotals
            }, {}
        )
    }

    static findFinalDestinationIndex(final_destination, final_destination_totals) {
        let fdlist = Object.keys(final_destination_totals)
        for (let i = 0; i < fdlist.length; i++) {
            let fd = fdlist[i];
            if (this.__parseFinalDestination(final_destination) === fd) {
                return i;
            }
        }
        return -1;
    }

    static __getGrandTotal = function (list) {
        return list.reduce(
            function (total, item) {
                total = Rational.add(total, item.total_price)
                return total
            }, Rational.__ZERO
        )
    }

    static listFullProcessing(list) {
        const calclist = list.map(SuperCalcEngine.getRowWithTotalPrice);
        let grand_total = SuperCalcEngine.__getGrandTotal(calclist);
        let grand_total_float = Rational.float(grand_total);
        return {
            final_destination_1_totals: SuperCalcEngine.__getFinalDestinationsSubtotals(calclist, "final_destination_1"),
            final_destination_2_totals: SuperCalcEngine.__getFinalDestinationsSubtotals(calclist, "final_destination_2"),
            grand_total: grand_total,
            grand_total_float: grand_total_float
        }
    }

} // End class

export default SuperCalcEngine