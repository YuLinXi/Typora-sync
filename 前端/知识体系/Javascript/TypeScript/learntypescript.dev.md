# learntypescript.dev 学习笔记

[参考]（https://learntypescript.dev/）

## CREATING TYPES 创建类型

### 创建枚举

#### 数字枚举

枚举值从0开始自增。

```typescript
enum Level {
  High,
  Medium,
  Low
};
Level.High   // 0
Level.Medium // 1
```

#### 字符串枚举

每个Key都应该赋值。

```typescript
enum Level {
  High = "H",
  Medium = "M",
  Low = 'L',
}
```

### 创建类型别名

类型别名是一个 **指向其它类型** 的名称。

类型别名可以被用于 **类型注解**。

```typescript
type TypeAliasName = ExistingType;
```

#### 函数类型别名

```typescript
type TypeAliasName = (paramName1: paramType1, ...) => ReturnType;
```

#### 对象类型别名

```typescript
type Score = { name: string; score: number }
```

### 创建接口

#### 扩展接口

```typescript
interface InterfaceA extends InterfaceB {
 ...
}
```

#### 函数类型接口

```typescript
interface TypeName {
   (paramName1: paramType1, ...): ReturnType;
}
```

#### 合并声明

`typescript`  运行多个**相同名称标识**的接口定义存在，`ts`会自动对其进行合并。

如果具备相同属性名称，则会出现类型错误提示，避免重复。

此类机制适用于 **扩展第三方库内置接口**。

```typescript
interface ButtonProps {
  id: string;
}

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const button: ButtonProps = {
  text: "123",
  id: "1"
};
```

### 创建联合类型

#### 字符串字面量联合类型

```typescript
type Fruit = "Banana" | "Apple" | "Pear";
```

#### 对象联合类型

```typescript
type Actions = { type: "loading" } | { type: "loaded"; data: { name: string } };
```

### 创建交叉类型

和联合类型相似，结合已存在的类型通过 `&` 构造出一个新的类型。

联合类型包含基于我们所参与构建的类型中的 **所有成员**。

#### 交叉类型中的相同成员

如果相同成员的类型不可兼容，则其最终类型以  `never `呈现。

如果可以兼容，则该成员类型为其 **交集**。

```typescript
type A = {
  fn: (a: string) => void;
  b: string
};
type B = {
  fn: (a: string, b: string) => void;
  b: number
};
type C = A & B;
let c: C = {
  fn: (a: string) => {}             // type right
  fn: (a: string, b: string) => {}  // type error

  b: '111'                          // type error
  b: 111                            // type error
}
```

注：如果最终该成员的类型为 `never`，则这个交叉类型为无用类型，无法使用。

### type 对比 interface

#### 原始类型

type 可以申明，interface 不能。

```typescript
type Name = string;
```

#### 数组类型

type 可以申明，interface 也可以，但是推荐使用 **type**。

```typescript
type Names = string[];
interface Names {
  [index: number]: string;
}
```

#### 元祖

只有 type 可以申明。

```typescript
type Point = [number, number];
```

#### 函数类型

type 可以申明，interface 也可以，但是推荐使用 **type**。

#### 联合类型

只有 type 可以申明。

```typescript
type Status = "pending" | "working" | "complete";
```

#### 对象类型

两者都可以，没有优劣。

#### 组合类型

type 使用  `&`，interface 使用 `extends`，两者皆可。

#### 三方库

由于`type` 并不会自动进行同名类型合并，因此使用 `interface` 用于扩展三方库的类型接口尤为有效。

### 类型兼容

#### 基础类型兼容

```typescript
let jones: "Tom" | "Bob" = "Tom";
let jane: string = "Jane";
jane = jones;   // type right
jones = jane;   // type error
```

以上代码`jones`可以赋值给  `jane`，因为 `jane`为 `string` 类型，而`jones`的类型为字符串的子集，是被`string`兼容的。

而反之，`jones`的类型没法兼容`jane`的类型。

#### 对象兼容

对象类型是否兼容，需要判断 **每个成员的类型都兼容**。

```typescript
type Dog = {
  name: string;
};
type Shape = {
  name: "Circle" | "Square";
};
let ben: Dog = {
  name: "Ben",
};
let circle: Shape = {
  name: "Circle",
};
ben = circle;   // type right
circle = ben;   // type error
```

#### 函数兼容

函数兼容分别判断 **参数** 与 **返回值** 。

函数根据对应位置的参数类型进行判断，参数名称并不重要。

## GENERIC TYPES 泛型

标准泛型：`Array<T>`、`Promise<T>`、`Record<K,V>`

### 泛型函数

```typescript
function someFunc<T1, T2, ...>(...) {
 ...
}

const someVar = <T1, T2, ...>(...) => {
 ...
}
```

泛型站位符通用规范含义：

- `T`：表示Type。
- `S`：表示State
- `E` ：表示Element
- `K` ：表示Key
- `V`：表示Value

### 泛型接口

```typescript
interface InterfaceName<T1, T2, ...> {
    ...
}
```

### 泛型类型别名

```typescript
type TypeName<T1, T2, ...> = {
 ...
}
```

### 泛型类

```typescript
class ClassName<T1, T2, ...> {
 ...
}
```

### 泛型默认参数

```typescript
<T = DefaultType>
```

函数的泛型参数不是必须的，Typescript会根据传入的参数来自动推导类型。

### 泛型参数约束

```typescript
<T extends ContrainingType>
```

多个泛型参数。

```typescript
function getFieldValue<T, K extends keyof T>(
  ...
  fieldName: K
) {
  ...
}
```

### 泛型rest（...）参数

```typescript
type NameAndThings<T extends unknown[]> = [name: string, ...things: T];
```

`things `被识别为一个元组类型。

在函数中使用：

```typescript
function logThings<T extends unknown[]>(name: string, ...things: T) {
  console.log(things);
}
```

### 展开（ ...）泛型元组参数

函数参数配合`...`可以达到类型收窄：

```typescript
function merge<Names extends string[], Scores extends number[]>(
  names: Names,
  scores: Scores
) {
  return [...names, ...scores];
}
let scores = merge(["Bill", "Jane"], [8, 9]);
// 类型推导：let scores: ("string" | "number")[]
```

通过 `... T`展开操作符，可以进一步收窄返回类型：

```typescript
function merge<Names extends string[], Scores extends number[]>(
  names: [...Names],
  scores: [...Scores]
) {
  return [...names, ...scores];
}
let scores = merge(["Bill", "Jane"], [8, 9]);
// 类型推导：let scores: ("Bill" | "Jane" | 8 | 9)[]
```

再进一步收窄返回类型：

```typescript
function merge<Names extends string[], Scores extends number[]>(
  names: [...Names],
  scores: [...Scores]
): [...Names, ...Scores] {
  return [...names, ...scores];
}
let scores = merge(["Bill", "Jane"], [8, 9]);
// 类型推导：let scores: ["Bill", "Jane", 8, 9]
```

## TYPE NARROWING 类型收窄

一个变量可以从更少的精确类型到 **更精确** 的类型，这个过程叫做 **类型收窄**。

### 类型断言

```typescript
// <> 语法
const button = <HTMLButtonElement>document.querySelector(".go");

// as 语法（推荐使用）
const button = document.querySelector(".go") as HTMLButtonElement;
```

### `!`  non-null 非空断言

在严格模式下，typesctipy 会默认开启 `strictNullChecks`检查模式。

```typescript
text!.concat(text!)
// 告诉typesctipyt obj 非`null`或`undefined`
```

### type guard  类型守卫

`typeof` 是类型守卫中的其中一个。

使用 `typeof` 的类型判断分支，typescript 会自动的进行类型推导。

```typescript
function double(item: string | number) {
  if (typeof item === "string") {
    return item.concat(item);  // 类型推导 item：string
  } else {
    return item + item;        // 类型推导 item：number
  }
}
```

同样的还有，`instanceof` 、`in` 

#### type predicate 类型谓词

使用类型谓词实现一个自定义类型守卫函数。

类型谓词可以被用在函数的返回类型来表示表示的缩小类型参数。

函数返回值只能是 `boolean`类型。

```typescript
function isPerson(contact: Contact): contact is Person {
  return (contact as Person).firstName !== undefined;
}
```

#### assertion signature 断言签名

使用断言签名实现一个自定义类型守卫函数。

断言签名可以用于一个函数的返回类型来表示的缩小类型参数。

通过抛出异常来表示类型检查失败。

```typescript
function assertTypeName(
  paramName: WideTypeName
): asserts paramName is NarrowTypeName {
  if (some_check) {
    throw new Error("Assert failed");
  }
}
```

### discriminated union pattern 可辨识联合匹配

**可辨识联合匹配**，可以用于收窄联合类型的方式。

三个关键部分：

1. 多个类型含有**一个公共属性**。
   
   ```typescript
   type Type1 = {
     ...
     commonName: "value1"
   }
   ...
   type TypeN = {
     ...
     commonName: "valueN"
   }
   ```

2. 如果一个类型是这**多个类型的联合类型**
   
   ```typescript
   type UnionType = Type1 | ... | TypeN
   ```

3. 通过这个公共属性来创造类型守卫。
   
   ```typescript
   function (param: UnionType) {
     switch (param.commonName) {
       case "value1":
         // type narrowed to Type1
         break;
       case "valueN":
         // type narrowed to TypeN
         break;
     }
   }
   ```

## MAPPED TYPES 映射类型

### keyof

将一个类型映射为它所有成员名称的联合类型。

```typescript
type ContactDetails = { name: string; email: string, mobile: string };
let keys: keyof ContactDetails = 'name';

// keys === 'name' | 'email' | 'mobile'
```

### 创建一个映射类型

映射类型是一个从已存在类型的类型信息创建一个新的类型的过程。

```typescript
// 映射类型含义伪代码
type MappedTypeName = { [K in UnionType]: ExistingType };
```

### `-` 符号

```typescript
{
  [K in keyof T]-?: TypeName
}
```

使用  `-`  符号在 `?` 修饰符之前，表示如果存在，可选修饰符应该被删除。

```typescript
{
  -readonly [K in keyof T]: TypeName
}
```

使用`-` 符号在 `readonly`修饰符之前，将映射到一个可写属性。

应用，实现一个 `Required` 工具类型

```typescript
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

### typeof

## CONDITIONAL TYPES 条件类型

### extends

条件类型变换类型到一个新的类型。

```typescript
T1 extends T2 ? A : B
```

含义：如果`T2`包含在`T1`中，则使用A，否则使用B。

条件类型在 **泛型** 类型上非常有用。

#### 联合类型判断

```typescript
type A = 'X';
type B = 'X' | 'Y';
type Y = A extends B ? true : false;
// 返回 true
```

当`extends`左右都是联合类型时，

```typescript
type A = 'X' | 'Y';
type B = 'X' | 'Y' | 'D';
type Y = A extends B ? true : false;
// 返回true
// 比较相等于 ('X' extends 'X' | 'Y' | 'D') && ('Y' extends 'X' | 'Y' | 'D')
```

特殊的联合类型：`boolean`：

`boolean`参与条件判断时，会被视为`true | false`的联合类型

```typescript
type Y<T> = T extends true ? 1 : 2;
type X = Y<boolean>;
// x 为 1 | 2
```



#### 接口类型判断

```typescript
interface A {
  a: string;
}
interface B {
  a: string;
  b: string;
}
type Y = B extends A ? true : false;
// 返回true
```

当接口做判断时，判断A接口中每个`key`是否在`B`接口中实现。

#### any

当`any` 作为条件左边的值，那么该条件会将`trueType`和`falseType`结果合并成联合类型返回。

```typescript
type Y<T> = T extends true ? 1 : 2;
type X = Y<any>;
// x 为 1 | 2
```



### infer

inferring types

使用 `infer`  关键词可以将一个条件类型得判断类型放到一个变量中，这个变量可以被用在**紧接下来**的判断分支中。

```typescript
type FunctionReturnType<T> = T extends (...args: any) => infer R ? R : T;
```

含义：如果 T 是一个函数，并且返回类型推断为 R，则返回类型R，否则返回 T。

infer推断字符串：

```typescript
type RestString<S extends string> = S extends `${infer first}${infer rest}` ? rest : S;
type a = RestString<'abc'>;
// 返回 'bc'
```

联合类型参与条件判断

```typescript
const person = {
  name: "Fred",
  age: 30,
  email: "fred@somewhere.com"
};
type RemoveFromUnion<T, K> = T extends K ? never : T;
type ContactKeys = RemoveFromUnion<keyof typeof person, "age">;
```

含义：`typeof person` 类型的所有`key` 中，排除 `age`。

联合类型中的每个类型都会进行一次分支判断。

`pick` 类型模拟：

```typescript
type ObjectWithKeys<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

`Omit ` 类型模拟：

```typescript
type RemoveFromUnion<T, K> = T extends K ? never : T;
type ObjectWithoutKeys<T, K extends keyof T> = ObjectWithKeys<
  T,
  RemoveFromUnion<keyof T, K>
>;
```

## IMMUTABLE TYPES 不可变类型

### Readonly

`Readonly` 类型能自动为对象类型的所有属性加上 `readonly` 修饰符。

```typescript
type ReadonlyType = Readonly<ExistingType>;
```

注：只为对象属性进行浅映射（*shallow* readonly check）

### Object.freeze

使用 `Object.freeze` 包装的数据，TS会自动推到并为其使用 `Readonly ` 映射。

### Deeply Immutable

深度不可变类型

#### 使用 const 断言

```typescript
let variableName = someValue as const;
```

1. 在编译时定义不可变类型。

2. 应用到对象而言，使用 `const` 断言会为对象的每个属性 **递归地** 添加`readonly` 修饰符。

3. 当`readonly`修饰符应用到数据类型，数组类型将被修复为固定元素的 **元祖** 类型。

#### deepFreeze 函数

1. 在运行时达到深度不可变的效果。
2. 递归的为对象应用 `Object.freeze` 函数。

```typescript
function deepFreeze<T>(obj: T) {
  var propNames = Object.getOwnPropertyNames(obj);
  for (let name of propNames) {
    let value = (obj as any)[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj);
}
```

#### DeepImmutable 类型

```typescript
type Immutable<T> = {
  readonly [K in keyof T]: Immutable<T[K]>;
};
```
