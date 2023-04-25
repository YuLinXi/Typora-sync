操作命令
===

#### 拉取远程tag作为本地分支
``` 
git checkout -b <local> <tag>
```

#### 手段关联本地分支余远程分支
```
git branch -u --set-upstream-to=origin/<branch-name>
```

#### 合并前2条commit message
```
git rebase -i HEAD~2
```

#### 把当前未提交代码合并到最近一次提交记录中
```
git commit --amend --no-edit
```

#### 清除版本控制缓存
```
git rm -r --cached .
```

#### 修改最近一次commit
``` 

git commit --amend
```

#### 将现有文件与git仓库关联 

```
git remote add origin git@xxxx.com
```

API
===
