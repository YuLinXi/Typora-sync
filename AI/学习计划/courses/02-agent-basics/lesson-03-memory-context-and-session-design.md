# 课时 03：记忆机制、会话上下文与用户状态设计

## 课时定位

- 所属阶段：Agent 基础构建阶段
- 建议周期：1 周
- 建议投入：8~10 小时
- 学习优先级：高
- 课时目标：掌握 Agent 的短期记忆、长期记忆和上下文压缩设计，解决多轮任务中信息丢失、上下文膨胀和个性化不足的问题。

---

## 学习目标

完成本课时后，你应具备以下能力：

1. 能区分短期记忆、长期记忆、知识库和运行状态。
2. 能为 Agent 设计 session、history、summary、user profile 等上下文结构。
3. 能实现多轮任务中的上下文压缩和重点保留。
4. 能将记忆机制与工具调用、RAG、工作流状态结合。
5. 能判断哪些信息应该记住，哪些信息应该丢弃。

---

## 核心知识点

### 1. 四类上下文

- 当前输入：用户这一轮说了什么
- 会话记忆：本次任务进行到哪一步
- 用户记忆：用户偏好、常用项目、角色信息
- 外部知识：来自知识库或数据库的事实性内容

### 2. 短期记忆与长期记忆

- 短期记忆适合保存当前任务的工作上下文
- 长期记忆适合保存用户偏好、常用信息、历史结论
- 不是所有对话都值得写入长期记忆

### 3. 上下文压缩

- 历史对话不能无限堆积
- 需要定期做会话摘要
- 保留关键决策、约束、未完成项，丢弃闲聊与重复信息

### 4. 典型存储对象

- session state
- message history
- conversation summary
- user profile
- task memory

---

## 推荐技术栈

- 会话状态：PostgreSQL / Redis
- 长期记忆：PostgreSQL + embeddings / vector store
- 应用层：TypeScript
- Agent 层：OpenAI Agents SDK 或 LangGraph

---

## 本课时内容安排

## 模块 A：设计上下文数据模型（2 小时）

### 学什么

- 什么信息属于任务状态
- 什么信息属于用户画像
- 什么信息属于检索知识

### 示例

```ts
type SessionMemory = {
  sessionId: string;
  userId: string;
  taskSummary?: string;
  unresolvedItems: string[];
  recentMessages: Array<{ role: string; content: string }>;
};
```

### 输出物

- `memory-model.md`
- `src/memory/types.ts`

---

## 模块 B：实现短期记忆与会话摘要（2.5 小时）

### 学什么

- 每轮更新最近消息
- 达到阈值时生成摘要
- 用摘要替代旧消息，控制上下文长度

### 输出物

- `src/memory/session-store.ts`
- `src/memory/summarize-history.ts`
- `src/memory/context-builder.ts`

---

## 模块 C：实现基础长期记忆（2.5 小时）

### 学什么

- 哪些用户偏好值得持久化
- 如何从对话中提取“长期有效信息”
- 如何在新会话中召回用户偏好

### 可记忆信息示例

- 用户常用项目名称
- 用户偏好的输出风格
- 用户负责的业务模块
- 常见工作流模板

### 输出物

- `src/memory/long-term-store.ts`
- `src/memory/extract-profile.ts`
- `user-memory-policy.md`

---

## 模块 D：为 Agent 接入可用记忆（2.5 小时）

### 练习项目

给上一课的任务排查 Agent 增加记忆能力，让它能记住：

- 当前排查进度
- 用户的项目背景
- 上一次已经确认过的结论

### 输出物

- `src/agent/load-memory.ts`
- `src/agent/save-memory.ts`
- `memory-demo.md`

---

## 课时作业

### 作业题目

实现一个“连续对话研发助手”的记忆层。

### 项目目标

同一用户多轮交流时，Agent 能记住任务进展、用户角色、偏好输出格式和历史已确认结论，并在新一轮继续利用。

### 难度

- ⭐⭐⭐⭐

### 为什么做这个项目

- 没有记忆的 Agent 只能做单轮任务
- 记忆设计不当会导致上下文膨胀、错误继承和隐私风险

### Step-by-step 任务拆解

1. 设计记忆数据结构
   - 输出物：`src/memory/types.ts`
2. 实现 session memory 存储
   - 输出物：`src/memory/session-store.ts`
3. 实现会话摘要
   - 输出物：`src/memory/summarize-history.ts`
4. 实现长期记忆抽取和召回
   - 输出物：`src/memory/extract-profile.ts`、`src/memory/long-term-store.ts`
5. 将记忆接入 Agent 输入构造
   - 输出物：`src/memory/context-builder.ts`
6. 用 3 轮以上连续对话做测试
   - 输出物：`memory-test-cases.md`

### 验收标准

- 至少支持 3 轮连续任务
- 上下文长度得到控制，不是无限堆积消息
- 有明确的“该记住什么 / 不该记住什么”规则
- 用户偏好能在新轮次被成功利用
- 有记忆错误案例分析

### 进阶挑战

- 将长期记忆做成向量检索
- 增加记忆写入评分机制，低价值信息不入库
- 支持用户手动查看和清除个人记忆

---

## 推荐教程与资料

- OpenAI Agents SDK Quickstart  
  https://openai.github.io/openai-agents-js/guides/quickstart/
- LangGraph Overview  
  https://docs.langchain.com/oss/javascript/langgraph
- AutoGen Memory / State Guides  
  https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/index.html
- n8n: What is memory in AI?  
  https://docs.n8n.io/advanced-ai/examples/introduction/

---

## 完成标志

- 你已经能为 Agent 设计短期和长期记忆
- 你已经理解“上下文”、“记忆”、“知识库”三者的职责边界
- 你已经具备构建多轮连续 Agent 的基础
