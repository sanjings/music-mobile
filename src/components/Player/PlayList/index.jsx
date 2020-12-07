import React, { memo, useCallback, useState, useRef } from "react";
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import Scroll from 'components/Scroll';
import List from './list';

import styles from './index.module.scss';

const PlayList = props => {
  const { playList, currentIndex } = props;

  const { toggleShowPlayList, onClickPlay, onClickDelete } = props;

  const [show, setShow] = useState(true),
        [canTouch, setCanTouch] = useState(true),
        [touchInfo, setTouchInfo] = useState({});

  const listRef = useRef();

  /**
   * bScroll滚动事件回调
   */
  const handleScroll = useCallback(({y}) => {
    setCanTouch(y === 0)
  }, [])

  /**
   * 列表容器touchStart事件
   * @param {Event} e 
   */
  const handleTouchStart = e => {
    if (!canTouch || touchInfo.initiated) return;
    listRef.current.style["transition"] = "";
    setTouchInfo({
      initiated: true,
      startY: e.nativeEvent.touches[0].pageY,
      distance: 0
    })
  }

  /**
   * 列表容器touchMove事件
   * @param {Event} e 
   */
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

  /**
   * 列表容器touchEnd事件
   * @param {Event} e 
   */
  const handleTouchEnd = e => {
    setTouchInfo({
      ...touchInfo,
      initiated: false
    })

    if (touchInfo.distance >= 150) {
      setShow(false)
    } else {
      listRef.current.style.transition = `all .3s`
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
          className={styles['list-wrap']} 
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
          <div className={styles['list-scroll-wrap']}>
            <Scroll onScroll={handleScroll}>
              <List 
                listData={playList} 
                currentIndex={currentIndex}
                onClickDelete={onClickDelete}
                onClickPlay={onClickPlay} 
              />
            </Scroll>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

PlayList.defaultProps = {
  playList: [],
  currentIndex: 0
}

PlayList.propTypes = {
  playList: PropTypes.array,
  currentIndex: PropTypes.number,
  toggleShowPlayList: PropTypes.func,
  onClickPlay: PropTypes.func,
  onClickDelete: PropTypes.func
}

export default memo(PlayList)