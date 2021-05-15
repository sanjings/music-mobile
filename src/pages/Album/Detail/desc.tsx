import React, { FC, memo, ReactElement } from 'react';

import { formatCount } from '@/utils/filters';

import styles from './desc.module.scss';
import { IAlbumProps } from '../typing';

const AlbumDesc: FC<IAlbumProps> = ({
  subscribedCount,
  coverImgUrl,
  creator,
  name
}): ReactElement => {
  return (
    <div className={styles['desc']}>
      <div className={styles['img-wrap']}>
        {/* 点击量 */}
        <div className={styles['play-count']}>
          <i className="iconfont icon-headset"></i>
          <span className={styles['count']}>{formatCount(subscribedCount)}</span>
        </div>
        <img src={coverImgUrl} width="100%" height="100%" alt="歌单封面" />
      </div>
      <div className={styles['info-wrap']}>
        <h1 className={styles['title']}>{name}</h1>
        <div className={styles['person']}>
          <div className={styles['avatar-wrap']}>
            <img src={creator.avatarUrl} width="100%" height="100%" alt="歌单封面" />
          </div>
          <p className={styles['person-name']}>{creator.nickname}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(AlbumDesc);
