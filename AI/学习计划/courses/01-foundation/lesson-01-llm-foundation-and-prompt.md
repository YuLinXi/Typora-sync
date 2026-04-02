# 课时 01：LLM 基础认知与结构化 Prompt 工程

## 课时定位

- 所属阶段：基础认知阶段
- 建议周期：1 周
- 建议投入：6~8 小时
- 学习优先级：高
- 课时目标：建立对 LLM、上下文窗口、推理链路、Prompt 结构化设计的工程认知，并产出第一个可复用的 Prompt 实验项目。

---

## 学习目标

完成本课时后，你应具备以下能力：

1. 能清楚解释 LLM 应用开发中的输入、上下文、模型、输出四层结构。
2. 能区分聊天机器人式提问与工程化 Prompt 设计的差异。
3. 能为固定任务设计可复用 Prompt 模板，而不是一次性提问。
4. 能用 TypeScript 调用模型接口，完成基础 Prompt 对比实验。
5. 能通过简单评测标准判断 Prompt 是否可上线使用。

---

## 核心知识点

### 1. LLM 应用最小工作原理

- Token、上下文窗口、温度、输出长度
- System / User / Assistant 三类消息角色
- 指令遵循、模式补全、少样本学习
- 为什么同一个模型在不同 Prompt 下表现差异很大

### 2. Prompt Engineering 的工程化视角

- 明确任务边界：输入是什么，输出是什么，禁止输出什么
- 结构化提示：角色、目标、约束、上下文、输出格式
- Few-shot 示例的作用与局限
- Prompt 模板参数化：变量注入、可测试、可版本管理

### 3. 前端工程师需要补齐的 AI 思维

- 从“组件设计”迁移到“输入输出契约设计”
- 从“接口调用”迁移到“模型行为约束”
- 从“功能完成”迁移到“效果评估 + 迭代优化”

### 4. Prompt 质量评估基础

- 正确性：是否回答对
- 一致性：相同输入是否稳定
- 格式合规：是否严格遵守 JSON / Markdown / Bullet 等格式
- 可维护性：Prompt 是否容易扩展和调参

---

## 推荐技术栈

- 语言：TypeScript
- 运行时：Node.js 20+
- 调用方式：OpenAI 官方 SDK
- 前端承载：Next.js 或纯 Node.js 脚本均可
- 可选 UI：Vercel AI SDK（先知道即可，本课时不强依赖）
- 版本管理：Git + Markdown Prompt 文档

---

## 本课时内容安排

## 模块 A：建立 LLM 应用心智模型（1.5 小时）

### 学什么

- LLM 不等于数据库，也不等于传统规则引擎
- 大模型应用由“提示词 + 模型 + 上下文 + 输出解析”组成
- Prompt 本质上是“可执行规格说明”

### 工程关注点

- 不要把 Prompt 当自然语言随便写
- 每个 Prompt 都应能被复现、对比、回滚
- 先定义输出契约，再写 Prompt

### 输出物

- 一份 `prompt-principles.md`，总结 10 条 Prompt 设计原则

---

## 模块 B：Prompt 模板设计方法（2 小时）

### 学什么

- 零样本 Prompt
- Few-shot Prompt
- 结构化输出 Prompt
- 带约束条件的角色 Prompt

### 推荐模板

```md
你是 {role}。

任务目标：
{goal}

输入上下文：
{context}

执行约束：
- {constraint_1}
- {constraint_2}

输出要求：
- 格式：{format}
- 长度：{length_limit}
- 必须包含：{must_include}
- 禁止包含：{must_not_include}
```

### 工程关注点

- 变量位置固定，方便后续做 Prompt 版本管理
- 输出格式写死，后续才能接 API / UI / 数据库存储
- 约束条件应可枚举，不要抽象化

### 输出物

- 一份 `prompts/summary-generator.md`
- 一份 `prompts/requirement-clarifier.md`

---

## 模块 C：实现第一个 Prompt Lab（2 小时）

### 练习项目

构建一个 `prompt-lab` 小实验：输入一段产品需求或技术文档，输出结构化摘要。

### 最小功能

- 读取本地 Markdown 文本
- 调用模型接口
- 对比 3 个 Prompt 版本输出结果
- 将结果保存为本地 Markdown 或 JSON

### 建议目录

```text
prompt-lab/
  src/
    prompts/
    run.ts
    cases/
    outputs/
  README.md
```

### 推荐实现任务

1. 建一个固定输入案例：如 PRD 片段、接口设计文档、会议纪要。
2. 写 3 版 Prompt：
   - V1：自然语言直接提问
   - V2：角色 + 任务 + 约束
   - V3：角色 + Few-shot + JSON 输出要求
3. 比较每版输出的正确性、结构化程度和稳定性。

### 输出物

- 可运行代码：`src/run.ts`
- 3 版 Prompt 文件
- 1 份对比实验结论文档：`prompt-report.md`

---

## 模块 D：建立可评估标准（1 小时）

### 评估维度

| 维度 | 检查问题 | 合格标准 |
| --- | --- | --- |
| 准确性 | 是否正确提取核心信息 | 关键信息遗漏不超过 20% |
| 格式性 | 是否严格符合约定格式 | JSON 可直接解析或 Markdown 结构完整 |
| 简洁性 | 是否去除废话 | 输出长度控制在预设范围内 |
| 可复用性 | Prompt 是否适合换输入复用 | 更换 3 份输入后仍可正常产出 |

### 输出物

- 一份 `eval-checklist.md`

---

## 课时作业

### 作业题目

实现一个“需求文档结构化摘要器”。

### Step-by-step 任务拆解

1. 准备 3 份不同类型输入材料
   - 输出物：`cases/` 目录
2. 编写 3 个 Prompt 版本
   - 输出物：`prompts/` 目录
3. 编写调用脚本并串联输入与输出
   - 输出物：`src/run.ts`
4. 记录每个版本的输出结果
   - 输出物：`outputs/`
5. 按评估维度做对比分析
   - 输出物：`prompt-report.md`

### 验收标准

- 能稳定运行，不依赖手工复制粘贴
- 至少有 3 组输入案例
- 至少完成 3 个 Prompt 版本对比
- 输出格式可直接复用到后续 Agent 项目
- 有明确结论：哪种 Prompt 最适合进入下一课时复用

### 进阶挑战

- 增加中英文混合输入
- 输出改成严格 JSON Schema
- 增加失败重试和日志记录

---

## 学习建议

- 不要急着学“Agent 框架”，先把 Prompt 模板能力打牢。
- 本课时重点不是追求最强模型效果，而是建立可复用方法论。
- 任何 Prompt 都要写成文档化资产，而不是散落在聊天窗口中。

---

## 推荐教程与资料

- 吴恩达 / DeepLearning.AI：ChatGPT Prompt Engineering for Developers  
  https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/
- OpenAI 官方文档：Text generation / Responses API  
  https://platform.openai.com/docs/guides/text
- OpenAI 官方文档：Structured Outputs  
  https://platform.openai.com/docs/guides/structured-outputs
- LangChain JS 官方概览  
  https://docs.langchain.com/oss/javascript/langchain/overview
- Vercel AI SDK 官方文档  
  https://ai-sdk.dev/docs/introduction

---

## 完成标志

满足以下条件即可进入下一课时：

- 你已经完成一个可运行的 `prompt-lab`
- 你已经能解释为什么 V2 / V3 Prompt 比随手提问更稳定
- 你已经沉淀出一套可复用 Prompt 模板
- 你已经有一份可以放进作品集的实验记录文档
