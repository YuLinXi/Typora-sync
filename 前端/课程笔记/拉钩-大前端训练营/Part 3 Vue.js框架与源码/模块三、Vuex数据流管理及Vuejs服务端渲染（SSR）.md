
### Vuex

Vuex`插件`可以实现本地持久储存的功能

Vuex实现核心使用`Vue.observable`、`Objcect.defineProperty`方法实现数据响应式

### 服务端渲染

> 通过服务端首屏直出，解决首屏渲染及SEO问题  
> 通过客户端渲染接管页面内容交互得到更好的用户体验  
> 现代化服务端渲染，也称为「同构渲染」，这类应用也称为「同构应用」

### NuxtJS基础

服务端渲染身份验证

> [JWT](https://zh.nuxtjs.org/examples/auth-external-jwt/)

路由拦截

>由于NuxtJS为同工应用的特殊性，不能直接使用`Vue Router`路由拦截方案  
>使用官方提供叫做`路由中间件`的方案实现

状态在非Vue实例处使用  

> 由于Nuxtjs自动注册store的方式，在业务中，非组件实例中无法获取到Store实例，例如在axios中需要获取store中的状态  
> 使用插件来解决这个问题，插件导出一个函数时，能拿到vue运行时注入的context

### 自动化部署 

CI/CD服务

> Jenkins、Gitlab CI、Github Actions、Travis CI、Circle CI等
