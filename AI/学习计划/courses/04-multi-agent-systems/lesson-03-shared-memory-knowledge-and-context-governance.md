# 课时 03：共享记忆、共享知识与上下文治理

## 课时定位

- 所属阶段：多 Agent 系统设计阶段
- 建议周期：1 周
- 建议投入：8~10 小时
- 学习优先级：高
- 课时目标：建立多 Agent 系统中的共享上下文管理机制，解决信息同步、上下文污染、权限越界和重复工作问题。

---

## 学习目标

完成本课时后，你应具备以下能力：

1. 能区分共享状态、共享知识库、共享记忆三类信息。
2. 能为多 Agent 设计 Blackboard、Shared State 或 Task Store。
3. 能控制哪些信息应该共享，哪些信息必须隔离。
4. 能减少不同 Agent 之间的重复检索和重复推理。
5. 能避免共享上下文导致的权限越界和脏数据传播。

---

## 核心知识点

### 1. 共享上下文的三层

- Shared Task State：任务进度、子任务状态、依赖关系
- Shared Knowledge：公共文档、参考资料、事实片段
- Shared Memory：协作中沉淀的中间结论和决策

### 2. 上下文治理问题

- 谁可以写共享状态
- 谁可以读全部状态
- 什么时候做摘要和压缩
- 如何避免错误信息被继续传播

### 3. 共享模式

- Blackboard 模式
- Append-only event log
- Shared database tables
- Task-scoped memory store

### 4. 权限与隔离

- 不是所有 Agent 都应访问全部文档
- Reviewer 可以读全局，但 Worker 可能只读局部
- 高风险信息应标签化隔离

---

## 推荐技术栈

- PostgreSQL
- Redis
- Vector store
- LangGraph JS

---

## 本课时内容安排

## 模块 A：定义共享状态模型（2 小时）

### 学什么

- 任务级状态和角色级状态如何建模
- 共享状态与本地状态的边界

### 输出物

- `src/shared-state/types.ts`
- `shared-state-design.md`

---

## 模块 B：实现 Blackboard / Shared Store（2.5 小时）

### 学什么

- 为多 Agent 提供统一共享读写层
- 加入版本和写入规则

### 输出物

- `src/shared-state/blackboard.ts`
- `src/shared-state/event-log.ts`

---

## 模块 C：共享知识与权限隔离（2.5 小时）

### 学什么

- 共享知识如何带标签
- 不同角色如何做最小权限读取

### 输出物

- `src/shared-state/access-policy.ts`
- `knowledge-sharing-policy.md`

---

## 模块 D：做一个“协作式研究系统”（2.5 小时）

### 练习项目

多个 Agent 协作完成一个技术研究任务：

- Research Agent 查资料
- Architecture Agent 产出方案
- Reviewer Agent 审核方案

三者共享研究状态和中间结论，但权限与写入规则不同。

### 输出物

- `src/examples/collaborative-research.ts`
- `shared-context-demo.md`

---

## 课时作业

### 作业题目

为多 Agent 系统实现共享上下文层与权限治理。

### 难度

- ⭐⭐⭐⭐⭐

### 为什么做这个项目

- 多 Agent 没有共享上下文会重复劳动
- 共享得不受控又会迅速变成信息污染源

### Step-by-step 任务拆解

1. 设计共享状态 Schema
   - 输出物：`src/shared-state/types.ts`
2. 实现共享存储层
   - 输出物：`src/shared-state/blackboard.ts`
3. 实现事件日志和版本管理
   - 输出物：`src/shared-state/event-log.ts`
4. 增加角色访问策略
   - 输出物：`src/shared-state/access-policy.ts`
5. 用 3 个角色做协作测试
   - 输出物：`shared-context-test-cases.md`
6. 记录权限越界和上下文污染案例
   - 输出物：`shared-state-failures.md`

### 验收标准

- 有共享状态和本地状态的清晰区分
- 至少 3 个角色可基于共享状态协作
- 有访问控制规则
- 有版本或事件记录
- 有上下文污染处理说明

### 进阶挑战

- 为共享状态增加冲突检测
- 对共享知识引入标签化索引
- 支持跨会话共享项目记忆

---

## 推荐教程与资料

- LangGraph JS Overview  
  https://docs.langchain.com/oss/javascript/langgraph
- AutoGen Documentation  
  https://microsoft.github.io/autogen/stable/
- PostgreSQL Docs  
  https://www.postgresql.org/docs/

---

## 完成标志

- 你已经能为多 Agent 设计共享状态与共享知识层
- 你已经具备控制多角色上下文污染和权限越界的能力
