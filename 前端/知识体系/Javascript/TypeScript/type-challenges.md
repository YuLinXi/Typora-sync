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

