import React, { memo, useCallback, useEffect, useState, useRef, FC, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import Scroll from '../../components/Scroll';
import Loading from '../../components/Loading';
import Header from './Header';
import Detail from './Detail';

import { actions } from './store';

import styles from './index.module.scss';
import { IStoreState } from '../../store';
import { RouteComponentProps } from 'react-router-dom';

const { getAlbumDetailAction } = actions;

interface IRouteParams {
  id: string;
}

const Album: FC<RouteComponentProps<IRouteParams>> = ({
  match: { params },
  history
}): ReactElement => {
  const { loading, albumDetail, playList } = useSelector((state: IStoreState) => ({
    loading: state.album.loading,
    albumDetail: state.album.albumDetail,
    playList: state.player.playList
  }));

  const [title, setTitle] = useState<string>('歌单'),
        [isTitleMarquee, setIsTitleMarquee] = useState<boolean>(false),
        [show, setShow] = useState<boolean>(true);

  const headerRef = useRef<HTMLElement>();

  const dispatch = useDispatch();

  /**
   * 获取榜单详情数据
   */
  useEffect((): void => {
    const id = params.id;
    dispatch(getAlbumDetailAction(Number(id)));
  }, []);

  /**
   * 返回上一个路由
   */
  const handleClickBack = useCallback((): void => {
    setShow(false);
  }, []);

  /**
   * 列表滚动时改变页头
   */
  const handleScroll = useCallback((pos: any): void => {
    const MaxHeight: number = 30;
    const headerDom = headerRef.current!;
    if (pos.y < -MaxHeight) {
      const percent: number = Math.abs(pos.y / MaxHeight);
      headerDom.style.backgroundColor = '$color-red';
      headerDom.style.opacity = String(Math.min(1, (percent - 1) / 2));
      headerDom.style.backgroundColor = '#D44439';
      setTitle(albumDetail.name);
      setIsTitleMarquee(true);
    } else {
      headerDom.style.backgroundColor = 'transparent';
      headerDom.style.opacity = '1';
      setTitle('歌单');
      setIsTitleMarquee(false);
    }
  }, [albumDetail]);

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={history.goBack}
    >
      <div className={styles['album-wrap']} style={{ bottom: playList.length ? '60px' : 0 }}>
        <Header
          ref={headerRef}
          title={title}
          isTitleMarquee={isTitleMarquee}
          onClickBack={handleClickBack}
        />

        {albumDetail && (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <Detail {...albumDetail} />
          </Scroll>
        )}

        {/* 加载loading */}
        {loading && <Loading />}
      </div>
    </CSSTransition>
  );
};

export default memo(Album);
