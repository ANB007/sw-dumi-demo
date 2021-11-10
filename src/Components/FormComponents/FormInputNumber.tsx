import React from 'react';
import { InputNumber } from 'dpl-react';
import { RenderItemProps } from '@/Components/BasicForm/interface';

const FormInputNumber = React.forwardRef<unknown, RenderItemProps>(
  (renderItemProps, ref) => <InputNumber {...renderItemProps} />,
);

export default FormInputNumber;
