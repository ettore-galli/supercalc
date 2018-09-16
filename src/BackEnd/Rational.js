/**
 * Implements Rational Number Operations
 */
class Rational {

    static __SUPPORTED_DECIMAL_DIGITS = 9;
    static __RATIONAL_DENOMINATOR = 1000000000;
    static __APPENDABLE_ZEROS = "000000000";
    static __NAN = [NaN, Rational.__RATIONAL_DENOMINATOR];
    static __ZERO = [0, Rational.__RATIONAL_DENOMINATOR];
    static __ONE = [Rational.__RATIONAL_DENOMINATOR, Rational.__RATIONAL_DENOMINATOR];

    static parse(f, defaultValue) {
        defaultValue = defaultValue || Rational.__NAN;
        //if (isNaN(f) || (f === "") || (f === null)) {
        if ((f === "") || (f === null)) {
            return defaultValue;
        }
        const fs = String(f).replace(",", ".");
        const pdb = (fs.indexOf(".") > -1) ? fs.split(".") : [fs, "0"];
        const n = parseInt([pdb[0], (pdb[1] + Rational.__APPENDABLE_ZEROS).substr(0, Rational.__SUPPORTED_DECIMAL_DIGITS)].join(""), 10);
        if (isNaN(n)) {
            return defaultValue;
        }
        return [n, Rational.__RATIONAL_DENOMINATOR];
    }

    static add(a, b) {
        return [a[0] + b[0], Rational.__RATIONAL_DENOMINATOR];
    }

    static sub(a, b) {
        return [a[0] - b[0], Rational.__RATIONAL_DENOMINATOR];
    }

    static neg(a) {
        return [-a[0], Rational.__RATIONAL_DENOMINATOR];
    }

    static mult(a, b) {
        return [Math.trunc((a[0] * b[0]) / Rational.__RATIONAL_DENOMINATOR), Rational.__RATIONAL_DENOMINATOR];
    }

    static div(a, b) {
        return [Math.trunc(Rational.__RATIONAL_DENOMINATOR * a[0] / b[0]), Rational.__RATIONAL_DENOMINATOR];
    }

    static inv(a) {
        return Rational.div(Rational.__ONE, a);
    }

    static float(g) {
        return g[0] / g[1]
    }

    static transparent_string(g) {
        if (typeof g === 'object') {
            let floatOut = String(Rational.float(g));
            if (floatOut) {
                return floatOut;
            } else {
                return "";
            }
        } else if (g !== undefined && g !== null) {
            return g;
        } else {
            return "";
        }

    }

    static repr(g, d) {
        return (d ? d : "", g, Rational.float(g));
    }
}

export default Rational