import React, { memo, useCallback, useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition } from "react-transition-group";

import Scroll from '../../components/Scroll'
import Loading from '../../components/Loading'
import Header from './Header'
import Detail from './Detail'

import { actions } from './store'

import styles from './index.module.scss'

const { getAlbumDetailAction } = actions;

const Album = props => {
  const albumDetail = useSelector(state => state.album.albumDetail),
        loading = useSelector(state => state.album.loading),
        playList = useSelector(state => state.player.playList);

  const [title, setTitle] = useState('歌单'),
        [isTitleMarquee, setIsTitleMarquee] = useState(false),
        [show, setShow] = useState(true);

  const headerRef = useRef();

  const dispatch = useDispatch()

  /**
   * 获取榜单详情数据
   */
  useEffect(() => {
    const id = props.match.params.id;
    dispatch(getAlbumDetailAction(id))
  }, [])

  /**
   * 返回上一个路由
   */
  const handleClickBack = useCallback(() => {
    setShow(false)
  }, [])

  /**
   * 列表滚动时改变页头
   */
  const handleScroll = useCallback(pos => {
    const MaxHeight = 30
    const headerDom = headerRef.current
    if (pos.y < -MaxHeight) {
      const percent = Math.abs(pos.y / MaxHeight)
      headerDom.style.backgroundColor = '#D44439'
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
      setTitle(albumDetail.name)
      setIsTitleMarquee(true)
    } else {
      headerDom.style.backgroundColor = 'transparent';
      headerDom.style.opacity = 1;
      setTitle('歌单')
      setIsTitleMarquee(false)
    }
  }, [albumDetail])

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames='fly'
      unmountOnExit
      onExited={props.history.goBack}
    >
      <div className={styles['album-wrapper']} style={{bottom: playList.length ? '60px': 0}}>
        <Header
          ref={headerRef}
          title={title}
          isTitleMarquee={isTitleMarquee}
          onClickBack={handleClickBack}
        />

        {
          albumDetail
          &&
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <Detail data={albumDetail} />
          </Scroll>
        }

        {/* 加载loading */}
        {loading && <Loading />}
      </div>
    </CSSTransition>
  )
}

export default memo(Album)