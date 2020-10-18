import React, { memo } from 'react';
import PropTypes from 'prop-types'
import LazyLoad from "react-lazyload";

import styles from './index.module.scss'

const Cover = props => {
  const { coverImgUrl, updateFrequency } = props

  return (
    <div className={styles['img-wrapper']}>
      <LazyLoad 
        placeholder={<img src={require('assets/images/music.png')} height="100%" alt="榜单封面" />}
      >
        <img src={coverImgUrl} height="100%" alt="榜单封面" />
      </LazyLoad>
      <p className={styles['update-frequency']}>{ updateFrequency }</p>
    </div>
  )
}

Cover.propTypes = {
  coverImgUrl: PropTypes.string,
  updateFrequency: PropTypes.string
}

export default memo(Cover)