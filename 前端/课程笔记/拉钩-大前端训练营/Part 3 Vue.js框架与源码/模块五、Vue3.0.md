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

vue2.x 通过标记静态根节点，优化diff的过程，但静态节点依然需要参与`diff`。  

vue3.x 标记和提升所有的静态节点，只有在初次`render`的时候创建一次。diff的时候只需要对比动态节点内容 。

[vue 3 Template Explorer](https://vue-next-template-explorer.netlify.app/)

- Fragments 
- 静态提升
- Patch flag（diff时检查）
- 缓存事件处理函数

```tsx
// 编译前
<div id="app">
  <div>static root
    <div>static node</div>
  </div>
  <div>static node</div>
  <div>static node</div>
  <div :id="id">{{ count }}</div>
  <button @click="handler">button</button>
</div>

// 编译后
import { createElementVNode as _createElementVNode, createTextVNode as _createTextVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = { id: "app" }
const _hoisted_2 = /*#__PURE__*/_createElementVNode("div", null, [
  /*#__PURE__*/_createTextVNode("static root "),
  /*#__PURE__*/_createElementVNode("div", null, "static node")
], -1 /* HOISTED */)
const _hoisted_3 = /*#__PURE__*/_createElementVNode("div", null, "static node", -1 /* HOISTED */)
const _hoisted_4 = /*#__PURE__*/_createElementVNode("div", null, "static node", -1 /* HOISTED */)
const _hoisted_5 = ["id"]

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    _hoisted_3,
    _hoisted_4,
    _createElementVNode("div", { id: _ctx.id }, _toDisplayString(_ctx.count), 9 /* TEXT, PROPS */, _hoisted_5),
    _createElementVNode("button", {
      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.handler && _ctx.handler(...args)))
    }, "button")
  ]))
}
```

- `_hoisted_1` ... `_hoisted_N` 为静态提升节点。
- `，9 /* TEXT, PROPS */, _hoisted_5）` 为**Patch flag**，`9`包含动态文本、和动态Props，并且`_hoisted_5`值表示动态Pros为`id`。
- `onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.handler && _ctx.handler(...args)))` 事件函数缓存。

### 源码体积的优化

vue3.x移除一些不常用API：

例如：inline-template、filter等。

大部分API都支持`Tree-shaking`。

优化源码的按需加载，更加友好的支持`Tree-shaking`，例如`transition`、`V-model`等都是按需引入。

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

```typescript
`use strict` 
const target = { 
	foo: 'Foo',
  bar: 'Bar',
  get foo1() {
    console.log(this);
    return this.cool;
  }
}

const proxy = new Proxy(target, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    return Reflect.set(target, key, value, receiver);
  },
  deleteProperty(target, key) {
    return Reflect.deleteProperty(target, key);
  }
})
```

1. `set `  和 `deleteProperty`方法都需要返回一个`Boolean`类型值。
2. `get`  和 `set` 函数中的`receiver`对象是当前创建的`proxy`对象或者继承自当前`proxy`对象的子对象。
3. 如果`target`对象中指定了`getter`，`receiver`则为`getter`调用时的`this`值。
   指定 `receiver`，以此避免代理对象包含`getter`的属性中使用`this`返回时，返回属性无法被`Proxy` 的`get`捕获。

### reactive 

1. 接受一个参数，判断这个参数是否为对象。

2. 为这个对象创建`new Proxy`拦截器，设置`get`、`set`、`deleteProperty`。

3. 返回创建的`proxy`对象。

   

#### 依赖收集 

在`get`函数中调用`track`函数收集依赖，并且当放回值为`对象`时，递归的调用`reactive`为对象添加响应式。

track函数：

创建三个集合，`targetMap`、`depsMap`、`dep`，其`value`分别指向下一个集合，形成一个树形结构。

`targetMap`中，使用`new WeakMap()`创建，其`key`为目标对象，其`value`为 `depsMap` 对象。

`depsMap`中，使用`new Map()`创建，其`key`目标对象的属性`key`，其`value `为 `dep`  对象。

`dep`中，使用`new Set()`创建，其值存储为 当前对象属性`key` 所对应的 `effect` 函数。



#### 依赖更新 

在`set` 和 `deleteProperty`  函数中调用`trigger`函数触发更新。

trigger函数：

通过`target`和`key`找到对应的`dep`的`effect`函数集合，通过遍历执行来触发依赖更新。



### ref 

接收一个**原始值**或**对象**参数：

1. 如果是对象且是`ref`创建的对象则直接返回。

2. 如果是普通对象则调用`reactive`来创建响应式对象，并且将这个对象包装到`value`属性中返回。

3. 如果是原始值则创建一个只有`value`属性的响应式对象返回。

   


### reactive 对比 ref

- ref 可以把基本数据类型转换成响应式对象。

- ref 返回的对象，重新给`value`属性赋值成对象也是响应式的。

- reactive 返回的对象，重新赋值丢失响应式（因为改变了指针）。

- reactive 返回的对象不可以解构。

  

### toRefs

接收一个 `reactive` 返回的响应式对象，并将对象的所有属性转换为一个`ref`的对象，并挂载到一个新的对象上返回。

这样 `reactive` 创建的响应式对象便具有可**解构的特性**。



### computed

`computed` 函数内部使用 `effect` 函数来实现。




# Vite 实现原理

迎合浏览器`ES Module`、`Http2`的普及和支持

目前只支持`vue3.x`的版本，也支持其他框架`React`等  

即时、按需编译  
更快的HRM  

开箱即用：内置`Ts`、`less/sass/stylus/postcss`内置、JSX、Web Assembly

