# Express

Express  是一个快速，简单，极简的Nodejs web应用开发框架。

Express 本身是极简的，仅仅提供了web开发的基础功能。

Express 通过中间件的方式集成了许多外部插件来处理HTTP请求：

1. `body-parse`：解析HTTP请求体
2. compression：压缩HTTP响应
3. `cookie-parser`：解析Cookie数据
4. `cors`：处理跨域资源请求
5. `morgan`：HTTP请求日志记录
6. ...等

Express不对Nodejs已有的特性进行二次抽象，只是在它之上扩展了web应用所需的功能：

1. 内部使用的还是`http模块`
2. 请求对象继承自`http.incomingMessage`
3. 响应对象继承自`http.ServerResponse`
4. ...等

许多流行框架基于Express：

1. `LoopBack`
2. `Sails`
3. `NestJs`
4. ... 等



TODO：未完待续

