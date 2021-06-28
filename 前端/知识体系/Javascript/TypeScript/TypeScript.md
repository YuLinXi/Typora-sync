
## 基础类型

#### 布尔值

- `boolean`。

#### 数字

- `number`。

#### 字符串

- `string`。

#### 数组

- `number[]`。
- `Array<number>` 数组泛型。
- 类数组有`内置对象`定义接口，如`IAruments、NodeList、HTMLCollection`等

#### 元祖Tuple

```

let x: [string, number]
```

- 表示一个已知元素数量和类型的数组，各元素的类型不必相同。
- 当访问越界元素`x[3]`时候会使用联合类型替代，即可以是`string`或`number`。

#### 枚举

```

enum Color {
    Red = 1, Green, Blue 
}

let c: Color = Color.Green;

let colorName: string = Color[1];
```
- 使用枚举类型可以为一组数值赋予友好的名字。
- 默认情况下，从0开始为元素编号，也可以手动指定成员数值。
- 枚举类型可以由枚举值得到它的名字。

#### Any

> `let list: any[] = [1, true, '2']`

- 指定编程阶段不清楚类型的变量。

#### Void

- 表示没有任何类型，声明一个`void`类型的变量只能对其赋值`undefined`或`null`。

#### Null和Undefined

- 尽量使用`--strictNullChecks`标记，当未标记时是所有类型的子类型。

#### Nerver

- 表示永远不存在值的类型。
- `never`类型是任何类型的子类型，也可以赋值给任何类型。

#### 类型断言

``` 

1.尖括号法\
let strLength: number = (<string>someValue).length;
let someValue: any = "this is a string";

2.as\
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
    
```

- 两种方式断言，但当在`TypeScript`里使用`jsx`时，只有`as`语法被允许。

## 接口

```

interface LabelValue {
    a: number,
    b?: string,
    readonly c: number 
}
```

- `?`符号指定可选属性。
- `readonly`标记只读属性。
- Ts内置`ReadonlyArray<T>`类型，数组创建后再也不能进行修改，仅可进行类型断言重写来修改。
- 

#### 额外的属性检查

实现不会经过额外属性检查的接口定义

- 使用类型断言。

```

interface Label {
    color?: 1,
    b?: 2
}
Fn({ a: 1 } as Label)
```

- 添加一个字符串索引签名。

```

interface SquareConfig {
    color?: string,
    width?: number,
    [propName: string]: any
}
```

#### 函数类型

```

interface MyFunc {
    (a: string, b: number):boolean
}
```

- `a`, `b` 为参数类型定义, `boolean`为返回值类型定义。

#### 可索引的类型

- 可索引类型具有一个`索引签名`，它描述了对象索引的类型，还有相应的索引返回值类型。
- 支持两种索引签名：字符串和数字，两种索引可同时使用。
- 数字索引的返回值必须是字符串索引返回值类型的子类型。
- 给索引签名设置只读，防止给索引赋值。

```

interface xx {
    readonly [index: number]: string
}
```

#### "类" 类型

> 实现接口

- 使用`implements`实现接口。
- 接口描述了类的公共部分，而不是公共和私有两部分。它不会帮你检查类是否具有某些私有成员。    

> 类静态部分与实例部分的区别

- 接口只会检查类的实例部分，不会检查类的静态部分。

#### 继承接口

- 可以继承多个接口。

```

interface Child extends Mom, Dad {
    height: number
}
```

#### 混合类型

- 可以定义一个混合的属性类型。

#### 接口继承类

- 当创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）

## 类

#### 公共，私有与受保护的修饰符

- 默认成员为`public`。
- `private`表示该成员不能在它的类外部访问。
- `protected`与`private`行为相似，但前者成员在派生类中可以访问。
- `readonly`只读成员声明。
- 使用`private`限定一个参数属性会声明并初始化一个私有成员，对于`public`和`protected`也相似
```

class Animal {
    constructor(private name: string) {  }
    getName() {
        return
    }
}
```

#### 存取器

- TypeScript支持通过`getters/setters`来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。
- 存取器不支持降级到ES3，要求编译输出ES5及更高，只带有`get`不带`set`存取器会自动判断为`readonly`。

#### 静态属性

- `static`描述静态属性。

#### 抽象类

- `abstract`关键字定义抽象类和在抽象内部定义抽象方法。
- 抽象类中的抽象方法不包含具体实现且必须在派生类中实现。
- 可以把类当做接口使用

## 类型断言

语法

`<类型> 值`  或  `值 as 类型`

> 用来手动指定一个值的类型  
> 在`jsx`中只能使用后者语法


