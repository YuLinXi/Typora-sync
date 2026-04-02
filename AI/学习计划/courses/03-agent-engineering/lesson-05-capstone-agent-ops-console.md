# 课时 05：阶段综合项目 - Agent Ops 控制台

## 课时定位

- 所属阶段：Agent 工程化阶段
- 建议周期：1.5~2 周
- 建议投入：14~18 小时
- 学习优先级：高
- 课时目标：整合架构分层、评测追踪、稳定性治理和安全运维能力，构建一个面向 Agent 系统运营和管理的控制台。

---

## 项目概述

### 项目名称

Agent Ops 控制台

### 项目目标

为一个或多个 Agent 提供统一的运营后台，支持：

- Agent 配置管理
- Prompt 版本管理
- 执行记录查看
- Trace 与回放
- 失败案例分析
- 任务队列监控
- 权限与审计查看

### 目标用户

- AI 工程师
- Agent 工程师
- 技术负责人
- 平台运营人员

### 难度

- ⭐⭐⭐⭐⭐

### 为什么做这个项目

- 它不是单一业务 Agent，而是“管理 Agent 的系统”
- 这类项目最能体现工程化视角和平台思维

---

## 建议技术栈

- 前端：Next.js
- 后端：Hono / Next.js API
- Agent 编排：LangGraph JS / OpenAI Agents SDK
- 数据：PostgreSQL、Redis
- 队列：BullMQ
- 观测：Pino、LangSmith、OpenTelemetry
- 鉴权：Auth.js / Clerk

---

## 功能范围

## 核心功能

1. Agent 列表与配置展示
2. Prompt / Tool / Model 版本信息查看
3. 执行记录与 Trace 详情
4. 失败任务回放
5. 任务队列与运行状态面板
6. 审计日志查看
7. 基础权限管理

## 可选功能

1. 在线调整 Prompt 版本
2. 评测报告对比
3. 成本统计面板
4. 多租户视图

---

## 项目架构建议

```text
agent-ops-console/
  app/
  src/
    agent-runtime/
    observability/
    evals/
    jobs/
    audit/
    auth/
    config/
    repositories/
  docs/
  README.md
```

---

## Step-by-step 任务拆解

### Step 1：建立 Agent 元数据管理

- 管理 Agent 名称、描述、模型、工具集、Prompt 版本

#### 输出物

- `src/repositories/agent-config-repo.ts`
- `agent-metadata-schema.md`

#### 验收标准

- 至少能管理 2 个 Agent 配置

---

### Step 2：接入执行记录、Trace 与回放

- 展示任务执行历史
- 查看每一步状态、工具调用和终止原因
- 支持失败回放入口

#### 输出物

- `src/observability/`
- `app/runs/page.tsx`
- `app/runs/[id]/page.tsx`

#### 验收标准

- 至少能查看最近 20 条运行记录
- 至少能回放 1 条失败任务

---

### Step 3：接入队列与稳定性视图

- 查看排队任务、失败任务、重试任务

#### 输出物

- `app/jobs/page.tsx`
- `src/jobs/queue-metrics.ts`

#### 验收标准

- 可以查看队列状态和失败数

---

### Step 4：接入权限与审计

- 限制只有授权用户可查看后台
- 审计高风险操作

#### 输出物

- `src/auth/`
- `src/audit/`
- `app/audit/page.tsx`

#### 验收标准

- 有最基本登录和角色限制
- 有关键操作审计记录

---

### Step 5：补齐文档与作品集表达

- 画出系统架构图
- 说明工程取舍和后续扩展方向

#### 输出物

- `README.md`
- `architecture-diagram.md`
- `engineering-decisions.md`

#### 验收标准

- 他人能快速理解系统目标、模块边界和核心价值

---

## 阶段作业设计

### 必做作业

完成一个可运行的 Agent Ops 控制台，并演示：

1. 查看 Agent 配置
2. 触发一个 Agent 任务
3. 查看执行链路和 Trace
4. 回放一个失败任务
5. 查看队列和审计信息

### 提交内容

- 代码仓库
- README
- 架构图
- Trace 示例
- 回放说明
- 审计说明
- 稳定性设计说明

### 评分标准

| 维度 | 占比 | 要求 |
| --- | --- | --- |
| 平台化设计 | 30% | 不只是业务 Demo，而是具备管理视角 |
| 工程完整性 | 25% | 架构、模块、数据流清晰 |
| 观测与稳定性 | 20% | 有 Trace、Replay、Queue、失败治理 |
| 权限与审计 | 15% | 有基本生产边界 |
| 文档表达 | 10% | README、图示和取舍说明清楚 |

---

## 进阶挑战

- 加入 A/B Prompt 对比实验
- 支持多租户 Agent 管理
- 引入成本仪表盘和预算告警
- 支持在线开关工具权限

---

## 本课时输出的作品集价值

完成后，你可以明确展示：

- 你不只会做 Agent 功能，还会做 Agent 平台和运维体系
- 你能从架构、质量、性能、安全四个维度推进 AI 系统工程化
- 你已经接近 AI Agent 全栈工程师的中高级能力要求

---

## 完成标志

满足以下条件，即完成第三阶段：

- 你已经有一个具备平台视角的 Agent 工程化项目
- 你已经建立评测、追踪、稳定性和权限体系
- 你已经具备进入多 Agent 系统设计阶段的工程基础
