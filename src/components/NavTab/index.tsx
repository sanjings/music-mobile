import React, { FC, memo, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './index.module.scss';

const NavTab: FC = (): ReactElement => {
  return (
    <nav className={styles['nav-tab']}>
      <NavLink to="/recommend" activeClassName={styles['actived']}>
        <span>推荐</span>
      </NavLink>
      <NavLink to="/singers" activeClassName={styles['actived']}>
        <span>歌手</span>
      </NavLink>
      <NavLink to="/rank" activeClassName={styles['actived']}>
        <span>排行榜</span>
      </NavLink>
    </nav>
  );
};

export default memo(NavTab);
