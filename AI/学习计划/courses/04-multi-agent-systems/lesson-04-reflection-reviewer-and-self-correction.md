# 课时 04：Reflection、Reviewer 与系统自我修正

## 课时定位

- 所属阶段：多 Agent 系统设计阶段
- 建议周期：1 周
- 建议投入：8~10 小时
- 学习优先级：高
- 课时目标：建立多 Agent 系统的结果审查、自我修正和冲突消解能力，提升复杂任务交付质量。

---

## 学习目标

完成本课时后，你应具备以下能力：

1. 能设计 Reviewer、Critic、Verifier 等质量控制角色。
2. 能为不同类型任务设计 review checklist。
3. 能处理多 Agent 输出冲突、遗漏、低置信度结果。
4. 能建立反思与自我修正机制，而不是无脑多轮调用。
5. 能平衡质量提升与成本上升之间的取舍。

---

## 核心知识点

### 1. 为什么需要 Reflection

- 多 Agent 并不天然更准
- 分工后更容易出现理解偏差和信息断层
- 需要独立的质量控制节点

### 2. 常见质量控制角色

- Reviewer：检查完整性和质量
- Critic：指出逻辑漏洞
- Verifier：校验事实或规则符合性
- Arbiter：处理冲突结果

### 3. 自我修正策略

- checklist-based review
- constraint-based retry
- verifier-triggered correction
- low-confidence fallback to human

### 4. 成本控制

- 不是每个任务都值得多轮 review
- 高价值任务再启用 reviewer/verifier 流程

---

## 推荐技术栈

- LangGraph JS
- TypeScript
- OpenAI Agents SDK

---

## 本课时内容安排

## 模块 A：设计质量控制角色（2 小时）

### 学什么

- 如何把 review 职责独立出来
- Review 与 Verification 的区别

### 输出物

- `quality-role-design.md`

---

## 模块 B：定义 review checklist（2.5 小时）

### 学什么

- 针对不同任务输出定义检查项
- 把 review 规则写成可执行资产

### 输出物

- `review-checklists.md`
- `src/review/check-rules.ts`

---

## 模块 C：实现自我修正链路（2.5 小时）

### 学什么

- 输出不达标时如何退回修改
- 什么时候再次调用原 worker
- 什么时候直接人工接管

### 输出物

- `src/review/reviewer.ts`
- `src/review/verifier.ts`
- `src/review/reflection-loop.ts`

---

## 模块 D：做一个“方案评审多 Agent 流”（2.5 小时）

### 练习项目

实现一个技术方案交付流：

- Research Agent 提供事实材料
- Architecture Agent 产出方案
- Reviewer Agent 审查完整性
- Verifier Agent 核对约束与规则

### 输出物

- `src/examples/design-review-flow.ts`
- `review-demo.md`

---

## 课时作业

### 作业题目

为多 Agent 项目交付系统补齐 Reviewer / Verifier / Reflection 层。

### 难度

- ⭐⭐⭐⭐⭐

### 为什么做这个项目

- 多 Agent 系统的价值不只在“并行”，还在“自我纠偏”
- 没有 review 机制的复杂系统，最终会把错误更快地放大

### Step-by-step 任务拆解

1. 设计质量控制角色
   - 输出物：`quality-role-design.md`
2. 定义 review checklist
   - 输出物：`review-checklists.md`
3. 实现 reviewer 和 verifier
   - 输出物：`src/review/reviewer.ts`、`src/review/verifier.ts`
4. 实现 reflection loop
   - 输出物：`src/review/reflection-loop.ts`
5. 对 5 个复杂输出做验证
   - 输出物：`review-test-cases.md`
6. 记录修正前后差异
   - 输出物：`correction-report.md`

### 验收标准

- 至少有 reviewer 或 verifier 两类角色
- 对输出质量有明确检查项
- 修正链路不会无限循环
- 有修正前后质量对比结果
- 有人工兜底策略

### 进阶挑战

- 为不同任务类型动态启用不同 review 流程
- 对 review 结果做评分和统计
- 支持多 reviewer 交叉审核

---

## 推荐教程与资料

- AutoGen Documentation  
  https://microsoft.github.io/autogen/stable/
- LangGraph JS Overview  
  https://docs.langchain.com/oss/javascript/langgraph
- DeepLearning.AI：AI Agentic Design Patterns with AutoGen  
  https://www.deeplearning.ai/short-courses/ai-agentic-design-patterns-with-autogen/

---

## 完成标志

- 你已经能为多 Agent 系统增加质量控制和自我修正能力
- 你已经理解如何平衡质量、复杂度和成本
