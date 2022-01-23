## Vue不同构建版本  

> Full、Runtime-only

同时包含`编译器`和`运行时`的版本，例`vue.js`  

编译器：编译`new Vue`中的`template`选项的编译  
运行时：用来创建`Vue实例`，不包含`编译器`  

> UMD、CommonJS、ESModule

UMD：通用模块版本，支持多种模块方式，例`vue.js`
EMS：ESM格式被设计为可以被静态分析，所以打包工具可以利用这一点来进行`tree-shaking`

vue-cli创建的项目最终使用的是`ES Module`，即`vue.runtime.esm.js`，可以看到`vue Cli3`配置文件中有
```
resolve: { 
    alias: { 
        vue$: 'vue/dist/vue.runtime.esm.js'
    } 
}
注：其中$为精确匹配的意思
```

## 源码分析

### 入口文件

web平台，完整版入口文件：entry-runtime-with-compiler.js  

`el`不能是`body`或`html`标签  
`render`函数优先级高于`template`，且最终都转化为`render`  
`如果有render`，则直接调用`mount`挂载DOM  


### 数组响应式原理

通过重写数组的原生方法进行`依赖通知`，响应式方法包含：`push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse`  

因此数组的`arr[0] = 1`、`arr.length = 1`
并非响应式，修改后数据发生变化但未通知到视图更新
通过`array.splice(0, 1, '2')`可以代替直接通过下标修改数组的值

> $set 和 Vue.set(target, key, val) 

当`target`为数组时，实际是调用的`target.splice(key, 1, val)`直接修改的值，并返回`val`

> 三种watcher：

计算属性Watcher、用户Watcher($watch)、渲染Watcher  

创建顺序：计算属性、用户、渲染

> nextTick 

调用方法优先级

Promise.then > MutatuibIvserver > setImmediate（IE、Node）> setTimeout

一些需要注意点：

1. Promise.then调用时，更新的是DOM树，但是浏览器还未将DOM树更新到浏览器视图中
2. 在UIwebView in iOS >= 9.3.3降级使用的`setTimeout`，因其并未完全实现了`Promise`

> render

1. vue2.x中，`template`模版编译时，会连带着把`空格`也一起带着转换为`render`函数，因此在开发时尽量减少无用`空格`
2. vue3.x中则会自动对无用空格进行删除

> updateChildren

diff算法核心代码逻辑，位于: `src/core/vdom/patch.js`