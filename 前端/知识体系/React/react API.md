

## React Hooks



### 基础HOOK

#### useState

```js
const [state, setState] = useState(initialState);
```

`initialState`参数可以是一个初始值或者函数。

`setState` 函数用于更新 state。它接收一个新的 state 值并将组件的一次**重新渲染**加入队列。

`setState` 接受一个函数作为参数，用于通过使用**先前**的 state 计算得出**新的**state。

React 会确保 `setState` 函数的标识是稳定的，并且不会在组件重新渲染时发生变化。这就是为什么可以安全地从 `useEffect` 或 `useCallback` 的依赖列表中省略 `setState`。



>  惰性初始 state

`useState`接收一个函数，该函数可以经过运算后返回`initialState`。

该函数只会在组件初始化时执行一次。



> 跳过State更新

`setState`设置的新旧值相等（使用`Object.is`比较算法），React 将跳过子组件的渲染及 effect 的执行。



> 注意

1. `setState`作为Props传递给通过React.memo创建的子自建时，setState将是**稳定的**，即引用是相等的。

2. `setState`设置`state`，并不是改变了`state`的赋值，而是触发一次重新渲染时，`state`返回的是新的状态。

3. `setState`设置对象时，不会进行如`setState`API的**合并**更新。

4. 当 state 的逻辑开始变得复杂，使用`useReducer`或者 `自定义Hook`来管理。

   

#### useEffect

使用 `useEffect` 完成副作用操作



> 清除effect 

`useEffect` 函数需返回一个清除函数。



> 只在更新时运行的effect

```react
function App () {
	const ref = useRef(0);
  useEffect(() => {
    if (ref.current > 0) {
      console.log('更新执行')
    }
    ref.current ++;
  })
}
```



> 注意

1. 为防止内存泄漏，清除函数会在组件卸载前执行。
2. 如果组件多次渲染（通常如此），则**在执行下一个 effect 之前，上一个 effect 就已被清除**。
3. 函数会在浏览器完成布局与绘制**之后**，在一个延迟事件中被执行，但会保证在任何新的渲染前执行。



#### useContext

```js
const value = useContext(MyContext);
```

接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定。



> 注意

1. 当组件上层`<MyContext.Provider>`更新，`useContext` 会触发重渲染，即使祖先使用`React.memo`或`shouldComponentUpdate`。



### 额外的HOOK



#### useReducer

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

`useState`的替代方案。它接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 state 以及与其配套的 `dispatch` 方法。

**`useReducer` 的 `dispatch` 的身份永远是稳定的**



#### useCallback

```js
const memoizedCallback = useCallback(
  () => doSomething(a, b);
  [a, b],
);
```

返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization) **回调函数**

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`



> 配合ref实现测量DOM节点

自定义Hook封装

```react
function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}

function App () {
  const [rect, ref] = useClientRect();
  return (
  	<div ref={ref}></div>
  )
}
```





#### useMemo

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization) **值**

如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值。



**你可以把 `useMemo` 作为一种性能优化的手段，但不要把它当做一种语义上的保证**



#### useRef

```js
const refContainer = useRef(initialValue);
```

`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。

返回的 ref 对象在组件的整个生命周期内保持不变。

当 ref 对象内容发生变化时，`useRef` 并*不会*通知你。

变更 `.current` 属性不会引发组件重新渲染。



> 惰性创建初始值

```react
function Image(props) {
  const ref = useRef(null);

  // ✅ IntersectionObserver 只会被惰性创建一次
  function getObserver() {
    if (ref.current === null) {
      ref.current = new IntersectionObserver(onIntersect);
    }
    return ref.current;
  }

  // 当你需要时，调用 getObserver()
  // ...
}
```



> 命令式地访问子组件

````react
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
````

无论该节点如何改变，React 都会将 ref 对象的 `.current` 属性设置为相应的 DOM 节点。



> 获取上一轮的props或state

抽取成自定义hook

```react
function usePrevious(value) {  
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```



> 充当class实例变量的功能

以下**循环定时器**的`class`实现

```react
class App extends Component {
	componendDidMount() {
		this.timer = setInterval(() => {}, 1000)
	}
  
  handleStopCount() {
    this.timer && clearInterval(this.timer);
  }
}
```

`Hooks`实现

```react
function App () {
  const ref = useRef();
  useEffect(() => {
    ref.current = setInterval(() => {}, 1000)
    return () => clearInterval(ref.current);
  }, [])
  handleStopCount() {
    ref.current && clearInterval(ref.current);
  }
}
```



#### useImperativeHandle

```javascript
useImperativeHandle(ref, createHandle, [deps])
```

`useImperativeHandle` 应当与`forwardRef` 一起使用：



> 暴露一些命令式的方法给父组件。

```react
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);

function App() {
  const ref = useRef();
  return (
    <>
      <FancyInput ref={ref} />
    	<button onClick={ () => ref.current.focus() }>获取焦点</button>
    </>
  )
}
```



#### useLayoutEffect

其函数签名与 `useEffect` 相同，但它会在所有的 DOM 变更之后同步调用 effect。

可以使用它来读取 DOM 布局并同步触发重渲染。

在浏览器执行绘制之前，`useLayoutEffect` 内部的更新计划将被同步刷新。



#### useDebugValue

```javascript
useDebugValue(value)
useDebugValue(date, date => date.toDateString())
```

`useDebugValue` 可用于在 React 开发者工具中显示自定义 hook 的标签。

<img src="../../../assets/1.png" alt="1" style="zoom:200%;" />



> 注意

1. 不推荐你向每个自定义 Hook 添加 debug 值。当它作为共享库的一部分时才最有价值。

2. 第二个参数可以进行`延迟格式化debug值`，在某些情况下，格式化值的显示可能是一项开销很大的操作。除非需要检查 Hook，否则没有必要这么做。

   

### 从 Class 迁移到 Hook



####  生命周期



> getDerivedStateFromProps

改为在**渲染过程中**安排一次更新

```react
function App () {
  const [count, setCount] = useState(0);
  if (count < 1) {
    setCount((pre) => pre + 1)
  }
  return (
  	<div></div>	
  )
}
```

React 会**立即退出第一次渲染**并用更新后的 state 重新运行组件以避免耗费太多性能。



> shouldComponentUpdate

使用`React.memo`包裹函数式组件来做到`props`的对比渲染策略。

使用`useMemo`来优化每一个具体的`state`



> componentDidMount、componentDidUpdate、componentWillUnmount

使用`useEffect`可以表达所有这些场景



> getSnapshotBeforeUpdate、componentDidCatch、getDerivedStateFromError

目前还没有这些方法的 Hook 等价写法，但很快会被添加。



####  功能、API 模拟 

> forceUpdate

利用`useState`或`useReducer`实现一个一个自增长的**计数器**

```react
const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
forceUpdate();
```

**可能的话尽量避免这种模式**



### 性能优化



#### 在依赖列表中省略函数是否安全？

结论：不安全

因为函数内部可能依赖了一些`props`和`state`



> 一些最佳实践

如果可以把这个函数移动到 effect 内部，这样它就不用出现在它的依赖列表中了。

如果无法移动到内部：

- 不依赖`props`和`state`的函数可以移动到组件外
- 万不得已配合`useCallback` 直接依赖函数，但是``useCallback` `中要明确依赖

```react
const fetchProduct = useCallback(() => {
  // ... Does something with productId ...
}, [productId]); 

useEffect(() => {
  fetchProduct();
}, [fetchProduct]);
```



#### Hook 会因为在渲染时创建函数而变慢吗？

结论：不会

在现代浏览器中，闭包和类的原始性能只有在极端场景下才会有明显的差别。



> 某方面上更加高效

- Hook 避免了 class 需要的额外开支，像是创建类实例和在构造函数中绑定事件处理器的成本
- **符合语言习惯的代码在使用 Hook 时不需要很深的组件树嵌套**。



> 解决性能影响与`shouldComponentUpdate` 工作原理

- `useCallback`：Hook 允许你在重新渲染之间保持对相同的回调引用以使得 `shouldComponentUpdate` 继续工作：
- `useMemo`：Hook 使得控制具体子节点何时更新变得更容易，减少了对纯组件的需要。
- `useReducer`：减少了对深层传递回调的依赖



#### 如何避免向下传递回调？

使用`context`配合`useReducer`向下传递一个`dispatch`函数