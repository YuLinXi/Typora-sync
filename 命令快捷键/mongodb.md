
查询大于某个时间，小于某个时间

`$gt`：大于;  `$lt`：小于;  `$gte`：大于等于;  `$lte`：小于等于;

``` 
db.xxx.find({"time":{$gte:new Date(2016,11,1), $lte: new Date(2016,11,2)}})
```

删除某表下所有数据

```
db.getCollection('TkChannel').remvoe({})
```

删除某张表

```
db.getCollection('TkChannel').drop()
```

