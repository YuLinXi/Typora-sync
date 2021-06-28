## monorepo  

[参考：知乎](https://www.zhihu.com/question/318476028/answer/1895685159)

### 优势 

1. 代码重用将变得非常容易。
2. 依赖管理将变得非常简单。
3. 代码重构将变得非常便捷。
4. 它倡导了一种开放，透明，共享的组织文化

### 劣势

1. 项目粒度的权限管理变得非常复杂。
2. 新员工学习成本变高。
3. 对于公司级别的 monorepo 策略而言，需要专门的 VFS 系统，自动重构工具的支持

## 方案实践


> 1. 锁定环境：Volta

`volta pin`命令，轻松锁定项目中node，npm 和 yarn 的版本

> 2. 复用 packages：workspace

使用`monorepo`策略后，配合`workspace`特性实现两大收益。
1. **避免重复安装包，因此减少了磁盘空间的占用，并降低了构建时间**
2. **内部代码可以彼此相互引用**；

实现以上两点收益的三件事：

1. 调整目录结构，将相互关联的项目放置在同一个目录，推荐命名为**packages**；
2. 在项目根目录里的 package.json 文件中，设置`workspaces` 属性，属性值为之前创建的目录；
3. 在根`package.json`文件中，设置 **private** 属性为 true

通过以上设置，在安装依赖时，npm或yarn会自动计算提升公共依赖，以及包含所有`packages/`目前下子项目作为依赖。

**对子项目命名：统一以 @<repo_name>/ 开头，这是一种社区最佳实践**


> 3. 统一配置：合并同类项 - Eslint，Typescript 与 Babel

遵守**DPY**原则，解决重复配置

**统一tsconfig.json** 

1) 根目录中放置如`tsconfig.settting.json`文件，定义通用`ts`配置。  
2) 子项目通过`extends`属性，并设置`compilerOptions.composite = true`
```
{
  "extends": "../tsconfig.setting.json", // 继承 packages 目录下通用配置
  "compilerOptions": {
    "composite": true, // 用于帮助 TypeScript 快速确定引用工程的输出文件位置
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

**Eslint、Babel**等工具同理复用

> 4. 统一命令脚本：scripty

scripty 允许您将脚本命令定义在文件中，并在 package.json 文件中直接通过文件名来引用，以达到以下目的

1. 子项目间复用脚本命令。
2. 像写代码一样编写脚本命令，无论它有多复杂，而在调用时，像调用函数一样调用；

> 5. 统一包管理：Lerna

它的确提供了一种非常便捷的方式供我们管理 monorepo 项目

```
{
  "packages": ["packages/*"],
  "npmClient": "yarn",
  "version": "independent",
  "useWorkspaces": true,
}
```

> 6. NPM包本地发布：Verdaccio

> 7. 格式化commit信息：commitlint & husky