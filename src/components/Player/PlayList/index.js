import React, { memo, useCallback, useState, useRef } from "react"
import { CSSTransition } from 'react-transition-group'

import Scroll from '../../../components/Scroll'
import List from './list'

import styles from './index.module.scss'

const PlayList = props => {
  const { playList, currentIndex } = props

  const { togglePlayList } = props

  const [show, setShow] = useState(true)

  const layerRef = useRef()

  const handleScroll = useCallback(({y}) => {
    const layerDom = layerRef.current,
          LIST_TOP = 240,
          maxScrollY = 100;

    if (y > 0) {
      layerDom.style.top = `${LIST_TOP + y}px`
    }
    if (y > maxScrollY) {
      console.log(y)
      setShow(false)
    }
  }, [])

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames='move' 
      unmountOnExit
      onExited={() => togglePlayList(false)} 
    >
      <div className={styles['play-list']}>
        {/* 遮蔽层 */}
        <div className={styles['mask']} onClick={() => setShow(false)}></div>
        
        <div className={styles['bg-layer']} ref={layerRef}>
          {/* 播放模式 */}
          <div className={styles['menu']}>
            <div className={styles['play-mode']}>
              <i className="iconfont icon-loop" />
              <span>顺序播放</span>
            </div>
          </div>
        </div>

        {/* 歌曲列表 */}
        <div className={styles['list-wrapper']} >
          <Scroll onScroll={handleScroll}>
            <List 
              listData={playList} 
              currentIndex={currentIndex} 
            />
          </Scroll>
        </div>
      </div>
    </CSSTransition>
  )
}

export default memo(PlayList)