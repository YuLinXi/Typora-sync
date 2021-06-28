类似于从`0`到`255`之间的整数数组（通过 `& 255`操作强制转换到此范围内 ）  
Buffer的大小在创建时确定，且无法更改

> Buffer.from()、Buffer.alloc() 与 Buffer.allocUnsafe()

`Buffer.from(array | arrayBuffer[, byteOffset [, length]] | buffer | string) `  
`Buffer.alloc`比`Buffer.allocUnsafe`慢，但能确保新创建的`Buffer`不会包含可能敏感的旧数据  
`--zero-fill-buffers` 启动项参数可以让Nodejs程序里所有分配的`Buffer`在创建时都用零来填充

> Buffer 与字符编码

`ascii` 仅适用于 7 位 ASCII 数据。此编码速度很快，如果设置则会剥离高位  
`utf-8` 多自己编码的`Unicode字符`  
`utf16le` （`ucs2`） 2 或 4 个字节，小端序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF  
`base64` Base64 编码  
`latin1`（`binary`）一种将 Buffer 编码成单字节编码字符串的方法  
`hex` 将每个字节编码成两个十六进制的字符  

现代的 Web 浏览器遵循 WHATWG 编码标准，将 `latin1` 和 `ISO-8859-1` 别名为 `win-1252`


> Buffer 与 TypedArray 

`Buffer` 实例也是 `Uint8Array` 实例  
`Buffer#slice()`效率更高，因为其是在现有的`Buffer`上创建而不是拷贝  

> Buffer与迭代器

可以使用`for .. of`语法进行迭代  

> Buffer.allocUnsafe(size) 

Buffer 模块会预分配一个内部的大小为 Buffer.poolSize 的 Buffer 实例，作为快速分配的内存池  
`Buffer.allocUnsafe(size).fill(fill)` 在 size 小于或等于 Buffer.poolSize 的一半时将会使用内部的 Buffer池