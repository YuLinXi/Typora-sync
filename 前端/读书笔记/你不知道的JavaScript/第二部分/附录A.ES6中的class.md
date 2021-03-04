## Class

> ES6`Class`解决了什么问题

- 不再引用杂乱的`.prototype`了。
- 不需要Object.create()来替换`.prototype`对象,也不需要设置`__proto__`或者`Object.setPrototypeOf()`。
- 可以使用`super`来实现`相对多态`。
- 可以通过`extends`很自然的扩展对象类型。

> `Class`的陷阱

- `Class`基本上只是现有`[[Prototype]]`机制的一种语法糖，并不是ES6新引入的`类`机制。
- 出于性能考虑(this绑定已经是很大的开销了)，`super`并不是动态绑定的，它会在声明时`静态`绑定。
- `使用toMethod(..)`可以手动修改`super`绑定。
- `class`很好地伪装成JavaScript中类和继承设计模式的解决方案，但是它实际上起到了反作
  用:它隐藏了许多问题并且带来了更多更细小但是危险的问题。