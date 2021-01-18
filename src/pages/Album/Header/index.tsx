import React, { FC, memo, forwardRef, ForwardedRef, ReactElement } from 'react';

import styles from './index.module.scss';
import { IHeaderProps } from '../typing';

const AlbumHeader: FC<IHeaderProps> = forwardRef(({ 
  title, 
  isTitleMarquee, 
  onClickBack 
}, ref: ForwardedRef<HTMLDivElement>): ReactElement => {
  return (
    <header className={styles['header']} ref={ref}>
      <div className={styles['back']}>
        <i className="iconfont icon-leftarrow" onClick={onClickBack}></i>
      </div>
      {
        isTitleMarquee 
        ? 
        (
         // @ts-ignore
          <marquee><h1>{ title }</h1></marquee>
        ) 
        : 
        (
          <h1>{ title }</h1>
        )
      }
    </header>
  );
});

export default memo(AlbumHeader);
