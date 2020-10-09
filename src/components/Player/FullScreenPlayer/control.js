import React, { memo, useCallback } from "react"
import classnames from 'classnames'

import ProgressBar from '../ProgressBar'

import { formatPlayTime } from '../../../utils/tools'

import styles from './control.module.scss'

const Control = props => {
  const { playingStatus, currentTime, duration, percent } = props

  const { togglePlayingState, onProgressChange, onClickPrev, onClickNext } = props

  return (
    <div className={styles['control-wrapper']}>
      {/* 进度条 */}
      <div className={styles['progress-bar']}>
        <span>{ formatPlayTime(currentTime) }</span>
        <div className={styles['progress-bar-wrapper']}>
          <ProgressBar percent={percent} onChange={onProgressChange}/>
        </div>
        <span>{ formatPlayTime(duration) }</span>
      </div>

      <ul className={styles['btn-group']}>
        <li className={styles['btn-item']}>
          <i className="iconfont icon-loop"></i>
        </li>
        <li className={styles['btn-item']} onClick={onClickPrev}>
          <i className="iconfont icon-previous"></i>
        </li>
        <li 
          className={classnames(styles['btn-item'], styles['play-btn'])}
          onClick={() => togglePlayingState(!playingStatus)}
        >
          {
            playingStatus
            ?
            <i className="iconfont icon-pause-circle"></i>
            :
            <i className="iconfont icon-play-circle"></i>
          } 
        </li>
        <li className={styles['btn-item']} onClick={onClickNext}>
          <i className="iconfont icon-next"></i>
        </li>
        <li className={styles['btn-item']}>
          <i className="iconfont icon-gedan"></i>
        </li>
      </ul>
    </div>
  )
}

export default memo(Control)