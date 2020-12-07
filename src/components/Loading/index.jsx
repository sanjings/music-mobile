import React, { memo } from 'react';

import styles from './index.module.scss';

const Loading = () => {
  return (
    <div className={styles['loading-wrap']}>
      <span className={styles['circle-outside']}></span>
      <span className={styles['circle-inside']}></span>
    </div>
  )
}

export default memo(Loading)