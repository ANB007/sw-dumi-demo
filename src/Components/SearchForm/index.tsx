import React, { useState, useLayoutEffect, useRef } from 'react';
import { Icon, Button } from 'antd';

import { trim } from 'lodash-es';
import BasicForm from '@/Components/BasicForm';

import { FormSchema } from '@/Components/BasicForm/interface';

import styles from './index.scss';

interface IProps {
  collapsed?: boolean;
  onSearch: (p: any) => void;
  onChange?: (P: any) => void;
  col?: number;
  schema: Array<FormSchema>;
}
const SearchForm = (props: IProps) => {
  // props 取值相关
  const { collapsed, onSearch, onChange, col = 4, schema } = props;

  //  处理展开收缩逻辑相关
  const [toggle, setToggle] = useState<boolean>(false);
  const handleSchema = (params: FormSchema[], action: any) => {
    // 收起状态 且 长度小于最小长度需要进行展开操作
    if (!toggle && col < params.length) {
      return params.slice(0, col).concat(action);
    }
    console.log('params', params);
    return params.concat(action);
  };

  useLayoutEffect(() => {
    setToggle(Boolean(collapsed));
  }, [collapsed]);

  // 处理默认是否展示收缩相关
  const [showCollapsed, setShowCollapsed] = useState<boolean>(false);
  useLayoutEffect(() => {
    if (col < schema.length) setShowCollapsed(true);
  }, [col, schema]);

  // 表单相关功能
  const form = useRef(null);
  const formChange = (values: any) => {
    if (onChange) onChange(values);
  };

  const getFieldsValue = () => {
    const values = (form.current as any)?.getFieldsValue();
    const newValue = Object.entries(values).map(([key, value]) => [
      key,
      typeof value === 'string' ? trim(value as string) : value,
    ]);
    (form.current as any)?.validateFields((err: any) => {
      if (err) return;
      onSearch(Object.fromEntries(newValue));
    });
  };

  const resetFormFiled = () => {
    (form.current as any)?.resetFields();
  };

  // 操作schema
  const action = {
    label: '',
    key: 'action',
    FormItem: () => {
      return (
        <div className={styles.search_btn}>
          <Button
            type="primary"
            onClick={getFieldsValue}
            style={{ marginRight: '8px' }}
          >
            查询
          </Button>

          <Button onClick={resetFormFiled}>重置</Button>

          {showCollapsed === true && (
            <>
              {toggle ? (
                <Button type="link" onClick={() => setToggle(false)}>
                  收起
                  <Icon type="up" />
                </Button>
              ) : (
                <Button
                  type="link"
                  onClick={() => {
                    setToggle(true);
                  }}
                >
                  展开
                  <Icon type="down" />
                </Button>
              )}
            </>
          )}
        </div>
      );
    },
  };

  return (
    <div className={styles.search_form_box}>
      <BasicForm
        ref={form}
        layout="inline"
        schema={handleSchema(schema, action)}
      />
    </div>
  );
};

SearchForm.defaultProps = {
  collapsed: false,
  col: 4,
  onChange: () => {},
};

export default SearchForm;
