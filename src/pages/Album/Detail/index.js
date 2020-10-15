import React, { memo } from 'react';
import PropTypes from 'prop-types'

import SongList from '../../../components/SongList'
import AlbumDesc from './desc'
import AlbumMenu from './menu'

import styles from './index.module.scss'

const AlbumDetail = props => {
  const { data } = props,
        { coverImgUrl, subscribedCount, name, creator, tracks } = data;

  return (
    <div className={styles['album-detail']}>
      {/* 歌单顶部区 */}
      <div className={styles['top']}>
        <div className={styles['background']} style={{ backgroundImage: `url(${coverImgUrl})` }}>
          <div className={styles['filter']}></div>
        </div>
        {/* 歌单描述 */}
        <AlbumDesc
          name={name}
          subscribedCount={subscribedCount}
          coverImgUrl={coverImgUrl}
          creator={creator}
        />

        {/* 歌单操作 */}
        <AlbumMenu />
      </div>
      {/* 歌曲列表 */}
      <div className={styles['songs']}>
        <SongList
          listData={tracks}
          subscribedCount={subscribedCount}
          showMenu
          showCollect
        />
      </div>
    </div>
  )
}

AlbumDetail.propTypes = {
  data: PropTypes.object
}

export default memo(AlbumDetail)