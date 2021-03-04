> ECMAScript概述

`JavaScript`是`ECMAScript`的扩展语言，`ECMAScript`只提供了最基本的语法。  
`JavaScript`语言本身指的就是`ECMAScript`  

浏览器环境中：JavaScript = ECMAScript + WebApis  
nodes环境中：JavaScript = ECMAScript + NodeApis

> ES6概述

相比上个版本ES5.1的变化比较大  
自此，标准命名规则发生变化  
使用`ES6`来泛指自`ES5.1`过后所有的新标准  

ECMAScript语言规范：http://www.ecma-international.org/ecma-262/6.0/

重要特性：  
1. 解决原有语法的一些问题和不足
2. 对原有语法增加
3. 全新的对象、方法、功能
4. 全新的数据类型、数据结构

> var、let、const 

`let`、`const`、`class`命令声明的全局变量，不属于顶层对象的属性，自此`ES6`开始，全局变量与顶层对象的属性脱钩

建议：不用`var`，主用`const`，`let`配合使用  
注：`globalThis`，javascript运行环境的全局对象统称

> 带标签的模板字符串

对模板字符串进行加工 

const str = tag`Hello ${name}`

> 字符串的扩展方法

`startsWith`，`endsWith`，`padStart`，`padEnd`等

> Proxy 与 defineProperty

`defineProperty`只能监视属性的读写   
`Proxy`是以`非侵入`的方式监管了对象的读写  
`Proxy`可以监听到对象的更多操作，比如`删除`，其次对于数组更好的监视  
`Vue2.x`版本通过`Object.definedProperty`无法对数组对象进行监听，而是通过重写数组的操作方法来达到监听

> Reflect 

静态类，`Reflect`内部封装了一系列对对象的底层操作，其成员方法就是`Proxy`处理对象的默认实现  

`Reflect`提供了统一一套用于操作对象的API

> Symbol 

提供了一些内置`Symbol`常量，用于作为内部方法的`标识`，可以让自定义对象去实现一些`javascript内置接口`，如`Symbol.toStringTag`  
常规迭代如`for in`、`Object.keys`无法获取`Symbol`属性成员，因此`Symbol`适合作为对象`私有属性` 

`Symbol.for(name)`，用来根据`name`来创建值，`name`相同则值相同，`name`会被统一转换成`String`类型来对比，因此`Symbol.for(true) === Symbol.for('true')`

> 可迭代接口 

`for...of`循环是一种数据统一遍历方式，但无法遍历`没有实现Iterabel接口`的数据类型，如`普通对象`  

普通对象通过`Objet.entries`方法转化后可用于迭代  

```
for (const item of Object.entries({ a: 1, b: 2 })) {}
```

`Iterabel接口`实现包含三层接口：`Iterabel`、`iterator`、`iterationResult`

```
const obj = {
    store: ['a', 'b', 'c'],
    // Iterabel
    [Symbol.iterator]: function () {
        let index = 0;
        const self = this;
        // iterator
        return {
            next: function () {
                // iterationResult
                const result = {
                    value: self.store[index],
                    done: index >= self.store.length 
                }
                index ++
                return result;
            }
        }
    }
};
```

> 生成器应用

案例1：发号器，利用`yield`暂停函数的特性，配合`死`循环 

```
function * createIdMaker () {
    let id = 1;
    while (true) {
        yield id++
    }
}
```

案例2：使用`Generator`函数实现`iterator`方法

```
const obj = {
    a: 1,
    // Iterabel
    [Symbol.iterator]: function * () {
        // iterator
        const all = Object.keys(this);
        for (const key of all) {
            yield this[key];
        }
    }
};
```

> getOwnPropertyDescriptors 

主要用于配合`es6`中新增的`get`、`set`属性使用，例如当需要拷贝含有`get`、`set`的对象时

```
// 例如拷贝
const obj = {
    a: 1,
    get value() {
        return this.a + 1;
    }
}
```