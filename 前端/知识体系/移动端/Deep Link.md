# Deep Link

移动端深度链接（mobile deep linking、deeplink）使用统一资源标识符（URI）链接到一个特定的位置，在一个App中特定的位置（移动应用程序），而不是简单地启动App首页。 [1-2]  而延迟深度链接（Deferred deep link）则是即使用户未安装App的情况下，一样可以在用户安装App后重新还原用户之前预览的页面。

## URI Schemes

优点：  
1. 兼容性好，大部分机型都能兼容  
2. 使用方便

缺点：
1. 不能判断是否已经下载了App，需要自己写逻辑判断。
2. 用户体验不好。

## Universal Link、App Link

为了解决第一代`deep linking`的问题，苹果和安卓都推出了自己的第二套解决方案，分别是iOS的`Universal Link和Android的`App Links`。

从 iOS 9.2 开始，不支持深层链接。您必须使用 Apple 通用链接来提供到应用程序或网站的深层链接。

优点：
1. 提供极佳的用户体验，使用起来方便

缺点：
1. 兼容性问题，Universal Link仅在`ios 9.2`版本之上才能使用，App Link在`Android 6.0`版本之后才能使用。