import Rational from './Rational';

it('parses a number', () => {
  let ra = Rational.parse("3.1415");
  expect(ra).toEqual([3141500000, 1000000000])
});

it('sum works', () => {
  let a = Rational.parse("0.1");
  let b = Rational.parse("0.2");
  let c = Rational.add(a, b);
  expect(c).toEqual([300000000, 1000000000])
});

it('subtraction works', () => {
  let a = Rational.parse("0.777");
  let b = Rational.parse("0.222");
  let c = Rational.sub(a, b);
  expect(c).toEqual([555000000, 1000000000])
});

it('multiplication works', () => {
  let a = Rational.parse("0.123");
  let b = Rational.parse("0.3");
  let c = Rational.mult(a, b);
  expect(c).toEqual([36900000, 1000000000])
});

it('division works', () => {
  let a = Rational.parse("7.2");
  let b = Rational.parse("5.1");
  let c = Rational.div(a, b);
  expect(c).toEqual([1411764705, 1000000000])
});