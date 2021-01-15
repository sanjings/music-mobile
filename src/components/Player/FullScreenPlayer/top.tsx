import React, { FC, memo, ReactElement } from 'react';
import { IFullTopProps } from '../typing';

import styles from './top.module.scss';

const Top: FC<IFullTopProps> = ({
  songName, 
  singerName,
  toggleFullScreen
}): ReactElement => {
  return (
    <div className={styles['top']}>
      <div className={styles['back']} onClick={() => toggleFullScreen(false)}>
        <i className="iconfont icon-downarrow" />
      </div>
      <div className={styles['song-info']}>
        <p className={styles['song-name']}>{ songName }</p>
        <p className={styles['singer-name']}>{ singerName }</p>
      </div>
    </div>
  );
};

export default memo(Top);
