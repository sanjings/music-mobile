import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showToastAction } from '@/store/actions';
import styles from './index.module.scss';

const Header = props => {
  const { title } = props;

  const dispatch = useDispatch();

  return (
    <header className={styles['header']}>
      <div className={styles['menu']} onClick={() => dispatch(showToastAction())}>
        <i className="iconfont icon-menu"></i>
      </div>

      <h1 className={styles['title']}>{title}</h1>

      <Link to="/search" className={styles['search']}>
        <i className="iconfont icon-search"></i>
      </Link>
    </header>
  )
}

Header.defaultProps = {
  title: 'DD音乐台'
}

Header.propTypes = {
  title: PropTypes.string
}

export default memo(Header)