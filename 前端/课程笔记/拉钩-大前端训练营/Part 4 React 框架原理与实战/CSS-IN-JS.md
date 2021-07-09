# CSS-IN-JS

## why

解决CSS的局限性，例如 **缺乏动态功能**，**作用域** 和 **可移植性**

## 介绍

### 优点

1. CSS代码拥有独立作用域，防止样式冲突。
2. 让组件更具可移植性，实现开箱即用，具有松耦合性。
3. 组件更具可重用性。

### 缺点

1. 为项目增加了额外的复杂性。
2. 自动生成的选择器大大降低了代码的可读性。

整体来说，优点 **大于** 缺点，适用于React组件开发

## Emotion 库

使用JavaScript编写CSS样式

### 安装

`npm install @emotion/core @emotion/styled`

### 配置

方式一：
用`jsx`替代`React.createElement`
```jsx
/** @jsx jsx */
import { jsx } from '@emotion/core';
```

通过以上注释告诉 **babel**  使用jsx函数来转换`jsx`语法

方式二（推荐）：

配置 *@emotion/babel-preset-css-propt*

### 组件使用

#### 模板字符串 （推荐）

```jsx
const style = css`
  witdh: 100px;
  height: 100px;
`
<div css={style}></div>
```
### 对象方式

```js
const style = css({
  widht: 100,
})
```

### 样式化组件（Styled Components）

用来构建用户界面的，是`emotion`库提供的另一种为元素添加样式的方式。

#### 声明

```js
import styled from '@emotion/styled';

const Button = styled.button`
  color: red
`
const Container = styled.div`
  color: red,
  width: 100
`
// 直接使用组件
<Container> 
  <Button />
</Container>
```

#### 覆盖样式化组件 
```js

const Button = styled.button`
  color: red,
  width: ${props => props.width || 100}
`
<Button width={200} />
```

#### 为任何组件添加样式

```jsx
const Demo = ({ className }) => <div className={className}></div>

const Fancy = styled(Demo)`
  color: red;
`
<Fancy />
```

#### 通过父组件设置组件样式  

子组件单独调用呈现样式，被包裹时呈现另外的样式

```jsx
const Child = styled.div`
  color: red;
`
const Parent = styled.div`
  ${Child} {
    color: green;
  }
`
```

#### CSS 选择器 

**&** 代表样式组件本身

```jsx
const Copntainer = styled.div`
  color: red;
  & > a {
    color: pink
  }
`
<Copntainer>
  <a></a>
</Copntainer>
```

#### as 属性

要使用组件中的样式，但要更改呈现的元素，使用as属性 

```jsx
const Button = styled.button`
  color: red;
`
<Button as="a" href="#">a标签</Button>
```

#### 样式组合

```jsx
const base = css`
  color: yellow;
`
const danger = css`
  color: red
`
<button css={[base, danger]}></button>
```

样式组合中，**数组后的样式优先级高于前面的样式**

#### Global 组件

定义全局样式 

```jsx

import { css, Global } from '@emotion/core';

const styles = css`
  body { margin: 0; }
`

const App = () => (
  <>
    <Global styles={styles} />
  </>
)

```