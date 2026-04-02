# 课时 04：模型评测、调试、成本控制与安全边界

## 课时定位

- 所属阶段：基础认知阶段
- 建议周期：1 周
- 建议投入：6~8 小时
- 学习优先级：高
- 课时目标：建立 AI 应用的工程稳定性意识，掌握评测、日志、失败分析、成本控制和基础安全边界设计。

---

## 学习目标

完成本课时后，你应具备以下能力：

1. 能为 Prompt、结构化输出和 RAG 系统建立基础评测集。
2. 能通过日志与失败样本定位输出不稳定的原因。
3. 能识别模型成本消耗的主要来源，并进行基础优化。
4. 能识别 Prompt Injection、越权回答、敏感信息泄露等常见风险。
5. 能为后续 Agent 系统设计最低限度的稳定性与安全策略。

---

## 核心知识点

### 1. Evals 思维

- AI 应用不是“看起来差不多就行”
- 评测要基于样本集，而不是单次演示
- Prompt 迭代、RAG 调优、模型切换都应通过评测比较

### 2. 调试链路

- 输入是什么
- Prompt 是什么
- 检索到了什么
- 模型输出了什么
- 解析在哪一步失败

### 3. 成本控制

- Token 成本主要来自长上下文、重复调用、无效检索
- 可以通过缓存、缩短上下文、分层调用、模型分级降低成本
- 不是所有步骤都必须用最强模型

### 4. 安全边界

- Prompt Injection
- 数据越权访问
- 模型幻觉导致错误业务动作
- 敏感数据泄露
- 非法工具调用或误调用

---

## 推荐技术栈

- 语言：TypeScript
- 日志：Pino 或 Winston
- 校验：Zod
- 评测数据：JSON / Markdown 测试集
- 可选观测：LangSmith、OpenTelemetry、自定义日志面板

---

## 本课时内容安排

## 模块 A：为 AI 功能设计评测集（2 小时）

### 学什么

- 如何设计 20 条以内的小型高价值测试集
- 如何覆盖正常样本、边界样本、异常样本
- 如何定义“通过”与“失败”

### 示例评测集结构

```json
[
  {
    "input": "请总结这份需求文档",
    "expected": {
      "priority": "high"
    },
    "checks": ["json_valid", "has_summary", "priority_valid"]
  }
]
```

### 输出物

- `evals/foundation-eval-set.json`
- `evals/check-rules.md`

---

## 模块 B：建立调试面板思维（1.5 小时）

### 学什么

- 记录原始输入、Prompt 版本、检索片段、模型输出
- 为失败案例建立统一归档格式
- 从失败样本中归因，而不是凭感觉调 Prompt

### 推荐日志字段

- requestId
- promptVersion
- model
- inputSize
- retrievedChunks
- rawOutput
- parseStatus
- retryCount
- latency

### 输出物

- `logs/log-design.md`
- `debug-case-template.md`

---

## 模块 C：成本与性能优化（1.5 小时）

### 学什么

- 哪些步骤最容易浪费 Token
- 如何做缓存与上下文裁剪
- 如何为简单任务选更便宜的模型

### 工程关注点

- 先优化上下文和流程，再考虑过早微调
- 检索结果越多不一定越好
- 对重复输入做缓存往往比 Prompt 微调更划算

### 输出物

- `cost-optimization-checklist.md`

---

## 模块 D：基础安全策略（2 小时）

### 学什么

- 提示注入防御的基本方式
- 限制系统回答范围
- 敏感信息过滤和权限边界
- 高风险动作前的人类确认

### 最低可用安全规则

1. 不允许回答知识库之外的公司内部制度细节。
2. 对未命中的检索问题必须返回“未找到依据”，不能编造。
3. 涉及删除、支付、发送消息、修改数据的动作必须人工确认。
4. 外部输入不得直接拼接到高权限系统 Prompt 中。

### 输出物

- `security-baseline.md`
- `risk-cases.md`

---

## 课时作业

### 作业题目

为前一课的 Mini RAG 系统补齐“可评测、可调试、可控成本、可控风险”四个基础能力。

### 难度

- ⭐⭐⭐

### 为什么做这个项目

- 大多数 AI Demo 死在“不稳定、难调试、成本高、风险不可控”
- 本作业会让你的项目从 Demo 向可交付工程靠近

### Step-by-step 任务拆解

1. 为已有功能整理 15~20 条评测样本
   - 输出物：`evals/foundation-eval-set.json`
2. 增加结构化日志字段
   - 输出物：`src/lib/logger.ts`
3. 为 RAG 系统记录检索结果与模型原始输出
   - 输出物：`debug-report.md`
4. 统计一次完整调用的耗时和 Token 消耗
   - 输出物：`cost-report.md`
5. 编写基础风险清单与拦截策略
   - 输出物：`security-baseline.md`

### 验收标准

- 有明确评测样本和评测规则
- 可以回溯一次失败调用的关键链路
- 至少给出 3 条成本优化建议
- 至少识别 5 类安全风险并给出对应处理策略
- 评测、日志、成本、安全四部分都有文档沉淀

### 进阶挑战

- 增加 Prompt 注入测试样本
- 引入 LangSmith 或自建链路追踪
- 为知识库问答增加权限标签和文档级访问控制

---

## 推荐教程与资料

- OpenAI 官方文档：Safety Best Practices  
  https://platform.openai.com/docs/guides/safety-best-practices
- OpenAI 官方文档：Evals Design Guide  
  https://platform.openai.com/docs/guides/evals
- LangSmith 文档  
  https://docs.smith.langchain.com/
- DeepLearning.AI：Evaluating and Debugging Generative AI  
  https://www.deeplearning.ai/short-courses/evaluating-and-debugging-generative-ai/

---

## 完成标志

- 你已经能为 AI 功能建立最小评测闭环
- 你已经能定位错误来自 Prompt、检索还是解析
- 你已经能从成本和风险角度审视 AI 系统
- 你已经具备进入 Agent 基础构建阶段的工程意识
