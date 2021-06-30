## MobX 6

### 1. 概述

MobX 是一个简单的可扩展的状态管理库，无样板代码风格简约。

目前最新版本为 6，版本 4 和版本 5 已不再支持。

在 MobX 6 中不推荐使用装饰器语法，因为它不是 ES 标准，并且标准化过程要花费很长时间，但是通过配置仍然可以启用装饰器语法。

MobX 可以运行在任何支持 ES5 的环境中，包含浏览器和 Node。

[MobX](https://mobx.js.org/README.html) 通常和 React 配合使用，但是在 [Angular](https://github.com/mobxjs/mobx-angular) 和 [Vue](https://github.com/mobxjs/mobx-vue) 中也可以使用 MobX。

### 2. 核心概念

1. observable：被 MobX 跟踪的状态。
2. action：允许修改状态的方法，在严格模式下只有 action 方法被允许修改状态。
3. computed：根据现有状态衍生出来的状态。
4. flow：执行副作用，它是 generator 函数。可以更改状态值。

### 3. 工作流程

<img src="./images/1.png"/>

### 4. 相关库 

- mobx：MobX核心库
- mobx-react-lite：仅支持函数组件
- mobx-react：及支持函数组件也支持类组件

### 5. 使用

1. 通过class创建一个**Store**
```js
class CounterStore {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count += 1;
  }
}
```

2. 关联Mobx让其可以追踪状态变化
```js
import { action, makeObservable, observable } from 'mobx'

class CounterStore {
  constructor() {
    this.count = 0;
    makeObservable(this, {
      count: observable,  // observable 标记状态
      increment: action   // action     标记方法
    })
  }

  increment() {
    this.count += 1;
  }
}
```

3. 实例化store

```js
、、
import CounterStore from '..'

const counterStore = new CounterStore();
```

4. 组件使用

```tsx
import counterStore from '..'

const App = () => (
  <div onClick={counterStore.increment}>{counterStore.count}</div>
)
```