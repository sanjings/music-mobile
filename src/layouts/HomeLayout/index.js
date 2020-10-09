import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';

import Header from './Header'
import NavTab from './NavTab'
import Player from '../../components/Player'


const HomeLayout = props => {
   const { route } = props

   return (
      <>
         {/* 页头 */}
         <Header title="网易云音乐" />

         {/* 导航栏 */}
         <NavTab />

         {/* 路由 */}
         { renderRoutes(route.routes) }

         {/* 播放器 */}
         <Player />
      </>
   )
}


export default memo(HomeLayout)