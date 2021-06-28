[v4.41.4](https://www.webpackjs.com/concepts/#%E5%85%A5%E5%8F%A3-entry-)

目录 

[TOC]

# 概念

当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

从 webpack v4.0.0 开始，可以不用引入一个配置文件

## 入口起点(entry points)

### 单个入口（简写）语法

```
# entry: string|Array<string>

# 简写
const config = {
  entry: './path/to/my/entry/file.js'
};

# 完整写法
const config = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};
```

多个主入口：向`entry`传入数据，多个依赖文件一起注入，并且将它们的依赖导向(graph)到一个“chunk"

扩展配置时有失灵活

### 对象语法

```
# entry: {[entryChunkName: string]: string|Array<string>}
```

可扩展的 webpack 配置：可重用并且可以与其他配置组合使用。这是一种流行的技术，用于将关注点(concern)从环境(environment)、构建目标(build target)、运行时(runtime)中分离。然后使用专门的工具（如 webpack-merge）将它们合并。

## 输出(output)  

即使存在多个`入口`起点，但只能指定一个`输出`配置。  

最低参数要求：`filename` 输出文件的文件名，`path` 输出目的绝对路径  
多入口配置，使用`占位符`来确保每个文件的唯一名称：`filename：[name].js`  

## 模式(mode)

```
# mode：development、production
# 配置项中设置
module.exports = {
  mode: 'production'
};

# CLI参数传递
webpack --mode=production
```
内置不同行为：

development：process.env.NODE_ENV值为`development`，启用`NamedChunksPlugin`和`NamedModulesPlugin`  
production：启用`FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `UglifyJsPlugin`.

## loader

loader 用于对模块的源代码进行转换，类似于gulp中的`task`

使用loader的几种方式：

- 配置项中设置  
- 内联：`!`拼接多个loader，`?`拼接参数
```
import Styles from 'style-loader!css-loader?modules!./styles.css';
```
- CLI
```
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

## 插件(plugins)  

## 配置(configuration)  

避免以下做法：  
1. 在使用webpack命令行接口或使用`--env`时，访问命令行接口（CLI）参数。
2. 导出不确定的值
3. 编写很长的配置  

支持其它配置语言：Typescript、CoffeeScript、Babel and JSX

## 模块(modules)  

webpack模块：能够以各种方式表达它们的依赖关系  
1. ES2015`import`语句
2. CommonJS`require()`语句
3. AMD`define`和`require`语句 
4. css/sass/less中`@import`语句
5. 样式`url(...)`或HMTL文件`<img src=.../>`中的图片链接

## 模块解析(module resolution) 

在打包模块时，webpack使用`enhanced-resolve`来解析文件路径  

解析规则：webpack能解析三种文件路径：绝对路径、相对路径、模块路径
缓存：每个文件系统访问都被缓存，以便更快触发对同一文件的多个并行或串行请求。在观察模式下，只有修改过的文件会从缓存中摘出。如果关闭观察模式，在每次编译前清理缓存。

## manifest 

使用webpack构建的应用程序或站点中，有三种主要的代码类型：
1. 你的源码
2. 你的源码依赖的第三方库代码
3. webpack的`runtime`和`manifest`，管理所有模块的交互

## 模块热替换 

# 配置

## 选项

详见：https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9  

## 多种配置类型 

`导出为一个函数`：搭配命令行 `--env`与函数，最大复用配置项并达到区分环境等  
`导出一个Promise`：需要通过服务器异步加载所需的配置变量时  
`导出多个配置对象`：常用语把库打包成`AMD`、`CommonJS`等不通规范模块的格式

## 入口和上下文 

### 动态入口
```
entry: () => new Promise((resolve) => resolve(['./demo', './demo2']))
```

### 输出  

重点：

`output.filename`：
1. [name].bundle.js 唯一名称
2. [id].bundle.js 使用内部chunk id
3. [name].[hash].bundle.js 每次构建，唯一的hash生成
4. [chunkhash].bundle.js 基于每个chunk内容的hash

`output.libraryTarget`  

配置如何暴露 library，与`output.library`一起使用。
1. `var`：默认值。当library加载完成，将分配给一个变量
2. 
2. 