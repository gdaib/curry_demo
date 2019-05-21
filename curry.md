## Currying（柯里化） in JavaScript

![js](https://cdn-images-1.medium.com/max/1600/1*RZ5E9_cqR-mG6yXmfEYDFQ.png)

- 什么是柯里化？
- 函数柯里化作用？
- 如何把一个现有的函数转换为一个柯里化函数？
- 函数柯里化原理


### 什么是柯里化？

> 是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

换句话说，当一个函数，而不是一次获取所有参数时，取第一个参数返回一个新的函数，该函数接受第二个函数并返回一个新的函数，它取第三个函数...以此类推，直到所有参数都取到。

也就是说，当我们将函数调用 `add(1, 2, 3)` 转换为 `add(1)(2)(3)` 。使用函数柯里化，可以帮助我们进行参数的复用。


### 函数柯里化作用
- 函数柯里化帮助我们避免重复传入相同的参数
- 创建高阶函数
- 编写可以轻松重用的小代码模块(动态创建函数)


### 如何把一个现有的函数转换为一个柯里化函数？

首先原生 JavaScript 是没有给我们提供这个柯里化函数的，但是我们可以从 `lodash` 里面引入这个函数。

```js
const curry = require('lodash/curry')

const add = (a, b, c) => a + b + c

add(1, 2, 3); // 6
add(1, 2); // NaN

const addCurry = curry(add)

addCurry(1)(2)(3) // 6
```

### 函数柯里化原理

![currying](https://cdn-images-1.medium.com/max/1200/1*0AqNShYikiqAYzBz7PHAXw.png)



### 编写自己的柯里化函数
```js
// 创建 curry 函数
const curry = (fn, ...args) => args.length >= fn.length ? fn(...args) : (...more) => curry(fn, ...args, ...more)

// 创建乘积函数
const multiply = (x, y, z) => x * y * z

// 把乘积函数变为 curry 函数
const curryMul = curry(multiply)

// 执行结果
curryMul(2)(10)(20) // 400
```

### 反柯里化
```js
// 声明反柯里化函数
const uncurry = (fn) => (...args) => fn(...args)

// 拿上面的柯里化例子中做示范
const curryMul = curry(multiply)

// 变回一次性传所有值触发机制
uncurry(curryMul)(2, 10, 20) // 400
```