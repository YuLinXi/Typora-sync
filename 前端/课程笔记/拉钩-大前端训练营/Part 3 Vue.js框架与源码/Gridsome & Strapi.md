### Gridsome

安装 `Gridsome` 之前因其依赖`sharp`模块，需要提前设置`sharp`的镜像再进行安装 

```
npm config set sharp_binary_host "https://npm.taobao.org/mirrors/sharp"
npm config set sharp_libvips_binary_host "https://npm.taobao.org/mirrors/sharp-libvips"
```

另外还依赖`node-gyp`