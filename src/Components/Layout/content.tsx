import React from 'react';
import { Layout } from 'antd';
import styles from './index.scss';

interface Iprops {
  children?: any;
}

const ContentBox = (props: Iprops) => {
  const { children } = props;
  return (
    <Layout.Content className={styles.layout_content}>
      {children}
    </Layout.Content>
  );
};

ContentBox.defaultProps = {
  children: null,
};

export default ContentBox;
