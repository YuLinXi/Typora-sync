使用者与群组
===

文件的所属权限分为

> User、Group、Others、Root  
> /etc/passwd 个人密码记录  
> /etc/group 所有的群组名

文件权限修改

> chgrp：改薄案档案所属群组  
> chown：改变档案拥有者  
> chmod：改变档案的权限，SUID,SGID,SBIT等特性

r：4 w:2 x: 1，所以`chmod 777 a.js` 的意思即同时将a.js的owner/group/other权限设置为rwx  

> 要开放目录给任何人浏览时，应该至少要给与r与x权限，但w权限不可特殊随便给  

Linux文件长度限制

> 单一文件或目录的最大文件、目录名为255bytes  
> 避免特殊字符*?><；&![]|\'"`(){}

Linux目录标准

> [文件系统层次结构标准（FHS）](https://zh.wikipedia.org/wiki/文件系统层次结构标准)   

    