## Vue Router

History和Hash路由的区别：

- `Hash`模式是基于锚点，以及监听`onhashchange`事件
- `Histroy`模式是基于`HTML5`中的`History API`
    -  history.pushState() IE 10以后支持 
    -  history.replaceState()
    
<h4>History模式</h4> 

需要服务器的支持，在服务端应该`配置`除了静态资源外都返回`index.html` 

nginx配置 

```
location / {
    root  html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
}
```

## 模拟Vue.js 响应式

<h4>响应式原理</h4> 

`Proxy`，IE不支持，性能由浏览器优化，性能比`Object.defineProperty`好  
`Object.defineProperty`监听属性，`Proxy`监听对象  

<h4>发布/订阅者模式</h4>  

由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在

应用：`vue2.x`中自定义事件和`nodejs`中事件

<h4>观察者模式</h4>

由具体的调度，比如当事件触发，Dep就会去调用观察者的方法，所以观察者模式的订阅者与发布者之间存在依赖

> 观察者（订阅者）-- Watcher

`upate()`：当事件放生时，具体要做的事  

> 目标（发布者）-- Dep

`subs`：数组，存储所有的观察者  `addSub()`：添加观察者  `notify()`： 当事件发生，调用所有观察的`update`方法

> 没有事件中心

<h4>简易Vue内部实现功能点</h4>

> Vue 构造函数 

- 负责接受初始化的参数（选项）
- 负责把`data`中的属性注入到`Vue实例`，转换成`getter/setter`
- 负责调用`observer`监听data中所有属性的变化
- 负责调用`compiler`解析指令/差值表达式

```
// Vue 

$options：new Vue传入的配置项
$el：配置项中的`$el`属性
$data：配置中的data对象
_proxyData()：对$options.$data中的属性代理到`vm`上去
```

> Observer 

- 负责把`data`选项中的属性转换成响应式数据 
- `data`中的某个属性也是对象，把该属性转换成响应式数据
- 数据变化发送通知

```
// Observer

walk(data)：遍历data对象，分别调用defineReactive函数
defineReactive()：对单个数据做响应式处理
```

细节

1. `defineReactive（obj, key, value）`函数需要接收第三个参数value，是为了避免死循环触发`get`函数  

> Compiler 

- 负责编译模版，解析指令/差值表达式
- 负责页面的首次渲染
- 当数据变化后重新渲染视图 

```
// Compiler 

el 
vm
compile(el)
compileElement(node)
compileText(node)
isDirective(attrName)
isTextNode(node)
isElementNode(node)
```

> Dep（Dependency）

- 收集依赖，添加观察者（watcher）
- 通知所有观察者

```
// Dep

subs 
addSub(watcher)
notify()
```

> Wathcer 

- 当数据变化触发依赖，dep通知所有的Watcher实例更新视图
- 自身实例化的时候往dep对象中添加自己

```
vm 
key
cb
oldValue
update()
```

页面首次加载通过`compile`去加载视图，更新通过`Watcher`去更新视图

## Virtual DOM

Vue内部通过改造开源库`Snabbdom`实现

虚拟DOM可以维护程序的状态，跟踪上一次的状态   
通过比较前后两次状态的差异更新真实DOM

<h4>Snabbdom</h4>

导出三个核心函数`init()`、`h()`、`thunk()`   

`init`：是一个高阶函数，返回`patch()`   
`h`：返回虚拟节点VNode  
`thunk`：一种优化策略，可以在处理不可变数据时使用

通过`注释节点`来清空：`path(oldVnode，h('!')`  

Snabbdom的核心库并不能处理元素的属性/样式/事件等，如需要可使用以下6个官方提供的`模块`  

- attributes 
- props
- class
- dataset
- eventlisteners
- style 

<h4>源码分析</h4>  

核心 

- 使用`h()`函数创建`VNode`描述真实DOM
- `init()`设置模块，创建`patch()`
- `patch()`比较新旧两个`VNode`
- 把变化的内容更新到`真实DOM`树上

> patch整体过程  

- 对比新旧VNode是否相同节点（节点的key和sel相同）
- 如果不是相同节点，删除之前的内容，重新渲染
- 如果是相同的节点，再判断新的VNode是否有text，如果有并且和oldVnode的text不同，直接更新文本内容
- 如果新的VNode有children，判断子节点是否有变化，判断子节点的过程使用diff算法

> init 

- 初试化`module`返回`Patch`函数，`module`函数内包含可选钩子函数，`const hooks = [create，update，remove，destroy，pre，post]`
- `init函数`注册模块要遵守`{ create: x, update: y, ... }`规范 

```
const myModule = {
    create: function (oldVnode, vnode) {},
    update: function (oldVnode, vnode) {},
    ...
}
let patch = init([myModule]);
```
- 遍历所有`hooks`，将模块定义的hook最终转化为形如，并返回`patch`函数
```
cbs = { 
    create: [fn1, fn2],
    updata: []
}
```

> patch 

对比新旧`VNode`，最终渲染成真实dom，并返回vnode

- 创建`insertedVnodeQueue`队列，为了后面触发`insert`钩子函数
- 触发cbs中所有的`pre`钩子函数
- 如果oldVnode不是VNode，则通过`emptyNodeAt`函数转换
- 判断`oldVnode`和`Vnode`是否是相同节点，通过`key`和`sel`比对
- 如果是相同节点，调用`patchVnode`函数，找出节点差异并更新DOM
- 否则通过`createElm`函数根据`vnode`创建对应的DOM元素，并通过`insertBefore`把DOM渲染到文档中，然后调用`removeVnodes`函数移除`oldVnode`
- 执行遍历`insertedVnodeQueue`，并执行`insert`钩子函数
- 执行`cbs`中所有的`post`钩子函数

> createElm  

把`VNode`转换成对应的DOM元素，并处罚`init/create`钩子函数

- 触发cbs中所有的`init`钩子函数
- 获取判断`vnode.sel`，如果为`!`，则通过`createComment`创建注释节点，储存到`vnode.elm`中
- 当不为`undefined`时，解析`sel`选择器。带有命名空间调用`createElementNS`，否则调用`createElement`创建DOM元素，储存到`vnode.elm`中
- 执行cbs中的所有`create`钩子函数
- 如果vnode中有子节点，创建子vnode对应的DOM元素并追加到DOM上
- 执行用户传入的`create`钩子函数
- 如果`vnode`有`insert`钩子函数，追加到`insertedVnodeQueue`队列
- 返回`vnode.elm`

> patchVnode

新旧节点`key`和`sel`相同时调用并找出节点的差异后更新DOM

- 触发所有`prepatch`和`update`钩子函数
- 如果vnode（新节点）有`text`属性，且不等于旧oldVnode（老节点）的`text`属性，则为更新文本节点，如果`oldVnode`有`children`则移除，然后设置新`vnode`中对应DOM元素的`textContent`
- 如果新老节点都有`children`且不相同，调用`updateChildren`函数，对比子节点，并且更新子节点的差异
- 只有vnode点有`children`属性，如果oldVnode有`text`，则清空后添加所有`vnode`
- 只有oldVnode有`children`属性，移除所有
- 只有oldVnode有`text`属性，清空
- 触发`postpatch`钩子函数

> updateChildren

diff算法的核心，对比新旧节点的`children`，更新DOM  

找`同级别`的子节点依次比较，算法时间复杂度为`O(n)`  

diff过程 

- 在同级比较时，首先会对`新老节点数组的开始和结尾`分别设置标记索引，遍历过程中移动索引，分别为`newStartIdx`、`newEndIdx`、`oldStartIdx`、`oldEndIdx`
- 对比`新旧`节点是否相同是通过比对`key`和`tag`，不进行`子节点`或者`文本节点`差异性判断
- 首先对开始节点和结束节点进行比较，分为四种情况`依次`进行
```
1. oldStartVnode vs newStartVnode （旧开始 vs 新开始）
2. oldEndVnode vs newEndVnode
3. oldStartVnode vs oldEndVnode
4. oldEndVnode vs newStartVnode
```
- 先进行`1`比较，如果`oldStartVnode`和`newStartVnode`相同，调用`patchVnode`对比和更新节点，然后把旧开始节点和新开始节点索引后移一位再次比较。当不满足条件时，通过`2`方法比较
- 进行`2`比较，同理比较，如果相同则更新并前移一位更新索引，然后开始`1`比较，当不满足条件时，通过`3`方法比较
- 进行`3`比较，如果`oldStartVnode`和`newEndVnode`相同，调用`patchVnode`对比和更新节点，然后把`oldStartVnode`对应的DOM元素移动到最后位置，然后旧开始索引后移一位，新结束索引前移一位，更新索引，然后开始`1`比较。当不满足条件时，通过`4`方法比较。
- 进行`4`比较，与`3`类似。
- 如果`1、2、3、4`情况都不满足找到相同节点，使用`newStartNode`的`key`在老节点数组中遍历找到相同节点，否则使用`newStartNode`依次和老节点通过`sameVnode`进行寻找。
    - 如果还没有找到说明`newStartNode`是新节点，创建新节点对应的DOM节点，然后插入到`oldStartVnode`前面
    - 如果找到了，判断新节点和找到的老节点是否是`sameVnode`
        - 如果不相同说明节点被修改了，重新创建对应的DOM元素，然后插入到`oldStartVnode`前面
        - 如果相同，把找到的老节点移动到`oldStartVnode`之前

- 循环结束
    - 当老节点的所有子节点先遍历完（oldStartIdx > oldEndIdx）
    - 当心节点的所有子节点先遍历完（newStartIdx > newEndIdx）
- 如果老节点的数组先遍历完，说明新节点有剩余，把剩余的新节点批量插入到老节点的右边
- 如果新节点的数组先遍历完，说明老节点有剩余，批量删除剩余节点