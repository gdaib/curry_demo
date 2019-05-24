函数式编程是一种编程风格，它可以将函数作为参数传递，并返回没有副作用的函数。

由于这种风格具有传递和返回函数的能力，它带来了许多概念:

- 纯函数
- 柯里化
- 高阶函数。

接来下我们谈到的概念就是其中的**柯里化**。

## Currying（柯里化） in JavaScript

![js](https://cdn-images-1.medium.com/max/1600/1*RZ5E9_cqR-mG6yXmfEYDFQ.png)

### 什么是柯里化？

柯里化其实是函数式编程的一个过程，在这个过程中我们能把一个带有多个参数的函数转换成一系列的嵌套函数。它总是返回一个新函数，这个新函数期望传入下一个参数。

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

可以看到，每次我们只传入一个参数，然后返回一个新的函数期待下一个参数。

### 柯里化的应用

```js
// 示意
function ajax(type, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.send(data);
}


// 虽然 ajax 函数比较通用，但在重复调用的时候参数冗余
ajax('POST', 'http://wwww.test.com', 'name=spaas')
ajax('POST', 'http://wwww.test2.com', 'name=spaas')
ajax('POST', 'http://wwww.test3.com', 'name=spaas')

// 利用 curry
const ajaxCurry = curry(ajax)
const postAjax = ajaxCurry('POST')

postAjax('http://www.test.com', 'name=spaas')
```

curry 这种用途可以理解为，本质上一个降低通用性，提高适用性的


还有一种用途是用在 map 等高阶函数里面

```js
const person = [{name: 'tom'}, {name: 'jeny'}, {name:'john'}]
```

我们想要获得数组里面的 name, 可能会
```js
person.map(item => item.name)
```

如果我们有 curry 函数:
```js
const prop = curry((key, obj) => obj[key])
```

获取所有的 name
```js
// 看代码就清楚，我们是在获取这个数组的 name 值
person.map(prop('name'))
```

为了获取一个name值，我们进行了一次封装，这样会不会有点麻烦？

其实不然，prop 函数是可以进行复用的，比如我想取别的数组的 id 列表 `list.map(prop('id'))` 就可以了。

### 参数复用
```js
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


参考资料:
> [JavaScript 专题之函数柯里化](https://juejin.im/post/598d0b7ff265da3e1727c491)