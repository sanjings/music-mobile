import React, { memo, forwardRef } from "react"

import classnames from 'classnames'

import styles from './cd.module.scss'

const CD = forwardRef((props, ref) => {
  const { picUrl, playingStatus } = props;

  return (
    <div className={styles['cd-wrapper']} ref={ref}>
      <div className={styles['needle']}></div>
      <div className={classnames([styles['cd-cover'], !playingStatus && styles['pause']])}>
        <img src={ picUrl + '?param=400x400' } className={styles['img-cover']} alt="cover" />
      </div>
      <p className={styles['lyrics']}>不管结局会怎么样</p>
    </div>
  )
})

export default memo(CD)