import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from "react-transition-group";

import Header from './Header'
import Scroll from '../../components/Scroll'
import SongList from '../../components/SongList'
import Loading from '../../components/Loading'

import { actions } from './store'

import styles from './index.module.scss'

const { getSingerDetailAction } = actions

const Singer = props => {
  const singerDetail = useSelector(state => state.singer.singerDetail),
        loading = useSelector(state => state.singer.loading),
        playList = useSelector(state => state.player.playList);

  const [show, setShow] = useState(true)

  const layerRef = useRef(),
        coverRef = useRef(),
        buttonRef = useRef();

  const dispatch = useDispatch()

  /**
   * 获取歌手详情数据
   */
  useEffect(() => {
    const id = props.match.params.id;
    dispatch(getSingerDetailAction(id))
  }, [])

  /**
   * 返回上一个路由
   */
  const handleClickBack = useCallback(() => {
    setShow(false)
  }, [])

  /**
   * 监听歌曲列表滚动
   */
  const handleScroll = useCallback(({ y }) => {
    const HEADER_HEIGHT = 42,
          LIST_TOP = 270,
          percent = Math.abs(y / LIST_TOP),
          minScrollY = -LIST_TOP + HEADER_HEIGHT;

    const coverDom = coverRef.current,
          layerDom = layerRef.current,
          buttonDom = buttonRef.current;

    if (y > 0) {
      // 下拉
      coverDom.style["transform"] = `scale(${1 + percent})`;
      buttonDom.style["transform"] = `translate3d(0, ${y}px, 0)`;
      layerDom.style.top = `${LIST_TOP + y}px`
    } else if (y >= minScrollY) {
      // 上滑
      coverDom.style.height = '280px';
      coverDom.style.zIndex = 9
      layerDom.style.top = `${LIST_TOP - Math.abs(y)}px`
      buttonDom.style["transform"] = `translate3d(0, ${y}px, 0)`;
      buttonDom.style["opacity"] = `${1 - percent * 2}`;
    } else if (y < minScrollY) {
      // 上滑到header的高度
      layerDom.style.top = HEADER_HEIGHT + 'px'
      coverDom.style.height = `${HEADER_HEIGHT}px`;
      coverDom.style.zIndex = 11
    }
  }, [])

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames='fly'
      unmountOnExit
      onExited={props.history.goBack}
    >
      <div className={styles['singer-wrapper']} style={{bottom: playList.length ? '60px': 0}}>
        {
          singerDetail
          &&
          <>
            <Header
              onClickBack={handleClickBack}
              title={singerDetail.name}
            />
            {/* 歌手封面 */}
            <div
              ref={coverRef}
              className={styles['cover']}
              style={{ backgroundImage: `url(${singerDetail.picUrl})` }}
            >
              <div className={styles['filter']}></div>
            </div>

            {/* 收藏按钮 */}
            <button className={styles['collect']} ref={buttonRef}>
              <i className="iconfont icon-plus"></i>
              <span>收藏</span>
            </button>

            {/* 热门歌曲列表 */}
            <div className={styles['bg-layer']} ref={layerRef}></div>
            <div className={styles['hot-songs']}>
              <Scroll onScroll={handleScroll}>
                <SongList
                  listData={singerDetail.hotSongs}
                  showMenu
                />
              </Scroll>
            </div>
          </>
        }

        {/* 加载loading */}
        {loading && <Loading />}
      </div>
    </CSSTransition>
  )
}

export default memo(Singer)