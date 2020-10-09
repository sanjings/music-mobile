import React, { memo, useRef, useState, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { renderRoutes } from 'react-router-config';
import { forceCheck } from 'react-lazyload'

import Scroll from '../../components/Scroll'
import SingerList from './List'
import Tab from './Tab'

import { actions } from './store'
import { alphaTypes } from '../../apis/config'

import styles from './index.module.scss'

const { 
   getSingerListAction, 
   getMoreSingerListAction 
} = actions;

const Singers = props => {
   const [currentTabType, setCurrentTabType] = useState('')

   const singerList = useSelector(state => state.singers.singerList),
         pullDownLoading = useSelector(state => state.singers.pullDownLoading),
         pullUpLoading = useSelector(state => state.singers.pullUpLoading);

   const dispatch = useDispatch();

   const scrollRef = useRef(null)

   useEffect(() => {
      dispatch(getSingerListAction())
   }, [])

   const changeTabType = useCallback((type) => {
      setCurrentTabType(type)
      dispatch(getSingerListAction(type))
      scrollRef.current.refresh()
   }, [])

   const handlePullDown = useCallback(() => {
      dispatch(getSingerListAction(currentTabType))
   }, [currentTabType])

   const handlePullUp = useCallback(() => {
      dispatch(getMoreSingerListAction(singerList.length, currentTabType))
   }, [singerList, currentTabType])

   return (
      <>
         <div className={styles['singers-wrapper']}>
            {/* 分类字母 */}
            <div className={styles['tab-wrapper']}>
               <Tab 
                  currentType={currentTabType} 
                  listData={alphaTypes} 
                  handleClick={changeTabType} 
               />
            </div>

            {/* 歌手列表 */}
            <div className={styles['list-wrapper']}>
               <Scroll
                  ref={scrollRef} 
                  onScroll={ forceCheck } 
                  pullDownLoading= { pullDownLoading }
                  pullUpLoading = { pullUpLoading }
                  onPullDown={ handlePullDown }
                  onPullUp={ handlePullUp }
               >
                  <SingerList listData={singerList} />
               </Scroll>
            </div>
         </div>
         { renderRoutes(props.route.routes) }
      </>
   )
}

export default memo(Singers)
