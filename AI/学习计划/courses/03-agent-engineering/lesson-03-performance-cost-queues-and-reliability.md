# 课时 03：性能、成本、队列与稳定性工程

## 课时定位

- 所属阶段：Agent 工程化阶段
- 建议周期：1~1.5 周
- 建议投入：8~12 小时
- 学习优先级：高
- 课时目标：解决 Agent 系统在异步执行、成本控制、限流、缓存、重试和故障恢复上的现实问题。

---

## 学习目标

完成本课时后，你应具备以下能力：

1. 能识别 Agent 系统的主要性能瓶颈和成本来源。
2. 能将长任务改造成队列式异步执行。
3. 能设计缓存、限流、降级、重试和超时机制。
4. 能处理外部工具依赖不稳定导致的系统抖动。
5. 能为生产环境设计基本稳定性策略。

---

## 核心知识点

### 1. 性能瓶颈来源

- 大上下文
- 重复检索
- 工具链路太长
- 同步阻塞等待
- 高频重试

### 2. 队列化与异步化

- 长任务进入 job queue
- 用户拿到任务 id
- 后台异步执行
- 结果回调或轮询查询

### 3. 稳定性策略

- timeout
- retry with backoff
- circuit breaker
- cache
- rate limit
- fallback model / fallback workflow

### 4. 成本优化

- 路由简单请求到便宜模型
- 只在关键节点使用高阶模型
- 上下文裁剪与摘要
- 工具结果缓存

---

## 推荐技术栈

- 队列：BullMQ
- 缓存：Redis
- 后端：Node.js / TypeScript
- 指标：OpenTelemetry / 自定义 metrics

---

## 本课时内容安排

## 模块 A：识别性能与成本热点（2 小时）

### 学什么

- 如何统计每次运行耗时、调用次数和重试次数
- 哪些步骤最值得优先优化

### 输出物

- `performance-baseline.md`
- `cost-hotspots.md`

---

## 模块 B：将长任务迁移到队列（2.5 小时）

### 学什么

- 定义 job payload
- 入队、消费、状态更新、失败重试

### 输出物

- `src/jobs/queue.ts`
- `src/jobs/process-agent-job.ts`
- `src/routes/jobs.ts`

---

## 模块 C：缓存、限流与降级（2.5 小时）

### 学什么

- 缓存哪些结果最划算
- 如何做用户级或租户级限流
- 当模型或工具不可用时如何降级

### 输出物

- `src/reliability/cache.ts`
- `src/reliability/rate-limit.ts`
- `src/reliability/fallback.ts`

---

## 模块 D：重试与故障恢复（2.5 小时）

### 学什么

- 重试策略不是无脑重复执行
- 对副作用操作必须区分是否幂等
- 对外部依赖失败要有熔断与恢复机制

### 输出物

- `src/reliability/retry-policy.ts`
- `src/reliability/circuit-breaker.ts`
- `incident-playbook.md`

---

## 课时作业

### 作业题目

为 Agent 系统实现异步执行和稳定性治理。

### 难度

- ⭐⭐⭐⭐⭐

### 为什么做这个项目

- 大多数真实 Agent 任务无法依赖浏览器同步等待完成
- 没有稳定性治理，系统一接外部工具就会变脆弱

### Step-by-step 任务拆解

1. 统计当前运行耗时和主要成本点
   - 输出物：`performance-baseline.md`
2. 用队列重构一个长任务链路
   - 输出物：`src/jobs/process-agent-job.ts`
3. 增加缓存和限流
   - 输出物：`src/reliability/cache.ts`、`src/reliability/rate-limit.ts`
4. 增加重试与熔断策略
   - 输出物：`src/reliability/retry-policy.ts`、`src/reliability/circuit-breaker.ts`
5. 做一次高负载或失败场景演练
   - 输出物：`incident-playbook.md`

### 验收标准

- 至少有一条任务链路改成异步执行
- 至少实现缓存、限流、重试中的 3 项能力
- 有明确的幂等说明
- 有一次故障演练记录

### 进阶挑战

- 为不同任务类型设计优先级队列
- 为不同模型成本做预算控制
- 支持任务取消和恢复

---

## 推荐教程与资料

- BullMQ Docs  
  https://docs.bullmq.io/
- OpenTelemetry Docs  
  https://opentelemetry.io/docs/
- Redis Docs  
  https://redis.io/docs/

---

## 完成标志

- 你已经能处理 Agent 系统的异步、成本和稳定性问题
- 你已经具备生产环境基本运维思维
