操作命令
===

#### 查看容器信息

``` 

docker info
```

#### 查看所有顶层镜像（不包含中间层）

不包含中间层
```  
docker images ls
```

包含中间层
```
docker images ls -a
```

#### 查看镜像、容器、数据卷所占用的空间
``` 

docker system df
```

#### 显示所有虚悬镜像
``` 

docker image ls -f dangliang=true
```

#### 删除/取消镜像标签

``` 

docker image rm [选项] <镜像1> [<镜像2>...]
```

#### 交互模式进入容器

``` 

docekr exec -it <容器ID或名> <交互模式>
```

#### 创建镜像
```

docker commit [选项] <容器ID或名> [<仓库>[:<标签>]]
```

#### 重命名已有镜像
``` 

docker tag 镜像id 仓库:标签
```


#### 查看进行内的历史记录
``` 

docker history
```

#### 根据dockerfile构建镜像
``` 

docker build [选项] <上下文路径/URL->
```

#### 查看镜像
```

docekr ps
```

#### 停用并删除所有容器
``` 
docker stop $(docker ps -q) & docker rm $(docker ps -aq)
```

#### 删除全部镜像
```

docker rmi $(docker images -q)
```

#### 拷贝本地文件至容器
``` 

docker cp <本地路径> <容器长ID>:<容器路径>
```

#### 查看日志
实时查看指定容器2019-02-21至今的最后10条日志 
``` 
docker logs -f -t --since="2019-02-21" --tail=10 <容器ID或名>
```

#### 以交互模式运行镜像且进入容器
```
docker run -it --rm ubuntu:16.04 bash
```

API
===