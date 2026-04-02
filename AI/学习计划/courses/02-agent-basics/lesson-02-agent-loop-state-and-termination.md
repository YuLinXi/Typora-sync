# 课时 02：单 Agent Loop、状态机与终止条件

## 课时定位

- 所属阶段：Agent 基础构建阶段
- 建议周期：1~1.5 周
- 建议投入：8~12 小时
- 学习优先级：高
- 课时目标：掌握单 Agent 从接收任务到完成任务的多步执行循环，建立状态机、错误恢复与终止条件意识。

---

## 学习目标

完成本课时后，你应具备以下能力：

1. 能解释 ReAct、Plan-Act、Plan-and-Execute 等基础 Agent 执行模式。
2. 能设计单 Agent 的状态流转，而不是把所有逻辑塞进一次模型调用。
3. 能为 Agent 设置终止条件、最大步数、失败恢复和超时控制。
4. 能基于状态机思路实现可调试的 Agent 运行框架。
5. 能判断哪些流程应该 deterministic，哪些步骤适合让模型决策。

---

## 核心知识点

### 1. 为什么 Agent 需要 Loop

- 复杂任务通常不是一次回答完成
- Agent 需要看结果、决定下一步、继续行动
- 多步执行必须可中断、可回放、可限步

### 2. 常见执行模式

- ReAct：思考 -> 行动 -> 观察
- Plan-Act：先出计划，再逐步执行
- Plan-and-Execute：计划与执行分离
- 有限状态机：对关键节点采用显式状态控制

### 3. 推荐状态设计

- `idle`
- `planning`
- `calling_tool`
- `waiting_tool_result`
- `summarizing`
- `needs_human_review`
- `completed`
- `failed`

### 4. 终止条件

- 达成目标
- 达到最大轮次
- 工具连续失败
- 遇到高风险动作等待人工确认
- 输入信息不足且无法继续

---

## 推荐技术栈

- 轻量起步：OpenAI Agents SDK
- 显式状态编排：LangGraph JS
- 状态定义：TypeScript types + Zod
- 日志与追踪：Pino / LangSmith / OpenAI Tracing

---

## 本课时内容安排

## 模块 A：把 Agent 运行过程拆成显式步骤（2 小时）

### 学什么

- 为什么“一个超长 Prompt + 一次调用”不可维护
- 如何把 Agent 运行拆成步骤
- 每一步需要哪些输入、输出和状态更新

### 输出物

- `agent-loop-design.md`

---

## 模块 B：实现单 Agent 状态机（3 小时）

### 学什么

- 设计状态对象
- 根据当前状态选择下一步节点
- 为每一步记录输入、输出和错误

### 示例状态

```ts
type AgentState = {
  task: string;
  stepCount: number;
  plan?: string[];
  currentStep?: string;
  toolResults: Array<{ tool: string; result: unknown }>;
  status:
    | "planning"
    | "running"
    | "needs_human_review"
    | "completed"
    | "failed";
  error?: string;
};
```

### 输出物

- `src/agent/state.ts`
- `src/agent/run-loop.ts`
- `src/agent/transition.ts`

---

## 模块 C：终止条件、重试和失败恢复（2.5 小时）

### 学什么

- 最大步数限制
- 某一步失败时的 fallback
- 哪些错误可重试，哪些必须终止
- 避免 Agent 陷入死循环

### 输出物

- `src/agent/termination.ts`
- `src/agent/recovery.ts`
- `failure-matrix.md`

---

## 模块 D：做一个“任务拆解执行 Agent”原型（2.5 小时）

### 练习项目

输入一条较复杂研发任务，例如“整理支付模块线上问题，查文档并生成排查清单”，Agent 需要：

1. 输出任务计划
2. 调用相关工具
3. 整理结果
4. 在满足条件时结束

### 输出物

- `src/examples/task-agent.ts`
- `outputs/agent-run-logs/`
- `trace-notes.md`

---

## 课时作业

### 作业题目

实现一个“研发问题排查 Agent”。

### 项目目标

接收自然语言问题描述后，Agent 能先规划排查步骤，再调用文档检索、日志查询、待办生成等工具，最终输出结构化排查建议。

### 难度

- ⭐⭐⭐⭐

### 为什么做这个项目

- 它能训练单 Agent 的完整执行链
- 你会第一次真正处理“计划、执行、观察、收尾”四类 Agent 行为

### Step-by-step 任务拆解

1. 定义 AgentState
   - 输出物：`src/agent/state.ts`
2. 设计状态转换规则
   - 输出物：`src/agent/transition.ts`
3. 接入第 1 课时工具层
   - 输出物：`src/agent/run-loop.ts`
4. 增加终止和超时机制
   - 输出物：`src/agent/termination.ts`
5. 用 5 个复杂任务做测试
   - 输出物：`run-cases.md`
6. 分析死循环、误规划、空结果等失败案例
   - 输出物：`loop-failure-report.md`

### 验收标准

- 至少支持 3 步以上任务执行
- 有明确状态定义与终止机制
- 遇到失败能给出受控错误，不会无限循环
- 有可回放日志或步骤记录
- 有失败案例分析

### 进阶挑战

- 使用 LangGraph 重构成显式图编排
- 支持中途插入人工反馈再继续执行
- 将不同步骤分配给不同模型等级

---

## 推荐教程与资料

- LangGraph JS Overview  
  https://docs.langchain.com/oss/javascript/langgraph
- OpenAI Agents SDK Quickstart  
  https://openai.github.io/openai-agents-js/guides/quickstart/
- n8n Plan and Execute Agent Docs  
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/plan-execute-agent/
- AutoGen AgentChat Tutorial  
  https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/tutorial/index.html

---

## 完成标志

- 你已经能实现单 Agent 的多步执行循环
- 你已经能设计状态机和终止条件
- 你已经不再依赖“一次模型调用做完所有事”的原始模式
