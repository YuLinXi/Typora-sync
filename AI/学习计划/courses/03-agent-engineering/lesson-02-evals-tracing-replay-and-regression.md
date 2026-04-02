# 课时 02：评测、追踪、回放与回归测试体系

## 课时定位

- 所属阶段：Agent 工程化阶段
- 建议周期：1~1.5 周
- 建议投入：8~12 小时
- 学习优先级：高
- 课时目标：建立 Agent 系统的质量保障机制，让 Prompt、工具、工作流和模型切换都能被评估、定位和回归验证。

---

## 学习目标

完成本课时后，你应具备以下能力：

1. 能设计覆盖 Agent 全链路的评测集。
2. 能追踪一次 Agent 运行中各步骤输入、工具调用、状态转移和输出。
3. 能做执行回放，重现线上失败任务。
4. 能建立模型、Prompt 或工具变更后的回归测试流程。
5. 能把“AI 调优”从凭感觉变成可比较的工程流程。

---

## 核心知识点

### 1. 系统级 Evals

- 不只是评估最终回答
- 还要评估规划质量、工具选择正确率、检索命中、终止行为

### 2. Trace 与 Replay

- Trace 解决“发生了什么”
- Replay 解决“怎么复现它”
- 回放要记录版本、输入、工具结果、状态快照

### 3. 回归测试

- Prompt 改了，是否让旧场景退化
- 模型切换，是否影响工具选择
- 检索策略调整，是否影响引用质量

### 4. Prompt 版本管理

- Prompt 必须可命名、可追踪、可回滚
- 每次变更都应关联评测结果

---

## 推荐技术栈

- 测试：Vitest / Jest
- 观测：LangSmith、OpenTelemetry、自定义 trace store
- 数据：PostgreSQL / JSON artifacts
- 评测：OpenAI Evals Guide + 自定义 checks

---

## 本课时内容安排

## 模块 A：设计 Agent 全链路评测集（2.5 小时）

### 学什么

- 如何为不同模块设计可评估样本
- 如何定义成功、部分成功、失败

### 输出物

- `evals/agent-eval-set.json`
- `evals/check-dimensions.md`

---

## 模块 B：记录 Trace 与状态快照（2.5 小时）

### 学什么

- 为每轮执行记录 traceId
- 记录工具输入输出、状态转移、终止原因

### 输出物

- `src/observability/trace.ts`
- `src/observability/state-snapshot.ts`
- `trace-schema.md`

---

## 模块 C：实现失败回放（2.5 小时）

### 学什么

- 从历史输入和状态快照重建运行
- 对比回放结果与原始失败结果

### 输出物

- `src/observability/replay.ts`
- `replay-guide.md`

---

## 模块 D：建立回归测试流程（2.5 小时）

### 学什么

- 变更前后跑同一批评测
- 用结果对比而不是口头判断
- 设定最低通过阈值

### 输出物

- `src/evals/run-regression.ts`
- `prompt-versioning.md`
- `regression-report-template.md`

---

## 课时作业

### 作业题目

为研发协作 Agent 建立完整的“评测 + Trace + Replay + Regression”体系。

### 难度

- ⭐⭐⭐⭐⭐

### 为什么做这个项目

- Agent 系统没有质量体系，就无法长期演进
- 线上问题若不能回放，后续调试成本会快速失控

### Step-by-step 任务拆解

1. 设计 20 条核心任务评测样本
   - 输出物：`evals/agent-eval-set.json`
2. 为执行过程接入 trace
   - 输出物：`src/observability/trace.ts`
3. 记录状态快照与终止原因
   - 输出物：`src/observability/state-snapshot.ts`
4. 实现失败任务回放
   - 输出物：`src/observability/replay.ts`
5. 建立回归执行脚本
   - 输出物：`src/evals/run-regression.ts`
6. 对一次 Prompt 变更做回归验证
   - 输出物：`regression-report.md`

### 验收标准

- 至少 20 条评测样本
- 至少能回放 3 个失败任务
- 变更前后有定量对比结果
- Prompt 或模型版本可追踪
- 文档中明确说明如何定位线上失败

### 进阶挑战

- 将 trace 接入可视化面板
- 为不同 Agent 类型建立分层评测集
- 将 replay 支持到工具 mock 和外部依赖 mock

---

## 推荐教程与资料

- OpenAI Evals Guide  
  https://platform.openai.com/docs/guides/evals
- LangSmith Docs  
  https://docs.smith.langchain.com/
- OpenTelemetry Docs  
  https://opentelemetry.io/docs/

---

## 完成标志

- 你已经能为 Agent 系统建立基本质量保障闭环
- 你已经能回放失败任务并做版本回归比较
