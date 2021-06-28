> 访问主模块  

Node.js直接运行一个文件时，`require.main === module`。  
通过`require.main.filename`可以获取当前应用程序的入口点。   
`__filename`查看当前文件名。  

> 缓存 

模块在第一次加载后会被缓存。  
模块是基于其解析的文件名进行缓存的。  
在不区分大小写的文件系统或操作系统`require('./foo.js')`和`require('./FOO.js')`会被视为两个不同的模块。  

> 核心模块  

核心模块会被编译成二进制。  
定义在Node.js源码的`lib/`目录下。  
`require()`总是会优先加载核心模块。

> 模块封装器  

```
(function(exports, require, module, __filename, __dirname) {
// 模块的代码实际上在这里
});
```

> module对象  

由模块封装器提供。  
`exports`是`module.exports`的快捷方式。  
对`module.exports`的赋值必须立即完成。

> Module对象  

通过`require('module')`获取的 `module`