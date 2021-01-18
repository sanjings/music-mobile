import React, { FC, memo, ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { showToastAction } from '../../../store/actions';

import styles from './menu.module.scss';

const AlbumMenu: FC = (): ReactElement => {
  const dispatch = useDispatch();

  return (
    <div className={styles['menu']}>
      <button className={styles['menu-item']} onClick={() => dispatch(showToastAction('暂未开发'))}>
        <i className="iconfont icon-comment"></i>
        <p>评论</p>
      </button>
      <button className={styles['menu-item']} onClick={() => dispatch(showToastAction('暂未开发'))}>
        <i className="iconfont icon-heart"></i>
        <p>点赞</p>
      </button>
      <button className={styles['menu-item']} onClick={() => dispatch(showToastAction('暂未开发'))}>
        <i className="iconfont icon-plus"></i>
        <p>收藏</p>
      </button>
      <button className={styles['menu-item']} onClick={() => dispatch(showToastAction('暂未开发'))}>
        <i className="iconfont icon-more"></i>
        <p>更多</p>
      </button>
    </div>
  );
};

export default memo(AlbumMenu);
