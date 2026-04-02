# 第二阶段：Agent 基础构建阶段

## 阶段定位

- 阶段名称：Agent 基础构建阶段
- 建议周期：5~7 周
- 学习优先级：高
- 阶段目标：从“带模型的 AI 应用”过渡到“具备工具调用、状态流转、记忆和自动化执行能力的单 Agent 系统”。

---

## 阶段学习目标

完成本阶段后，你应具备以下能力：

1. 能设计和实现 Tool Calling 流程，而不是只输出文本答案。
2. 能实现单 Agent 的决策循环，包括输入、计划、调用工具、汇总结果、结束条件。
3. 能设计短期记忆、会话状态和基础长期记忆。
4. 能把 Agent 接到真实业务工作流中，并加入 Human-in-the-Loop。
5. 能交付一个具备真实业务价值的单 Agent 自动化系统。

---

## 阶段核心知识点

- Tool Calling / Function Calling
- Agent Loop 与状态机
- Session State 与短期记忆
- 基础长期记忆与用户上下文
- Workflow Automation
- Human-in-the-Loop
- Guardrails 与终止条件
- Trace、日志与执行回放

---

## 推荐技术栈

- 主语言：TypeScript
- Agent 起步方案：OpenAI Agents SDK
- 可扩展编排：LangGraph JS
- 轻量自动化集成：n8n
- 数据与缓存：PostgreSQL、Redis
- 前端界面：Next.js
- 校验与契约：Zod
- 日志与追踪：Pino、OpenAI Tracing 或 LangSmith

---

## 阶段课时安排

| 课时 | 标题 | 重点 | 建议投入 |
| --- | --- | --- | --- |
| 01 | Tool Calling 与工具路由设计 | 函数调用、工具 Schema、工具结果回填 | 8~10 小时 |
| 02 | 单 Agent Loop、状态机与终止条件 | ReAct/Plan-Act 基础、状态流转、错误恢复 | 8~12 小时 |
| 03 | 记忆机制、会话上下文与用户状态设计 | 短期记忆、长期记忆、上下文压缩 | 8~10 小时 |
| 04 | Agent 工作流编排、人工介入与任务自动化 | 业务流程、审批点、异步任务、可回放执行 | 8~12 小时 |
| 05 | 阶段综合项目：研发协作 Agent | 单 Agent 自动化系统、作品集交付 | 12~16 小时 |

---

## 推荐学习顺序

1. 先掌握 Tool Calling，确保 Agent 能调用外部能力。
2. 再掌握 Agent Loop 和状态流转，建立执行框架。
3. 然后补齐记忆和用户状态，提升连续任务能力。
4. 接着加入工作流和人工介入，让系统能进入真实业务流程。
5. 最后通过综合项目整合为一个可演示的单 Agent 系统。

---

## 阶段可交付成果

- 一个稳定的工具调用层
- 一个具备多步决策能力的单 Agent 框架
- 一套短期记忆和长期记忆设计
- 一个带人工介入节点的自动化业务流程
- 一个可放入作品集的研发协作 Agent

---

## 推荐教程与资料

- OpenAI Agents SDK Quickstart  
  https://openai.github.io/openai-agents-js/guides/quickstart/
- OpenAI Agents SDK: Agents  
  https://openai.github.io/openai-agents-js/guides/agents/
- OpenAI Function Calling Guide  
  https://platform.openai.com/docs/guides/function-calling
- LangGraph JS Overview  
  https://docs.langchain.com/oss/javascript/langgraph
- n8n Advanced AI  
  https://docs.n8n.io/advanced-ai/
- n8n: What’s an agent in AI?  
  https://docs.n8n.io/advanced-ai/examples/understand-agents/

---

## 阶段完成标志

- 你已经能实现稳定的单 Agent 工程闭环。
- 你已经能让 Agent 调工具、保状态、执行工作流，并处理失败与人工确认。
- 你已经完成从“AI 应用开发”向“Agent 系统开发”的第一次跃迁。
