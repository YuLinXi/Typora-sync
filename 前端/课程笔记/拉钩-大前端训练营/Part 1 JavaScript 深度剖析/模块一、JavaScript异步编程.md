
## 异步模式 

不会等待这个任务的结束才开始下一个任务，开启过后就立即执行下一个任务，后续逻辑一般会通过回调函数的方式定义 

Javascript是单线程，浏览器并不是单线程，例如`settimeout`是单独的线程去计时

## 回调函数

所有异步编程方案的根基，由调用者定义，交给执行者执行的函数

## Promise 

> 概述  

避免`回调地狱`，由`commonJS`社区率先提出了`Promise`规范，后来被`ES2015`被标准化，成为了语言规范  

Promise的状态一旦被确定后就不能被修改  
即使`const p = new Promise(fn)`，fn中没有异步操作，执行`p.then(fn2)`时，fn2依然会进入`消息队列`

> 常见误区  

误区：嵌套使用`Promise`  
应该借助`Promise.then的`链式调用

> 链式调用 

- `Promise.then`会返回一个全新的`Promise`对象  
- 后面的`then`方法为上一个`then`返回的`Promise`注册回调  
- 前面`then`方法中回调函数返回的值会作为后面`then`方法回调的参数
- 如果回调中返回的是`Prmose`，那后面的`then`方法的回调会等待它的结束

浏览器环境，全局对象可以注册`unhandledrejection`事件去捕获所有`没有被捕获`的异常。Node环境在`process`中注册`unhandledRejection`事件

> 执行时序 

回调队列中的任务称之为`宏任务`，`宏任务`执行过程中可以临时加上一些`额外需求`，对于这些`额外需求`可以选择作为一个新的`宏任务`进到队列中排队，也可以作为当前任务的`微任务`，直接在当前任务结束过后`立即执行`

`Promise`回调会作为微任务立即执行

> 微/宏任务  

微任务：提高整体的响应能力，例如`Promise`、`MutationObserver`、`process.nextTick`  
宏任务：目前绝大多数异步调用都是宏任务

https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide/in_depth

## Generator 异步方案

ES2015

解决使用`Promise`去解决异步任务串联执行时，仍然会有大量的回调函数，没有办法达到传统同步代码的可读性  

`Generator 生成器`的函数`执行器`，使用递归实现更加通用  

## Async / Await 语法糖

ES2017

是`Generator 生成器`函数更友好的语法糖
