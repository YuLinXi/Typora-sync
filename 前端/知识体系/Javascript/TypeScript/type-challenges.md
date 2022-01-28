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



