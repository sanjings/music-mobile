import React, { memo } from 'react';

import styles from './index.module.scss'

const LoadingV2 = props => {
  const { label } = props;

  return (
    <div className={styles['loading-wrapper']}>
      <div className={styles['line-group']}>
        <span className={styles['line']}></span>
        <span className={styles['line']}></span>
        <span className={styles['line']}></span>
        <span className={styles['line']}></span>
      </div>
      <span className={styles['loading-text']}>{label}</span>
    </div>
  )
}

export default memo(LoadingV2)