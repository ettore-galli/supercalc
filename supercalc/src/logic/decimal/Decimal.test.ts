import Money from './money';

test.each([
  { raw_input: "123456789.123456789", expected_integer: 123456789, expected_decimal: 123456789 },
  { raw_input: ".123456789", expected_integer: 0, expected_decimal: 123456789 },
  { raw_input: "123456789", expected_integer: 123456789, expected_decimal: 0 },
  { raw_input: "3.1415927", expected_integer: 3, expected_decimal: 141592700 },
  { raw_input: "2.71", expected_integer: 2, expected_decimal: 710000000 }
])('Money raw input is parsed correctly', ({ raw_input, expected_integer, expected_decimal }) => {
  const m = Money.fromRawInput(raw_input);

  expect(m.integer).toEqual(expected_integer);
  expect(m.decimal).toEqual(expected_decimal);
});



test.each([
  { a: "1", b: "3.14", expected_integer: 4, expected_decimal: 140000000 },
  { a: "1.01", b: "2.02", expected_integer: 3, expected_decimal: 30000000 }
])('Money sum behaves correctly', ({ a, b, expected_integer, expected_decimal }) => {
  const da = Money.fromRawInput(a);
  const db = Money.fromRawInput(b);

  expect(da.add(db)).toEqual(new Money(expected_integer, expected_decimal));

});

test.each([
  { a: "100", b: "0.01", expected_integer: 99, expected_decimal: 990000000 },
  { a: "50", b: "7", expected_integer: 43, expected_decimal: 0 }
])('Money sub behaves correctly', ({ a, b, expected_integer, expected_decimal }) => {
  const da = Money.fromRawInput(a);
  const db = Money.fromRawInput(b);

  expect(da.sub(db)).toEqual(new Money(expected_integer, expected_decimal));

});


test.each([
  { a: "3.14", b: "2.00", expected_integer: 6, expected_decimal: 280000000 },
  { a: "50", b: "7", expected_integer: 350, expected_decimal: 0 },
  { a: "7", b: "1.0000005", expected_integer: 7, expected_decimal: 3500 }
])('Money mul behaves correctly', ({ a, b, expected_integer, expected_decimal }) => {
  const da = Money.fromRawInput(a);
  const db = Money.fromRawInput(b);

  expect(da.mul(db)).toEqual(new Money(expected_integer, expected_decimal));

});  

test.each([
  { a: "340", b: "2.00", expected_integer: 170, expected_decimal: 0 },
  { a: "340", b: "3.40", expected_integer: 100, expected_decimal: 0 },
  { a: "3.14", b: "2.00", expected_integer: 1, expected_decimal: 570000000 },
  { a: "3", b: "7", expected_integer: 0, expected_decimal: 428571428 },
  { a: "6.765", b: "5.5", expected_integer: 1, expected_decimal: 230000000 },
  { a: "1234.567", b: "890.123", expected_integer: 1, expected_decimal: 386962251 }
])('Money div behaves correctly', ({ a, b, expected_integer, expected_decimal }) => {
  const da = Money.fromRawInput(a);
  const db = Money.fromRawInput(b);

  expect(da.div(db)).toEqual(new Money(expected_integer, expected_decimal));

}); 

