const curry = require("lodash/curry");

console.log(curry);

const add = (a, b, c) => a + b + c

console.log(add(1, 2, 3));
console.log(add(1, 2));

let curryAdd = curry(add)

console.log(curryAdd(1, 2));
console.log(curryAdd(1)(2)(3));