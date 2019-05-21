Function.prototype.bind2 = function(context) {

  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }
  let args = [].slice.call(arguments, 1),
    fn = this,
    f = function() {};

  let Bound = function() {
    let bingArgs = args.concat([].slice.call(arguments));
    return fn.apply(this instanceof f ? this : context, bingArgs);
  };

  f.prototype = this.prototype
  Bound.prototype = new f();
  return Bound;
};

function hello(age, word) {
  console.log(this.name, " age is ", age, ", he say ", word);
}

let obj = {
  name: "cjff"
};

hello.bind(obj, 20)("hello world");


new (hello.bind(obj))(20, "hello")