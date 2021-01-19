import React, { FC, memo, ReactElement } from 'react';

import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import styles from './index.module.scss';
import { IListProps } from '../typing';

const SingerList: FC<IListProps> = ({
  listData
}): ReactElement => {
  return (
    <div className="singer-list">
      {
        listData && listData.map(item => (
          <Link to={`/singers/${item.id}`} className={styles['list-item']} key={item.id}>
            {/* 照片 */}
            <div className={styles['img-wrap']}>
              <LazyLoad
                placeholder={
                  <img
                    src={require('assets/images/singer.png')}
                    width="100%"
                    height="100%"
                    alt="歌手"
                  />
                }
              >
                <img src={item.picUrl + '?param=100x100'} width="100%" height="100%" alt="歌手" />
              </LazyLoad>
            </div>

            {/* 名称 */}
            <p className={styles['name']}>{ item.name }</p>
          </Link>
        ))
      }
    </div>
  );
};

export default memo(SingerList);
