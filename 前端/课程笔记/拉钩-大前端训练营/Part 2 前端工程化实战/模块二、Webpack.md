## Webpack

打包工具解决的是前端整体的模块化，并不单指`JavaScript模块化`

Webpack只是打包工具  

Webpack因为模块打包需要，所以能处理`import`和`export`语法，但其内部并未支持`Es6+`新特性转换 

babel-loader、@babe/core、@babel/preset-env

支持的模块规范

- 遵循ES Modules标准的 impot 声明
- 遵循CommonJS标准的 require 函数
- 遵循AMD标准的 define 函数和 require 函数


<h4>loader</h4>

`Loader`机制是Webpack的核心   

```
## loader
module.rules[].use：['style-loader', 'css-loader']

## 文件
module.rules[].use：'path/loader.js'
```

可以使用多个`loader`，执行顺序是`从后往前`。同时还可以使用文件的的相对路径

文件资源加载

`file-loader`：以单个文件方式加载  

`url-loader`：以`DataUrl`方式加载，例如图片为`base:64`格式，可配置`limit`，超过`limit`则使用`file-loader`

`Loader`类似一个管道，通过多个`Loader`加工后，要求最终输出的结果为`Javacript代码`

<h4>插件</h4> 

解决除了`loader`处理之外的其它自动化工作，能力范围更宽

`Plugin`通过钩子机制实现，类似`Web中的事件`  

要求是一个函数或者是一个包含apply方法的对象，内部通过在生命周期的钩子中挂载函数实现扩展

<h4>Source Map</h4> 

webpack支持12种`Source Map`不同的方式 

12种模式的命名规律

- `带eval`：是否使用`eval`执行模块代码  
- `带cheap`：Source Map是否包含行信息  
- `带module`：是否能够得到`Loader`处理之前的源代码

开发环境下建议使用：`cheap-module-eval-source-map`

- 代码每行不会超过80个字符，因此能定位行就足够
- 代码经过Loader转换过后的差异较大，需要调试转换之前的源代码
- 首次打包速度慢无所谓，热更新重新打包相对较快

生产环境下建议使用：`none`

- 不生成`Source Map`，不会暴露源代码

也可以使用`nosources-source-map`，出现问题能定位源代码的位置，但是不显示源代码

<h4>HMR</h4>  

集成在`webpack-dev-server`插件中，通过设置devServer的`hot：true`属性，并且加载`webpack.HotModuleReplacementPlugin`插件开启  

- 样式文件开箱即用
- Js需要手动处理模块热替换逻辑来达到最佳的热更新效果

如果是框架配合`HRM`可开箱即用，因为框架一般都会提供`HRM`方案

HRM API ：`module.hot.accpet(path, () => {})`

使用`hotOnly：true`，如果HRM API中出现代运行时错误时，页面不会刷新而显示报错信息

`webpack-merge`：用于开发多环境配置文件  
`webpack.DefinePlugin`：为代码注入全局成员，`process.env.NODE_ENV`

<h4>Tree shaking</h4>  

删除未引用的代码，生产模式自动开启  
由Webpack打包的代码必须使用ESM，因此如果经过`babel`将`ESM`转换为了`CommonJs`，将无法开启`Tree shaking` 

<h4>sideEffects</h4>  

确定你的代码没有副作用后再使用

一般用于`npm`包标记是否有副作用，在`package.json`里标记`sideEffects：fasle | [path]`给webpack提供识别

常用于解决`npm`包通过`index.js`统一导入导出模块，但实际使用时只用到了导出的部分模块  

标记`sideEffects：true`的模块打包时会被打包全部代码，反之的会被`Tree shaking`自动删掉没有使用的模块

<h4>webpack 输出文件名 hash</h4>

[name]-[hash].bundle.css：对整个工程级别的`hash`，多页应用也应用同一变化 
[name]-[chunkhash].bundle.css：同一路`chunk`级别`hash`变化   
[name]-[contenthash].bundle.css：文件级别的`hash`值，适合用于解决文件缓存问题


## Rollup 

更为小巧，仅仅是一款充分利用`ESM`特性的高效打包器  
适合作为框架或类库开发的打包工具，如`vuejs`

- 输出结果更扁平化，打包结果完全可读，不需要`webpack`的模块基础代码
- 不支持`HMR`
- 默认只能处理`ESM`规范的代码，加载`CommonJS`模块需要借助`rollup-plugin-commonjs`
- 默认开启`tree-shaking`  
- 插件是`Rollup`唯一的扩展途径
- 默认只能按照文件路径的方式加载本地三方模块，不能直接使用`名称`直接加载`node_module`中的第三方模块，（如`import _ from 'lodash'`）需要借助`rollup-plugin-node-resolve`

## Parcel 

零配置打包工具  

- 支持`热替换`  
- 自动安装依赖  
- 相同体量的项目打包，由于`Parcel`内部使用`多进程`去同时工作，会比`webpack`快很多  

注：`Webpack`中可以使用`happypack`插件实现多进程