# AI Agent 学习课程总纲

## 课程定位

- 学员背景：高级前端开发工程师
- 主技术栈：JavaScript、TypeScript、React、Node.js、Next.js
- 转型目标：AI Agent 全栈工程师，偏应用落地与系统架构
- 课程目标：从 0 到 1 建立 AI 应用、单 Agent、工程化、多 Agent、产品化全链路能力

---

## 学习总路径

| 阶段 | 名称 | 周期 | 核心目标 | 阶段项目 |
| --- | --- | --- | --- | --- |
| 01 | 基础认知阶段 | 4~6 周 | 建立 Prompt、模型调用、结构化输出、RAG、评测基础 | AI 文档助手 MVP |
| 02 | Agent 基础构建阶段 | 5~7 周 | 掌握 Tool Calling、Agent Loop、Memory、Workflow | 研发协作 Agent |
| 03 | Agent 工程化阶段 | 6~8 周 | 建立架构分层、评测追踪、稳定性、安全和运维能力 | Agent Ops 控制台 |
| 04 | 多 Agent 系统设计阶段 | 6~8 周 | 掌握多角色协作、任务分派、共享上下文、Review 机制 | 多 Agent 项目交付系统 |
| 05 | AI 产品化与商业化阶段 | 5~7 周 | 完成产品定位、AI UX、SaaS 化、计费和验证闭环 | AI Agent SaaS 产品 |

总周期建议：26~36 周

---

## 阶段一：基础认知阶段

### 学习目标

- 理解 LLM 应用的最小工作原理
- 掌握结构化 Prompt 和模型 API 接入
- 能实现结构化输出、Mini RAG、基础评测和安全控制

### 课时清单

1. LLM 基础认知与结构化 Prompt 工程
2. 模型 API 调用、结构化输出与结果解析
3. Embeddings、上下文工程与 Mini RAG 入门
4. 模型评测、调试、成本控制与安全边界
5. 阶段综合项目：AI 文档助手 MVP

### 阶段交付物

- Prompt 模板库
- 结构化输出 API
- Mini RAG 系统
- Eval 与调试文档
- AI 文档助手 MVP

---

## 阶段二：Agent 基础构建阶段

### 学习目标

- 从 AI 应用过渡到单 Agent 系统
- 实现 Tool Calling、状态机、Memory、Workflow 和人工确认

### 课时清单

1. Tool Calling 与工具路由设计
2. 单 Agent Loop、状态机与终止条件
3. 记忆机制、会话上下文与用户状态设计
4. Agent 工作流编排、人工介入与任务自动化
5. 阶段综合项目：研发协作 Agent

### 阶段交付物

- 工具注册与路由层
- 单 Agent 执行框架
- 短期/长期记忆模块
- 带审批的自动化工作流
- 研发协作 Agent

---

## 阶段三：Agent 工程化阶段

### 学习目标

- 把 Agent 系统升级为可维护、可部署、可观测、可回归的工程系统

### 课时清单

1. Agent 系统架构分层与模块化设计
2. 评测、追踪、回放与回归测试体系
3. 性能、成本、队列与稳定性工程
4. 安全、权限、审计与生产运维
5. 阶段综合项目：Agent Ops 控制台

### 阶段交付物

- 模块化 Agent Runtime
- Evals + Trace + Replay 体系
- Queue / Cache / Retry / Fallback 能力
- 权限和审计体系
- Agent Ops 控制台

---

## 阶段四：多 Agent 系统设计阶段

### 学习目标

- 设计复杂多 Agent 系统
- 掌握角色分工、协作协议、共享上下文和系统自我修正

### 课时清单

1. 多 Agent 架构模式与角色分工
2. 协作协议、任务分派与结果汇总
3. 共享记忆、共享知识与上下文治理
4. Reflection、Reviewer 与系统自我修正
5. 阶段综合项目：多 Agent 项目交付系统

### 阶段交付物

- 多 Agent 角色矩阵
- 协作协议与任务分派层
- 共享状态与共享知识层
- Reviewer / Verifier / Reflection 流程
- 多 Agent 项目交付系统

---

## 阶段五：AI 产品化与商业化阶段

### 学习目标

- 把复杂 Agent 系统推进到产品化和商业化
- 建立 AI UX、SaaS、计费、运营和试点验证能力

### 课时清单

1. AI 产品定位、场景切入与 MVP 边界
2. AI 交互设计、Copilot UI 与工作流体验
3. SaaS 架构、多租户、计费与权限模型
4. 上线验证、运营指标与商业迭代
5. 阶段综合项目：AI Agent SaaS 产品

### 阶段交付物

- 产品定位文档
- AI UX 原型
- SaaS 多租户与计费方案
- 试点验证和指标体系
- AI Agent SaaS 产品原型

---

## Agent 核心能力主线

1. Prompt Engineering
2. Tool Calling
3. Memory
4. RAG
5. Planning
6. Reflection
7. Multi-Agent Coordination

推荐学习顺序：Prompt -> Tool Calling -> RAG -> Memory -> Planning -> Reflection -> Multi-Agent

---

## 推荐主技术路线

- 前端：Next.js
- 后端：Node.js + TypeScript
- 模型接入：OpenAI SDK / OpenAI Agents SDK
- 编排：LangGraph JS
- 检索：pgvector
- 自动化：n8n
- 校验：Zod
- 队列与缓存：BullMQ + Redis
- 数据库：PostgreSQL
- 计费：Stripe

---

## 全程作品集清单

1. AI 文档助手 MVP
2. 研发协作 Agent
3. Agent Ops 控制台
4. 多 Agent 项目交付系统
5. AI Agent SaaS 产品原型

这 5 个项目覆盖从 AI 应用、单 Agent、工程化、多 Agent 到产品化的完整转型路径。

---

## 最终可胜任岗位

- AI 应用工程师
- Agent 工程师
- AI 产品工程师
- AI Agent 系统架构师（偏应用层）

---

## 建议执行节奏

### 每周节奏

1. 学 1 个课时核心知识
2. 完成该课时作业和输出物
3. 做一次复盘，记录问题和改进点

### 每阶段节奏

1. 先看阶段 README
2. 按 4 个能力课时推进
3. 最后完成 1 个阶段综合项目
4. 将阶段项目整理为作品集文档

---

## 配套文档

- [课程总览](/Users/yumengyuan/Desktop/yumengyuan/Typora-sync/AI/学习计划2/courses/README.md)
- [Agent 核心能力体系](/Users/yumengyuan/Desktop/yumengyuan/Typora-sync/AI/学习计划2/courses/agent-core-capability-system.md)
- [技术选型建议](/Users/yumengyuan/Desktop/yumengyuan/Typora-sync/AI/学习计划2/courses/technology-selection.md)
- [最终能力地图](/Users/yumengyuan/Desktop/yumengyuan/Typora-sync/AI/学习计划2/courses/final-competency-map.md)

---

## 完成这套课程后

你不再只是“会调用大模型的前端工程师”，而是具备以下复合能力：

- 能构建 AI 应用
- 能设计单 Agent 和多 Agent 系统
- 能做 Agent 工程化与平台化
- 能把 Agent 系统做成 SaaS 产品并推进试点验证
