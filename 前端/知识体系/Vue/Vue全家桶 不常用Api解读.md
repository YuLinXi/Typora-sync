## VUE

> provide / inject (v2.2.0以上)

```
    这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效
```


> functional

```
同React函数式组件类似，使组件无状态 (没有 data ) 和无实例 (没有 this 上下文)。他们用一个简单的 render 函数返回虚拟节点使他们更容易渲染，渲染开销低很多。
```
[查看官方介绍](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)
    
- 单文件组件声明

```
<template functional>
    
</template>

<script>
    export default {
        name: 'parent',
        props: {} // 可选
        
        
        //其它所有包含声明周期，钩子函数都无效
    };
</script>
```
- context参数


```
this.$slots.default >> context.children
this.level >> context.props.level
<template></template> 中省略了context
```
- props 

```
如果在函数式组件里进行了props声明，则props只能获取到组件内部提前声明，
如果在函数式组件里没有声明props，则props默认为父组件的attrs（不包含class，style）。

<template functional>
    <div>{{ props.test }}</div> 
    <div>{{ data.attrs.test }}</div> 
</template>

```

- data

```
可能包含的所有属性
{
    "staticClass": "class",               // className
    "attrs": { "test": "123213" },        // 除class，style之外的props
    "on": {  }                            // v-on 事件
}
<template functional>
    <div :class="data.staticClass">{{ data.attrs.test }}</div> 
</template>
```

- listeners / data.on

```
获取组件上的事件
// Test.vue函数式组件
<template functional>
    <div @click="listeners.onClick">点击事件</div> 
</template>

// 使用Test.vue函数式组件
<Test @onClick="handleClick"></Test>

## 函数式组件不会出现在 Vue devtools 的组件树里
```