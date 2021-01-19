import React, { FC, memo, ReactElement, useEffect, useRef } from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { useDispatch } from 'react-redux';

import Header from 'components/Header';
import NavTab from 'components/NavTab';
import Player from 'components/Player';
import Toast from 'components/Toast';

import { showToastAction } from '@/store/actions';

const HomeLayout: FC<RouteConfigComponentProps> = ({
  route
}): ReactElement => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    timer.current = setTimeout(() => {
      dispatch(
        showToastAction('本项目仿网易云音乐开发，使用开源接口，仅供学习交流使用！网易云音乐官方网址: music.163.com')
      );
    }, 600);

    return () => {
      clearTimeout(Number(timer));
      timer.current = null;
    };
  }, []);

  return (
    <>
      {/* 页头 */}
      <Header title="云音乐" />

      {/* 导航栏 */}
      <NavTab />

      {/* 路由 */}
      {renderRoutes(route?.routes)}

      {/* 播放器 */}
      <Player />

      {/* 提示框 */}
      <Toast />
    </>
  );
};

export default memo(HomeLayout);
