# React SSR

## renderToString

该方法将React组件转换为HTML字符串。

```jsx
import { renderToString } from 'react-dom'
```

## React 事件

renderToString方法转换组件，不会为组件添加**事件**。
通过使用`hydrate方法`在客户端对组件进行**二次渲染**，为组件元素附加事件。
`hydrate方法`会**复用**原本已经存在的DOM节点。

```jsx
import { hydrate } from 'react-dom';

hydrate(<App />, document.getElementById("root"))
```

## 路由支持

在React SSR项目中需要实现**两端路由**。

1. 服务端和客户端共享一个**路由配置**，且不能使用**路由组件**的方式定义路由。
2. `app.get('*')`接收所有GET请求，服务端React路由通过URL匹配返回要渲染的组件。
3. 服务端路由实现：
   
   ```jsx
   import { StaticRouter } from "react-router-dom";
   import { renderRoutes } from "react-router-config";
   import routes from '../routes';

   export default req => {
     const content = renderToString(
       <StaticRouter location={req.path}>
        { renderRoutes(routes) }
       </StaticRouter>
     )
   }
   ```
4. 客户端路由实现：
   ```jsx
   import { BrowserRouter } from "react-router-dom";
   import { renderRoutes } from "react-router-config";
   import routes from '../routes';

   ReactDOM.hydrate(
     <BrowserRouter>{ renderRoutes(routes) }</BrowserRouter>,
     document.getElementById("root")
   )
   ```

## Redux支持

在React SSR项目中需要实现**两端Rdux**。

服务端与客户端共享一套`Reducer`代码，不共享创建`store`代码。

服务端Redux：

1. 创建Store
   
  ```jsx
  export default () => createStore(reducers, { }, applyMiddleware(thunk))
  ```

2. 配置store
  ```js
  app.get("*", async (req, res) => {
    const store = createStore();
    const content = renderToString(
      <Provider store={store}>
        ...
      </Provider>
    )
  })

  ```
  
3. 通过给组件定义获取数据的`loadData`函数，并配置到路由配置信息中，由服务端渲染调用，填充**服务端Store**。
  ```js
  // 1. 某个组件导出loadData函数
  export const loadData = () => dispatch(fetchData());

  // 2. 路由配置loadData
  import { loadData } from '..'
  export default [{
    path: '/list',
    component: List,
    loadData,
  }]

  // 3. 服务端匹配组件并触发loadData函数
  import { matchRoutes } from 'react-router-config';
  app.get("*", (req, res) => {
    const route = matchRoutes(routes, req.path);
    const promises = route.map({ route } => {
      if (route.loadData) return route.loadData();
    })
    Promise.all(promises).then(() => {
      // 渲染组件
      ...
    });
  })
  ```

4. 将服务端获取到得数据**回填给客户端**，让客户端拥有初始数据。

  ```js
  // 1. 服务端渲染时在 window 挂载初始state
  const initialState = store.getState();

  app.get("*", (req, res) => {
  ...
  const initalState = store.getState();
  return `
    <html>
      ... 
      <body>
        <script>window.INITAL_STATE = ${JSON.string(initialState)}</script>
      </body>
    </html>
  `
  })

  // 2. 客户端初始store时，注入初始state
  const store = createStore(reducers, window.INITAL_STATE, ...);
  ```

5. 防止XSS攻击，转义状态中的**恶意代码**

  ```js
  import serialize from 'serialize-javascript';

  const initialState = serialize(store.getState());
  ```

