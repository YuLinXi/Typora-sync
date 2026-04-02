# 课时 02：模型 API 调用、结构化输出与结果解析

## 课时定位

- 所属阶段：基础认知阶段
- 建议周期：1 周
- 建议投入：6~10 小时
- 学习优先级：高
- 课时目标：掌握从“能调用模型”到“能稳定接入工程系统”的关键能力，建立结构化输出、错误处理、重试与结果解析基础。

---

## 学习目标

完成本课时后，你应具备以下能力：

1. 能用 TypeScript 稳定调用主流模型 API。
2. 能设计适合前后端系统消费的结构化输出格式。
3. 能处理模型返回中的格式漂移、空值、字段缺失等常见问题。
4. 能把模型结果接到业务流程中，而不是停留在聊天界面。
5. 能为后续 Tool Calling 和 Agent 状态流转打下契约基础。

---

## 核心知识点

### 1. 模型调用的工程接口观

- 请求参数：模型、消息、温度、最大输出长度
- 响应结构：文本输出、JSON 输出、工具调用信号
- 同步调用与异步任务的差异
- 为什么“能返回内容”不等于“能接入业务系统”

### 2. 结构化输出设计

- Markdown 输出适合阅读，不适合稳定解析
- JSON 输出适合程序消费，但必须约束字段和类型
- 字段命名、可选字段、枚举值、嵌套层级控制
- 什么时候要追求严格 Schema，什么时候只要弱结构化

### 3. 输出解析与容错

- JSON 解析失败的常见原因
- 多余解释文本污染输出
- 字段缺失、类型错误、非法枚举值
- fallback 策略：重试、纠错提示、默认值补全

### 4. 结果可观测性

- 原始请求日志
- 原始响应日志
- 解析后结果日志
- 失败案例归档，用于后续 Prompt 修正

---

## 推荐技术栈

- 语言：TypeScript
- SDK：OpenAI 官方 SDK
- 运行时：Node.js 20+
- 校验工具：Zod
- 接口层：Express、Hono 或 Next.js Route Handler
- 调试工具：Postman / Bruno / curl

---

## 本课时内容安排

## 模块 A：把模型接到代码里，而不是聊天窗口里（2 小时）

### 学什么

- 用 SDK 封装基础模型调用函数
- 分离配置、Prompt、调用逻辑、解析逻辑
- 环境变量管理 API Key、模型名称、超时参数

### 工程关注点

- 不要把 Prompt 和业务逻辑硬编码在一个文件里
- 不要让前端页面直接承担 Prompt 试验逻辑
- 先做 CLI / API 层，再接 UI

### 输出物

- `src/lib/llm-client.ts`
- `src/config/env.ts`

---

## 模块 B：设计结构化输出契约（2 小时）

### 学什么

- 设计一个固定 JSON 输出格式
- 使用 Zod 定义数据结构和字段校验规则
- 把“人类可读”转成“程序可消费”

### 示例 Schema

```ts
import { z } from "zod";

export const RequirementSummarySchema = z.object({
  title: z.string(),
  summary: z.string(),
  risks: z.array(z.string()),
  todos: z.array(z.string()),
  priority: z.enum(["low", "medium", "high"]),
});
```

### 工程关注点

- 字段不要过多，先满足最小业务闭环
- 优先枚举、数组、扁平对象，减少深层嵌套
- 输出结构要为未来数据库表结构或 API 响应做准备

### 输出物

- `src/schema/requirement-summary.ts`
- `src/prompts/requirement-summary.md`

---

## 模块 C：解析、校验、重试（2.5 小时）

### 学什么

- 将模型返回解析成 JSON
- 用 Schema 校验数据是否合法
- 当解析失败时自动触发一次修正或重试

### 推荐流程

1. 发起模型请求
2. 拿到原始文本结果
3. 尝试解析为 JSON
4. 使用 Zod 校验
5. 失败时记录错误并重试
6. 成功后输出标准对象

### 典型错误案例

- 输出前后带解释性文字
- `priority` 返回 `"urgent"` 而不是枚举值
- `risks` 被返回成字符串而非数组
- 某些字段直接缺失

### 输出物

- `src/lib/parse-json.ts`
- `src/lib/validate-output.ts`
- `src/lib/retry.ts`

---

## 模块 D：做成一个可复用 API（1.5 小时）

### 练习项目

把“需求文档结构化摘要器”升级成可被系统调用的 API。

### 最小功能

- `POST /api/summarize`
- 输入：文档原文
- 输出：结构化需求摘要 JSON
- 支持基础错误码和失败提示

### 推荐响应格式

```json
{
  "success": true,
  "data": {
    "title": "订单对账需求",
    "summary": "需要新增自动对账流程",
    "risks": ["接口返回延迟", "数据字段不一致"],
    "todos": ["补齐字段映射", "增加失败补偿"],
    "priority": "high"
  }
}
```

### 输出物

- `src/routes/summarize.ts`
- `README.md`
- `api-example.json`

---

## 课时作业

### 作业题目

实现一个“文档转结构化任务卡片 API”。

### 项目目标

输入一段产品文档、会议纪要或技术设计文档，返回可以直接进入看板系统的结构化任务卡片数据。

### 难度

- ⭐⭐

### 为什么做这个项目

- 训练你把 Prompt 输出接入真实工程系统
- 建立结构化数据设计意识
- 为后续 Tool Calling、工作流编排、Agent 记忆存储打基础

### Step-by-step 任务拆解

1. 定义任务卡片 Schema
   - 输出物：`src/schema/task-card.ts`
2. 编写 Prompt，要求模型严格返回指定字段
   - 输出物：`src/prompts/task-card.md`
3. 封装模型调用函数
   - 输出物：`src/lib/llm-client.ts`
4. 编写 JSON 解析和校验逻辑
   - 输出物：`src/lib/parse-json.ts`、`src/lib/validate-output.ts`
5. 提供 API 接口
   - 输出物：`src/routes/task-card.ts`
6. 为 5 组输入样本运行测试
   - 输出物：`examples/`、`outputs/`
7. 记录失败案例与修复策略
   - 输出物：`error-report.md`

### 验收标准

- 至少能稳定处理 5 组不同输入
- 输出字段结构统一，能通过 Schema 校验
- 对解析失败有明确 fallback 逻辑
- README 中说明输入格式、输出格式、错误处理方式
- 代码结构清晰，Prompt 与业务逻辑解耦

### 进阶挑战

- 增加批量处理能力
- 支持多种输出模板，如“任务卡片”、“风险清单”、“项目摘要”
- 为每次调用记录耗时、失败率、重试次数

---

## 本课时与后续 Agent 学习的关系

- 没有稳定结构化输出，就无法可靠执行 Tool Calling。
- 没有解析与校验层，就无法把模型挂到生产工作流里。
- 没有失败恢复机制，多步 Agent 一进入真实业务就会不稳定。

本课时是从“Prompt 使用者”迈向“AI 应用工程师”的第一道门槛。

---

## 推荐教程与资料

- OpenAI 官方文档：Responses API  
  https://platform.openai.com/docs/guides/text
- OpenAI 官方文档：Structured Outputs  
  https://platform.openai.com/docs/guides/structured-outputs
- OpenAI 官方文档：Function Calling / Tools  
  https://platform.openai.com/docs/guides/function-calling
- Zod 官方文档  
  https://zod.dev/
- DeepLearning.AI：Building Systems with the ChatGPT API  
  https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/

---

## 完成标志

满足以下条件即可进入下一课时：

- 你已经能稳定拿到结构化 JSON 输出
- 你已经实现基础解析、校验、重试逻辑
- 你已经将模型能力通过 API 暴露给外部系统
- 你已经清楚知道为什么“结构化输出”是 Agent 工程化的前置条件
