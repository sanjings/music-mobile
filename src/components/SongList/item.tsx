import React, { FC, memo, ReactElement } from 'react';
import classnames from 'classnames';

import { formatNumber, formatSingerName } from 'utils/formats';

import styles from './item.module.scss';
import { IItemProps } from './typing';

const ListItem: FC<IItemProps> = ({
  itemData: { name, album, singers },
  index = 0,
  showPlay,
  showIndex,
  onClickPlay
}): ReactElement => {
  return (
    <li className={styles['list-item']} onClick={() => onClickPlay(index)}>
      {/* 序号 */}
      {showIndex && (
        <div className={classnames(styles['index'], index < 3 && styles['top'])}>
          { formatNumber(index + 1) }
        </div>
      )}

      <div className={styles['content']}>
        {/* 歌曲信息 */}
        <div className={styles['song-info']}>
          <p className={styles['name']}>{ name }</p>
          <p className={styles['singer']}>
            <span>{ formatSingerName(singers) }</span>
            <span> - </span>
            <span>{ album.name }</span>
          </p>
        </div>

        {/* 播放按钮 */}
        {showPlay && (
          <div className={styles['play-btn']}>
            <i className="iconfont icon-play-circle"></i>
          </div>
        )}
      </div>
    </li>
  );
};

export default memo(ListItem);
