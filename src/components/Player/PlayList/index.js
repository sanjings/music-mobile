import React, { memo, useCallback, useState, useRef } from "react"
import { CSSTransition } from 'react-transition-group'
import { useDispatch } from 'react-redux'

import Scroll from '../../../components/Scroll'
import List from './list'

import { actions } from '../store'

import styles from './index.module.scss'

const  { changeCurrentIndexAction } = actions

const PlayList = props => {
  const { playList, currentIndex } = props

  const { toggleShowPlayList, onClickDelete } = props

  const [show, setShow] = useState(true),
        [canTouch, setCanTouch] = useState(true),
        [touchInfo, setTouchInfo] = useState({});

  const listRef = useRef()

  const dispatch = useDispatch()

  const handleScroll = useCallback(({y}) => {
    setCanTouch(y === 0)
  }, [])

  const handleClickPlay = index => {
    dispatch(changeCurrentIndexAction(index))
  }

  const handleTouchStart = e => {
    if (!canTouch || touchInfo.initiated) return;
    setTouchInfo({
      initiated: true,
      startY: e.nativeEvent.touches[0].pageY,
      distance: 0
    })
  }

  const handleTouchMove = e => {
    if (!canTouch || !touchInfo.initiated) return;

    const distance = e.nativeEvent.touches[0].pageY - touchInfo.startY
    if (distance < 0) return;
    setTouchInfo({
      ...touchInfo,
      distance
    })
    listRef.current.style.transform = `translate3d(0, ${distance}px, 0)`
  }

  const handleTouchEnd = e => {
    setTouchInfo({
      ...touchInfo,
      initiated: false
    })

    if (touchInfo.distance >= 200) {
      setShow(false)
    } else {
      listRef.current.style.transition = `transform .3s`
      listRef.current.style.transform = `translate3d(0, 0, 0)`
    }
  }

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames='move'
      onExited={() => toggleShowPlayList(false)} 
    >
      <div className={styles['play-list']}>
        {/* 遮蔽层 */}
        <div className={styles['mask']} onClick={() => setShow(false)}></div>

        {/* 歌曲列表 */}
        <div 
          className={styles['list-wrapper']} 
          ref={listRef}
          onClick={e => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 表头 */}
          <div className={styles['list-header']}>
            <div className={styles['play-mode']}>
              <i className="iconfont icon-loop" />
              <span>顺序播放</span>
            </div>
          </div>
          {/* 滚动列表 */}
          <div className={styles['list-scroll-wrapper']}>
            <Scroll onScroll={handleScroll}>
              <List 
                listData={playList} 
                currentIndex={currentIndex}
                onClickDelete={onClickDelete}
                onClickPlay={handleClickPlay} 
              />
            </Scroll>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default memo(PlayList)