# 课时 02：协作协议、任务分派与结果汇总

## 课时定位

- 所属阶段：多 Agent 系统设计阶段
- 建议周期：1~1.5 周
- 建议投入：8~12 小时
- 学习优先级：高
- 课时目标：掌握多 Agent 系统中的任务拆分、任务路由、并行执行、结果汇总和冲突处理机制。

---

## 学习目标

完成本课时后，你应具备以下能力：

1. 能为多 Agent 定义清晰的消息协议。
2. 能实现 Planner -> Coordinator -> Worker 的任务路由流程。
3. 能处理并行子任务执行与结果聚合。
4. 能为冲突结果设计仲裁或复核流程。
5. 能让多 Agent 协作具备可调试和可回放性。

---

## 核心知识点

### 1. 协作协议

- 任务消息结构
- 子任务状态
- 结果返回格式
- 错误消息格式

### 2. 分派策略

- 按能力分派
- 按权限分派
- 按负载分派
- 按优先级分派

### 3. 结果汇总

- 多 Worker 输出一致时直接聚合
- 输出冲突时走 Reviewer / Verifier
- 缺失结果时走重试或降级

### 4. 可观测性

- 子任务 id
- 父任务 id
- 角色执行记录
- 依赖关系

---

## 推荐技术栈

- LangGraph JS
- BullMQ
- PostgreSQL / Redis
- TypeScript

---

## 本课时内容安排

## 模块 A：定义 Agent 间消息协议（2.5 小时）

### 学什么

- 为多 Agent 设计统一 message schema
- 任务、子任务、结果、错误分开建模

### 输出物

- `src/multi-agent/message-schema.ts`
- `protocol-spec.md`

---

## 模块 B：实现 Planner -> Worker 分派（2.5 小时）

### 学什么

- 规划后拆子任务
- 根据任务类型路由给不同 Worker

### 输出物

- `src/multi-agent/router.ts`
- `src/multi-agent/dispatch.ts`

---

## 模块 C：并行执行与结果聚合（2.5 小时）

### 学什么

- 并发执行多个 Worker
- 汇总结构化结果
- 标记冲突与缺失项

### 输出物

- `src/multi-agent/aggregate.ts`
- `src/multi-agent/conflict-resolution.ts`

---

## 模块 D：做一个“多角色任务交付流”（2.5 小时）

### 练习项目

输入一个复杂项目任务，例如“输出某个功能从需求、技术方案、测试风险到上线检查的交付包”，让不同 Agent 各自完成一部分，再统一汇总。

### 输出物

- `src/examples/project-delivery-flow.ts`
- `coordination-demo.md`

---

## 课时作业

### 作业题目

实现一个“项目交付协调系统”的协作协议与任务分派层。

### 难度

- ⭐⭐⭐⭐⭐

### 为什么做这个项目

- 多 Agent 如果没有通信协议，最终只会变成难以调试的黑箱
- 协议层是复杂 Agent 系统的真正骨架

### Step-by-step 任务拆解

1. 定义任务、子任务、结果、错误 Schema
   - 输出物：`src/multi-agent/message-schema.ts`
2. 实现任务分派器
   - 输出物：`src/multi-agent/router.ts`
3. 实现并行 worker 执行
   - 输出物：`src/multi-agent/dispatch.ts`
4. 实现结果汇总和冲突标记
   - 输出物：`src/multi-agent/aggregate.ts`
5. 为 5 个复杂任务做联调
   - 输出物：`coordination-test-cases.md`
6. 记录冲突和路由错误案例
   - 输出物：`coordination-failures.md`

### 验收标准

- 至少支持 3 个角色协作
- 至少支持 2 个并行子任务
- 有结构化协议，而不是自由文本互传
- 冲突结果有明确标记或仲裁路径
- 有任务级和子任务级 trace

### 进阶挑战

- 支持任务优先级与动态重分派
- 为不同 worker 增加负载均衡
- 引入消息总线或事件驱动架构

---

## 推荐教程与资料

- LangGraph JS Overview  
  https://docs.langchain.com/oss/javascript/langgraph
- BullMQ Docs  
  https://docs.bullmq.io/
- AutoGen AgentChat Documentation  
  https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/index.html

---

## 完成标志

- 你已经能为多 Agent 系统设计任务协议和分派机制
- 你已经具备实现并行协作和结果聚合的能力
