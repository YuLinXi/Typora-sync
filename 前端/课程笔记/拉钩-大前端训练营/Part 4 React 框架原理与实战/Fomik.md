# Fomik

增强表单处理能力，简化表单处理流程

## 基本使用

```jsx
import { useFormik } from 'formik'

const App = () => {
  const formik = useFormik({ 
    initialValues: { username: 'zhang' }, 
    onSubmit: values => {} 
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="text" 
        value={formik.values.username} 
        onChange={formik.handleChange}
      />
      <input type="submit" />
    </form>
  )
}
```

## 表单增强

### formik验证 

```jsx

const formik = useFormik({ 
  ...,
  validate: values => {
    if (!values.username) return { useranme: '请输入' };
    return {}
  }
});
console.log(formik.errors.username);
```
离开焦点验证通过`formik.touched.xxx`和`<input onBlur={formik.handleBlur}/>`

### 配合 Yup验证

```jsx
import * as Yup from 'yup';

const App = () => {
  const formik = useFormik({ 
    ...,
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, '不超过15')
        .required(‘请输入’)
    })
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="username"
        type="text" 
        value={formik.values.username} 
        onChange={formik.handleChange}
      />
      <input type="submit" />
    </form>
  )
}
```

### 减少样板代码

```js
<input { ...formik.getFieldProps('useranme') } />
```

### 组件方式构建表单

使用方式类似 **antd form**

### 自定义表单控件

使用`useField`

```jsx
import { useField } from 'formik';

const MyInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <input {...field} {...props} />
      { meta.touched && meta.error || null }
   </div>
  );
}

<MyInput label="密码" type="password" placeholder="请输入密码" />

```

`useField`返回值 第三个参数 `helper` 提供更灵活的使用

```jsx

const MyCheckbox = ({ label, ...props }) => {
  const [field, meta, helper] = useField(props);
  const { value } = meta;
  const { setValue } = helper; // 设置自定义value
  return (<...>)
}

```