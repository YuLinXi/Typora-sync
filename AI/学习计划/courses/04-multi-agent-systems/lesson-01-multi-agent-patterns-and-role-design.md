# 课时 01：多 Agent 架构模式与角色分工

## 课时定位

- 所属阶段：多 Agent 系统设计阶段
- 建议周期：1 周
- 建议投入：8~10 小时
- 学习优先级：高
- 课时目标：理解多 Agent 系统的核心价值、适用边界和常见角色模式，建立角色分工与责任边界设计能力。

---

## 学习目标

完成本课时后，你应具备以下能力：

1. 能区分真正的多 Agent 系统与单 Agent 多角色 Prompt。
2. 能判断复杂任务是否值得拆成多 Agent。
3. 能设计 Coordinator、Planner、Executor、Reviewer 等典型角色。
4. 能说明不同角色的输入、输出、权限与责任边界。
5. 能避免多 Agent 设计中的无效拆分和复杂度膨胀。

---

## 核心知识点

### 1. 什么时候需要多 Agent

- 任务天然可并行拆分
- 不同步骤需要显著不同的能力或权限
- 需要独立 review、verification 或冲突仲裁
- 任务长链路、单 Agent 容易失控

### 2. 不该做多 Agent 的场景

- 任务很短且线性
- 本质只是多工具调用
- 多角色只会增加成本和调试难度

### 3. 常见角色模式

- Coordinator：负责整体调度
- Planner：负责拆解任务
- Worker：负责执行具体子任务
- Reviewer：负责检查结果
- Verifier：负责做事实核验或规则校验

### 4. 设计原则

- 角色职责单一
- 角色权限最小化
- 角色之间协议明确
- 避免两个 Agent 对同一职责重复覆盖

---

## 推荐技术栈

- LangGraph JS
- TypeScript
- AutoGen 作为参考学习材料
- PostgreSQL、Redis

---

## 本课时内容安排

## 模块 A：识别单 Agent 的瓶颈（2 小时）

### 学什么

- 什么时候单 Agent 的计划能力不够
- 什么时候需要独立 reviewer 或 verifier

### 输出物

- `single-vs-multi-agent.md`

---

## 模块 B：设计角色矩阵（2.5 小时）

### 学什么

- 为每个 Agent 定义目标、权限、输入输出、终止条件

### 输出物

- `agent-role-matrix.md`
- `src/multi-agent/roles.ts`

---

## 模块 C：定义角色协作关系（2.5 小时）

### 学什么

- 哪些角色串行协作
- 哪些角色并行协作
- 哪些角色只有审查权，没有执行权

### 输出物

- `coordination-map.md`
- `src/multi-agent/topology.ts`

---

## 模块 D：重构一个单 Agent 场景为多 Agent（2 小时）

### 练习项目

将第三阶段的“研发协作 Agent”重构为：

- Coordinator Agent
- Task Planner Agent
- Documentation Research Agent
- Review Agent

### 输出物

- `multi-agent-redesign.md`

---

## 课时作业

### 作业题目

为一个真实业务场景设计多 Agent 架构图和角色矩阵。

### 难度

- ⭐⭐⭐⭐

### 为什么做这个项目

- 多 Agent 成功的关键不在“多”，而在“拆得合理”
- 这一课决定你后续系统复杂度是否可控

### Step-by-step 任务拆解

1. 选择一个复杂业务场景
   - 输出物：`scenario-definition.md`
2. 判断是否值得使用多 Agent
   - 输出物：`single-vs-multi-agent.md`
3. 设计角色矩阵
   - 输出物：`agent-role-matrix.md`
4. 设计角色协作拓扑
   - 输出物：`coordination-map.md`
5. 标注每个角色的权限和边界
   - 输出物：`security-boundaries.md`

### 验收标准

- 至少设计 4 个角色
- 每个角色都有清晰职责和输入输出
- 有清楚说明为什么不能只用单 Agent
- 有复杂度和成本分析

### 进阶挑战

- 设计可并行执行的 worker pool
- 为不同角色分配不同模型和成本预算

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

- 你已经能清楚判断何时该用多 Agent
- 你已经能为复杂系统做角色分工和边界设计
