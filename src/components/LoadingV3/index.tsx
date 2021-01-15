import React, { FC, memo, ReactElement } from 'react';

import styles from './index.module.scss';

const LoadingV3: FC = (): ReactElement => {
  return (
    <div className={styles['loading-wrap']}>
      <span className={styles['round1']}></span>
      <span className={styles['round2']}></span>
      <span className={styles['round3']}></span>
    </div>
  );
};

export default memo(LoadingV3);
