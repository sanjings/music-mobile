import React, { memo, forwardRef } from "react"
import classnames from 'classnames'

import styles from './cd.module.scss'

const CD = forwardRef((props, ref) => {
  const { picUrl, playingStatus, currentPlayingLyric } = props

  const { toggleCd } = props

  return (
    <div className={styles['cd-wrapper']} ref={ref} onClick={() => toggleCd(false)}>
      <div className={styles['needle']}></div>
      <div className={classnames([styles['cd-cover'], !playingStatus && styles['pause']])}>
        <img src={ picUrl + '?param=400x400' } className={styles['img-cover']} alt="cover" />
      </div>
      <p className={styles['lyrics']}>{ currentPlayingLyric }</p>
    </div>
  )
})

export default memo(CD)