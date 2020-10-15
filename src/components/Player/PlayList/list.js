import React, { memo } from "react"

import { formatSingerName } from '../../../utils/filters'

import styles from './list.module.scss'

const List = props => {
  const { listData, currentIndex } = props

  const { onClickPlay, onClickDelete } = props

  /**
   * 删除
   * @param {Event} e 
   * @param {Number | String} index 
   */
  const handleDelete = (e, index) => {
    e.stopPropagation();
    onClickDelete(Number(index))
  }

  return (
    <ul className={styles['song-list']}>
      {
        listData.map((item, index) => (
          <li 
            key={item.id} 
            className={styles['list-item']} 
            onClick={() => onClickPlay(index)}
          >
            
            {/* 当前播放图标 */}
            <div className={styles['play-icon']}>
              {
                currentIndex === index
                &&
                <i className="iconfont icon-play-circle" />
              }
            </div>

            {/* 歌曲信息 */}
            <div className={styles['song-info']}>
              <span>{ item.name }</span>
              <span> - </span>
              <span>{ formatSingerName(item.singers) }</span>
            </div>

            {/* 删除按钮 */}
            <div className={styles['delete']} onClick={(e) => handleDelete(e, index)}>
              <i className="iconfont icon-delete"></i>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

export default memo(List)