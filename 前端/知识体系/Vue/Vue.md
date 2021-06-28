
全局配置
---

#### errorHandler（err, vm, info）
2.6.0以上支持捕获大部分错误  
info可以获取Vue特定报错位置，比如钩子函数  
应用：错误监控服务

- 获取报错信息
```

err.message
```

- 获取错误栈
```

err.stack
```

- 获取报错组件
```

vm.$vnode
```

全局API
---

#### Vue.compile（template）
在render函数中编译模板字符串。`只在独立构建时有效`
- 独立构建包括编译和支持template选项
- 运行时构建不包括模板编译，不支持template选项

#### Vue.observable（object）
> 2.6.0新增  

让一个对象可响应

- 推荐始终操作使用`Vue.observable`返回的对象，不要操作`源对象

选项/数据
---

#### data
> Vue实例的数据对象  

- Vue递归将属性转化为getter/setter，原型上的属性会被忽略
- `_`或`$`开头的属性不会被Vue实例代理，使用`Vue.$data.`访问

#### propsData
> 只用于`new`创建的实例中

- 使用箭头函数可以通过第一个参数来访问
```

computed: {
    a: vm => vm.a * 2, 
}
```

- 计算属性的结果会被缓存。依赖的`响应式`属性（在该实例范畴之内）变化才会重新计划。

#### watch
- 定义本地methods：`watch: { b: '方法名' }`
- 通过数组`[]`定义多个handle：`watch: { b: [] }`


选项/DOM
---

#### el
> 只在由`new`创建的实例中遵守

- 可以是DOM元素、CSS选择器、HTMLElement
- 如果在实例化时存在`el`，实例将立即进入编译过程。否则需要显示调用`vm.$mount()`手动开启编译

#### renderError
> 当`render`函数遭遇错误时，提供另外一种渲染输出。

- 可以用于Hot-reload或错误UI展示替换页

选项/生命周期钩子
---

#### mounted、updated

- `mounted`|`updated`不会承诺所有子组件被挂载完毕。可使用`vm.$nextTick`替换

选项/组合
---

#### extends
> 允许声明扩展另一个组件(可以是一个简单的选项对象或构造函数)，而无需使用`Vue.extend`

- 适用于扩展单文件组件
- 继承不同于`mixins`，是直接覆盖

#### provide/inject
> `provide`和`inject`主要为高阶插件/组件库提供用例

- `provide` 和 `inject` 绑定并不是可响应的，但如果传入了一个响应式`对象`，那么其对象的属性是可响应的
- `2.2.1+`版本，注入的值可以在`props`或`data`初始化之前得到  
- `2.5.0+`版本可以设置`inject`默认值。


选项/其它
---

#### functional
> 使组件无状态 (没有 data ) 和无实例 (没有 this 上下文)。他们用一个简单的 render 函数返回虚拟节点使他们更容易渲染。

#### inheritAttrs
