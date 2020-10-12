import React, { memo } from 'react';
import { Link } from 'react-router-dom'

import styles from './index.module.scss'

const Header = props => {
  const { title } = props;

  return (
    <header className={styles['header']}>
      <div className={styles['menu']} onClick={() => alert('暂未开发')}>
        <i className="iconfont icon-menu"></i>
      </div>

      <h1 className={styles['title']}>{title}</h1>

      <Link to="/search" className={styles['search']}>
        <i className="iconfont icon-search"></i>
      </Link>
    </header>
  )
}

export default memo(Header)