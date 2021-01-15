import React, { FC, memo, ReactElement } from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';
import { IProps } from './typing';

const ModuleTitle: FC<IProps> = ({
  title,
  symbol = true 
}): ReactElement => {
  return (
    <div className={styles['title']}>
      <h1 className={classnames(styles['title-text'], symbol && styles['symbol'])}>{ title }</h1>
    </div>
  );
};

export default memo(ModuleTitle);
