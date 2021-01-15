import React, { memo, forwardRef, FC, ReactElement, ForwardedRef } from 'react';
import classnames from 'classnames';

import styles from './cd.module.scss';
import { IFullCdProps } from '../typing';

const Cd: FC<IFullCdProps> = forwardRef(({
  show = true,
  picUrl,
  playingStatus,
  currentPlayingLyric,
  toggleCd
}, ref: ForwardedRef<HTMLDivElement>): ReactElement => {
  return (
    <div
      style={{ display: show ? 'flex' : 'none' }}
      className={styles['cd-wrap']}
      ref={ref}
      onClick={() => toggleCd(false)}
    >
      <div className={classnames(styles['needle'], !playingStatus && styles['pause'])}></div>
      <div className={classnames(styles['cd-cover'], !playingStatus && styles['pause'])}>
        <img src={picUrl + '?param=400x400'} className={styles['img-cover']} alt="cover" />
      </div>
      <p className={styles['lyrics']}>{ currentPlayingLyric }</p>
    </div>
  );
});

export default memo(Cd);
