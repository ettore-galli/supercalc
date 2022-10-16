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

])('Money sum behaves correctly', ({ a, b, expected_integer, expected_decimal }) => {
  const da = Money.fromRawInput(a);
  const db = Money.fromRawInput(b);

  expect(da.add(db)).toEqual(new Money(expected_integer, expected_decimal));

});


