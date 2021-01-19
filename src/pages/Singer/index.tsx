import React, { memo, useState, useEffect, useCallback, useRef, FC, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { RouteComponentProps } from 'react-router-dom';

import Header from './Header';
import Scroll from '../../components/Scroll';
import SongList from '../../components/SongList';
import Loading from '../../components/Loading';

import { actions } from './store';

import styles from './index.module.scss';
import { IStoreState } from '../../store';
import { IPosition } from '../../components/Scroll/typing';

const { getSingerDetailAction } = actions;

interface IRouteParams {
  id: string;
}

const Singer: FC<RouteComponentProps<IRouteParams>> = ({
  match: { params },
  history
}): ReactElement => {
  const { loading, singerDetail, playList } = useSelector((state: IStoreState) => ({
    loading: state.singer.loading,
    singerDetail: state.singer.singerDetail,
    playList: state.player.playList
  }));

  const [show, setShow] = useState<boolean>(true);

  const layerRef = useRef<HTMLDivElement>(null),
        coverRef = useRef<HTMLDivElement>(null),
        buttonRef = useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch();

  /**
   * 获取歌手详情数据
   */
  useEffect((): void => {
    const id = params.id;
    dispatch(getSingerDetailAction(Number(id)));
  }, []);

  /**
   * 返回上一个路由
   */
  const handleClickBack = useCallback((): void => {
    setShow(false);
  }, []);

  /**
   * 监听歌曲列表滚动
   */
  const handleScroll = useCallback(({ y }: IPosition): void => {
    const HEADER_HEIGHT: number = 42,
          LIST_TOP: number = 270,
          percent: number = Math.abs(y / LIST_TOP),
          minScrollY: number = -LIST_TOP + HEADER_HEIGHT;

    const coverDom = coverRef.current as HTMLDivElement, 
          layerDom = layerRef.current as HTMLDivElement,
          buttonDom = buttonRef.current as HTMLButtonElement;

    if (y > 0) {
      // 下拉
      coverDom.style['transform'] = `scale(${1 + percent})`;
      buttonDom.style['transform'] = `translate3d(0, ${y}px, 0)`;
      layerDom.style.top = `${LIST_TOP + y}px`;
    } else if (y >= minScrollY) {
      // 上滑
      coverDom.style.height = '280px';
      coverDom.style.zIndex = '9';
      layerDom.style.top = `${LIST_TOP - Math.abs(y)}px`;
      buttonDom.style['transform'] = `translate3d(0, ${y}px, 0)`;
      buttonDom.style['opacity'] = `${1 - percent * 2}`;
    } else if (y < minScrollY) {
      // 上滑到header的高度
      layerDom.style.top = HEADER_HEIGHT + 'px';
      coverDom.style.height = `${HEADER_HEIGHT}px`;
      coverDom.style.zIndex = '11';
    }
  }, []);

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={history.goBack}
    >
      <div className={styles['singer-wrap']} style={{ bottom: playList.length ? '60px' : 0 }}>
        {singerDetail && (
          <>
            <Header onClickBack={handleClickBack} title={singerDetail.name} />
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
                <SongList listData={singerDetail.hotSongs!} showMenu />
              </Scroll>
            </div>
          </>
        )}

        {/* 加载loading */}
        { loading && <Loading /> }
      </div>
    </CSSTransition>
  );
};

export default memo(Singer);
