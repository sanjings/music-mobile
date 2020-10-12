import React, { memo } from 'react';
import LazyLoad from "react-lazyload";

import styles from './index.module.scss'

const Cover = props => {
  const { coverImgUrl, updateFrequency } = props

  return (
    <div className={styles['img-wrapper']}>
      <LazyLoad 
        placeholder={<img src={require('../../../assets/images/music.png')} height="100%" alt="榜单封面" />}
      >
        <img src={coverImgUrl} height="100%" alt="榜单封面" />
      </LazyLoad>
      <div className={styles['update-frequency']}>{updateFrequency}</div>
    </div>
  )
}

export default memo(Cover)