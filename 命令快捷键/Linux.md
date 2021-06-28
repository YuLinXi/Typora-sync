操作命令
===

#### 查看进程

``` 
ps aux | grep sshd
```

#### 查看已经连接的服务端口
```
netstat -a
```

#### 查看所有的服务端口
```
netstat -ap
```

#### 查看指定端口占用情况
```
lsof -i:端口号
```

#### 根据pid关闭占用此端口的程序
```
kill -9 <PID>
```

#### 本地拷贝至服务器
一般默认只有/tem/目录下有权限
```
scp -r local.text username@172.16.6.1:/tmp/

```
- -rf 文件夹下的所有文件  
- -r 文件夹

#### 移动文件到指定目录
```
mv <file> /path/
```
#### 手动配置全局环境变量
```

sudo ln -s /opt/node-v8.5-linux-x64/bin/node/ usr/local/bin/node
```

#### 下载程序（例Nodejs）
``` 
/* 下载 */
wegt https://nodejs.org/dist/v8.2.1/node-v8.2.1-linux-x64.tar.gz

/* 解压 */
tar -xvf node-v8.2.1-linux-x64.tar.gz

/* 全局变量软连接设置 */
ln -s /home/www/node-v8.2.1-linux-x64/bin/node /usr/bin/node
```


API
===

`$REPLY`：当没有参数变量提供给read命令的时候，这个变量会作为默认变量提供给read命令  

