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
        const [div, rem] = this.idiv(unnormalized.decimal, Money.PRECISION)
        return new Money(unnormalized.integer + div, rem);
    }

    idiv(dividend: number, divisor: number): [number, number] {
        const rem = dividend % divisor;
        const quot = (dividend - rem) / divisor;
        return [quot, rem]
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
        return other
    }

}

export default Money;