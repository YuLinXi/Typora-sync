# PWA基础


## 1. Manifest 配置文件
### 配置示例

配置文件：

```json
{
  "name": "PWA Manifest Demo",
  "short_name": "Manifest Demo",
  "start_url": "./index.html",
  "theme_color": "#4374A5",
  "background_color": "#4374A5",
  "display": "standalone",
  "orientation": "natural",
  "icons": [{
    "src": "images/launcher-icon.png",
    "sizes": "192x192",
    "type": "image/png"
  }]
}
```

注：[配置属性详解](https://developer.mozilla.org/zh-CN/docs/Web/Manifest)


### 可安装条件

1. 拥有一个`manifest.json`配置文件，且该文件必须包含配置：`name`、`short_name`、`start_url`、`icons`。
2. 拥有一个注册了的 `Service Worker`。
3. 网络需要使用 `HTTPS`，**支持`localhost`调试**。
4. 网站在同一浏览器中至少被访问过两次，且相隔时间不少于五分钟。

## 2. Service Worker

### 生命周期

1. 注册

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).then(function(registration) {
      // do domething...
    }).catch(function(err) {
      // do domething...
    });
  });
}
```

- 注册成功仅仅表明指定脚本已成功解析，并不意味`Service Worker`已经安装或处于激活状态。
- `scope`参数指定了 `Service Worker`可接受 `fetch`事件的作用域，比如`scope：'/mobile'`，则只能接受path以`/mobile`开头的fetch事件。
默认为`sw.js`所在路径。

2. 安装

注册完毕后，浏览器便会立即【尝试】安装并进入**安装状态**，此时触发`install`事件。  
在`install`事件中经常对静态资源进行缓存处理。  

为什么是【尝试】：并不是每次注册完毕后都会进入**安装**状态并触发`install`事件，而是需要满足以下任意条件。

- 页面中尚未安装 `Service Worker`。
- `Service Worker`已安装，并且从服务器获取的`sw.js`文件与本地存在差异。

3. 等待

安装成功后，如果已经存在一个版本`Service Worker`且又页面正在使用该版本，新版`Service Worker`便会进入 **等待** 状态。  
新版`Service Worker`必须等正在运行旧版本的`SW`的页面全部关闭后才会获得控制权。  

可通过代码强制跳过该阶段，及时更新：

```js
self.addEventListener('install', function(event) {
  self.skipWaiting();
  //……
});
```

4. 激活

满足以下任意条件即可进入 **激活** 阶段。

- `self.skipWaiting()` 执行。
- 安装完成后，不存在旧版本的 Service Worker 或无页面使用此版本。
- 等待状态下正在运行旧版本 Service Worker 的页面被全部关闭。

注：页面刷新或切换无法使 Service Worker 从等待进入激活状态，这是由于当页面刷新或切换时，浏览器需要等到新页面渲染完成之后才会销毁旧页面，即新旧两个页面存在共同的交叉时间

进入激活状态后，触发`activate`事件，在该下时间下通常进行对缓存更新或删除的操作：

```js
this.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName != 'sw-cache';
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
```

当一个 service worker 被初始注册时，页面在下次加载之前不会使用它。  
claim() 方法会立即控制这些页面。

```js
this.addEventListener('activate', (event) => {
  this.clients.claim()
  //……
});
```

5. 已激活

这一阶段可以通过监听`fetch`、`push`、`sync`、`message`等事件来为应用提供丰富的离线处理能力。

6. 注销

注销的方式：

- 通过点击调试面板的 `unregister` 来注销 `SW`
- 通过编码的方式来实现：

```js
const serviceWorker = navigator.serviceWorker;
if (typeof serviceWorker.getRegistrations === 'function') {
  serviceWorker.getRegistrations().then(function(registrations) {
    registrations.forEach(function(registration) {
      registration.unregister();
    });
  });
} else if (typeof serviceWorker.getRegistration === 'function') {
  serviceWorker.getRegistration().then(function(registration) {
    registration.unregister();
  })
}
```

注意：两种注销方式，本地缓存都不会被自动清除。需要手动调用`Cache API`、`IndexedDB API`等其他离线存储API来进行清理。

### 状态监听

注册`Service Worker`的主线程代码可以通过回调中的 `registration` 参数来获取某个状态下的 `ServiceWorker` 实例。

- 安装：`registration.installing` 获取。为非空则表示正处于此状态。
- 等待：`registration.waiting` 获取。非空则表示处于此状态。
- 激活：`registration.active`获取。非空则表示处于此状态。

注意：`Service Worker` 新旧版本切换时，会同事存在 **安装（等待）**及 **激活** 状态实例。

通过 `statechange` 事件来获取最新状态：

```js
navigator.serviceWorker.register('./sw.js')
  .then(function(registration) {
    const newWorker = registration.installing;
    newWorker.addEventListener('statechange', function() {
      console.log(newWorker.state);
    });
  });
```

通过 `updatefound` 事件来监听 `Service Worker` 的更新：

```js
navigator.serviceWorker.register('./sw.js')
  .then(function(registration) {
    registration.addEventListener('updatefound', function() {
      // registration.installing 的值发生变化时触发回调
    });
  });
```

通过 `controllerchange` 事件在新的 `Service Worker` 取得页面控制权后执行一些逻辑：

```js
navigator.serviceWorker.addEventListener('controllerchange', function() {
});
```


## 3. 离线存储

分析得出PWA可以借助的离线存储方案及其应用场景。

### 离线存储方案选择

无法在`Web Worker`及`Service Worker`环境下访问的离线存储：

1. Cookie

解决`HTTP`无状态问题。

- 无法跨域访问。
- 存储数据格式单一。
- 接口同步访问。
- 存储空间过小（一般4KB）。
- 生命周期一般由服务端设定，如果为浏览器生成，则一般随页面关闭而失效。
- 每次请求自动携带Cookie信息，如果存放的数据太多，将会带来额外开销。

因此，**Cookie方案淘汰**。



2. LocalStorage 和 SessionStorage

HTML5引入的离线存储技术。

1. 无法跨域访问。

2. 存储数据格式单一。

3. 接口同步访问。

4. 存储空间相对于Cookie有所增加（一般为5MB）。

5. 生命周期，`LocalStorage`为永久，`SessionStorage`则随着页面关闭而失效。

6. 仅存在客户端，不参与服务端通信。

   

能够在 Web Worker 及 Service Worker 环境下访问：

1. Web SQL 和 IndexedDB

HTMl5引入的离线存储技术。

1. 无法跨域访问。
2. 可存储丰富的数据格式。
3. 接口异步访问（基于事件）。
4. 存储空间较大（一般不少于250MB）。
5. 生命周期永久。
6. 仅存在客户端中，不参与服务端通信。

由于`Web SQl`已被W3C废弃，所以`Web Sql`淘汰。   
可选择 `IndexedDB` 作为 `Service Worker`的底层存储支持。

2. CacheStorage

`Service Worker`规范的一部分。

1. 无法跨域访问。
2. 可存储丰富的数据格式。
3. 接口异步访问（基于Promise）。
4. 存储空间较大（一般不少于250MB）。
5. 生命周期为永久。
6. 仅存在客户端中，不参与服务端通信。

因此，最终可选择`IndexedDB`和`CacheStorage`，其各自的适用场景：

- CacheStorage：对于网址可寻址（比如脚本、样式、图片、HTMl等）资源文件使用。
- IndexedDB：存储缓存数据。

## 4. 后台同步

该机制允许用户随时随地进行事务处理，而无需关心网络的连接状态，以解决传统Web应用所存在的几问题：

1. 页面发起的请求会随着页面的关闭而终止。
2. 在离线状态下，很难将用户的网络请求缓存起来，并在网络恢复正常后再次进行请求，

### 常规步骤

1. 注册

利用 `registration.sync.register` 注册后台同步事件，并且借助`IndexedDB`将需要发送到服务端的数据缓存到本地。

注意：`registration.sync.register` 的参数是事件的唯一标识，浏览器可能会将多个同名的事件合为一个。

```html
<script src="./db.js"></script>
<script src="./ui.js"></script>
<script src="./network.js"></script>
<script>
  window.addEventListener('load', function() {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.register('./sw.js').then(function(registration) {
        document.getElementById('submit').addEventListener('click', function() {
          ui.submit(function(name) {
            db.addTodo(name).then(function() {
              registration.sync.register('add-todo').then(function() {
                console.log('已触发后台同步：add-todo');
              });
            });
          });
        });
      });
      navigator.serviceWorker.addEventListener('message', function(event) {
        ui.render(event.data);
      });
    } else {
      document.getElementById('submit').addEventListener('click', function() {
        ui.submit(function(name) {
          network.addTodos([{ name: name }]).then(function(todos) {
            ui.render(todos);
          });
        });
      });
    }
  });
</script>
```

2. 响应

完成注册后，在`Service Worker`中对事件进行响应。
监听`sync`事件，将本地缓存数据通过网络请求发送到服务器存储，
服务器成功响应后，通知主线程并删除本地缓存。

```js
importScripts('./db.js');
importScripts('./network.js');

function notification(todos) {
  self.clients.matchAll().then(function(clients) {
    if (clients && clients.length) {
      clients.forEach(function(client) {
        client.postMessage(todos);
      });
    }
  });
}

self.addEventListener('sync', function(event) {
  if (event.tag === 'add-todo') {
    console.log(`开始进行后台同步：${event.tag}`);
    event.waitUntil(
      db.getTodos().then(function(todos) {
        return network.addTodos(todos).then(function(todos) {
          console.log('来自服务器的响应：', todos);
          notification(todos);
          return db.clearTodos();
        });
      })
    );
  }
});
```

注意：浏览器内置了 **智能重试机制**，所以无需自行设计。

3. 重试

浏览器内置的 **智能重试机制**：

- 第一次执行失败后，第二次会在 5 分钟之后触发；
- 第二次执行失败后，第三次会在 15 分钟后触发；
- 如果第三次执行失败后，该同步事件将不会再触发。

因此，一个**同步事件**，最多可被执行 **3** 次。


## 5. 推送通知

实现能力：在用户没有打开浏览器（或PWA应用），用户依旧能够收到通知内容，并通过点击通知进入应用进行处理。

```
    +-------+           +--------------+       +-------------+
    |  UA   |           | Push Service |       | Application |
    +-------+           +--------------+       |   Server    |
        |                      |               +-------------+
        |      Subscribe       |                      |
        |--------------------->|                      |
        |       Monitor        |                      |
        |<====================>|                      |
        |                      |                      |
        |          Distribute Push Resource           |
        |-------------------------------------------->|
        |                      |                      |
        :                      :                      :
        |                      |     Push Message     |
        |    Push Message      |<---------------------|
        |<---------------------|                      |
        |                      |                      |
```

UA：客户端。

Push Service：一般由浏览器服务商提供，比如chrome和firefox自己的Push Service。

Application Server：服务端，开发者自己提供。



### 工作流程

- Subscribe：浏览器通过询问方式让用户选择是否允许显示通知，如允许则向**Push Service** 发起订阅请求，订阅成功后返回 [PushSubscription](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FPushSubscription) 对象。
- Monitor：订阅成功后，Push Service 将保持与客户端的联系。
- Distribute Push Resource：订阅成功后，客户端将 `PushSubscription` 对象中的验证信息发送给服务端，并在服务端进行保存。
- Push Message：服务端推送的消息发给 Push Service，后者对消息进行校检后，再将消息推送给客户端。



### 订阅通知

客户端

1. 注册  `Service Worker`
2. 注册成功后，调用 `registration.pushManager.getSubscription`  方法来检测用户是否已经订阅。
3. `registration.pushManager.subscribe` 方法订阅，接收参数选项：
   1. userVisibleOnly：`Boolean`，必须为 `true`，表示返回的推送订阅将只能被用于对用户可见的消息。
   2. applicationServerKey：`Uint8Array` ，服务端用来向客户端应用发送消息的**公钥**。借助 `web-push generate-vapid-keys`生成。
4. 订阅成功后，将回调参数`subscription`发送到服务端储存。其主要数据格式：
   1. endpoint：浏览器为每个订阅者生成的唯一 URL，以便 `Push Service` 指定用户推送。
   2. expirationTime：订阅的有效时间，只读属性，一般为 `null`。
   3. keys：用于加密消息数据，属性有 `auth`和`p256dh`。



服务端

1. 借助 `web-push`库实现，首先调用 `webpush.setVapidDetails` 方法来设置 `VAPID` 信息。
2. 实现路由，`POST /subscribe` 将客户端上传的 `PushSubscription` 信息保存起来（借助数据库持久化）。



### 发送通知

服务端

1. 例如通过客户端的 `POST /push` 请求通过`webpush.sendNotification`来发送通知。



客户端

1. `self.addEventListener('push')`监听服务端推送消息，通过 `self.registration.showNotification` 方法显示通知弹窗。
2. `self.addEventListener('notificationclick')`监听用户对于通知弹窗的点击触发事件，来做出不同的响应。



### 取消订阅

用户可以主动设置取消订阅，同时也可通过编码方式取消用户订阅。

```js
function unsubscribe() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.pushManager.getSubscription().then(function(subscription) {
        if (subscription) {
          subscription.unsubscribe();
        }
      }
    });
  }
}
```

