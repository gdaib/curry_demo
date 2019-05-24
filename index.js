// const curry = require("lodash/curry");

// console.log(curry);

// const add = (a, b, c) => a + b + c

// console.log(add(1, 2, 3));
// console.log(add(1, 2));

// let curryAdd = curry(add)

// console.log(curryAdd(1, 2)(3));
// console.log(curryAdd(1)(2)(3));


// const _curryAdd = function(a) {
//   return function(b) {
//     return function(c) {
//       return a + b + c;
//     };
//   };
// };

// console.log(_curryAdd(1)(2)(3));

Function.prototype.bind2 = function(context) {
  let args = [].slice.call(arguments, 1),
    fn = this,
    fONP = function() {};
  function Bound () {
    return fn.apply(
      this instanceof fONP ? {} : context,
      [].concat(args, [].slice.call(arguments))
    );
  }

  fONP.prototype = this.prototype;
  Bound.prototype = new fONP()

  return Bound;
}

const o = {
  name: 'obj'
}

function sayHello(word, other) {
  console.log(this.name, " say ", word, other);
}


sayHello.bind2(o, 'hello world')('  fun call')

new (sayHello.bind2(o, 'hello world'))('   new call')