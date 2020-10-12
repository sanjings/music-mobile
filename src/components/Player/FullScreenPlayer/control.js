import React, { memo } from "react"
import classnames from 'classnames'

import ProgressBar from '../ProgressBar'

import { formatPlayTime } from '../../../utils/tools'

import styles from './control.module.scss'

const Control = props => {
  const { playingStatus, currentTime, duration, percent } = props

  const { togglePlayingState, toggleShowPlayList, onProgressChange, onClickPrev, onClickNext } = props

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
        {/* 播放模式 */}
        <li className={styles['btn-item']} onClick={() => alert('目前只能顺序播放')}>
          <i className="iconfont icon-loop"></i>
        </li>
        {/* 上一首 */}
        <li className={styles['btn-item']} onClick={onClickPrev}>
          <i className="iconfont icon-previous"></i>
        </li>
        {/* 播放/暂停 */}
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
        {/* 下一首 */}
        <li className={styles['btn-item']} onClick={onClickNext}>
          <i className="iconfont icon-next"></i>
        </li>
        {/* 播放列表 */}
        <li className={styles['btn-item']} onClick={() => toggleShowPlayList(true)}>
          <i className="iconfont icon-gedan"></i>
        </li>
      </ul>
    </div>
  )
}

export default memo(Control)