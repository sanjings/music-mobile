import React, { FC, memo, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showToastAction } from '../../store/actions';
import styles from './index.module.scss';
import { IProps } from './typing';

const Header: FC<IProps> = ({
  title = '云音乐'
}): ReactElement => {
  const dispatch = useDispatch();

  return (
    <header className={styles['header']}>
      <div className={styles['menu']} onClick={() => dispatch(showToastAction())}>
        <i className="iconfont icon-menu"></i>
      </div>

      <h1 className={styles['title']}>{ title }</h1>

      <Link to="/search" className={styles['search']}>
        <i className="iconfont icon-search"></i>
      </Link>
    </header>
  );
};

export default memo(Header);
