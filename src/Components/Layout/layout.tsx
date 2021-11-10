import React from 'react';
import { Layout } from 'antd';
import styles from './index.scss';

interface LayoutBoxProps {
  children?: any;
}

const LayoutBox = (props: LayoutBoxProps) => {
  const { children } = props;
  return <Layout className={styles.layout_box}>{children}</Layout>;
};

LayoutBox.defaultProps = {
  children: null,
};

export default LayoutBox;
