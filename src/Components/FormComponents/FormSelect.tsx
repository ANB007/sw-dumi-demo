import React from 'react';
import { Select } from 'antd';
import { RenderItemProps } from '@/Components/BasicForm/interface';

const selectFilterOption = (input, option) =>
  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

const { Option } = Select;

/**
 * 下拉选项框
 */
const FormSelect = React.forwardRef(
  (
    {
      valueField = 'value',
      textField = 'label',
      options = [],
      ...renderItemProps
    }: RenderItemProps,
    ref,
  ) => (
    <Select
      optionFilterProp="children"
      filterOption={selectFilterOption}
      {...renderItemProps}
    >
      {options.map((opt: any) => (
        <Option value={opt?.[valueField]} key={opt?.[valueField]}>
          {opt?.[textField]}
        </Option>
      ))}
    </Select>
  ),
);

export default FormSelect;
