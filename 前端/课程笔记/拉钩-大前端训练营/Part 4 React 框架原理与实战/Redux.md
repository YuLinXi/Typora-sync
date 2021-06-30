# Redux

## Redux 中间件

中间件允许我们扩展redux应用。

中间件模板代码

```js
export defalt store => next => action => { next(action); }
```

### 中间件库

Redux-thunk：允许我们使用异**action**函数。

Redux-saga：允许我们将异步操作从**Action Creator**文件中抽离出来，放在一个单独的文件中。

Redux-actions：redux流程中大量的样板代码读写很痛苦，使用**redux-actions**可以简化Action和Reducer的处理。

Redux-toolkit：对Redux进行二次封装，用于高效Redux开发，使Redux的使用变得更简单。