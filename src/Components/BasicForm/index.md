---
nav:
  title: Docs
  path: /docs
group:
  title: Components
---

## BasicForm

Demo:

```tsx
import React from 'react';
import { BasicForm } from 'sw-dumi-demo';

const schema = [
  {
    type: 'input',
    label: '年龄',
    key: 'age',
    fieldOptions: {
      initialValue: '1999',
    },
  },
  {
    type: 'radio',
    label: '性别',
    key: 'sex',
    fieldOptions: {
      initialValue: '1',
      rules: [{ required: true, message: '请选择性别' }],
    },
    renderItemProps: {
      options: [
        {
          value: '1',
          label: '男',
        },
        {
          value: '2',
          label: '女',
        },
      ],
    },
  },
];

export default () => <BasicForm schema={schema} />;
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
