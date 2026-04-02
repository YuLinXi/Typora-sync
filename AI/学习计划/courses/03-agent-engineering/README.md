# 第三阶段：Agent 工程化阶段

## 阶段定位

- 阶段名称：Agent 工程化阶段
- 建议周期：6~8 周
- 学习优先级：高
- 阶段目标：把单 Agent 或基础 Agent 系统升级为可测试、可观测、可部署、可扩展、可控风险的工程化系统。

---

## 阶段学习目标

完成本阶段后，你应具备以下能力：

1. 能为 Agent 系统做模块化架构设计，而不是把逻辑堆在一个运行函数里。
2. 能建立系统级评测、追踪、日志、回放与故障定位机制。
3. 能解决 Agent 系统在性能、成本、稳定性和部署方面的实际问题。
4. 能为 Agent 系统建立权限、安全、审计和运维边界。
5. 能交付一个具备生产可用思路的 Agent 平台级项目。

---

## 阶段核心知识点

- Agent 架构分层
- Runtime / Orchestrator / Tool Layer / Memory Layer 分离
- Trace、Observability、Replay
- Evals、Regression Testing、Prompt Versioning
- Queue、Async Job、Retry、Timeout、Circuit Breaker
- Deployment、Scaling、Cost Control
- Auth、RBAC、Audit Log、Guardrails
- SaaS 化 Agent 后台设计

---

## 推荐技术栈

- 主语言：TypeScript
- 服务端：Next.js、Hono 或 NestJS
- Agent 编排：LangGraph JS、OpenAI Agents SDK
- 数据层：PostgreSQL、Redis
- 队列：BullMQ 或基于 Redis 的 Job Queue
- 观测：Pino、OpenTelemetry、LangSmith
- 部署：Vercel、Railway、Render、Docker
- 鉴权：NextAuth / Auth.js、Clerk 或自定义 JWT

---

## 阶段课时安排

| 课时 | 标题 | 重点 | 建议投入 |
| --- | --- | --- | --- |
| 01 | Agent 系统架构分层与模块化设计 | 分层、边界、抽象、配置管理 | 8~10 小时 |
| 02 | 评测、追踪、回放与回归测试体系 | Evals、Trace、Replay、Prompt 版本管理 | 8~12 小时 |
| 03 | 性能、成本、队列与稳定性工程 | 异步任务、限流、缓存、降级、重试 | 8~12 小时 |
| 04 | 安全、权限、审计与生产运维 | RBAC、审计日志、密钥管理、发布流程 | 8~10 小时 |
| 05 | 阶段综合项目：Agent Ops 控制台 | 平台化、观测化、可运营 Agent 系统 | 14~18 小时 |

---

## 推荐学习顺序

1. 先做架构分层，避免后续所有能力都耦合在一起。
2. 再补齐评测、追踪和回放，建立可维护性。
3. 然后处理性能、成本和稳定性问题。
4. 接着加入权限、安全和运维设计。
5. 最后通过综合项目把 Agent 工程化能力整合成平台。

---

## 阶段可交付成果

- 一套模块化 Agent 系统骨架
- 一套评测、追踪和回归测试机制
- 一套性能与稳定性治理方案
- 一套权限与审计设计
- 一个可演示的 Agent Ops 控制台

---

## 推荐教程与资料

- LangGraph JS Overview  
  https://docs.langchain.com/oss/javascript/langgraph
- OpenAI Agents SDK Docs  
  https://openai.github.io/openai-agents-js/
- OpenAI Evals Guide  
  https://platform.openai.com/docs/guides/evals
- OpenTelemetry Docs  
  https://opentelemetry.io/docs/
- LangSmith Docs  
  https://docs.smith.langchain.com/
- BullMQ Docs  
  https://docs.bullmq.io/

---

## 阶段完成标志

- 你已经能把 Agent 从 Demo 提升到具备生产工程思路的系统。
- 你已经具备管理复杂 Agent 生命周期、质量、成本和安全边界的能力。
