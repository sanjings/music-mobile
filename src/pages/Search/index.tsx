import React, { memo, useState, useCallback, useEffect, FC, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { forceCheck } from 'react-lazyload';
import classnames from 'classnames';

import Scroll from '../../components/Scroll';
import SearchBox from '../../components/SearchBox';
import HotSearch from './HotSearch';
import SearchResult from './SearchResult';

import { actions } from './store';

import styles from './index.module.scss';
import { RouteComponentProps } from 'react-router-dom';
import { IStoreState } from '../../store';

const { getHotKeywordsListAction, getSearchDataAction, changeSearchDataAction } = actions;

const Search: FC<RouteComponentProps> = ({ 
  history 
}): ReactElement => {
  const { hotKeywordsList, searchData, playList } = useSelector((state: IStoreState) => ({
    hotKeywordsList: state.search.hotKeywordsList,
    searchData: state.search.searchData,
    playList: state.player.playList
  }));

  const [show, setShow] = useState<boolean>(true),
    [keywords, setKeywords] = useState<string>('');

  const dispatch = useDispatch();

  /**
   * 请求热门关键词数据
   */
  useEffect((): void => {
    if (hotKeywordsList.length) return;
    dispatch(getHotKeywordsListAction());
  }, []);

  /**
   * 返回上一个路由
   */
  const handleClickBack = useCallback((): void => {
    setShow(false);
  }, []);

  /**
   * 搜索值改变事件处理函数
   * @param {String} value
   */
  const handleInput = useCallback((value: string): void => {
    value ? dispatch(getSearchDataAction(value)) : dispatch(changeSearchDataAction(null));
  }, []);

  /**
   * 热门搜索关键词点击事件处理函数
   * @param {String} value
   */
  const handleHotItemClick = useCallback((value: string): void => {
    setKeywords(value);
    dispatch(getSearchDataAction(value));
  }, []);

  /**
   * 根据播放状态动态改变滚动高度
   */
  const wrapperStyle = {
    flex: 1,
    overflow: 'hidden',
    marginBottom: playList.length ? '60px' : 0
  };

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={history.goBack}
    >
      <div className={classnames(styles['search'], 'fly-animation')}>
        {/* 搜索框 */}
        <SearchBox 
          keywords={keywords} 
          clickBack={handleClickBack} 
          onInput={handleInput} 
        />

        {/* 搜索结果或热门搜索关键词 */}
        {
          searchData 
          ? 
          (
            <div style={wrapperStyle}>
              <Scroll onScroll={forceCheck}>
                <SearchResult {...searchData} />
              </Scroll>
            </div>
          ) 
          : 
          (
            <HotSearch 
              onItemClick={handleHotItemClick} 
              listData={hotKeywordsList} 
            />
          )
        }
      </div>
    </CSSTransition>
  );
};

export default memo(Search);
