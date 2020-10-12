import React, { memo } from 'react';
import classnames from 'classnames'

import { formatNumber, formatSingerName } from '../../utils/filters'

import styles from './item.module.scss'

const ListItem = props => {
  const { itemData, index, showPlay, showIndex } = props,
        { name, album, singers } = itemData;

  const { onClickPlay } = props

  return (
    <li className={styles['list-item']} data-index={index} onClick={() => onClickPlay(index)}>
      {/* 序号 */}
      {
        showIndex
        &&
        <div
          className={classnames([styles['index'], index < 3 && styles['top']])}
        >
          {formatNumber(index + 1)}
        </div>
      }

      <div className={styles['content']}>
        {/* 歌曲信息 */}
        <div className={styles['song-info']}>
          <p className={styles['name']}>{name}</p>
          <p className={styles['singer']}>
            <span>{formatSingerName(singers)}</span>
            <span> - </span>
            <span>{album.name}</span>
          </p>
        </div>

        {/* 播放按钮 */}
        {
          showPlay
          &&
          <div className={styles['play-btn']}>
            <i className="iconfont icon-play-circle"></i>
          </div>
        }
      </div>
    </li>
  )
}


export default memo(ListItem)