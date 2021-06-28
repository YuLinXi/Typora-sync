
> CDD（Component-Driven Development)

组件开发驱动，一种组件开发设计模式

- 自上而下 
- 从组件级别开始，到页面级别结束 

好处

- 最大程度被重用
- 并行开发
- 可视化测试


> 处理组件的边界情况  

- $root：获取Vue根实例中的成员，且是响应式的可直接修改
- $parent / $children 不是响应式
- $refs 
- provide / inject：依赖注入到子代组件，非响应式，不可直接修改


> $attrs / $listeners

1. 父组件传到子组件的非prop属性，会自动设置到子组件根标签上
2. 如果子组件不想自动继承，可以使用`inheritAttrs：false`配合`$attrs`自行设置，但是`class、style`等除外
3. `$listeners`可设置事件

> @vue/cli-service-global -g 

- vue-cli提供的原型快速开发插件  
- 必须全局安装

> Monorepo

一个仓库中管理多个模块/包

`/packages/button`目录下通常包含
```
—— __test__
—— dist
—— src
—— index.js
—— LICESE 
—— package.json
—— README.md
```

> Storybook 

- 可视化的组件展示平台   
- 在隔离的开发环境中，以交互式的方式展示组件  
- 独立开发组件

> yarn workspaces

开启Yarn的工作区，根目录`package.json`，指定`workspaces`
```
{
    "private": true,
    "workspaces": [
        "packages/*"
    ]
    ...
}
```

- 给工作区根目录安装开发依赖

```
yarn add jest -D -W
```

- 给指定工作区安装依赖
```
yarn workspace test add lodash@4

// test 为packages/test 模块下包的名字，即package.json的name
```

- 给所有的工作区安装依赖 
```
yarn install
```

> Lerna 

- Lerna 是一个优化使用`git`和`npm`管理多包仓库的工作流工具
- 用于管理具有多个包的`JavaScript`项目
- 它可以一键把代码提交到`git`和`npm`仓库

> 组件单元测试

> Rollup打包  

- Rollup是一个模块打包器
- Rollup支持`Tree-shaking`
- 打包的结果要比`Webpack`要小
- 开发框架/组件库的时候使用`Rollup`更合适

> 基于模板快速生成组件基本结构

当项目组件结构基本稳定后

可以使用`plop`来快速生成组件基本结构