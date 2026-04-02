# 课时 05：阶段综合项目 - 研发协作 Agent

## 课时定位

- 所属阶段：Agent 基础构建阶段
- 建议周期：1.5~2 周
- 建议投入：12~16 小时
- 学习优先级：高
- 课时目标：综合 Tool Calling、Agent Loop、Memory、Workflow 与 Human-in-the-Loop 能力，完成第二阶段作品集级项目。

---

## 项目概述

### 项目名称

研发协作 Agent

### 项目目标

构建一个面向研发团队的单 Agent 系统，支持以下场景：

- 读取需求或问题描述
- 检索团队文档与历史信息
- 自动拆分执行步骤
- 生成任务清单与风险说明
- 必要时请求人工确认
- 确认后调用外部工具创建任务或输出执行报告

### 目标用户

- 前端工程师
- 技术负责人
- 产品经理
- 小团队协作成员

### 难度

- ⭐⭐⭐⭐⭐

### 为什么做这个项目

- 它具备真实工作流价值，而不是聊天 Demo
- 它可以直接证明你已经具备“单 Agent 系统工程化”能力
- 它是进入多 Agent 设计阶段前最关键的桥梁项目

---

## 建议技术栈

- 前端：Next.js
- 后端：Next.js Route Handler / Hono
- Agent：OpenAI Agents SDK
- 工作流：LangGraph JS 或自定义状态机
- 自动化与审批：n8n 或自定义 webhook 流程
- 存储：PostgreSQL、Redis
- 校验：Zod
- 日志：Pino

---

## 功能范围

## 核心功能

1. 自然语言任务输入
2. 文档与知识检索
3. 任务拆分与执行计划生成
4. 工具调用
5. 记忆与会话连续性
6. 人工确认
7. 写入任务系统或输出执行报告
8. 日志、追踪、失败回放

## 可选功能

1. 支持多个任务模板
2. 用户偏好输出
3. 审批通知
4. 任务历史查看面板

---

## 项目架构建议

```text
rd-collaboration-agent/
  app/
  src/
    agent/
    tools/
    memory/
    workflow/
    integrations/
    schema/
    logs/
    evals/
  docs/
  outputs/
  README.md
```

---

## Step-by-step 任务拆解

### Step 1：定义 Agent 能力边界

- 明确 Agent 可以做什么，不可以做什么
- 明确哪些动作必须人工确认

#### 输出物

- `agent-scope.md`
- `approval-policy.md`

#### 验收标准

- 有明确动作边界和风险分类

---

### Step 2：实现工具层与知识检索层

- 接入查询型和执行型工具
- 接入团队文档检索能力

#### 输出物

- `src/tools/`
- `src/retrieve/`

#### 验收标准

- 至少 4 个工具可用
- 至少 1 个知识检索入口可用

---

### Step 3：实现单 Agent Loop 与状态管理

- 支持计划、执行、观察、总结
- 记录步骤与状态转移

#### 输出物

- `src/agent/run-loop.ts`
- `src/agent/state.ts`

#### 验收标准

- 至少支持 3 步以上执行流程
- 有终止机制和失败处理

---

### Step 4：实现记忆与连续任务

- 支持当前任务状态记忆
- 支持用户偏好和历史结论记忆

#### 输出物

- `src/memory/`
- `memory-report.md`

#### 验收标准

- 至少支持 3 轮连续任务场景

---

### Step 5：实现审批与自动化写入

- 高风险动作进入 `waiting_approval`
- 批准后继续执行

#### 输出物

- `src/workflow/`
- `src/routes/approval.ts`
- `src/integrations/task-system.ts`

#### 验收标准

- 可演示人工确认前后流程变化
- 可恢复执行

---

### Step 6：补齐评测、追踪与失败分析

- 设计 15 条左右真实任务样本
- 记录工具误调用、规划错误、审批中断、记忆污染

#### 输出物

- `src/evals/capstone-evals.json`
- `debug-report.md`
- `failure-cases.md`

#### 验收标准

- 有固定评测样本
- 有失败案例归因和修正策略

---

## 阶段作业设计

### 必做作业

完成一个可运行的研发协作 Agent，并能展示以下完整链路：

1. 输入一个复杂研发需求或问题
2. Agent 检索上下文并生成计划
3. Agent 调用工具执行部分任务
4. Agent 在高风险动作前发起人工确认
5. 确认后完成任务写入或报告输出

### 提交内容

- 代码仓库
- README
- 架构图
- 工具清单
- 审批流程图
- 评测文档
- 失败案例分析

### 评分标准

| 维度 | 占比 | 要求 |
| --- | --- | --- |
| Agent 执行闭环 | 30% | 有计划、执行、观察、终止机制 |
| 工具与流程设计 | 25% | 工具层清晰、流程边界明确 |
| 稳定性与可控性 | 20% | 有日志、失败处理、人工确认 |
| 记忆与连续性 | 15% | 支持多轮任务上下文 |
| 产品表达 | 10% | 可演示、场景明确、文档清楚 |

---

## 进阶挑战

- 支持审批人角色分层
- 加入任务优先级和 SLA 策略
- 对接真实 Jira / Notion / 飞书系统
- 将状态机迁移到 LangGraph 并增加可视化追踪

---

## 本课时输出的作品集价值

完成后，你可以向面试官或团队明确展示：

- 你已经能构建真正“会做事”的单 Agent
- 你理解工具调用、状态机、记忆和审批的工程边界
- 你具备把 Agent 接入真实业务流程的能力

---

## 推荐教程与资料

- OpenAI Agents SDK Quickstart  
  https://openai.github.io/openai-agents-js/guides/quickstart/
- OpenAI Agents SDK: Agents  
  https://openai.github.io/openai-agents-js/guides/agents/
- LangGraph JS Overview  
  https://docs.langchain.com/oss/javascript/langgraph
- n8n Advanced AI  
  https://docs.n8n.io/advanced-ai/
- AutoGen AgentChat Overview  
  https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/index.html

---

## 完成标志

满足以下条件，即完成第二阶段：

- 你已经实现一个可运行的单 Agent 工程系统
- 你已经能稳定处理工具调用、状态流转、记忆和人工审批
- 你已经具备进入 Agent 工程化阶段的前置能力
