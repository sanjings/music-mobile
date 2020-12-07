import React, { memo, useEffect, useRef } from 'react';
import { renderRoutes } from 'react-router-config';
import { useDispatch } from 'react-redux';

import Header from 'components/Header';
import NavTab from 'components/NavTab';
import Player from 'components/Player';
import Toast from 'components/Toast';

import { showToastAction } from '@/store/actions';


const HomeLayout = props => {
  const { route } = props;

  const timer = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    timer.current = setTimeout(() => {
      dispatch(showToastAction('本项目仿网易云音乐开发，使用开源接口，仅供学习交流使用！'));
    }, 600);

    return () => {
      clearTimeout(timer);
      timer.current = null;
    }
  }, []);

  return (
    <>
      {/* 页头 */}
      <Header title="DD音乐" />

      {/* 导航栏 */}
      <NavTab />

      {/* 路由 */}
      { renderRoutes(route.routes)}

      {/* 播放器 */}
      <Player />

      {/* 提示框 */}
      <Toast />
    </>
  )
}

export default memo(HomeLayout)