import React, { FC, memo, ReactElement } from 'react';
import LazyLoad from 'react-lazyload';

import styles from './index.module.scss';
import { ICoverProps } from '../typing';

const Cover: FC<ICoverProps> = ({
  coverImgUrl, 
  updateFrequency
}): ReactElement => {
  return (
    <div className={styles['img-wrap']}>
      <LazyLoad
        placeholder={<img src={require('assets/images/music.png')} height="100%" alt="榜单封面" />}
      >
        <img src={coverImgUrl} height="100%" alt="榜单封面" />
      </LazyLoad>
      <p className={styles['update-frequency']}>{ updateFrequency }</p>
    </div>
  );
};

export default memo(Cover);
