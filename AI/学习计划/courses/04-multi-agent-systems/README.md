# 第四阶段：多 Agent 系统设计阶段

## 阶段定位

- 阶段名称：多 Agent 系统设计阶段
- 建议周期：6~8 周
- 学习优先级：高
- 阶段目标：从单 Agent 工程系统升级到具备角色分工、协作协议、任务分派、共享上下文和复杂流程治理能力的多 Agent 系统。

---

## 阶段学习目标

完成本阶段后，你应具备以下能力：

1. 能判断什么时候应该使用多 Agent，而不是滥用多角色 Prompt。
2. 能设计不同 Agent 的角色边界、职责范围和协作协议。
3. 能实现任务拆分、子任务分派、结果汇总和冲突处理。
4. 能设计多 Agent 共享记忆、共享知识和权限隔离。
5. 能交付一个复杂多 Agent 系统作品集项目。

---

## 阶段核心知识点

- 多 Agent 适用边界
- Coordinator / Planner / Executor / Reviewer 模式
- Agent-to-Agent 协作协议
- Shared Memory / Shared Context
- Blackboard / Task Queue / Message Bus
- Reflection / Critic / Verifier
- 多 Agent 可观测性与冲突处理
- 多 Agent 成本与复杂度治理

---

## 推荐技术栈

- 主语言：TypeScript
- 编排框架：LangGraph JS
- 辅助框架：OpenAI Agents SDK
- 多 Agent 参考：AutoGen
- 状态与任务：PostgreSQL、Redis、BullMQ
- 前端：Next.js

---

## 阶段课时安排

| 课时 | 标题 | 重点 | 建议投入 |
| --- | --- | --- | --- |
| 01 | 多 Agent 架构模式与角色分工 | 适用边界、角色设计、通信模式 | 8~10 小时 |
| 02 | 协作协议、任务分派与结果汇总 | Planner-Coordinator-Worker 流程 | 8~12 小时 |
| 03 | 共享记忆、共享知识与上下文治理 | Blackboard、共享状态、隔离策略 | 8~10 小时 |
| 04 | Reflection、Reviewer 与系统自我修正 | 批评者、验证者、冲突消解 | 8~10 小时 |
| 05 | 阶段综合项目：多 Agent 项目交付系统 | 复杂任务协作系统、Portfolio 级交付 | 14~18 小时 |

---

## 推荐学习顺序

1. 先理解多 Agent 什么时候值得做。
2. 再设计角色分工和协作协议。
3. 然后补齐共享上下文和共享记忆治理。
4. 接着加入 Review / Reflection / Verification 机制。
5. 最后通过综合项目完成多 Agent 系统落地。

---

## 阶段可交付成果

- 一套多 Agent 角色设计方法
- 一套 Agent 间通信和任务分派协议
- 一套共享上下文和共享知识治理方案
- 一套 Review / Critic / Verifier 机制
- 一个可演示的多 Agent 交付系统

---

## 推荐教程与资料

- LangGraph JS Overview  
  https://docs.langchain.com/oss/javascript/langgraph
- AutoGen Documentation  
  https://microsoft.github.io/autogen/stable/
- DeepLearning.AI：AI Agentic Design Patterns with AutoGen  
  https://www.deeplearning.ai/short-courses/ai-agentic-design-patterns-with-autogen/
- DeepLearning.AI：Multi AI Agent Systems with crewAI  
  https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/

---

## 阶段完成标志

- 你已经能设计和实现多 Agent 系统，而不是只有单 Agent 自动化。
- 你已经具备处理复杂任务拆解、协作与质量控制的系统设计能力。
