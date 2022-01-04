# learntypescript.dev 学习笔记



## CONDITIONAL TYPES 条件类型



### extends 

条件类型变换类型到一个新的类型。

```typescript
T1 extends T2 ? A : B
```

含义：如果`T2`包含在`T1`中，则使用A，否则使用B。

条件类型在 **泛型** 类型上非常有用。



### infer

inferring types

使用 `infer`  关键词可以将一个条件类型得判断类型放到一个变量中，这个变量可以被用在接下来的判断分支中。

```typescript
type FunctionReturnType<T> = T extends (...args: any) => infer R ? R : T;
```

含义：如果 T 是一个函数，并且返回类型推断为 R，则返回类型R，否则返回 T。



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

注：只为对象属性进行浅包装（*shallow* readonly check）



### Object.freeze

使用 `Object.freeze` 包装的数据，TS会自动推到并为其使用 `Readonly ` 包装。





TODO：https://learntypescript.dev/10/l5-deep-immutable