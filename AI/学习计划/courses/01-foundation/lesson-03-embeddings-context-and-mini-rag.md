# 课时 03：Embeddings、上下文工程与 Mini RAG 入门

## 课时定位

- 所属阶段：基础认知阶段
- 建议周期：1 周
- 建议投入：8~10 小时
- 学习优先级：高
- 课时目标：理解为什么仅靠 Prompt 不足以支撑复杂业务问答，掌握 Embeddings、检索、上下文拼接与最小 RAG 系统的基本实现。

---

## 学习目标

完成本课时后，你应具备以下能力：

1. 能解释 Embedding、向量检索、上下文注入三者之间的关系。
2. 能区分“模型记忆”和“外部知识检索”的职责边界。
3. 能实现一个最小可用的本地知识问答系统。
4. 能设计文档切分、召回、拼接的基础策略。
5. 能判断什么时候该用 RAG，什么时候不该用。

---

## 核心知识点

### 1. 为什么需要 RAG

- 模型参数知识不是你的私有业务知识
- 长文档直接塞上下文会导致成本高、噪声大、效果差
- 对企业知识库、项目文档、接口文档、FAQ，应该采用“检索后再生成”

### 2. Embedding 的工程理解

- Embedding 是把文本映射为可计算语义相似度的向量
- 相似度检索不是关键词搜索的简单替代，而是语义召回
- Embedding 适合做“候选片段召回”，不负责最终回答

### 3. RAG 的最小链路

1. 文档导入
2. 文本切分
3. 向量化
4. 向量存储
5. 用户提问
6. 相似片段召回
7. 拼接上下文
8. 调用模型生成答案

### 4. 上下文工程

- Chunk 大小怎么选
- Chunk overlap 是否需要
- Top K 应该取多少
- 检索结果如何排序与去重
- 如何避免“检索到了但回答仍然胡说”

---

## 推荐技术栈

- 语言：TypeScript
- RAG 框架：LlamaIndex TS 或 LangChain JS
- 模型调用：OpenAI SDK
- 向量存储：
  - 本课时优先：Chroma 或内存版向量索引
  - 后续生产化：pgvector / Pinecone / Weaviate
- 文档载入：Markdown、TXT、PDF 文本提取

---

## 本课时内容安排

## 模块 A：从“问模型”转向“问知识库”（2 小时）

### 学什么

- 什么问题适合直接问模型
- 什么问题必须先检索再回答
- RAG 与搜索、数据库查询、Prompt 的关系

### 典型适用场景

- 企业内部文档问答
- API 文档 Copilot
- 产品需求与历史决策追溯
- 项目规范助手

### 输出物

- 一份 `rag-use-cases.md`，列出 10 个适合当前前端背景切入的 RAG 场景

---

## 模块 B：文档切分与向量化（2.5 小时）

### 学什么

- 文档预处理：去除噪声、保留标题层级
- Chunk 切分：按段落、按标题、按 token 大小切分
- 向量化后如何建立索引

### 工程关注点

- 切分过大，召回结果不精准
- 切分过小，语义上下文容易断裂
- 标题、来源、章节信息必须保留为 metadata

### 建议数据结构

```ts
type KnowledgeChunk = {
  id: string;
  content: string;
  source: string;
  section?: string;
  tags?: string[];
};
```

### 输出物

- `src/ingest/splitter.ts`
- `src/ingest/embed.ts`
- `src/types/knowledge.ts`

---

## 模块 C：实现 Mini RAG（3 小时）

### 练习项目

实现一个“前端工程规范问答助手”。

### 项目目标

把团队中的前端规范、Git 提交流程、组件开发规范、接口联调流程等文档导入本地知识库，支持自然语言提问。

### 最小功能

- 导入 5~10 篇 Markdown 文档
- 建立本地向量索引
- 输入问题后召回 Top 3 相关片段
- 将召回结果拼接给模型，生成带来源的答案

### 推荐目录

```text
mini-rag/
  docs/
  src/
    ingest/
    retrieve/
    answer/
    eval/
  outputs/
  README.md
```

### 输出物

- `src/ingest/index-docs.ts`
- `src/retrieve/search.ts`
- `src/answer/generate-answer.ts`
- `src/eval/test-cases.md`

---

## 模块 D：评估检索效果与回答质量（1.5 小时）

### 学什么

- 召回准不准
- 回答有没有引用到正确来源
- 是否出现“没检索到也硬回答”的幻觉

### 评估维度

| 维度 | 检查问题 | 合格标准 |
| --- | --- | --- |
| 召回率 | 是否能找回相关文档片段 | Top 3 至少命中 1 个正确片段 |
| 引用性 | 回答是否标注来源 | 每次回答包含来源文件名 |
| 忠实性 | 是否基于召回内容作答 | 不得编造文档中不存在的信息 |
| 可解释性 | 用户能否知道答案从哪里来 | 引用信息可追溯到原文 |

### 输出物

- `retrieval-report.md`
- `hallucination-cases.md`

---

## 课时作业

### 作业题目

实现一个“团队工程知识助手”。

### 难度

- ⭐⭐⭐

### 为什么做这个项目

- 这是最贴近真实业务的 AI 应用起点之一
- 训练你处理非结构化文档、索引、检索、回答拼接的完整链路
- 为后续 Agent 加入 Memory、Tool Calling、Planning 提供知识底座

### Step-by-step 任务拆解

1. 准备 5~10 篇团队规范文档
   - 输出物：`docs/`
2. 完成文档清洗与切分
   - 输出物：`src/ingest/splitter.ts`
3. 生成向量并建立索引
   - 输出物：`src/ingest/index-docs.ts`
4. 编写检索逻辑
   - 输出物：`src/retrieve/search.ts`
5. 编写带上下文的回答生成逻辑
   - 输出物：`src/answer/generate-answer.ts`
6. 为 10 个问题建立测试集
   - 输出物：`src/eval/test-cases.md`
7. 分析命中失败案例
   - 输出物：`retrieval-report.md`

### 验收标准

- 至少导入 5 篇真实文档
- 至少完成 10 条测试问题
- 回答中带有来源标注
- Top 3 检索结果对大多数问题具备明显相关性
- 有失败案例分析，而不是只展示成功结果

### 进阶挑战

- 增加 HyDE、Query Rewrite 或 Multi-query Retrieval
- 引入 rerank 机制提升召回质量
- 将向量索引切换到 pgvector 或 Pinecone
- 做一个简单 Chat UI 展示问答过程与引用片段

---

## 常见误区

- 误区 1：把整个文档直接塞进 Prompt 就算做了 RAG
- 误区 2：只看回答流畅度，不评估召回质量
- 误区 3：向量检索一旦做完就默认准确，不做失败分析
- 误区 4：把 RAG 当万能方案，连明确结构化查询也强行用检索

---

## 推荐教程与资料

- DeepLearning.AI：Building and Evaluating Advanced RAG  
  https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/
- OpenAI 官方文档：Embeddings  
  https://platform.openai.com/docs/guides/embeddings
- LlamaIndex 官方文档  
  https://docs.llamaindex.ai/
- LangChain JS / Retrieval 官方文档  
  https://docs.langchain.com/oss/javascript/langchain/retrieval
- Chroma 官方文档  
  https://docs.trychroma.com/
- pgvector GitHub  
  https://github.com/pgvector/pgvector

---

## 完成标志

满足以下条件即可进入下一阶段：

- 你已经实现一个最小可用的知识问答系统
- 你已经理解 RAG 的最小工程链路
- 你已经能分析召回失败与回答幻觉的成因
- 你已经完成从 Prompt 应用到“带知识上下文的 AI 应用”的过渡
