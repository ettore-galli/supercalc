class Money {
    static PRECISION = 1000000000;
    static FILLER = "0000000000";
    static SEPARATOR = ".";

    integer: number;
    decimal: number;

    constructor(integer: number, decimal: number) {
        [this.integer, this.decimal] = [integer, decimal];
    }


    static fromRawInput(raw_value: string): Money {
        const [integer, decimal] = Money.parseRawInput(raw_value, Money.SEPARATOR);
        return new Money(integer, decimal)
    }

    static parseRawInput(raw_value: string, separator: string): [number, number] {
        const parts = (raw_value.trim() + ".").split(separator);

        const integer: number = parseInt(parts[0] || "0");
        const decimal: number = parseInt((parts[1] + Money.FILLER).slice(0, 9) || "0");

        return [integer, decimal]
    }

    normalize(unnormalized: Money): Money {
        const [div, rem] = this.integerDivision(unnormalized.decimal, Money.PRECISION)
        return new Money(unnormalized.integer + div, rem);
    }

    add(other: Money): Money {
        return this.normalize(new Money(this.integer + other.integer, this.decimal + other.decimal));
    }

    sub(other: Money): Money {
        const decimalSub = this.decimal - other.decimal;
        const decimal = decimalSub >= 0 ? decimalSub : Money.PRECISION + decimalSub;
        const integer = this.integer - other.integer - (decimalSub < 0 ? 1 : 0);
        return new Money(integer, decimal);
    }

    mul(other: Money): Money {
        const integer = this.integer * other.integer;
        const decimal = this.decimal * other.integer + this.integer * other.decimal;
        return this.normalize(new Money(integer, decimal));
    }

    div(other: Money): Money {
        const thisAsInteger = this.integer * Money.PRECISION + this.decimal;
        const otherAsInteger = other.integer * Money.PRECISION + other.decimal;

        const [q1, r1] = this.integerDivision(thisAsInteger, otherAsInteger);
        const [q2, _] = this.integerDivision(r1 * Money.PRECISION, otherAsInteger);

        return this.normalize(new Money(q1, q2));
    }

    integerDivision(alfa: number, beta: number): [number, number] {
        const quot = Math.trunc(alfa / beta);
        const rem = alfa - (beta * quot);
        return [quot, rem];
    }


}

export default Money; // * 3486621807