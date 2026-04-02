# 课时 01：Agent 系统架构分层与模块化设计

## 课时定位

- 所属阶段：Agent 工程化阶段
- 建议周期：1 周
- 建议投入：8~10 小时
- 学习优先级：高
- 课时目标：建立可扩展的 Agent 系统分层架构，明确运行时、工具层、记忆层、工作流层和接口层边界。

---

## 学习目标

完成本课时后，你应具备以下能力：

1. 能拆分 Agent 系统的核心模块，并定义职责边界。
2. 能避免 Prompt、工具、状态、日志、路由全部耦合在一个文件中。
3. 能为多业务场景设计可复用的 Agent Runtime。
4. 能用配置驱动替代硬编码，提高可维护性。
5. 能为后续多 Agent 与产品化阶段打下平台级骨架。

---

## 核心知识点

### 1. Agent 系统常见分层

- Interface Layer：API、Chat UI、Webhook
- Orchestration Layer：Agent Loop、Workflow、State Graph
- Capability Layer：Tools、RAG、Memory、Planner
- Infra Layer：DB、Queue、Cache、Observability
- Governance Layer：Auth、Permissions、Audit、Guardrails

### 2. 设计原则

- Prompt 资产与业务代码分离
- 工具定义与工具实现分离
- 运行时状态与持久化状态分离
- 业务 Agent 配置化，不写死在框架层
- 模型依赖通过 Adapter 隔离

### 3. 高复用目录结构

```text
src/
  agent-runtime/
  agents/
  tools/
  memory/
  retrieval/
  workflow/
  integrations/
  evals/
  observability/
  auth/
```

---

## 推荐技术栈

- TypeScript
- LangGraph JS 或 OpenAI Agents SDK
- Zod
- PostgreSQL
- Redis

---

## 本课时内容安排

## 模块 A：梳理现有 Agent 系统的耦合点（2 小时）

### 学什么

- 哪些逻辑最容易糊在一起
- 哪些变化最频繁，应该优先抽象
- 如何识别未来会扩展成平台能力的模块

### 输出物

- `architecture-smells.md`

---

## 模块 B：设计统一 Runtime 接口（2.5 小时）

### 学什么

- 定义 Agent 输入、输出、状态和上下文接口
- 定义运行时执行器与能力注入方式

### 输出物

- `src/agent-runtime/types.ts`
- `src/agent-runtime/create-runtime.ts`

---

## 模块 C：拆分工具、记忆、检索和工作流能力（2.5 小时）

### 学什么

- 把能力模块做成可插拔
- 为每个模块定义最小接口
- 降低业务 Agent 和底层实现耦合

### 输出物

- `src/tools/base-tool.ts`
- `src/memory/base-memory.ts`
- `src/retrieval/base-retriever.ts`
- `src/workflow/base-workflow.ts`

---

## 模块 D：实现一个“可配置业务 Agent”（2 小时）

### 练习项目

把第二阶段的研发协作 Agent 重构为：

- Agent 配置文件
- Runtime 层
- 独立能力模块

### 输出物

- `src/agents/rd-coordinator.ts`
- `agent-config-example.md`

---

## 课时作业

### 作业题目

重构现有单 Agent 项目，建立模块化 Agent 骨架。

### 难度

- ⭐⭐⭐⭐

### 为什么做这个项目

- 工程化阶段的核心不是“再加功能”，而是“能不能承受功能增长”
- 架构边界设计得越清晰，后续多 Agent、产品化和团队协作成本越低

### Step-by-step 任务拆解

1. 盘点现有项目模块和耦合点
   - 输出物：`architecture-smells.md`
2. 设计 Runtime 类型与接口
   - 输出物：`src/agent-runtime/types.ts`
3. 抽离工具、记忆、检索等模块
   - 输出物：对应 `base-*` 文件
4. 将业务 Agent 迁移为配置化
   - 输出物：`src/agents/*.ts`
5. 补充重构说明和迁移文档
   - 输出物：`migration-notes.md`

### 验收标准

- 至少拆出 Runtime、Tools、Memory、Workflow 四类模块
- Prompt 与业务逻辑解耦
- 新增一个业务 Agent 不需要复制粘贴大量底层代码
- 有迁移前后结构对比说明

### 进阶挑战

- 增加插件式工具注册
- 设计多租户 Agent 配置
- 为不同 Agent 提供共享基础能力模块

---

## 推荐教程与资料

- LangGraph JS Overview  
  https://docs.langchain.com/oss/javascript/langgraph
- OpenAI Agents SDK Docs  
  https://openai.github.io/openai-agents-js/
- Clean Architecture 入门资料  
  https://github.com/ardalis/CleanArchitecture

---

## 完成标志

- 你已经建立一个可扩展的 Agent 系统骨架
- 你已经能清晰定义各层职责边界
