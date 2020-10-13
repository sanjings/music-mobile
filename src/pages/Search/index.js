import React, { memo, useState, useCallback, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { forceCheck } from 'react-lazyload'
import classnames from 'classnames'

import Scroll from '../../components/Scroll'
import SearchBox from '../../components/SearchBox'
import HotSearch from './HotSearch'
import SearchResult from './SearchResult'

import { actions } from './store'

import styles from './index.module.scss'

const { getHotKeywordsListAction, getSearchDataAction, changeSearchDataAction } = actions

const Search = props => {
  const hotKeywordsList = useSelector(state => state.search.hotKeywordsList),
        searchData = useSelector(state => state.search.searchData);

  const [show, setShow] = useState(true),
        [keywords, setKeywords] = useState('');

  const dispatch = useDispatch()

  /**
   * 请求热门关键词数据
   */
  useEffect(() => {
    if (hotKeywordsList.length) return;
    dispatch(getHotKeywordsListAction())
  }, [])

  /**
   * 返回上一个路由
   */
  const handleClickBack = useCallback(() => {
    setShow(false)
  }, [])

  /**
   * 搜索值改变事件处理函数
   * @param {String} value
   */
  const handleInput = useCallback(value => {
    value ? dispatch(getSearchDataAction(value)) : dispatch(changeSearchDataAction(null))
  }, [])

  /**
   * 热门搜索关键词点击事件处理函数
   * @param {String} value
   */
  const handleHotItemClick = useCallback(value => {
    setKeywords(value)
    dispatch(getSearchDataAction(value))
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
      <div className={classnames(styles['search'], 'fly-animation')}>
        {/* 搜索框 */}
        <SearchBox
          keywords={keywords}
          clickBack={ handleClickBack }
          onInput={ handleInput }
        />
        
        {/* 搜索结果或热门搜索关键词 */}
        {
          searchData
          ?
          <div className={styles['search-result-wrapper']}>
            <Scroll onScroll={forceCheck}>
              <SearchResult
                data={searchData} 
              />
            </Scroll>
          </div>
          :
          <HotSearch
            onItemClick={ handleHotItemClick } 
            listData={ hotKeywordsList } 
          />
        }
      </div>
    </CSSTransition>
  )
}

export default memo(Search)