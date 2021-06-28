## Promise

- Promise 是一种`封装`和`组合`未来值的易于复用的机制。
- `Promise.resolve(..)` 可以接受任何 thenable，将其解封为它的非 thenable 值，从而得到的是一个真正的 `Promise`。
- `try...catch`无法用于检测异步模式。