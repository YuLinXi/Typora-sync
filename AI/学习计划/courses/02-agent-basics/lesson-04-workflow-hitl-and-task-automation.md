# 课时 04：Agent 工作流编排、人工介入与任务自动化

## 课时定位

- 所属阶段：Agent 基础构建阶段
- 建议周期：1~1.5 周
- 建议投入：8~12 小时
- 学习优先级：高
- 课时目标：让单 Agent 进入真实业务流程，掌握异步任务、审批节点、人工介入、可回放执行和基础工作流编排。

---

## 学习目标

完成本课时后，你应具备以下能力：

1. 能将 Agent 运行嵌入业务工作流，而不是只做聊天交互。
2. 能识别哪些步骤需要人工确认，哪些步骤可以自动执行。
3. 能为 Agent 设计异步任务、回调、状态持久化和重试。
4. 能结合 n8n 或自定义后端实现自动化流程。
5. 能实现一个带 Human-in-the-Loop 的基础业务 Agent 流程。

---

## 核心知识点

### 1. Agent 与 Workflow 的关系

- Workflow 决定流程骨架
- Agent 决定某些节点上的动态决策
- 不是所有流程都要“全 Agent 化”

### 2. Human-in-the-Loop

- 高风险动作前确认
- 结果质量不足时人工修正
- 需要业务判断的步骤由人接管

### 3. 异步与长任务

- 某些工具调用耗时较长
- 某些任务需要等待外部系统回调
- 状态必须可持久化，任务必须可恢复

### 4. 可回放与可审计

- 谁触发的
- 调了哪些工具
- 哪一步等待人工
- 最终做了什么动作

---

## 推荐技术栈

- Workflow：n8n 或自定义 Node.js job system
- API / Webhook：Next.js Route Handler、Hono、Express
- 存储：PostgreSQL、Redis
- 通知：Slack、飞书、邮件
- Agent 编排：OpenAI Agents SDK / LangGraph

---

## 本课时内容安排

## 模块 A：识别自动化边界（2 小时）

### 学什么

- 什么时候应该用 Agent + Workflow
- 什么时候只是普通自动化即可
- 哪些节点要 deterministic，哪些节点允许模型判断

### 输出物

- `workflow-boundary.md`

---

## 模块 B：设计人工介入点（2 小时）

### 学什么

- 为高风险工具增加审批状态
- 为低置信度输出增加人工复核
- 把“人工确认”设计成流程节点，而不是临时聊天

### 输出物

- `hitl-design.md`
- `approval-policy.md`

---

## 模块 C：实现异步任务执行（3 小时）

### 学什么

- 提交任务
- 更新任务状态
- 失败重试
- 人工确认后继续执行

### 推荐状态

- `queued`
- `running`
- `waiting_approval`
- `retrying`
- `completed`
- `failed`

### 输出物

- `src/workflow/job-types.ts`
- `src/workflow/run-job.ts`
- `src/workflow/resume-job.ts`

---

## 模块 D：做一个“任务流自动化 Agent”（3 小时）

### 练习项目

构建一个“需求到任务卡”的自动化流程：

1. 用户输入需求
2. Agent 总结需求并拆任务
3. 生成风险清单
4. 需要时人工确认
5. 自动创建任务卡或同步到外部系统

### 输出物

- `src/workflow/requirement-flow.ts`
- `src/routes/approval.ts`
- `workflow-demo.md`

---

## 课时作业

### 作业题目

实现一个“需求转研发执行流”的 Agent 工作流。

### 项目目标

把产品需求描述自动转成结构化研发执行计划，并在真正写入任务系统前加入人工确认节点。

### 难度

- ⭐⭐⭐⭐

### 为什么做这个项目

- 这是最常见的企业级 Agent 落地方式之一
- 真正可上线的 Agent 系统几乎都要处理审批、回放、恢复和审计

### Step-by-step 任务拆解

1. 定义工作流节点与状态
   - 输出物：`src/workflow/job-types.ts`
2. 实现需求解析和任务拆分
   - 输出物：`src/workflow/requirement-flow.ts`
3. 增加人工确认接口
   - 输出物：`src/routes/approval.ts`
4. 实现批准后继续执行
   - 输出物：`src/workflow/resume-job.ts`
5. 对接一个外部目标系统或模拟写入层
   - 输出物：`src/integrations/task-system.ts`
6. 为 5 个真实需求案例做演示
   - 输出物：`workflow-test-cases.md`

### 验收标准

- 至少存在一个明确人工介入节点
- 流程中断后可恢复继续执行
- 有状态记录，不依赖内存临时变量
- 有 5 个真实需求案例演示
- 有失败与人工修正案例分析

### 进阶挑战

- 用 n8n 实现可视化工作流版本
- 为不同风险等级配置不同审批策略
- 加入 Slack / 飞书通知审批

---

## 推荐教程与资料

- n8n Advanced AI  
  https://docs.n8n.io/advanced-ai/
- n8n Intro Tutorial: Build an AI chat agent  
  https://docs.n8n.io/advanced-ai/intro-tutorial/
- n8n AI Agent Node Docs  
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/
- LangGraph Overview  
  https://docs.langchain.com/oss/javascript/langgraph

---

## 完成标志

- 你已经能把 Agent 接进真实工作流
- 你已经理解自动执行与人工确认的边界
- 你已经具备构建“可上线单 Agent 流程”的核心能力
