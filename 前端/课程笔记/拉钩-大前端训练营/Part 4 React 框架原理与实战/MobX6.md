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

5. 状态改变使视图更新

```js
import { observer } from 'mobx-react-lite';

const App = () => {
  ....
}

export default observer(App)
```

### 6. 增强使用

1. 强制绑定action方法的this指向
  ```js
    export default class CounterStore {
      constructor() {
        makeObservable(this, {
          // 强制绑定this
          increment: action.bound
        })
      }
    }
  ```

2. 创建RootStore实现全局共享
  ```js
    import { createContext, useContext } from 'react;

    class RootStore {
      constructor() {
        // 这里初始化所有Store
        this.counterStore = new CounterStore();
      }
    }

    const rootStore = new RootStore();
    const RootStoreContext = createContext();

    // 提供顶层Context能力的包裹组件（App.jsx里使用）
    export const RootStoreProvider = ({ children }) => (
      <RootStoreContext.Provider value={rootStore}>
        { children }
      </RootStoreContext.Provider>
    )
    
    // 获取RootStore的方法（组件使用）
    export const useRootStore = () => useContext(RootStoreContext)
  ```

3. 异步action（副作用）
   flow是一种代替async、awiat的方式

```js
  import { flow, makeObservable, observable } from 'mobx';

  export default class TodoStore {
    constructor() {
      this.todos = [];
      makeObservable(this, {
        todos: observable
        loadTodos: flow
      })
    }

    *loadTodos() {
      let res = yield axios.get("http://xxxxxxx);
      this.todos = res.data;
    }
  }

```

4. 派生状态

```js
  import { computed, ... } from 'mobx';

  export default class TodoStore { 
    constructor() {
      this.todos = [];
      makeObservable(this, {
        todos: observable,
        computedTodosCount: computed
      })
    }
    // 使用get声明
    get computedTodosCount() {
      return this.todos.length;
    }
  }
```

5. makeAutoObservable(taraget, overrides?, options?)
   1. target：目标对象，this
   2. overrides：覆盖默认设置，将target对象中的属性或者方法设置为普通属性，key为属性名。
   3. options：配置对象，例 autoBind: true，自动绑定this
```js
  import { makeAutoObservable, ... } from 'mobx';

  export default class TodoStore { 
    constructor() {
      // 传递this即可
      // 自动将属性设置为`observable`  
      // 自动将方法设置为`action`
      makeAutoObservable(this);
    }
  }
```

6. autoRun 数据监测
  
   1. Javascript对于基本数据类型，属于值传递。mobx只能跟踪到原始属性，跟踪不到复制后的值。
   2. 对于引用数据类型，只要引用地址不发生变化，mobx就可以进行跟踪。

```js

  import { autoRun } from 'mobx';
  import { useEffect } from 'react';

  function Counter() {
    const { counterStore }  = useRootState()

    useEffect(() => {
      // 在useEffect中进行autoRun初始化
      autoRun(() => {
        // mobx检测到counterStore.count变化后会执行这个函数
        console.log(counterStore.count);
      })
    }, [])

    return (
      <div></div>
    )
  }

```

7. reaction 数据监测
   与 autoRun 功能都是进行数据监测，但是reaction可以提供当前状态和上一个状态
