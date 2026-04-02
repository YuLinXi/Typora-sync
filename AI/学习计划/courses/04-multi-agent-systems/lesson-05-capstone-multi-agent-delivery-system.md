# 课时 05：阶段综合项目 - 多 Agent 项目交付系统

## 课时定位

- 所属阶段：多 Agent 系统设计阶段
- 建议周期：1.5~2 周
- 建议投入：14~18 小时
- 学习优先级：高
- 课时目标：综合角色分工、协作协议、共享上下文和自我修正能力，完成一个可演示的复杂多 Agent 交付系统。

---

## 项目概述

### 项目名称

多 Agent 项目交付系统

### 项目目标

构建一个面向软件项目交付的多 Agent 系统。用户输入一个复杂需求或项目目标后，系统能：

- 拆解项目任务
- 分派给不同角色 Agent
- 汇总交付结果
- 做 Review / Verification
- 输出完整交付包

### 可覆盖的交付内容

- 需求摘要
- 技术方案
- 风险清单
- 测试建议
- 上线检查清单
- 任务拆分和优先级建议

### 目标用户

- 技术负责人
- 高级工程师
- 产品技术协作团队

### 难度

- ⭐⭐⭐⭐⭐

### 为什么做这个项目

- 它比单 Agent 更接近复杂组织协作场景
- 能直接展示你具备“复杂 Agent 系统设计能力”

---

## 建议技术栈

- 前端：Next.js
- 编排：LangGraph JS
- Agent 层：OpenAI Agents SDK
- 共享状态：PostgreSQL + Redis
- 队列：BullMQ
- 观测：LangSmith / Pino

---

## 角色设计建议

- Coordinator Agent：统一调度
- Planner Agent：拆分任务
- Research Agent：搜集资料和知识
- Architecture Agent：产出技术方案
- QA Agent：产出测试和风险建议
- Reviewer Agent：审查完整性
- Verifier Agent：校验规则符合性

---

## 项目架构建议

```text
multi-agent-delivery-system/
  app/
  src/
    multi-agent/
    shared-state/
    review/
    tools/
    retrieval/
    observability/
    evals/
  docs/
  outputs/
  README.md
```

---

## Step-by-step 任务拆解

### Step 1：定义角色与协议

- 设计角色矩阵
- 设计消息协议

#### 输出物

- `agent-role-matrix.md`
- `protocol-spec.md`

#### 验收标准

- 至少 5 个角色
- 每个角色有明确输入输出和边界

---

### Step 2：实现任务分派与并行执行

- Coordinator 派发子任务
- Worker 并行执行
- 汇总中间结果

#### 输出物

- `src/multi-agent/router.ts`
- `src/multi-agent/dispatch.ts`
- `src/multi-agent/aggregate.ts`

#### 验收标准

- 至少 2 个子任务支持并行
- 可查看任务树或任务依赖关系

---

### Step 3：实现共享上下文与共享知识

- 共享任务状态
- 共享中间结论
- 控制角色权限

#### 输出物

- `src/shared-state/`
- `shared-context-design.md`

#### 验收标准

- 有共享读写规则
- 有权限边界和版本记录

---

### Step 4：实现 Review / Verification / Reflection

- 审查交付结果完整性
- 验证关键规则
- 不合格时回退修正

#### 输出物

- `src/review/`
- `correction-report.md`

#### 验收标准

- 有修正前后差异记录
- 有终止机制和人工兜底

---

### Step 5：补齐演示、评测和失败案例

- 设计 10 条复杂任务样本
- 记录协作冲突和修正案例

#### 输出物

- `evals/multi-agent-evals.json`
- `coordination-failures.md`
- `README.md`

#### 验收标准

- 至少 10 条样本
- 至少 3 个失败/冲突案例分析

---

## 阶段作业设计

### 必做作业

完成一个可运行的多 Agent 项目交付系统，并演示以下完整链路：

1. 输入一个复杂项目目标
2. Planner 拆任务
3. 多个 Worker 并行执行
4. Coordinator 汇总结果
5. Reviewer / Verifier 做质量控制
6. 输出最终交付包

### 提交内容

- 代码仓库
- README
- 角色设计图
- 协作协议文档
- 共享状态设计文档
- 评测报告
- 冲突和修正案例分析

### 评分标准

| 维度 | 占比 | 要求 |
| --- | --- | --- |
| 多 Agent 设计质量 | 30% | 角色边界清晰，拆分合理 |
| 协作协议与可观测性 | 20% | 任务协议、分派、trace 清楚 |
| 上下文治理 | 20% | 共享状态和权限设计合理 |
| 质量控制 | 20% | review、verification、reflection 完整 |
| 产品表达 | 10% | 可演示、文档和结构清晰 |

---

## 进阶挑战

- 加入跨项目共享知识
- 加入不同模型和不同成本策略
- 加入人工审批与升级流程
- 加入角色动态扩缩容

---

## 本课时输出的作品集价值

完成后，你可以明确展示：

- 你不仅能做单 Agent，还能做复杂多 Agent 协作系统
- 你具备任务拆解、上下文治理、质量控制和系统协调的高级能力
- 你已经非常接近“复杂 Agent 系统架构工程师”的能力要求

---

## 完成标志

满足以下条件，即完成第四阶段：

- 你已经实现一个复杂多 Agent 系统
- 你已经掌握多角色协作、共享上下文和自我修正机制
- 你已经具备进入 AI 产品化与商业化阶段的系统设计能力
