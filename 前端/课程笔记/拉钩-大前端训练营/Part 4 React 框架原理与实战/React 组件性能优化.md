# React 组件性能优化

### 为memo方法传递自定义比较逻辑 

memo比较为 **浅比较**，通过比较 **引用地址** 是否相同

```jsx

const Comp = memo(() => <div></div>, (prevProps, nextProps) => {
  // 返回true 不渲染，反之渲染
})
```

### 组件懒加载

组件懒加载减少 **bundle** 文件大小

```jsx
import React, { lazy, Suspense } from 'react';

const App = () => {
  const LazyComp = lazy(() => import(/* webpackChunkName: "Home"*/"./Home"))
  return (
    <Suspense>
      <LazyComp />
    </Suspense>
  )
}
```
服务端渲染使用 **Loadable Components** 库

### 使用 Fragment 避免额外标记

```jsx

const App = () => (
  <>
    <div>1</div>
    <div>2</div>
  </>
)
```

### 尽量不要使用内联函数定义 

### 类组件中的箭头函数 

箭头函数在 **this** 指向问题上占据优势，但也有其不利的一面：
当使用箭头函数时，该函数被添加为类的实例对象属性，而不是原型对象属性。
当组件多次被重用时，造成资源浪费。

最佳使用还是在类组件的 **构造函数** 中使用 **bind** 方法进行绑定。

```jsx
export default class App extends Component {
  handleClick = () => {
    
  }
  render() {
    return (
      <button onClick={this.handleClick}>按钮</button>
    )
  }
}
```

### 避免使用内联样式属性

### 为组件创建错误边界 

默认情况下，组件渲染错误会导致整个应用程序中断。
创建错误边界可确保在特定组件发生错误时 **应用程序不会中断** 。
涉及两个生命周期函数， **getDerivedStateFromError**，**componentDidCatch**

```jsx 
export default class ErrorBoundaries extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(error) {
    consoe.log('componentDidCatch')
  }

  static getDerivedStateFromError() {
    console.log('getDerivedStateFromError');
    return {
      hasError: true
    }
  }

  render() {
    if (this.state.hasError) {
      return <div>发生了错误</div>
    }
    return <App />
  }
}

```

错误边界 **不能捕获异步错误**，比如点击按钮时发生的错误

### 避免数据结构突变 

### 优化依赖项大小 

应用依赖第三方包，不想引用包中所有代码，可以使用插件对依赖项进行优化。
[资源优化技巧](https://github.com/GoogleChromeLabs/webpack-libs-optimizations)

基于`create-react-app`脚手架创建的项目，可以使用`react-app-rewired`配合`customize-cra`来覆盖默认配置。

react-app-rewired：覆盖 create-react-app 的默认配置 
customize-cra：导出一些辅助方法，可以让覆盖代码更加简洁。 

**以loadsh为例**

1. 安装 `babel-plugin-lodash` 
2. 项目下新增`config.overrides.js`加入以下配置
  
  ```js
  const { override, useBabelRc } = require("customize-cra")

  module.exports = override(useBabelRc())
  ```
3. 修改`package.json`文件中的构建命令  
   
```json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test --env=jsdom",
  "eject": "react-scripts eject"
}
```

4. 创建`.babelrc`文件并加入配置
   
```json
{
  "plugins": ["lodash"]
}
```