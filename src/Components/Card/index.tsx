import React from 'react';
import styles from './index.scss';

interface IProps {
  className?: string;
  children?: any;
}

const Card = (props: IProps) => {
  const { children, className } = props;
  return (
    <div className={`${styles.pub_ser_card_box} ${className}`}>{children}</div>
  );
};

Card.defaultProps = {
  className: '',
  children: null,
};

export default Card;
