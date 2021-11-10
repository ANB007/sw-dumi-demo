import React from 'react';
import { RenderItemProps } from '@/Components/BasicForm/interface';

/**
 * 文案展示
 */
const FormText = React.forwardRef<unknown, RenderItemProps>(
  ({ ...renderItemProps }, ref) => <>{renderItemProps.text || ''}</>,
);

export default FormText;
