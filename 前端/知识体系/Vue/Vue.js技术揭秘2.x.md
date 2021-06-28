阅读自：[Vue.js技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/prepare/directory.html#compiler) 参考源码版本：v2.6.11 


# 准备工作
## Vue.js 源码目录设计

> compiler  

包含Vue.js所有编译相关代码：模版转ast语法树、ast优化、代码生成  
编译时机：离线编译（推荐）、运行时编译

> core 

Vue核心：内置组件、全局API、Vue实例化、观察者、虚拟DOM、工具函数

> platform

Vue.js的入口；跨平台支持： web、weex

> server

服务端相关渲染逻辑，这部分代码跑在Node环境上  

> sfc 

将`.vue`文件解析称一个JavaScript对象

> shared 

浏览器端与服务器端所共享的工具方法

## Vue.js源码构建

> Runtime Only VS Runtime + Compiler

<h5>Runtime Only</h5>  

通过webpack的`vue-loader`预编译后，只包含运行时的Vue.js代码，代码体积较小

<h5>Runtime + Compiler</h5> 

如果代码没有做预编译且使用了`template`属性，则需要在客户端编译模版，需要带有编译器的版本。
```
// 需要编译
new Vue({
  template: '<div>{{ hi }}</div>'
})

// 不需要
new Vue({
  render (h) {
    return h('div', this.hi)
  }
})
```

> 从入口开始 

import Vue from 'vue'; 其中Vue实际是一个用Funtion实现的`类`。  

Vue不用`Class`的原因：通过Function实现的类，Vue可以把功能扩展分散到过个模块中去实现，这种方式用`Class`难以实现。

`Vue.util`不稳定，静态方法项目最好不要依赖。

# 数据驱动

<h5>以下都基于带有`compiler`的Vue.js版本分析</h5>

## 实例挂载

版本的$mount分析：

1. `el`或`template`或`.vue单文件`最终都会转换成`render`方法。
2. 通过`$mount`通过`mountComponent`方法具体实现，`mountComponent`方法核心是实例化一个渲染`Watcher`。
3. `Watcher`回调调用`updateComponent`函数，该函数中会通过`vm._render`方法生成虚拟Node，最终交给`vm._update`完成DOM更新。
4. 在根节点`vm._isMounted`设置为`true`，表示这个实例已经挂载了，同时执行`mounted`钩子函数。如何判断：`vm.$vnode`表示Vue实例的父虚拟Node，当它为`Null`时则表示当前为根实例。

## render

`Vue.prototype._render`方法把实例渲染成一个虚拟Node

> vm._c与vm.$createElement  

`vm._c`方法用于被模版(`template`)编译后的`render`函数；  
`vm.$createElement`方法是用户手写`render`方法时使用。  
两者方法内部都是调用`createElement`方法，参数除最后一个`normalizationType`不同。

`vm._render`最终通过执行`createElement`方法并返回`vnode`。

## Virtuial DOM

`Virtual DOM`是用名为`VNode`Class描述的，借鉴开源库[snabbdom](https://github.com/snabbdom/snabbdom)的实现  
`Virtual DOM` 实际上是一个树状结构

通过VNode的`create`、`diff`、`patch`等过程映射到真是的DOM

## createElement

参数：createElement(context, tag, data, children, normalizationType)

> children 的规范化

根据`normalizationType`的不同，分表调用了`normalizeChildren(children)`和`simpleNormalizeChildren(children)`

<h5>simpleNormalizeChildren</h4>

调用场景是`render`函数是编译生成的。通常编译生成的`children`都已经是VNode类型了，但当为函数是组件`functional component`时，返回的是一个`数组`而不是一个`根节点`，故`simpleNormalizeChildren`函数中通过`Array.prototype.concat`方法将整个`children`数组打平。

<h5>normalizeChildren</h4>

两种调用场景

1. `render`函数是用户手写时。
2. 当编译`slot`、`v-for`的时候会产生嵌套数组的情况，接着还会调用`normalizeArrayChildren`方法将`children`规范化，变成了一个类型为 VNode 的 Array。

> VNode的创建

规范化`children`后开始创建`VNode`实例

代码释意tag参数的不同处理

```
if (tag是字符串类型) {
    if (tag是内置节点) {
        返回 普通VNode
    } else if (tag是已注册组件名) {
        返回 createComponent创建的组件类型VNode
    } else {
        返回 未知标签的VNode
    }
} else if (tag是一个Component类型) {
    返回 createComponent创建的组件类型VNode
}
```

## update

`_update`方法把`VNode`渲染成一个真实的 DOM 并渲染出来  
调用时机：首次渲染、数据更新时调用

update核心是调用`vm.__patch__`方法，其方法在不用平台定义不同  

<h5>基于以下代码核心方法调用顺序：</h5>

```
var app = new Vue({
  el: '#app',
  render: function (createElement) {
    return createElement('div', {
      attrs: {
        id: 'app'
      },
    }, this.message)
  },
  data: {
    message: 'Hello Vue!'
  }
})
```

1. `vm.__patch__`：调用此方法实际执行的是core/vdom/path.js里的`patch`函数
2. `emptyNodeAt`：将`oldVnode`转换成`VNode`对象
3. `createElm`：通过虚拟节点创建真实的 DOM 并插入到它的父节点中，`先子后父`


<h5>总结</h5>

new Vue -> init -> $mount(实例挂载) -> compile -> render -> vnode -> patch -> DOM

# 组件化

根据以下代码进行分析：

```
import Vue from 'vue'
import App from './App.vue'

var app = new Vue({
  el: '#app',
  // 这里的 h 是 createElement 方法
  render: h => h(App)
})
```

## createComponent 

createComponent函数主要包含3个关键步骤：

> 1. 构造子类构造函数

组件（单文件写法）通常为一个普通对象，通过`baseCtor.extend(Ctor)`即`Vue.extend(Ctor)`（Vue.options._base = Vue）构造成一个构造函数   

`Vue.extend`中对配置中的`props`和`computed`做了初始化，并对`Sub`构造函数缓存，避免`Vue.extend`多次执行时对同一个组件重复构造

> 2. 安装组件钩子函数

> 3. 实例化 VNode

通过`new VNode`实例化一个`vnode`并返回

## patch

当我们通过 createComponent 创建了组件 VNode，接下来会走到 vm._update，执行 vm.__patch__ 去把 VNode 转换成真正的 DOM 节点

patch的过程会调用`createElm`创建元素节点，通过判断`createComponent（子组件的实例化在此时机中）`方法返回值

如果组件`patch`过程中又创建了子组件，那么DOM的插入顺序是`先子后父`

## 合并配置

// @todo  
两种不同场景，分别为`外部调用场景`和`组件场景`

## 生命周期

源码中最终执行生命周期的函数都是调用 callHook 方法，它的定义在 `src/core/instance/lifecycle`中

<h4>beforeCreate & created</h4>

`beforeCreate`和`created`函数都是在实例化 Vue 的阶段，在`_init`方法中执行的  

`beforeCreate`在调用`initState`的前面，而`initState`就是初始化`props、data、methods、watch、computed`等属性，故此时拿不到这些属性和方法。相反`created`调用在`initState`之后。

<h4>beforeMount & mounted</h4>

在执行`vm._render`函数之前，执行`beforeMount`钩子函数，执行完`vm._update`把VNode patch到真实DOM后，执了`mounted`钩子函数。

当`vm.$vnode == null`时执行的`mounted`钩子函数调用是表示的通过外部`new Vue`初始化过程，并不是一次组件的初始化过程。

对于组件初始化过程，它的`mounted`钩子函数调用时机在其`VNode patch`到DOM后，执行`invokeInsertHook`函数即`insertedVnodeQueue`里保存的钩子函数依次执行一遍，然后执行`insert`方法时触发每个子组件的`mounted`钩子函数。

`insertedVnodeQueue`添加顺序是`先子后父`，所以对于同步渲染的子组件，`mounted`钩子函数的执行顺序也是先子后父

<h4>beforeUpdate & updated</h4>

// @todo  
`beforeUpdate`的执行时机是在渲染`Watcher`的`before`函数中

<h4>beforeDestroy & destroyed</h4>
在组件调用`$destroy`函数时调用

`beforeDestroy`钩子函数的执行时机是在`$destroy`函数执行最开始的地方，执行完毕后再执行`destroyed`钩子函数

在`$destroy`的执行过程中，它又会执行`vm.__patch__(vm._vnode, null)` 触发它子组件的销毁钩子函数，这样一层层的递归调用，所以`beforeDestroy`和`destroyed` 钩子函数执行顺序是先子后父，和`mounted`过程一样。

<h4>activated & deactivated</h4>
// @todo  

## 组件注册

> 全局注册  

定义在初始化`global-api`时候

通过源码：`resolveAsset函数`可以得知在使用`Vue.component(id, definition)`全局注册组件的时候，`id`可以是`连字符`、`驼峰`、`首字母大写`形式

> 局部注册

在组件的 Vue 的实例化阶段有一个合并 option 的逻辑，之前我们也分析过，所以就把 components 合并到 vm.$options.components 上，这样我们就可以在 resolveAsset 的时候拿到这个组件的构造函数，并作为 createComponent 的钩子的参数。

## 异步组件

异步组件组册传入的`Ctor`函数，所以没有经过`Vue.extend`逻辑，通过判断`cid`是否存在，从而执行`Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context)`方法。其代码逻辑支持3种异步组件。

<h5>普通函数异步组件</h5>

多个地方同时初始化一个异步组件，实际加载应该只有一次，通过`once`函数实现，定义在`src/shared/util.js`

`const res = factory(resolve, reject)`执行后拿到组件定义的对象`res`后，执行`resolve`逻辑。

`factory.resolved = ensureCtor(res, baseCtor)`函数如果参数是一个普通对象则调用`Vue.extend`把它转换成一个组件的构造函数。

然后通过遍历`factory.contexts`拿到每一个调用异步组件的实例`vm`，执行`vm.$focusUpdate()`方法重新渲染

<h5>Promise 异步组件</h5>

<h5>高级异步组件</h5>


# 深入响应式原理

## 响应式对象

<h4>Object.defineProperty</h4>

`Object.defineProperty`实现`getter`、`setter`方法

<h4>initState</h4>

initState 方法主要是对`props、methods、data、computed、wathcer`等属性做了初始化操作

> initProps 

1. 调用`defineReactive`方法把每个`prop`对应的值变成响应式。通过`vm._props`可以访问到定义在`props`中的属性。  
2. 通过`proxy`函数把`vm._props.xxx`的访问代理到`vm.xxx`上

> initData

1. 对定义`data`函数返回对象的遍历，通过`proxy`把每一个值`vm._data.xxx`都代理到`vm.xxx 上`
2. 调用`observe`方法观测整个`data`的变化，把`data`也变成响应式，可以通过`vm._data.xxx` 访问到定义`data`返回函数中对应的属性，

> proxy

代理的作用是把`props`和`data`上的属性代理到 vm 实例上，通过`Object.defineProperty`实现。

> observe 

`observe`的功能就是用来监测数据的变化，它的定义在`src/core/observer/index.js `

> Observer

`Observer`是一个类，它的作用是给对象的属性添加`getter`和`setter`，用于依赖收集和派发更新。  
通过响应式改造的数据对象中用的会多出一个`__ob__`属性，该属性是储存的该对象的自身`Observer`实例。   
对于数据类型的数据会调用`observeArray`方法即遍历数组并调用reactive`observe`方法，否则对纯对象调用`walk`方法后遍历对象调用`defineReactive`。

## 依赖收集

响应式对象`getter`相关的逻辑就是做依赖收集

> Dep 

`Dep`是整个`getter`依赖收集的核心，它的定义在`src/core/observer/dep.js` 中  
`Dep`是一个`Class`；其有一静态属性`target：Watcher`，这是一个全局唯一`Watcher`，保证同一时间只有一个全局的`Watcher`被计算  
`Dep`类实际是对`Watcher`的管理

> Watcher

> 过程分析

## 派发更新

在`setter`方法中派发更新，当`shallow === false`时，会对新设置的值变成一个响应式对象  
通过`dep.notify()`函数通知所有订阅者   

> 过程分析

当修改数据触发`setter`时，首先调用`dep.notify()`，然后遍历`subs`并依次调用`subs[i].update()`方法，因为`subs`数据即为`watcher`实例数据，即调用`watcher.update`方法。在一般组件数据更新的场景，会走调用`queueWatcher(this)`分支。   

Vue 在做派发更新的时候有一个优化的点，它并不会每次数据改变都触发`watcher`的回调，而是把这些`watcher `先添加到一个队列里，然后在`nextTick`后执行`flushSchedulerQueue`

> flushSchedulerQueue  

<h5>队列排序</h5>  

对队列排序`queue.sort((a, b) => a.id - b.id)`保证以下几点：
1. 组件的更新由父到子；因为父组件的创建过程是先于子的，所以 watcher 的创建也是先父后子，执行顺序也应该保持先父后子
2. 用户的自定义`watcher`要优先于渲染`watcher`执行；因为用户自定义`watcher`是在渲染`watcher`之前创建的  

<h5>队列遍历</h5>  

对`queue`排序后，对其遍历拿到对应的`watcher`并调用`watcher.run()`。当`wathcer.run()`在执行过程中，可能用户会再次添加新的`watcher`，这样再次执行到`queueWatcher`函数中，并且走到`else`分支。`else`分支的主要逻辑是操作`queue`数据，从后往前找，找到第一个待插入`watcher`的id比当前队列中`watcher`的id大的位置，把当前新`watcher`按照`id`的插入到队列中。

<h5>状态恢复</h5> 

把控制流程状态的一些变量恢复到初始值，把`watcher`队列清空。

## nextTick

执行`nextTick(cb)`时，将`cb`压入`callbacks`队列，保证在同一个`tick`内多次执行`nextTick`不回开启多个异步任务；然后通过`timerFunc`函数执行，并在特定时机触发`flushCallbacks`来同步执行`callbacks`回调队列的`cb`。  

执行`flushCallbacks`函数的包装方法选取优先级：  

优先选择`microtask`任务

1. `Promise.then(flushCallbacks) `
2. `new MutationObserver(flushCallbacks)`
3. `setImmediate(flushCallbacks)`
4. `setTimeout(flushCallbacks, 0)`


数据的变化到 DOM 的重新渲染是一个异步过程，发生在下一个 tick


## 检测变化的注意事项

<h4>对象添加属性</h4>

通过`Vue.set`可以手动增加响应式数据，方法定义在`src/core/observer/index.js`目录下，其源码执行过程：

`Vue.set(target, key, value)`

1. 如果`target`是数组，判断正确下标后，通过`splice`添加并返回value。
2. 如果`target`是对象，则拿到`target.__ob__`进行判断，（1）如果是一个`Vue`实例对象，直接返回value。（2）`!ob === true`，则其对象不是响应式数据，直接赋值并返回value
3. 调用`defineReactive`函数进行数据响应式处理，把新添加的属性变成响应式
4. 调用`ob.dep.notify()`触发依赖通知

<h4>数组</h4>

Vue不能检测到以下变动的数组：  

1. `vm.items[indexOfItem] = newValue`，使用 `Vue.set(example1.items, indexOfItem, newValue)`代替
2. `vm.items.length = newLength`，使用`vm.items.splice(newLength)`代替

当数据类型为数组时，Vue将其`push、pop`方法进行了重写，重写后的方法会先执行它们本身原有的逻辑，并对能增加数组长度的 3 个方法`push、unshift、splice` 方法做了判断，获取到插入的值，然后把新添加的值变成一个响应式对象，并且再调用`ob.dep.notify()` 手动触发依赖通知


## 计算属性 VS 侦听属性

<h4>computed</h4>

计算属性的初始化是发生在 Vue 实例初始化阶段的`initState`函数中，定义在`src/core/instance/state.js`

> 初始化过程分析  

1. 创建`vm._computedWatchers`空对象`watchers`，遍历`computed`，取到对应的`getter`函数，并创建一个`computed watcher`，将`watcher`存入`watchers`，以`key`为键。
2. 当`!(key in vm)`，执行`defineComputed`函数，否则报出对应的警告。
3. `defineComputed`函数根据`Object.defineProperty(target, key, sharedPropertyDefinition)`为属性值添加`getter`和`setter`

> getter触发

1. 拿到计算属性对应的`watcher`，执行`watcher.evaluate()`去求值
2. 然后执行`watcher.depend()`去收集依赖
3. 返回`watcher.value`最终值

计算属性本质上也是一个`computed watcher`

<h4>watch</h4>

侦听属性的初始化也是发生在 Vue 的实例初始化阶段的`initState`函数中，在`computed`初始化之后

> 初始化过程分析

1. 遍历`vm.watch`，拿到每一个`handler`，如果`hanlder`是数组，则遍历这个数组，分别调用`createWatcher`方法，否则直接调用
2. 调用`vm.$watch(keyOrFn, handler, options)`函数，其定义在同目录下`stateMixin`方法中，`vm.$watch`也可以直接由用户调用，如果`handler`是对象，则返回`createWatcher`
3. 通过`const watcher = new Watcher(vm, expOrFn, cb, options)`实例化一个`wacher`，这是一个`user watcher`，设置`options.user = true`

侦听本质上也是一个`user watcher`

<h4>Watcher options</h4>

`watcher`一共有4种类型，分别是`user watcher`、`deep wathcer`、`computed watcher`、`sync watcher`

> deep watcher  

当设置`watch = true`时，将得到一个`deep watcher`，`deep wathcer`在执行`Watcher.get()`方法时，会进行`this.deep`判断，如果为`True`时会调用`traverse(value)`函数对对象做深层递归编遍历，遍历过程触发每一个子对象的`getter`，收集依赖。

但是因为设置了`deep`后会执行`traverse` 函数，会有一定的性能开销，所以一定要根据应用场景权衡是否要开启这个配置

> user watcher 

通过`vm.$watch`方式创建

区别在于在对`watcher`求值以及在执行回调函数的时候，会调动`handleError`函数处理一下错误

> computed watcher 

为计算属性量身定做

> sync watcher

当设置`sync = true`时将得到一个`sync watcher`

在我们之前对`setter`的分析过程知道，当响应式数据发送变化后，触发了`watcher.update()`，只是把这个`watcher `推送到一个队列中，在`nextTick`后才会真正执行`watcher`的回调函数。而一旦我们设置了`sync`，就可以在`当前 Tick` 中同步执行 `watcher` 的回调函数

只有当我们需要 watch 的值的变化到执行 watcher 的回调函数是一个同步过程的时候才会去设置该属性为 true。

## 组件更新

组件的更新还是调用了`vm._update`方法，我们再回顾一下这个方法，它的定义在`src/core/instance/lifecycle.js` 中

1. 调用`vm._update`即执行`vm.$el = vm.__patch__(prevVnode, vnode)`函数。实际执行的是`patch(oldVnode, vnode, hydrating, removeOnly)`，定义在`src/core/vdom/patch.js`
2. 由于为更新`oldVnode`不为空，且和`vnode`都是VNode类型，则会执行`sameVNode(oldVnode, vnode) `函数判断他们是否是相同走以下分支逻辑

> 新旧节点不同 

如果新旧 `vnode` 不同，那么更新的逻辑非常简单，它本质上是要替换已存在的节点

3. 当前旧节点为参考节点，调用`createElm`函数创建新节点，并插入到 DOM 中
4. 更新父的占位符节点
5. 删除旧节点

> 新旧节点相同  

在2步骤后主要调用`patchVNode`方法，定义在`src/core/vdom/patch.js`中，把新的`vnode`patch到旧的`vnode`上

3. 执行`prepatch`钩子函数
4. 执行`update`钩子函数
5. 完成`patch`过程：此过程为非文本节点情况下，分为以下几种处理方式：   
（1）当新旧Vnode都存在children时，使用`updateChildren`函数来更新子节点  
（2）当只有旧Vnode不存在时children，表示旧节点不需要了
（3）当只有旧Vnode存在children时，表示更新的是空节点，则需要将旧的节点通过`removeVnodes`全部清除  
（4）当旧节点是文本节点时，清楚其节点文本内容
6. 执行`postpatch`钩子函数


## Props（v2.6.11）

<h4>规范化</h4>

在初始化`Props`之前，在执行`initMixin(Vue)`时候，会先执行`mergeOptions`函数，对`props`做一次`normalize`处理，来规范化`props`的数据格式

<h4>初始化</h4>

`Props`初始化发生在`initState`阶段，执行`initProps`函数，进行`校验`、`响应式`、`代理`

> 1. 校验

遍历`propsOptions`，执行`validateProp(key, propsOptions, propsData, vm)`，检验传递的数据是否满足`prop`定义的规范，并得到默认值

> 2. 响应式

调用`defineReactive`函数把`prop`变成响应式  
当`vm`是非根实例的时候，会先执行`toggleObserving(false)`，它的目的是为了响应式的优化

> 3. 代理

在经过响应式处理后，我们会把`prop`的值添加到`vm._props`，通过`proxy`函数把对`vm.name`的访问代理到`vm._props.name`上

<h4>Props更新</h4>

此过程在组件更新过程`prepatch`钩子函数中执行`updateChildComponent`方法来更新`props`  
在创建组件`vnode`时，将父组件的`props`传递到子组件，自组件通过`vnode.componentOptions.propsData`可以拿到`prop`数据

<h4>子组件重新渲染</h4>

子组件的重新渲染有 2 种情况，一个是`prop`值被修改，另一个是对象类型的`prop`内部属性的变化  

对象类型的`prop`内部属性变化时，并未触发子组件的`prop`的更新，但是因为在子组件渲染时，访问过这个对象`prop`，所以会把自组件的`render watcher`收集到依赖中，当父组件更新这个对象`prop`的某个属性的时候，会触发`setter`，即会通知子组件`render wathcer`的`update`，进而触发子组件的重新渲染

<h4>toggleObserving</h4>

在`props`的初始化和更新过程中，多次执行`toggleObserving（false)`设置`shouldObserve`的值，将`shouldObserve`的值设置为`false`的主要目的是阻止`defineReactive`函数去递归对象把子属性变成响应式  

由于子组件的`prop`始终指向父组件的`prop`值，主要父组件的`prop`值变化，就会触发子组件的重新渲染，所以这个`observe`是可以省略的

最终执行`toggleObserving（true）`恢复`shouldObserve`为`true`


# 编译

把模版编译成`render`函数，这个过程称之为`编译`    
编译顺序是`先父后子`

## 编译入口  

`Runtime + Compiler`的入口是`src/platforms/web/entry-runtime-with-compiler.js`，实现编译的核心代码在`src/compiler/index.js`下

<h5>模版编译核心逻辑：</h5>

1. 解析模板字符串生成 AST

`const ast = parse(template.trim(), options)`

2. 优化语法树

`optimize(ast, options)`

3. 生成代码

`const code = generate(ast, options)`

<h4>parse</h4> 

对模板做解析，生成`AST`，一种抽象语法树，是对源代码的抽象语法结构的树状表现形式，会用到大量正则表达式`顺序`对模版字符串进行解析  

AST元素节点总共有`3`种类型，type 为`1`表示是普通元素，为`2`表示是表达式，为`3` 表示是纯文本。

<h4>optimize</h4> 

我们在编译阶段可以把一些 `AST` 节点优化成静态节点，所以整个 `optimize` 的过程实际上就干 2 件事情，`markStatic(root)` 标记静态节点（添加`static`属性） ，`markStaticRoots(root, false)` 标记静态根（添加`staticRoot`属性）

<h4>codegen</h4> 

# 扩展

## event 

事件绑定完成在编译阶段`parse`函数过程中，通过`addHandler(el, name, value, modifiers, false, warn)`方法添加事件，定义在`src/compiler/helpers.js`

首先根据`modifier`修饰符对事件名`name`进行处理，然后根据`modifier.native`判断是原生事件还是普通事件，分别对应`el.nativeEvents`和`el.events`，最终表达在`AST`中

vue事件分为`原生DOM事件`和`用户自定义事件`

原生DOM事件最终也是利用原生`addEvnetListener`和`removeEventListener`API来添加和删除事件  

自定义事件利用`Vue`自行实现的的事件中心处理，定义在`src/core/instance/events.js`

## v-model  

`v-model`实现双向绑定，可以作用于普通表单元素，也可以作用于组件上，是一个`语法糖`  

<h4>表单元素</h4> 

1. 从编译`parse`阶段，`v-model`被当作普通的指令解析到`el.directives`中
2. 然后在`codegen`阶段，执行`const dirs = genDirectives(el, state)`函数，得到并执行对应的`directive`函数，最终执行`genDefaultModel`函数进行双向绑定，`v-model`对应的函数在`src/platforms/web/compiler/directives/model.js`中；    

3. `addProp(el, 'value', `(${value})`)`，修改`AST`元素，给`el`添加一个`prop`，即在`input`上动态绑定了`value`；
4. `addHandler(el, event, code, null, true)`，修改`AST`元素，在`input`上绑定了对应的事件  
5. 最终生成代码

```
<input
  v-bind:value="message"
  v-on:input="message=$event.target.value"
 />
```

<h4>组件</h4> 
1. 与表单元素相同
2. 不同在于最终执行的不是`genDefaultModel`函数，而是`genComponentModel`函数，为`el`添加`model`属性  
3. 创建子组件`vnode`阶段，执行`createComponent`函数中，对`if(data.model)`做`transformModel(Ctor.options, data)`函数处理，给`data.props`添加`data.model.value`，并且给`data.on`添加`data.model.callback `回调
4. ..... 

## slot

<h4>普通插槽</h4>

在编译阶段，父组件`parse`阶段，会执行`processSlotContent`处理`slot`，会给对应的`AST`元素节点添加 `slotTarget`属性，接着在`codegen`阶段对`slotTarget`进行处理，给`data`添加一个`slot`属性，并指向 `slotTarget`

子组件`parse`阶段执行`processSlotOutlet`函数，会给对应的`AST`元素节点添加`slotName`属性，接着在`codegen`阶段，当遇到`slot`标签时，执行`genSlot`函数，其中`_t`即为`renderSlot`函数，定义在`src/core/instance/render-heplpers/render-slot.js`中，最终得到`vnodes`

<h4>作用域插槽</h4>

跟普通组件过程相似，不同在于执行`processSlotContent`处理后，添加的是`slotScope`属性，在构建`AST`树时，在拥有`scopedSlot`属性的`AST`元素节点，未当作`children`添加到当前的`AST`树中，而是存到父AST元素节点的`scopedSlots`属性上
执行`codegen`生成代码时，在`genData`函数里执行`genScopedSlots`方法对`scopedSlots`做处理

子组件编译大致和普通插槽相同，唯一区别在于`genSlot`的时候会对`attrs`和`v-bind`做处理

<h4>总结</h4>
两者差别是数据作用域，普通插槽是在父组件编译和渲染阶段生成 `vnodes`，所以数据的作用域是父组件实例，子组件渲染的时候直接拿到这些渲染好的`vnodes`

作用域插槽，父组件在编译和渲染阶段并不会直接生成`vnodes`，而是在父节点 vnode 的 data 中保留一个 `scopedSlots` 对象，存储着不同名称的插槽以及它们对应的渲染函数，只有在编译和渲染子组件阶段才会执行这个渲染函数生成 `vnodes`，由于是在子组件环境执行的，所以对应的数据作用域是子组件实例。


## keep-alive  

定义在`src/core/components/keep-alive.js`

<h4>内置组件</h4>

组件对象有一个属性`abstract：true`，这是一个抽象组件，在`initLifecycle`过程中组件建立父子关系的时候会被忽略，这是一个`Vue隐藏属性`

`props`除开文档上提到的`include`和`exclude`之外，还有`max`，控制我们的缓存个数

`keep-alive`组件直接使用`render`函数进行渲染  

<h4>组件渲染</h4>

> 首次渲染  

在首次渲染过程中，`keep-alive`除了建立缓存，与普通组件渲染没什么区别

> 缓存渲染  

由于`keep-alive`组件没有`children`，通过触发实例的`$forceUpdate`逻辑，得到缓存命中组件，由于`isReactivated`标志变量为`true`，因此在执行`init`钩子函数时不会再执行`$mount`逻辑，而执行`reactivateComponent`函数将缓存DOM插入目标元素中

> 生命周期  

## transition

定义在`src/platforms/web/runtime/component/transtion.js`

<h4>内置组件</h4>

web平台独有，同`keep-alive`组件一样，使用`render`函数进行渲染，`render`函数依次经过`处理children`、`处理mode`、`获取rawChild & child`、处理`id & data`，最后返回渲染`vnode`

> 处理 children 

从默认插槽获取子节点，判断长度，如果`长度 > 1`，会报警告  

> 处理mode 

只支持`in-out`和`out-in` 

> 获取 rawChild & child

先后调用`hasParentTransition`和`getRealChild`函数进行判断，决定是否直接返回第一个子节点`rawChild`

> 处理 id & data

根据`key`等条件获取`id`，然后从`extractTransitionData`函数从组件实例上取出过渡所需要的数据，并赋值到`child.data.transition`上

<h4>transition module</h4>

动画相关逻辑实现，`src/platforms/web/modules/transition.js`

过渡动画提供了 `2` 个时机，一个是`create`和`activate`的时候提供了`entering`进入动画，一个是`remove` 的时候提供了`leaving`离开动画

> entering

发生在组件插入后

1. 执行`resolveTransition`函数，解析过渡数据后取值
2. 处理边界情况，当`transition`作为子组件的根节点时，需要检查它的父组件作为`appear`的检查
3. 定义过渡类名、钩子函数和其它配置
4. 合并 `insert` 钩子函数，原本`vnode`定义了`init`等4个钩子函数，通过`mergeVNodeHook`函数，把定义的函数合并到对应的钩子函数中，然后通过`createFnInvoker`生成新的`invoker`
5. 开始执行过渡动画，执行`beforeEnterHook`函数

> leaving 

发生在组件销毁前，实现与`entering`几乎为镜像过程

## transition-group

```
@todo 
```

# Vue Router

## 路由注册

<h4>Vue.use</h4>

`Vue.use`API注册插件，定义在`vue/src/core/global-api/use.js`

通过维护`_installedPlugins`数组来避免重复注册插件  

<h4>路由安装</h4>

