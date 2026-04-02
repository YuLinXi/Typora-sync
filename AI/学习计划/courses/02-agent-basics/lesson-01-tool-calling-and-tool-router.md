# 课时 01：Tool Calling 与工具路由设计

## 课时定位

- 所属阶段：Agent 基础构建阶段
- 建议周期：1 周
- 建议投入：8~10 小时
- 学习优先级：高
- 课时目标：掌握 Agent 接入外部函数、API、数据库查询和业务动作的基础方法，建立可控的工具调用层。

---

## 学习目标

完成本课时后，你应具备以下能力：

1. 能解释 Tool Calling 与普通文本生成的本质区别。
2. 能设计工具的输入 Schema、描述、权限边界和返回格式。
3. 能实现模型发起工具调用、应用侧执行工具、结果回填模型的完整流程。
4. 能处理多工具选择、工具失败、无效参数和幂等问题。
5. 能构建一个适合后续 Agent 扩展的工具注册与路由层。

---

## 核心知识点

### 1. Tool Calling 的最小闭环

1. 向模型注册工具
2. 模型决定是否调用工具
3. 应用侧执行工具逻辑
4. 把结果回填给模型
5. 模型生成最终回答或继续调用下一个工具

### 2. 工具设计原则

- 工具名要清晰表达动作
- 工具描述要说明使用场景，而不是实现细节
- 参数 Schema 要严格，不要让模型自由发挥
- 输出结果要尽量结构化
- 有副作用的工具必须做权限和幂等控制

### 3. 工具分类

- 查询型工具：搜索、查数据库、查文档
- 计算型工具：统计、转换、生成计划
- 执行型工具：发消息、写表、创建工单
- 代理型工具：调用另一个服务或子系统

### 4. 常见问题

- 模型选错工具
- 参数填错
- 多个工具都可用时调用混乱
- 工具结果不适合模型继续消费
- 有副作用动作被误触发

---

## 推荐技术栈

- SDK：OpenAI Agents SDK 或 OpenAI Responses API + Function Calling
- 校验：Zod
- 服务层：Node.js / TypeScript
- API 封装：fetch、Axios、内部 SDK
- 可选编排：LangGraph JS

---

## 本课时内容安排

## 模块 A：理解工具调用协议（2 小时）

### 学什么

- 模型为什么需要工具
- Tool Calling 与 Prompt Engineering 的边界
- 工具调用不是插件市场，而是“模型可操作的能力接口”

### 输出物

- `tool-calling-principles.md`

---

## 模块 B：设计工具 Schema 与注册机制（2.5 小时）

### 学什么

- 用 Zod 设计工具入参
- 为工具补充 name、description、parameters
- 实现统一的工具注册表

### 示例

```ts
const createJiraIssue = tool({
  name: "create_jira_issue",
  description: "Create an issue when the user asks to track a task formally",
  parameters: z.object({
    title: z.string(),
    description: z.string(),
    priority: z.enum(["low", "medium", "high"]),
  }),
  execute: async (input) => {
    return await jiraClient.createIssue(input);
  },
});
```

### 输出物

- `src/tools/index.ts`
- `src/tools/create-jira-issue.ts`
- `src/tools/search-docs.ts`

---

## 模块 C：实现工具路由与执行回填（2.5 小时）

### 学什么

- 如何接收模型的工具调用请求
- 如何执行并回填工具结果
- 如何在出错时返回受控错误信息，而不是让 Agent 崩掉

### 推荐执行链路

1. 用户输入任务
2. 模型生成一个或多个 tool calls
3. 路由层按工具名匹配执行器
4. 返回工具执行结果
5. 将结果追加到运行上下文
6. 模型给出最终回复或继续下一轮

### 输出物

- `src/agent/tool-router.ts`
- `src/agent/run-tool-call.ts`
- `src/lib/tool-errors.ts`

---

## 模块 D：构建一个“研发助手工具箱”（2 小时）

### 练习项目

实现一个可供 Agent 使用的研发工具箱。

### 最小工具集合

- 搜索项目规范文档
- 创建待办任务
- 查询接口文档
- 生成会议纪要摘要

### 输出物

- `src/tools/`
- `src/examples/tool-routing-demo.ts`
- `tool-inventory.md`

---

## 课时作业

### 作业题目

实现一个“研发任务分发助手”的工具层。

### 项目目标

用户输入自然语言任务，例如“把登录异常排查拆成 3 个待办并建任务卡”，Agent 能调用合适工具完成查询、整理和写入动作。

### 难度

- ⭐⭐⭐

### 为什么做这个项目

- Tool Calling 是 Agent 从“会说”变成“会做”的分水岭
- 工具层设计质量直接决定后续 Agent 系统稳定性

### Step-by-step 任务拆解

1. 定义 3~5 个工具
   - 输出物：`src/tools/*.ts`
2. 为每个工具设计 Zod Schema
   - 输出物：`src/tools/schema.ts`
3. 实现工具注册表
   - 输出物：`src/tools/index.ts`
4. 实现模型工具调用回填流程
   - 输出物：`src/agent/tool-router.ts`
5. 为 10 条自然语言输入做测试
   - 输出物：`test-cases.md`
6. 记录误调用和参数错误案例
   - 输出物：`tool-failure-report.md`

### 验收标准

- 至少实现 3 个工具
- 至少 10 条测试输入可运行
- 工具调用参数可被严格校验
- 对副作用工具有错误处理和幂等说明
- 有失败案例与修正思路

### 进阶挑战

- 支持并行工具调用
- 增加工具调用日志与耗时统计
- 为高风险工具增加人工确认开关

---

## 推荐教程与资料

- OpenAI Function Calling Guide  
  https://platform.openai.com/docs/guides/function-calling
- OpenAI Agents SDK Quickstart  
  https://openai.github.io/openai-agents-js/guides/quickstart/
- OpenAI Agents SDK: Agents  
  https://openai.github.io/openai-agents-js/guides/agents/
- n8n AI Agent Node Docs  
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/

---

## 完成标志

- 你已经能让模型稳定调用外部工具
- 你已经具备最小工具层设计能力
- 你已经为单 Agent 系统建立“可执行动作接口”
