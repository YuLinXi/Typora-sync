# Http 协议

## 基础使用 

以流的方式接收请求信息

```js
const http = require('http');

const server = http.createServer((req, res) => {
  let dataBuf = [];
  req.on('data', (chunk) => {
    dataBuf.push(chunk);
  })
  req.on('end', () => {
    console.log(Buffer.concat(dataBuf).toString());
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end("哈喽，客户端！", 'utf-8');
  })
})

server.listen(port, () => {
  console.log(`server start at port：${port}`)
})
```


