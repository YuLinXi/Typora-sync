# Vue3.0 介绍

## 源码组织方式

> 源码采用`TypeScript`重写

90% Api兼容Vue2.x

> 使用`Monorepo`关节项目结构

单独测试、单独发包、相互独立、依赖明确

##### 目录释义：

```
— packages 
    — compiler-core         和平台无关的编译器
    — compiler-dom          浏览器平台下的编译器
    — compiler-sfc          编译单文件组件的编译器
    — compiler-ssr          服务端渲染编译器
    — reactivity            响应式系统（可独立使用）
    — runtime-core          和平台无关的运行时
    — runtime-dom           浏览器平台下的运行时
    — runtime-test          服务于测试的轻量级的运行时
    — server-renderer       服务端渲染相关
    — shared                vue内部使用的公共API
    — size-check            不会发布到NPM，tree-shaking后检查包的大小
    — template-explorer     浏览器里运行的实时编译组件，会输出render函数
    — vue                   完整版vue
```

* 依赖关系在`package.json`里查看


## Composition API

### 学习途径：

- RFC (Request For Comments)  

https://github.com/vuejs/rfcs

- Composition API RFC  

https://composition-api.vuejs.org/#summary

### 设计动机 

> Options API 

开发复杂组件，同一个功能逻辑的代码被拆分到不同的选项，难以维护

> Composition API

基于函数的API  

可以更灵活的组织组件的逻辑

## 性能提升  

### 响应式系统升级

使用Proxy对象重写响应式系统

- 可以监听动态新增的属性
- 可以监听删除的属性
- 可以监听数组的索引和length属性
- 初始化无需递归遍历所有层级的对象，可以在get访问时进行延迟处理。

### 编译优化

vue2.x 通过标记静态根节点，优化diff的过程   

vue3.x 标记和提升所有的静态根节点，diff的时候只需要对比动态节点内容  
- Fragments 
- 静态提升
- Patch flag
- 缓存事件处理函数

### 源码体积的优化

vue3.x移除一些不常用API 

例如：inline-template、filter等

更加友好的支持`Tree-shaking`

## Vite 

以`Es Module`为基础  
Vite在开发模式下不需要打包，可以直接运行  
生产环境下基于`Es Module`使用`Rollup`打包

特点：快速冷启动、按需编译、模块热更新  


# Composition API

### 生命周期钩子函数 

onBeforeMount、onMounted、onBeforeUpdate、onUpdated、  
onBeforeUnmount、onUnmounted、onErrorCaptured、
onRenderTracked、onRenderTriggered

### reactive 

把对象包装成`Proxy`对象，无法被解构（没有包装value属性）

### toRefs 

把`Proxy`对象中的属性都转换成响应式，包装后可以被解构。每个属性会带有一个`value`属性的响应式对象，在模板`template`中可以省略。

### ref

把`基本数据类型`转换成响应式数据，返回一个带有`value`属性的响应式对象。如果参数是一个`对象`，实则调用`reactive`返回一个`Proxy`对象

### computed 

接收一个函数   
接收一个包含有`get`、`set`函数的对象  

### watch  

接收3个参数  
返回值为一个函数，用于`取消监听`

### watchEffect 

是`watch`函数的简化版本  
接收一个函数作为参数，监听函数内响应式数据的变化  
返回一个取消监听的函数

### 自定义指令 

vue3.x中的自定义指定的`钩子函数`和`vue中的钩子函数`保持一致

# Vue3.x响应式系统原理

### Proxy 

`Proxy` 和 `Reflect` 中使用 `receiver`

`Proxy`中`receiver`：Proxy或者继承Proxy的对象  
`Reflect`中`receiver`：如果`target`对象中设置了`getter`，`getter`中的`this`指向`receiver`

### reactive 

### 依赖收集 

`track`函数  

创建三个集合，`targetMap`、`depsMap`、`dep`，其`value`分别指向下一个集合，形成一个树形结构

### 依赖更新 

`trigger`函数  


### reactive vs ref

- ref可以把基本数据类型转换成响应式对象
- ref返回的对象，重新给`value`属性赋值成对象也是响应式的
- reactive返回的对象，重新赋值丢失响应式
- reactive返回的对象不可以解构


# Vite 实现原理

迎合浏览器`ES Module`、`Http2`的普及和支持

目前只支持`vue3.x`的版本，也支持其他框架`React`等  

即时、按需编译  
更快的HRM  

开箱即用：内置`Ts`、`less/sass/stylus/postcss`内置、JSX、Web Assembly