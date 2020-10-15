import React, { memo } from 'react';
import PropTypes from 'prop-types'

import { formatCount } from '../../../utils/filters'

import styles from './desc.module.scss'

const AlbumDesc = props => {
  const { subscribedCount, coverImgUrl, creator, name } = props

  return (
    <div className={styles['desc']} >
      <div className={styles['img-wrapper']}>
        {/* 点击量 */}
        <div className={styles['play-count']}>
          <i className="iconfont icon-headset"></i>
          <span className={styles['count']}>{ formatCount(subscribedCount) }</span>
        </div>
        <img src={coverImgUrl} width="100%" height="100%" alt="歌单封面" />
      </div>
      <div className={styles['info-wrapper']}>
        <h1 className={styles['title']}>{ name }</h1>
        <div className={styles['person']}>
          <div className={styles['avatar-wrapper']}>
            <img src={creator.avatarUrl} width="100%" height="100%" alt="歌单封面" />
          </div>
          <p className={styles['person-name']}>{ creator.nickname }</p>
        </div>
      </div>
    </div>
  )
}

AlbumDesc.propTypes = {
  subscribedCount: PropTypes.number,
  coverImgUrl: PropTypes.string,
  creator: PropTypes.object,
  name: PropTypes.string
}

export default memo(AlbumDesc)