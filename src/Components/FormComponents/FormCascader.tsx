import React from 'react';
import { Cascader } from 'antd';
import { RenderItemProps } from '@/Components/BasicForm/interface';

const FormCheckBox = React.forwardRef<unknown, RenderItemProps>(
  (
    {
      valueField = 'value',
      textField = 'label',
      options = [],
      ...renderItemProps
    },
    ref,
  ) => <Cascader options={options as any} {...renderItemProps} />,
);

export default FormCheckBox;
