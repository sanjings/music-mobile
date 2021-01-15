import React, { FC, memo, ReactElement } from 'react';

import styles from './index.module.scss';
import { IProps } from './typing';

const LoadingV2: FC<IProps> = ({
  label = '加载中'
}): ReactElement => {
  return (
    <div className={styles['loading-wrap']}>
      <div className={styles['line-group']}>
        <span className={styles['line']}></span>
        <span className={styles['line']}></span>
        <span className={styles['line']}></span>
        <span className={styles['line']}></span>
      </div>
      <span className={styles['loading-text']}>{label}</span>
    </div>
  );
};

export default memo(LoadingV2);
