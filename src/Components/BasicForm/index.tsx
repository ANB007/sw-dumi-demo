/** eslint-disabled */
import React from 'react';
import { Form, Input, DatePicker } from 'antd';
import {
  FormSelect,
  FormRadio,
  FormCheckBox,
  FormText,
  FormInputNumber,
} from '@/Components/FormComponents';
import { BasicFormProps } from './interface';

const { TextArea } = Input;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

/**
 * 自定义组件
 */
const FormCustomize = (render: () => void) => {
  if (render && typeof render === 'function') {
    return render();
  }
  return '';
};

const FormMap = {
  input: Input,
  select: FormSelect,
  radio: FormRadio,
  checkBox: FormCheckBox,
  textarea: TextArea,
  text: FormText,
  custom: FormCustomize,
  datePicker: DatePicker,
  monthPicker: MonthPicker,
  rangePicker: RangePicker,
  weekPicker: WeekPicker,
  inputNumber: FormInputNumber,
};

/**
 * 基础表单
 * @param {*} schema 表单元素内容
 * @param {*} ref 表单 ref 属性，外部获取表单内容时使用
 */
const CurrentBasicForm = React.forwardRef<unknown, BasicFormProps>(
  (props, ref) => {
    const { schema = [], form, ...restParams } = props;
    const { getFieldDecorator, validateFieldsAndScroll, ...restFormMethods } =
      form;
    return (
      <Form {...formItemLayout} {...restParams}>
        {schema?.map((item, index) => {
          const {
            isHidden = false,
            type,
            minWidth = '190px',
            label,
            formItemProps,
            key = '',
            fieldOptions,
            renderItemProps,
            render,
            FormItem,
          } = item || {};
          const RenderItem = (FormMap as any)?.[type];
          return (
            (RenderItem || FormItem) &&
            !isHidden && (
              <Form.Item key={index} label={label} {...formItemProps}>
                {type === 'custom'
                  ? RenderItem(render)
                  : getFieldDecorator(key, {
                      ...fieldOptions,
                    })(
                      FormItem ? (
                        <FormItem style={{ minWidth }} {...renderItemProps} />
                      ) : (
                        <RenderItem style={{ minWidth }} {...renderItemProps} />
                      ),
                    )}
              </Form.Item>
            )
          );
        })}
      </Form>
    );
  },
);

const BasicForm = Form.create({
  onValuesChange(props: any, changedValues: any, allValues: any) {
    props?.formChange?.(changedValues, allValues); // 任一表单域的值发生改变时的回调
  },
})(CurrentBasicForm as any);

export default BasicForm;
