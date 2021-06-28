# Graphql

[参考官网](https://graphql.cn/)

## 查询和变更 

### 字段（Fields）

```
{
  hero {
    name
    # 查询可以有备注！
    # friends是一个List
    friends {
      name
    }
  }
}
```
1. 可以对这个对象的字段进行次级选择（sub-selection）。
2. GraphQL查询会同等看待单个项目或者一个列表的项目。

### 参数（Arguments）

``` 
{
  # 对象参数   
  human(id: "1000") {
    name
    # 标量
    height(unit: FOOT)
  }
}
```

1. 每一个字段和嵌套对象都能有自己的一组**参数**。
2. 也可以给**标量**（scalar）字段传递参数，用于实现服务端的一次转换。
3. 参数可以是多种不同类型。GraphQL 自带一套默认类型，但是 GraphQL 服务器可以声明一套自己的定制类型。

### 别名（Aliases）

```  
empireHero: hero

empireHero: hero(episode: EMPIRE) {
    name
}
```

### 片段（Fragments）

```
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

# 可复用片段
fragment comparisonFields on Character {
  name
  # 变量
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```

1. 片段使你能够组织一组字段，然后在需要它们的地方引入。
2. 片段可以访问查询或变更中声明的变量。

### 操作名称（Operation name）

```
query HeroNameAndFriends {
  hero {
    name
    friends {
      name
    }
  }
}
```
1. 操作类型：query、mutation或subscription。
2. 操作名称：是你的操作的有意义和明确的名称。

### 变量（Variables）

```
# { "graphiql": true, "variables": { "episode": JEDI } }
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

1. 变量：GraphQL拥有一级方法将动态值提取到查询之外，然后作为分离的字典传进去。

#### 变量定义（Variable definitions）

1. 变量前缀必须为 $，后跟其类型。
2. 所有声明的变量都必须是标量、枚举型或者输入对象类型

#### 默认变量（Default variables）

```
query HeroNameAndFriends($episode: Episode = "JEDI") {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

### 指令（Directives）

```
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
```

1. 使用变量动态地改变我们查询的结构。
2. 一个**指令**可以附着在字段或者片段包含的字段上，然后以任何服务端期待的方式来改变查询的执行。
3. GraphQL的核心规范包含两个指令，其必须被任何规范兼容的 GraphQL 服务器实现所支持
    1. `@include(if: Boolean)` 仅在参数为 true 时，包含此字段。
    2. `@skip(if: Boolean)` 如果参数为 true，跳过此字段。
4. 服务端实现也可以定义新的指令来添加新的特性。

### 变更（Mutations）

```
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  # 变更函数
  createReview(episode: $ep, review: $review) {
    # 查询新值
    stars
    commentary
  }
}

{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

1. 约定来规范任何导致写入的操作都应该显式通过变更（mutation）来发送。
2. 可以在一个请求中变更并查询这个字段的新值。

#### 变更中的多个字段（Multiple fields in mutations）

1. 一个变更也能包含多个字段。
2. **查询字段时，是并行执行，而变更字段时，是线性执行，一个接着一个。**

### 内联片段（Inline Fragments）

跟许多类型系统一样，GraphQL schema 也具备定义接口和联合类型的能力

如果要查询一个只存在于特定对象类型上的字段，你需要使用内联片段

```
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
  }
}
```


#### 元字段（Meta fields）

GraphQL 允许你在查询的任何位置请求 **__typename**，一个元字段，以获得那个位置的对象类型名称


## Schema 和类型


### 类型系统（Type System）

每一个 GraphQL 服务都会定义一套类型，用以描述你可能从那个服务查询到的数据。每当查询到来，服务器就会根据 schema 验证并执行查询


### 类型语言（Type Language）

GraphQL 服务可以用任何语言编写

### 标量类型（Scalar Types）

GraphQL 自带一组默认标量类型：

1. **Int**：有符号 32 位整数。
2. **Float**：有符号双精度浮点数。
3. **String**：UTF-8字符序列。
4. **Boolean**：true或者false。
5. **ID**：ID 标量类型表示一个唯一标识符，通常用以重新获取对象或者作为缓存中的键。

### 枚举类型（Enumeration Types）

枚举类型是一种特殊的标量，它限制在一个特殊的可选值集合内。**各种语言实现的 GraphQL 服务会有其独特的枚举处理方式。**

```
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```

### 接口 

一个**接口**是一个抽象类型，它包含某些字段，而对象类型必须包含这些字段，才能算实现了这个接口。

```
interface Character {
    id: ID!
    name: String!
}
```

### 联合类型

联合类型和接口十分相似，但是它并不指定类型之间的任何共同字段。   

以下`Human`和`Droid`共享一个公共接口`Character`：

```
union SearchResult = Human | Droid | Starship
```

配合使用内联片段查询任意字段。

```
search(text: "an") {
  __typename
  ... on Human {
    name
    height
  }
  ... on Droid {
    name
    primaryFunction
  }
  ... on Starship {
    name
    length
  }
}
```

公共字段查询避免重复。

```
search(text: "an") {
  __typename
  ... on Character {
      name
  }
  ... on Human {
    height
  }
  ... on Droid {
    primaryFunction
  }
  ... on Starship {
    name
    length
  }
}
```

### 输入类型（Input Types）

定义输入对象

```
input ReviewInput {
  stars: Int!
  commentary: String
}
```

## 执行

```
{
  human(id: 1002) {
    name
    appearsIn
    starships {
      name
    }
  }
}
```

每个类型的每个字段都由一个**resolver** 函数支持，该函数由 GraphQL 服务器开发人员提供。当一个字段被执行时，相应的 resolver 被调用以产生下一个值。

如果字段产生**标量值**，则执行完成。如果产生一个对象，则继续调用该对象对应字段的解析器，直到生成标量值。

GraphQL 查询始终以标量值结束。

### 解析器

```
Query: {
  human(obj, args, context, info) {
    return context.db.loadHumanByID(args.id).then(
      userData => new Human(userData)
    )
  }
}
```

- `obj`：上一级对象。
- `args`：可以提供在 GraphQL 查询中传入的参数。
- `context`：会被提供给所有解析器，并且持有重要的上下文信息比如当前登入的用户或者数据库访问对象。
- `info`：一个保存与当前查询相关的字段特定信息以及 schema 详细信息的值

## 内省

GraphQL通过内省系统让我们直到**GraphQL Schema** 它支持哪些查询。

因此我们可以通过内省系统接触到类型系统的文档，并做出文档浏览器，或是提供丰富的 IDE 体验。

## GraphQL 最佳实践

### GraphQL服务

#### HTTP
GraphQL 通常通过单入口来提供 HTTP 服务的完整功能。

#### JSON（使用 GZIP 压缩）

推荐任何在生产环境下的 GraphQL 服务都启用GZIP，并推荐在客户端请求头中加入`Accept-Encoding: gzip`

#### 版本控制

GraphQL 强烈认为可以通过**GraphQL schema** 的持续演进来避免版本控制。

#### 可以为空的性质

GraphQL默认设置每个字段**可以为空**，当某些情况下可以设置**non-null**变体类型来保证该字段永远不会返回`null`。

#### 分页 

使用 **Connections** 的最佳实践模式。

#### 服务器端的批处理与缓存

收集**短时间**内来自后端的多个数据请求，然后通过诸如 Facebook 的**DataLoader** 等工具，将其打包成单个请求再发送到底层数据库或微服务。

### 关于Graphs的思考

#### 一切皆是图 

使用 GraphQL，你可以将你所有的业务建模为图。

#### 共同语言

命名是构建直观接口中一个困难但重要的部分。  
为 GraphQL schema 中的节点和关系选择直观，耐用的名称。

#### 业务逻辑层  

你的业务逻辑层应作为执行业务域规则的唯一正确来源。