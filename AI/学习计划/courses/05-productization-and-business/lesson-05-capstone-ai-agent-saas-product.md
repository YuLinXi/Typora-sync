# 课时 05：阶段综合项目 - AI Agent SaaS 产品

## 课时定位

- 所属阶段：AI 产品化与商业化阶段
- 建议周期：1.5~2 周
- 建议投入：14~18 小时
- 学习优先级：高
- 课时目标：整合产品定位、AI 交互、SaaS 架构、计费和上线验证能力，完成一个可演示、可说明商业逻辑的 AI Agent 产品项目。

---

## 项目概述

### 项目名称

AI Agent SaaS 产品

### 项目目标

选择一个你最看好的 AI Agent 场景，做出一个可演示 MVP，包含：

- 明确的目标用户
- 清晰的 AI 工作流
- 基础多租户和权限
- 套餐与配额
- 可展示的 UI
- 上线验证和迭代方案

### 可选方向

- AI 研发协作平台
- AI 文档知识助手 SaaS
- AI 自动化工作流平台
- AI 项目交付协作产品

### 难度

- ⭐⭐⭐⭐⭐

### 为什么做这个项目

- 它能把你的技术、系统设计和产品表达真正打通
- 这是最适合作为求职、晋升或独立产品原型的收官项目

---

## 建议技术栈

- 前端：Next.js
- AI：OpenAI SDK / OpenAI Agents SDK / LangGraph JS
- 交互层：Vercel AI SDK
- 数据：PostgreSQL、Redis
- 计费：Stripe
- 鉴权：Auth.js / Clerk
- 部署：Vercel / Docker

---

## 项目架构建议

```text
ai-agent-saas/
  app/
  src/
    agents/
    workflows/
    billing/
    auth/
    tenants/
    analytics/
    evals/
  docs/
  outputs/
  README.md
```

---

## Step-by-step 任务拆解

### Step 1：完成产品定位与 MVP 边界

#### 输出物

- `product-positioning.md`
- `mvp-scope.md`

#### 验收标准

- 用户、场景、价值边界清楚

---

### Step 2：完成核心 AI 工作流与 UI

#### 输出物

- `app/`
- `workflow-spec.md`
- `ui-demo-script.md`

#### 验收标准

- 至少一个完整任务可从输入到结果跑通

---

### Step 3：补齐 SaaS 基础能力

#### 输出物

- `src/tenants/`
- `src/auth/`
- `src/billing/`

#### 验收标准

- 有基本 workspace、角色和套餐逻辑

---

### Step 4：设计上线验证与指标

#### 输出物

- `metrics-definition.md`
- `launch-plan-30-days.md`

#### 验收标准

- 有可执行试点计划

---

### Step 5：完善 README、架构图与商业表达

#### 输出物

- `README.md`
- `architecture-diagram.md`
- `business-model.md`

#### 验收标准

- 他人能快速理解产品价值和技术路线

---

## 阶段作业设计

### 必做作业

完成一个 AI Agent SaaS MVP，并能完整演示：

1. 用户进入产品
2. 创建或进入 workspace
3. 发起一个 AI Agent 任务
4. 查看执行结果
5. 看到权限/套餐限制
6. 说明产品的试点和商业模式

### 提交内容

- 代码仓库
- README
- 产品定位文档
- UI 演示说明
- 架构图
- 定价与配额说明
- 试点验证计划

### 评分标准

| 维度 | 占比 | 要求 |
| --- | --- | --- |
| 产品完整性 | 25% | 有场景、用户、价值和流程 |
| AI 能力落地 | 25% | Agent 或工作流能力真实可用 |
| SaaS 化设计 | 20% | 有多租户、权限、计费思路 |
| 商业表达 | 15% | 有清晰价值主张和定价逻辑 |
| 文档与演示 | 15% | 可演示、可说明、结构清晰 |

---

## 进阶挑战

- 加入团队协作和邀请机制
- 加入用量面板与账单历史
- 提供企业版部署方案
- 做一个 Landing Page 和产品介绍视频脚本

---

## 本课时输出的作品集价值

完成后，你可以明确展示：

- 你不仅能做复杂 Agent 系统，还能把它包装成产品
- 你具备 AI 工程、产品设计和商业落地的综合能力
- 你能够胜任 AI 产品工程师、Agent 工程师，甚至独立产品原型开发

---

## 完成标志

满足以下条件，即完成第五阶段：

- 你已经有一个具备产品和商业表达的 AI Agent SaaS 原型
- 你已经具备从 0 到 1 设计、开发、上线验证 AI Agent 产品的完整能力
