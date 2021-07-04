# Reudxjs/toolkit

## 执行异步操作

使用 createAsyncThunk
createAsyncThunk 是对 redux-thunk 的二次封装

```js

// 方式一：通过dispatch调用其他actions
const loadTodos = createAsyncThunk(
  "todos/loadTodos",
  (payload, { dispatch }) => {
    axios.get(payload).then((res) => dispatch(setTodos(res)));
  }
)

// 方式二（推荐）：通过extraReducers监听Promise的状态
const loadTodos = createAsyncThunk(
  "todos/loadTodos",
  (payload, { dispatch }) => {
    return axios.get(payload);
  }
)

const {} = createSlice({
  extraReducers: {
    [loadTodos.fulfilled]: (state, action) => {
      state.push(action.payload);
    }
  }
})
```


## 配置中间件 
toolkit内置使用了一些中间件，如果配置额外中间件后记得使用`getDefaultMiddleware`

```js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

export default configureStore({
  middleware: [...getDefaultMiddleware(), logger]
})
```

## 实体适配器

**createEntityAdapter**

实体：指的是数据库中的一条数据。  
实体适配器可以想象成一个容器，将数据放在这个容器中，实体适配器提供操作状态的各种方法，简化操作，提高性能。

## 状态选择器

**createSelector**

主要目的是简化组件中获取状态的代码。
配合`useSelector`一起使用

```js
import { createSelector } from '@reduxjs/toolkit';

const { selectAll } = todosAdapter.getSelectors();
const selectTodosList = createSelector(
  state => state.todos,
  selectAll
)
const Todos = () => {
  const todos = useSelector(selectTodosList)
}
```