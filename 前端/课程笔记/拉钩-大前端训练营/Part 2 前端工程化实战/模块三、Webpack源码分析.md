## 打包

### commonjs单文件打包

1. 打包后的文件就是一个函数的自调用，当前函数接收一个参数`modules`，调用时传入一个键值对对象。
2. 这个键值对对象，键为文件相对路径`moduleId`，值为我们原始模块的代码内容，其被包裹于一个函数中，这个函数有2个参数，module、exports，ß这个函数可以称之为`模块`。
3. 自调用函数内部定义了一个`installedModules`变量用来存储`模块`，同时定义了一个`__webpack_require__`函数，并以`moduleId`作为参数。
4. 接下来为`__webpack_require__`添加一系列属性和静态方法，最终执行并`__webpack_require__(moduleId)`函数并返回值`module.exports`，供其它模块使用。
5. `__webpack_require__`函数中，首先从`installedModules`中读取缓存，如果有则直接返回缓存模块的`exports`值。
6. 定义一个包含`exports`属性的`modue`对象，并将`模块`存入`installedModules`中缓存起来。
7. 通过`modules[moduleId].call`来执行`模块函数`，并将`this`绑定到`module.exports`对象上（因此模块内部this指向一个空对象），向模块函数传入3个参数，分别是`module`、`exports`、`__webpack_require__`，最后返回`module.exports`


* 模块中代码的require代码会被替换成`__webpack__require__`，以及`module`、`exports`都是自调用函数定义的变量
* `__webpack__require__`是一个webpack自定义加载模块的方法，其核心功能就是返回模块中导出的内容

#### `__webpack__require__`上挂载的属性解释

1. `__webpack__require__.m`：保存一份模块定义
2. `__webpack__require__.c`：保存一份模块缓存
3. `__webpack__require__.o = function(object, property)`：判断对象中是否存在某个属性
4. `__webpack__require__.d = function(exports, name, getter)：`通过3判断如果不存在`name`属性，通过调用`Object.defineProperty`方法给对象上绑定一个`name`属性，并将`getter`设置到`get`上。当`EsModule`模块下通过`export const a = 1`方式导出变量时会使用。
5. `__webpack__require__.r = function(exports)`：在`exports`上绑定一个`__esModule`属性，用来标记该导出为`ES Module`。同时如果环境支持`Es6语法`，则为`exports`对象定义一个`Symbol.toStringTag`属性并返回`Module`值，以便后续使用`toSring()`时可以返回`[object Module]`来进行`ES Module`判断
6. `__webpack__require__.t = function(value, mode)`：
7. `__webpack__require__.n = function(module)`：返回一个函数，该函数内如果为`Es Module`则返回`module.default`，否则返回`module`。在`ES module下导入CommonJs`时候使用
8. `__webpack__require__.p = ""`：存储`webpack`的`public`属性配置
9. `__webpack__require__.s = ""`：存储当前模块的`moduleId`，即模块文件相对路径


### 主入口CommonJs下导入Es Module 打包

1. Es Module下，包裹的模块代码中使用`__webpack_require__.r`对其参数`__webpack_exports__`对象进行标记
2. 使用`export.default "123"`方式导出的值，直接添加到`__webpack_exports__["default"] = "123"`上。
3. 使用`__webpack_require__.d`，将`export const a = "1"`方式导出的变量通过`__webpack_require__.d方法`设置到`__webpack_exports__`对象上，并设置`getter函数`为`function() { return a }`。


### 总结：

以下，`CommonJs`简称`CJS`、`ES Module`简称`ESM`

1. 导入`ESM`时，使用`__webpack_require__.d`函数将`export const a = 1`方式导出的变量进行处理，将其挂载到`__webpack_exports__`对象上。使用`__webpack_exports__["default"] = ("1")`的方式改写`export default 1`，最后导出该`__webpack_exports__`给其它模块使用，形如  
  ![image](https://note.youdao.com/src/64BF3D79D5A64A25A29847EA2BA32B14)

2. 导入`CJS`时，模块内部`module`和`exports`方法会使用webpack自定义的`module`和`module.exports`对象来添加导出变量和值并且返回`module.exports`。

3. 无论是导入`ESM`或者`CJS`最终都会被包裹成`module.exports`对象返回

4. `CJS`导入`ESM`，并且`ESM`通过`export default` 方式导出时，`CJS`在`obj.default`上拿到其导出


## 懒加载流程

```js
import("./login.js").then(login => { console.log(login) })
```

1. `import()`调用方式实现指定模块的懒加载才做
2. 懒加载的核心原理就是`jsonp`方式实现
3. 使用`__webpack_require__.e`替换`import()`方法，并生成`script`标签并插入到DOM中加载模块，该函数返回一个`Promise.all`方法执行。
4. 在`then(login => { console.log(login) })`方法调用之前拼接一个新的`then方法`，当导入模块为`ESM`时其参数为调用`__webpack_require__.bind`而返回的一个函数，并传入导入模块`moduleId`。导入模块为`CJS`时候，其参数为调用`__webpack_require__.t`而返回的一个函数，并传入`moduleId`和一个特殊的`数字`。
5. `__webpack_require__.t`方法针对内容进行不同的处理（处理方式取决于传入的值）
6. 导入后返回一个对象包装`EMS`形式的对象
  ![image](https://note.youdao.com/src/41A33D748995403F9C49060CBE94A99C)


### 懒加载分析


### 总结：

1. 懒加载导入`EMS`和`CJS`，最终都是通过`__webpack_require__`方法来加载新模块，不过`ESM`是通过调用`__webpack_require__.t`，然后再调用`__webpack_require__`对模块进行加载，并且对其返回值做加工处理。



## webpack核心

webpack编译流程，一种`事件驱动型事件流`的工作机制  

- 配置初始化
- 内容编译
- 输出编译后内容

webpack底层中大量使用`tabple`库，负责编译的`complier`、负责创建bunldes的`compilation` 

### tabple

#### 工作流程 

- 实例化Hook注册事件监听
- 通过Hook触发事件监听
- 执行懒编译生成可执行代码


#### Hook执行特点  

分为同步和异步类，异步类又分为并行和串行

- Hook：普通够，监听器之间互相独立不干扰
- BailHook：熔断钩子，某个监听返回非undefined时后续不执行
- WaterfallHook：瀑布钩子，上一个监听的返回值可传递至下一下
- LoopHook：循环钩子，如果当前未返回false则一直执行


#### webpack loader 

loader导导出一个函数，函数参数接收一个字符串，该字符串内容为模块代码，并返回一个处理过后的`代码字符串`