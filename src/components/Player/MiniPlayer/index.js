import React, { memo, useRef } from "react"

import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'

import { formatSingerName } from '../../../utils/filters'

import styles from './index.module.scss'

const MiniPlayer = props => {
  const { song, fullScreen, playingStatus } = props,
        { name, album, singers } = song;

  const { toggleFullScreen, togglePlayingState, togglePlayList } = props

  const miniPlayerRef = useRef()

  const handleTogglePlayStatus = (e) => {
    e.stopPropagation();
    togglePlayingState(!playingStatus)
  }

  const handleShowPlayList = (e) => {
    e.stopPropagation();
    togglePlayList(true)
  }

  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      appear={true}
      classNames='mini'
      onEnter={() => {
        miniPlayerRef.current.style.display = 'flex'
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = 'none'
      }} 
    >
      <div
        ref={miniPlayerRef} 
        className={styles['mini-player']} 
        onClick={ () => toggleFullScreen(true) }
      >
        <div className={classnames([styles['img-wrapper'], !playingStatus && styles['pause']])}>
          <img className={styles['cover']} src={ album.picUrl + '?param=100x100' } width="40" height="40"></img>
        </div>
        <div className={styles['text']}>
        <p className={styles['name']}>{ name }</p>
          <p className={styles['singer']}>{ formatSingerName(singers) }</p>
        </div>
        <div className={styles['control']} onClick={handleTogglePlayStatus}>
          {
            playingStatus 
            ?
            <i className="iconfont icon-pause-circle"></i>
            :
            <i className="iconfont icon-play-circle"></i>
          }
        </div>
        <div
          onClick={handleShowPlayList}
          className={styles['control']}
        >
          <i className="iconfont icon-gedan"></i>
        </div>
      </div>
    </CSSTransition>
  )
}

export default memo(MiniPlayer)