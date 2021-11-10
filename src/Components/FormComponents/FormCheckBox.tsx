import React from 'react';
import { Checkbox } from 'antd';
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
  ) => (
    <Checkbox.Group {...renderItemProps}>
      {options.map((opt: any) => (
        <Checkbox value={opt?.[valueField]} key={opt?.[valueField]}>
          {opt?.[textField]}
        </Checkbox>
      ))}
    </Checkbox.Group>
  ),
);

export default FormCheckBox;
