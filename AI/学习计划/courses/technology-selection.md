# 技术选型建议

## 1. Agent 框架对比

| 方案 | 适用场景 | 优点 | 缺点 | 建议 |
| --- | --- | --- | --- | --- |
| OpenAI SDK | 基础模型调用、结构化输出、Tool Calling | 官方、直接、轻量、适合起步 | 复杂状态编排要自己补 | 第一阶段和第二阶段首选 |
| OpenAI Agents SDK | 单 Agent、工具调用、语音/实时、基础 Agent 开发 | 官方 Agent 语义更强，适合快速上手 | 平台化复杂编排能力仍需外围工程补充 | 第二阶段优先 |
| LangGraph JS | 复杂工作流、状态图、多 Agent 协作 | 显式状态图、可控、适合复杂系统 | 学习成本更高 | 第三、四阶段主推 |
| LlamaIndex | RAG、知识系统、文档索引 | 知识处理能力强 | 全面 Agent 编排不如 LangGraph 直观 | 第一、二阶段做知识型项目时推荐 |
| AutoGen | 多 Agent 设计模式学习 | 适合理解协作模式和 reviewer 模式 | TypeScript 生态不如前两者自然 | 第四阶段作为参考学习材料 |
| n8n | 自动化流程、业务编排、低代码集成 | 快速接第三方系统、适合试点流程 | 深度定制和复杂逻辑不如代码方案 | 第二、五阶段作为工作流补充 |

---

## 2. 后端：Node.js vs Python

### 推荐结论

对当前学员背景，主线优先选 `Node.js + TypeScript`，必要时再引入 Python 作为辅助能力。

### 为什么主推 Node.js

- 你已有 JavaScript、TypeScript、Node.js、Next.js 基础
- 能更快把 AI 能力接进现有 Web 产品
- 前后端、Agent、工作流、SaaS 能统一技术栈
- TypeScript 对 Schema、工具定义、API 契约非常友好

### 什么时候再补 Python

- 需要使用某些 Python 优先的 AI 生态库
- 需要更深的数据处理或研究型实验
- 要跟数据科学团队协作

### 结论

- 主战栈：Node.js + TypeScript
- 辅助栈：Python

---

## 3. 向量数据库选型

| 方案 | 适用阶段 | 优点 | 缺点 | 建议 |
| --- | --- | --- | --- | --- |
| Chroma | 学习期、原型期 | 上手快、适合本地实验 | 生产化能力有限 | 第一阶段原型优先 |
| pgvector | 中小型生产应用 | 和 PostgreSQL 统一、工程简单 | 高并发大规模检索能力有限 | 第二到第五阶段强推荐 |
| Pinecone | 云上托管生产检索 | 托管方便、扩展性好 | 有额外成本 | 商业化阶段可选 |
| Weaviate | 更完整向量搜索平台 | 功能丰富 | 运维和学习成本更高 | 适合后续平台化扩展 |

### 推荐结论

- 学习和原型：Chroma
- 主线生产推荐：pgvector
- 商业化托管方案：Pinecone

---

## 4. 前端 AI 交互设计模式

| 模式 | 适合场景 | 说明 |
| --- | --- | --- |
| Chat UI | 问答、探索、知识助手 | 快速起步，但不适合所有任务 |
| Copilot UI | 在现有页面中增强用户工作流 | 适合文档、代码、表单、任务管理场景 |
| Workflow UI | 多步任务、审批、自动化执行 | 适合 Agent 工作流和业务流程产品 |

### 推荐结论

- 不要默认所有产品都做成聊天框
- 面向业务执行时优先考虑 Copilot UI 或 Workflow UI

---

## 5. 组合推荐路线

### 学习期

- Node.js + TypeScript
- OpenAI SDK
- Zod
- Chroma
- Next.js

### Agent 起步期

- OpenAI Agents SDK
- PostgreSQL
- Redis
- n8n

### 工程化期

- LangGraph JS
- PostgreSQL + pgvector
- BullMQ
- OpenTelemetry / LangSmith

### 产品化期

- Next.js
- Vercel AI SDK
- Auth.js / Clerk
- Stripe
- PostgreSQL + Redis

---

## 最终推荐

如果只保留一条主线，建议如下：

- 前端：Next.js
- 后端：Node.js + TypeScript
- 模型接入：OpenAI SDK / OpenAI Agents SDK
- 编排：LangGraph JS
- 检索：pgvector
- 自动化：n8n
- 计费：Stripe
- 观测：Pino + LangSmith / OpenTelemetry

这条路线最符合当前学员背景，也最利于快速做出能面试、能交付、能扩展的 Agent 系统。
