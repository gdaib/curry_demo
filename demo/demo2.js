const curry = (fn, ...args) =>
  args.length >= fn.length
    ? fn(...args)
    : (...more) => curry(fn, ...args, ...more);

const uncurrying = (fn) => (...args) => fn(...args)

const multiply = (a, b, c) => a * b * c;

const multiplyCurry = curry(multiply)


console.log(uncurrying(multiplyCurry)(2, 10, 20));

console.log(multiplyCurry(2)(10)(20));