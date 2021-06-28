
> 实现分析

1. Promise 就是一个类，执行这个类的时候，需要传递一个`执行器`，执行器会立即执行
2. Promise 中有三种状态，分别为`fulfilled`、`rejected`、`pending`，并且`pending -> fulfilled`，`pending -> rejected`，一旦状态确定就不可更改
3. `resolve`和`reject`函数是用来更改状态的
4. 返回一个`promise对象`，含有`then方法` ，`then`方法里含有`成功回调`、`失败回调`函数
5. 记录`resolve`，`reject`函数传递的参数，作为`then`成功或失败回调的参数


> 类核心逻辑实现

```
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    status = PENDING;
    value = undefined;
    reason = undefined
    constructor(executor) {
        executor(this.resolve, this.reject);
    }

    resolve = (value) => {
        if (this.status !== PENDING) { return }
        this.status = FULFILLED;
        this.value = value;
    }

    reject = (reason) => {
        if (this.status !== PENDING) { return }
        this.status = REJECTED;
        this.reason = reason
    }

    then (successCallback, failCallback) {
        if (this.status === FULFILLED) {
            successCallback(this.value);
        }
        if (this.status === REJECTED) {
            failCallback(this.reason);
        }
    }
}

```
重点解释：

- `resolve`，`reject`函数使用箭头函数的原因是让其被调用时，`this`上下文为`MyPromise类`
- 状态使用常量来定义，因为代码中大量使用常量判断，是为了便于使用且`IDE含有代码提示`

> 加入异步逻辑 

通过在`pending`状态时缓存`successCallback`和`failCallback`函数，可实现异步逻辑

> 实现then方法多次调用 

将`successCallback`和`failCallback`用数据储存起来，然后循环调用

```
class MyPromise {
    ...

    successCallback = [];

    failCallback = [];

    resolve = value => {
        ...

        if (this.successCallback.length) {
            this.successCallback.forEach(fn => fn(this.value))
        }
    }

    reject = reason => {
        ...

        if (this.failCallback.length) {
            this.failCallback.forEach(fn => fn(this.reason))
        }
    }

    then (successCallback, failCallback) {
        if (this.status === FULFILLED) {
            successCallback(this.value)
        } else if (this.status === REJECTED) {
            failCallback(this.reason);
        } else {
            this.successCallback.push(successCallback)
            this.failCallback.push(failCallback)
        }
    }
}
```

> 实现then方法的链式调用 

在`then`方法里返回新的`new Mypromise`，并且将`successCallback`返回值作为新promise中`resolve调用`参数传入  
```
class MyPromise {
    ...

    then (successCallback, failCallback) {
        const promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                let x = successCallback(this.value)
                resolve(x);
            } else if (this.status === REJECTED) {
                let y = failCallback(this.reason);
                reject(y)
            } else {
                this.successCallback.push(successCallback)
                this.failCallback.push(failCallback)
            }
        });
        return promise2;
    }
}
```

`then`函数回调也可以返回一个`值`或`Promise对象`传递给下个`then`函数的返回参数

```
## 处理同步情况

class MyPromise {
    ...
    
    static resolvePromise(x, resolve, reject) {
        if (x instanceof MyPromise) {
            x.then(resolve, reject);
        } else {
            resolve(x);
        }
    }

    then (successCallback, failCallback) {
       const promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                let x = successCallback(this.value);
                MyPromise.resolvePromise(x, resolve, reject);
            } 
            ...
        });
        return promise2;
    }
}
```

> 识别循环调用

通过判断`x`与`promise2`是否相等，同时通过`settimeout(, 0)`来延迟执行`resolvePromise`函数，确保能拿到`promise2`的值

> 捕获错误 及 处理异步逻辑

在执行构造器时和执行`successCallBack`函数时进行异常捕获

> 将then函数的参数变成可选参数

对`successCallback`和`failCallback`参数进行`Function`类型判断，如果`不存在`或`非Function`参数则对其值覆盖为  

> Promise.all 方法

`Promise.all`方法为静态属性，使用`static all () {}` 定义，同时返回`MyPromise`对象

> Promise.resolve 方法

通过返回`this.then()`实现

> Promise.resolve 方法

判断`value`参数是否已经为`MyPromise`对象，如果是则直接返回，否则返回`this.then()`

> finally 实现

通过返回`this.then()`，同时在其`失败`或`成功`回调函数里调用`MyPromise.resove`

> catch 方法

`return this.then(undefined, failCallback)`