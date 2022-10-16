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

    add(other: Money): Money {
        const decimalSum = this.decimal + other.decimal;
        const rem = decimalSum % Money.PRECISION;
        const div = (decimalSum - rem) / Money.PRECISION;
        console.log("decimalSum", decimalSum)
        console.log("rem", rem)
        console.log("div", div)
        return new Money(this.integer + other.integer + div, rem);
    }

    sub(other: Money): Money {
        return other
    }

    mul(other: Money): Money {
        return other
    }

    div(other: Money): Money {
        return other
    }

}

export default Money;