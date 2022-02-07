[题解](https://ghaiklor.github.io/type-challenges-solutions/en/)

#### [深度Readonly](https://github.com/type-challenges/type-challenges/issues/5855)

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: (keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>)
};

type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
    }
  }
}
```

1. 关键，`keyof T[K] extends never` 用于判断是否还有深度嵌套类型。 



#### [可串联构造器](https://github.com/type-challenges/type-challenges/blob/master/questions/12-medium-chainable-options/README.zh-CN.md)

```typescript
type Chainable<T extends {} = {}> = {
  option<K extends string, V>(key: K, value: V): Chainable<T & { [key in K]: V }>
  get(): T
}
```

1. 链式调用关键返回`this`，所以`options`函数应该返回自身`Chainable`
2. 这里设置一个`带默认值的泛型参数T`，用于与储存第一次调用后返回的类型



#### [Permutation 元祖排列组合](https://github.com/type-challenges/type-challenges/issues/5934)

```typescript
type Permutation<T, U = T> = 
  [T] extends [never]
   ? [] 
   : T extends U 
    ? [T, ...Permutation<Exclude<U, T>>]
    : [];
```

1. 首先`T extends U ` ，`extends`左右两则都为元祖类型，左侧将元祖挨个遍历与又边做比较。
2. 配合递归实现排列组合。



#### [IsNever](https://github.com/type-challenges/type-challenges/blob/master/questions/1042-medium-isnever/README.md)

```typescript
type IsNever<T extends unknown> = [T] extends [never] ? true : false;
```

1. 关键在于如果要判断参数是否为 `never`  本身，需要使用 `[T] extends [never]` 来判断。

   

#### [IsUnion](https://github.com/type-challenges/type-challenges/blob/master/questions/1097-medium-isunion/README.md)

```typescript
type IsUnion<T, U = T> = T extends U ? [U] extends [T] ? false : true : never
```

1. 联合类型的分发特性，当联合类型作为泛型的时候，会触发分发特性。

2. 当 联合类型用 [ ] 包装以后,会失去分发特性。

3. 如果不为联合类型，通过以上判断始终是相等的。例如：

   ```typescript
   type a = string extends string ? [string] extends [string] ? false : true : never
   // a 始终为 false;
   ```

   
