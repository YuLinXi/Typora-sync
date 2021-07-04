# Immutable

Redux 要求全局状态具有不可变性。

React 要求本地组件状态具有不可变性。

## 数据突变与不可变

### 数据突变 

由于数据突变带来的不可预测性，非常容易导致改A坏B的问题。

```js
// 例一：
var p1 = { name: '张三' };
var p2 = p1;

p2.name = '李四';
console.log(p1.name); // '李四'
console.log(p2.name); // '李四'

// 例二：
const a = [2, 1, 4, 3];
const b = a.sort();
console.log(b); // [1, 2, 3, 4]
console.log(a); // [1, 2, 3, 4]
```

### 数据不可变

对引用类型的数据进行更改，更改并不会作用于原数据，而是返回一个更改后的全新的数据。

### JavaScript 中的数据不可变

在JavaScript中，既有数据突变方法，也有数据不可变的方法

突变方法：sort、splice、push、pop  
不可变：map、filter、reduce、slice

### 不完整的数据可不变  

JavaScript 不具备完整的数据不可变性，
它提供的那些具有**数据不可变**的方法都是属于浅拷贝，
对于引用数据类型嵌套的情况，内存数据仍然是**引用地址的拷贝**。

补充：如果通过深拷贝的方式解决**数据突变**会有性能问题：
  1. 深拷贝过程是递归的过程，是**性能消耗**的。
  2. 内存中多出了很多重复的相同数据，**内存占用**。

## Immutable  

### 提升数据操作性能

不可变数据采用了数据共享，返回的心的不可变数据中，发生了**变化的数据是独立的**，其它**没有发生变化的数据是共享的**。


### 数据结构及API

见官方网站：https://immutable-js.com/docs/v4.0.0-rc.12

### fromJS 方法

使用 `fromJS` 方法将数组和对象转换为不可变数据，支持深层嵌套。

### is 方法

使用 `is` 判断两个不可变数据是否相同。

## Imuutable 与 React 配合 

### 性能优化

使用`shouldComponentUpdate` 配合 `is` 方法进行检测

```jsx

class App extends Component {
  constructor() {
    super();
    this.state = {
      person = fromJS({
        name: '张三'
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(this.state.person, nextState.person);
  }
}
```
