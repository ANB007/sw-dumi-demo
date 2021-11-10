import React from 'react';
import { Radio } from 'antd';
import { RenderItemProps } from '@/components/BasicForm/interface';

/**
 * 单选框
 */
const FormRadio = React.forwardRef<unknown, RenderItemProps>(
  (
    {
      valueField = 'value',
      textField = 'label',
      options = [],
      ...renderItemProps
    },
    ref,
  ) => (
    <Radio.Group {...renderItemProps}>
      {options.map((opt) => (
        <Radio value={opt?.[valueField]} key={opt?.[valueField]}>
          {opt?.[textField]}
        </Radio>
      ))}
    </Radio.Group>
  ),
);

export default FormRadio;
