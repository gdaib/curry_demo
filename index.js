const curry = require("lodash/curry");

console.log(curry);

const add = (a, b, c) => a + b + c

console.log(add(1, 2, 3));
console.log(add(1, 2));

let curryAdd = curry(add)

console.log(curryAdd(1, 2)(3));
console.log(curryAdd(1)(2)(3));


const _curryAdd = function(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
};

console.log(_curryAdd(1)(2)(3));

