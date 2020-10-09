import React, { memo, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { renderRoutes } from 'react-router-config';
import { forceCheck } from 'react-lazyload'

import Scroll from '../../components/Scroll'
import ModuleTitle from '../../components/ModuleTitle'
import GlobalList from './GlobalList'
import OfficialList from './OfficialList'

import { actions } from './store'

import styles from './index.module.scss'

const Rank = props => {
   const officialList = useSelector(state => state.rank.officailList),
         globalList = useSelector(state => state.rank.globalList);

   const dispatch = useDispatch()

   useEffect(() => {
      const { getRankListAction } = actions;

      dispatch(getRankListAction())
   }, [])

   return (
      <div className={styles['container']}>
         <Scroll onScroll={forceCheck}>
            <div className={styles['rank']}>
               {/* 官方榜 */}
               <ModuleTitle title="官方榜" symbol />
               <OfficialList listData={officialList} />

               {/* 全球榜 */}
               <ModuleTitle title="全球榜" symbol />
               <GlobalList listData={globalList} />
            </div>
         </Scroll>
         { renderRoutes(props.route.routes) }
      </div>
   )
}

export default memo(Rank)