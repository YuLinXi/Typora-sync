## learn

### 版本 

3+

### what

Lerna是一个用git和npm优化多包仓库管理工作流程的工具。



### why

将大型代码库分割成独立版本化的包对于代码共享非常有用。然而，跨多个存储库进行更改是混乱的，而且难以跟踪，跨存储库的测试变得非常复杂。

为了解决这些(以及许多其他)问题，一些项目将把它们的代码库组织到多包存储库中。像Babel、React、Angular、Ember、Meteor、Jest等项目都在一个存储库中开发它们所有的包。



### 模式

#### Fixed

Fixed/Locked mode (default)

leran把工程当做一个整体来对待，每次发布**packages**都是全量发布，无论是否修改，并且**保持统一**的版本号进行管理。

[Babel](https://github.com/babel/babel)主要使用的模式

开启方式：

```
// lerna.json
{
	"version": "0.0.0"
}
```



#### Independent

独立模式Lerna允许维护人员相互独立地增加包的版本号。

开启方式

```
// lerna.json
{
	"version": "independent"
}
```



### 命令

