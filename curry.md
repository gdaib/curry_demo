函数式编程是一种编程风格，它可以将函数作为参数传递，并返回没有副作用的函数。

由于这种风格具有传递和返回函数的能力，它带来了许多概念:

- 纯函数
- 柯里化
- 高阶函数。

接来下我们谈到的概念就是其中的**柯里化**。

## Currying（柯里化） in JavaScript

![js](https://cdn-images-1.medium.com/max/1600/1*RZ5E9_cqR-mG6yXmfEYDFQ.png)

### 什么是柯里化？

柯里化其实是函数式编程的一个过程，在这个过程中我们能把一个带有多个参数的函数转换成一系列的嵌套函数。它返回一个新函数，这个新函数期望传入下一个参数。

它会不断返回新函数，直到所有的参数都被使用。参数会一直 **alive**（通过闭包），当柯里化函数链中最后一个函数被调用的时候，它们就会用于执行。

下面我们有一个三个参数的函数。

```js
const add = (a, b, c) => a + b + c;

add(1, 2, 3); // 6

add(1, 2); // NaN
```

我们柯里化这个函数，会得到
```js
const curryAdd = function(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
};

curryAdd(1)(2)(3); // 6
```

但是这样柯里化就太麻烦了，有没有一种比较通用的做法？

导入 **lodash/curry**  就可以对现有函数进行柯里化

```js
const curryAdd = curry(add);

curryAdd(1)(2)(3); // 6
```

可以看到，每次我们只传入一个参数，然后返回一个新的函数期待下一个参数。

### 柯里化的应用

```js
// 示意
class Ajax {
  constructor() {
    this.xhr = new XMLHttpRequest()
  }

  open(type, url, data, callback) {
    this.onload = function() {
      callback(this.xhr.responseText, this.xhr.status, this.xhr)
    }
    this.xhr.open(type, url, data.async)
    this.xhr.send(data.params)
  }
}

// 
;['get', 'post', 'put', 'delete'].forEach(method => {
  Ajax.prototype[method] = currying(Ajax.prototype.open, method)
})





// 虽然 ajax 函数比较通用，但在重复调用的时候参数冗余

```

### 函数柯里化作用

- 函数柯里化帮助我们避免重复传入相同的参数
- 创建高阶函数
- 编写可以轻松重用的小代码模块(动态创建函数)

### 编写自己的柯里化函数

```js
// 创建 curry 函数
const curry = (fn, ...args) =>
  args.length >= fn.length
    ? fn(...args)
    : (...more) => curry(fn, ...args, ...more);

// 创建乘积函数
const multiply = (x, y, z) => x * y * z;

// 把乘积函数变为 curry 函数
const curryMul = curry(multiply);

// 执行结果
curryMul(2)(10)(20); // 400
```

### 反柯里化

```js
// 声明反柯里化函数
const uncurry = fn => (...args) => fn(...args);

// 拿上面的柯里化例子中做示范
const curryMul = curry(multiply);

// 变回一次性传所有值触发机制
uncurry(curryMul)(2, 10, 20); // 400
```
