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
  const [show, setShow] = useState(true),
        [searchValue, setSearchValue] = useState('');

  const hotKeywordsList = useSelector(state => state.search.hotKeywordsList),
        loading = useSelector(state => state.search.loading),
        searchData = useSelector(state => state.search.searchData);

  const dispatch = useDispatch()

  /**
   * 请求热门关键词数据
   */
  useEffect(() => {
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
    setSearchValue(value)
    value ? dispatch(getSearchDataAction(value)) : dispatch(changeSearchDataAction(null))
  }, [searchValue])

  /**
   * 热门搜索关键词点击事件处理函数
   * @param {String} value
   */
  const handleHotItemClick = useCallback(value => {
    setSearchValue(value)
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
          searchValue={ searchValue }
          clickBack={ handleClickBack }
          onInput={ handleInput }
        />
        
        {/* 热门搜索 */}
        {
          !searchData
          &&
          <HotSearch
            onItemClick={ handleHotItemClick } 
            listData={ hotKeywordsList } 
          />
        }

        {/* 搜索结果列表 */}
        
        {
          searchData 
          &&
          <div className={styles['search-result-wrapper']}>
            <Scroll pullDownLoading={loading} onScroll={forceCheck}>
              <SearchResult
                data={searchData} 
              />
            </Scroll>
          </div>
        }
      </div>
    </CSSTransition>
  )
}

export default memo(Search)