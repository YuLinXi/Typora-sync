# Vue3 - 官方

## 应用配置


### globalProperties

挂载全局组件实例属性，组件属性优先级**大于**全局属性。  
替代Vue2.x的 `Vue.prototype`。

```ts
app.config.globalProperties.foo = 'bar'

app.component('child-component', {
  mounted() {
    console.log(this.foo) // 'bar'
  }
})
```



### optionMergeStrategies

自定义选项合并策略。  
适用于选项式组件创建。

```ts
const app = Vue.createApp({})

app.config.optionMergeStrategies.customOption = (parent, child) => {
  // return mergedVal
}
```

### compilerOptions 

配置运行时编译器的选项。 

完成版`vue.js`可以直接在全局定义，例如：

```ts
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ion-')
```

仅运行时版本，使用`@vue/compiler-dom`通过配置构建工具`loader`或`plugins`实现。

#### isCustomElement

通过配置 `isCustomElement`，以识别`Web Components API` 定义的自定义元素。  
这样可以忽略注册，直接在组件内使用。

#### whitespace

默认情况下，Vue 会移除/压缩模板元素之间的空格以产生更高效的编译结果：

1. 元素内的多个开头/结尾空格会被压缩成一个空格
2. 元素之间的包括折行在内的多个空格会被移除
3. 文本结点之间可被压缩的空格都会被压缩成为一个空格
  
将值设置为 'preserve' 可以禁用 (2) 和 (3)。

#### delimiters

用于配置模板内文本插值的分隔符。

#### comments

设置为`true`，强制在生产环境保留模板内HTML注释。

## 应用API

### directive

自定义指令。

```ts
app.directive(name: string, definition?: Function | Object);
```

传入`definition`，返回指令定义，否则返回应用实例。  
当`definition：Function`时候，函数在`mounted`和`updated`钩子时调用。
 
钩子函数参数`el`、`binding`、`vnode`、`prevNode`。  
应始终视`binding`为只读，跨钩子通信时，可通过`DOM自定义属性集`进行。

### provide

配合 `inject` 使用，注册到应用范围内所有组件中。

provide 和 inject 绑定不是响应式的。可以通过传递`响应式对象`，以保持对象属性的响应式特性。

## 全局API

