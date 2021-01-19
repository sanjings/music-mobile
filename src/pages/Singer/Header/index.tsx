import React, { memo, forwardRef, FC, ReactElement, ForwardedRef } from 'react';
import { IHeaderProps } from '../typing';

import styles from './index.module.scss';

const SingerHeader: FC<IHeaderProps> = forwardRef(({
  title,
  onClickBack
}, ref: ForwardedRef<HTMLElement>): ReactElement => {
  return (
    <header className={styles['header']} ref={ref}>
      <i className="iconfont icon-leftarrow" onClick={onClickBack}></i>
      <h1>{ title }</h1>
    </header>
  );
});

export default memo(SingerHeader);
