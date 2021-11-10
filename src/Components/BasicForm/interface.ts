export type FormItemType =
  | 'input'
  | 'select'
  | 'radio'
  | 'checkBox'
  | 'textarea'
  | 'text'
  | 'custom'
  | 'datePicker'
  | 'monthPicker'
  | 'rangePicker'
  | 'weekPicker';

export type LayoutType = 'horizontal' | 'vertical' | 'inline';

export interface OptionProps {
  value?: string | number;
  label?: string | number;
  [key: string]: any;
}

export interface RenderItemProps {
  valueField?: string;
  textField?: string;
  text?: string;
  options?: Array<OptionProps>; // 当类型为 select/radio 时, 选项的数据
  [key: string]: any;
}

export interface FormSchema {
  type: FormItemType;
  label?: string;
  key: string;
  isHidden?: boolean;
  render?: () => void; // 当 type 为 'custom' 时，表单会优先执行 render 函数
  fieldOptions?: any; // 对应 getFieldDecorator 的 option 属性
  renderItemProps?: RenderItemProps; // RenderItem 表单元素 props
  formItemProps?: any; // FormItem props
  minWidth?: string | number;
  name?: string;
  FormItem?: any;
}

export interface LayoutProps {
  span?: number;
  offset?: number;
}

export interface FormItemLayoutProps {
  labelCol?: LayoutProps;
  wrapperCol?: LayoutProps;
}

export interface BasicFormProps {
  schema: Array<FormSchema>;
  form: any;
  layout?: LayoutType;
  formItemLayout?: FormItemLayoutProps; // 统一设置表单布局
  [key: string]: any;
}
