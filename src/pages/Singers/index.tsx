import React, { memo, useRef, useState, useEffect, useCallback, FC, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { forceCheck } from 'react-lazyload';

import Scroll from 'components/Scroll';
import SingerList from './List';
import Tab from './Tab';

import { actions } from './store';
import { alphaTypes } from '@/apis/data';

import styles from './index.module.scss';
import { IStoreState } from '@/store';
import { IScrollInstance } from 'components/Scroll/typing';

const { getSingerListAction, getMoreSingerListAction } = actions;

const Singers: FC<RouteConfigComponentProps> = ({ 
  route 
}): ReactElement => {
  const { pullDownLoading, pullUpLoading, singerList, playList } = useSelector(
    (state: IStoreState) => ({
      pullDownLoading: state.singers.pullDownLoading,
      pullUpLoading: state.singers.pullUpLoading,
      singerList: state.singers.singerList,
      playList: state.player.playList
    })
  );

  const [currentTabType, setCurrentTabType] = useState<string>('');

  const scrollRef = useRef<IScrollInstance>(null);

  const dispatch = useDispatch();

  /**
   * 获取歌手数据
   */
  useEffect((): void => {
    dispatch(getSingerListAction());
  }, []);

  /**
   * 切换tab
   * @param {String} type 首字母
   */
  const changeTabType = useCallback((type: string): void => {
    setCurrentTabType(type);
    dispatch(getSingerListAction(type));
    scrollRef.current!.refresh();
  }, []);

  /**
   * 下拉刷新
   */
  const handlePullDown = useCallback((): void => {
    dispatch(getSingerListAction(currentTabType));
  }, [currentTabType]);

  /**
   * 上拉加载更多
   */
  const handlePullUp = useCallback((): void => {
    dispatch(getMoreSingerListAction(singerList.length, currentTabType));
  }, [singerList, currentTabType]);

  /**
   * 根据播放状态动态改变滚动高度
   */
  const wrapperStyle = {
    flex: 1,
    overflow: 'hidden',
    marginBottom: playList.length ? '60px' : 0
  };

  return (
    <>
      <div className={styles['singers-wrap']}>
        {/* 分类字母 */}
        <div className={styles['tab-wrap']}>
          <Tab 
            currentType={currentTabType} 
            listData={alphaTypes} 
            onItemClick={changeTabType} 
          />
        </div>

        {/* 歌手列表 */}
        <div style={wrapperStyle}>
          <Scroll
            ref={scrollRef}
            onScroll={forceCheck}
            pullDownLoading={pullDownLoading}
            pullUpLoading={pullUpLoading}
            onPullDown={handlePullDown}
            onPullUp={handlePullUp}
          >
            <SingerList listData={singerList} />
          </Scroll>
        </div>
      </div>
      { renderRoutes(route?.routes) }
    </>
  );
};

export default memo(Singers);
