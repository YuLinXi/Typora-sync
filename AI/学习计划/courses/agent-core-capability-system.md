# Agent 核心能力体系

## 1. Prompt Engineering

### 能力定义

把模糊需求转成可执行、可评估、可版本化的提示资产。

### 工程实现方式

- 使用结构化 Prompt 模板
- 将角色、目标、约束、上下文、输出格式拆分
- 对 Prompt 做版本管理和评测

### 典型技术方案

- OpenAI SDK
- LangChain Prompt Templates
- Markdown + Git 版本管理

---

## 2. Tool Calling

### 能力定义

让模型从“输出文字”升级为“调用外部能力并完成动作”。

### 工程实现方式

- 用 Schema 定义工具参数
- 由应用执行工具并回填结果
- 为高风险工具增加权限和人工确认

### 典型技术方案

- OpenAI Function Calling
- OpenAI Agents SDK
- Zod + TypeScript tool registry

---

## 3. Memory 机制

### 能力定义

让 Agent 具备短期任务连续性和长期用户上下文能力。

### 工程实现方式

- 短期记忆保存当前任务状态
- 长期记忆保存用户偏好和稳定信息
- 周期性做对话摘要，控制上下文长度

### 典型技术方案

- PostgreSQL / Redis
- 向量数据库 + embeddings
- LangGraph state + custom memory layer

---

## 4. RAG

### 能力定义

让 Agent 基于外部知识和企业私有文档作答，而不是只依赖模型参数知识。

### 工程实现方式

- 文档切分
- 向量化和索引
- 检索召回
- 上下文拼接和引用回答

### 典型技术方案

- LlamaIndex
- LangChain Retrieval
- pgvector / Pinecone / Weaviate / Chroma

---

## 5. Planning

### 能力定义

把复杂任务拆解成多步可执行流程。

### 工程实现方式

- 先产出计划，再执行
- 关键节点做状态机控制
- 对不同子任务路由不同工具或 Agent

### 典型技术方案

- LangGraph
- OpenAI Agents SDK
- n8n Plan and Execute Agent

---

## 6. Reflection

### 能力定义

让 Agent 能检查自身输出质量并进行自我修正。

### 工程实现方式

- 单独 Reviewer / Verifier 节点
- 基于 checklist 做 review
- 低质量输出触发修正或人工接管

### 典型技术方案

- AutoGen 设计模式
- LangGraph review loop
- 自定义 review pipeline

---

## 7. Multi-Agent 协作模式

### 能力定义

让多个 Agent 按角色分工共同完成复杂任务。

### 工程实现方式

- 设计 Coordinator、Planner、Worker、Reviewer 角色
- 定义统一协作协议
- 建立共享状态和冲突处理机制

### 典型技术方案

- LangGraph
- AutoGen
- OpenAI Agents SDK + custom orchestrator

---

## 工程优先级建议

1. Prompt Engineering
2. Tool Calling
3. RAG
4. Memory
5. Planning
6. Reflection
7. Multi-Agent

先把单 Agent 基础打牢，再进入复杂协作系统，工程成功率更高。
