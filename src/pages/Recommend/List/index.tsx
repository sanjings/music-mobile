import React, { FC, memo, ReactElement } from 'react';

import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import classnames from 'classnames';

import { formatCount } from '../../../utils/formats';

import styles from './index.module.scss';
import { IRecomListProps } from '../typing';

const RecommendList: FC<IRecomListProps> = ({
  listData
}): ReactElement => {
  return (
    <div className={styles['recom-list']}>
      {listData && listData.map(item => (
        <Link to={`/recommend/${item.id}`} className={styles['list-item']} key={item.id}>
          {/* 封面图片 */}
          <div className={styles['img-wrap']}>
            {/* 点击量 */}
            <div className={styles['play-count']}>
              <i className="iconfont icon-headset"></i>
              <span className={styles['count']}>{ formatCount(item.playCount) }</span>
            </div>
            <LazyLoad
              placeholder={
                <img
                  width="100%"
                  height="100%"
                  src={require('assets/images/music.png')}
                  alt="music"
                />
              }
            >
              <img src={item.picUrl} width="100%" height="100%" alt="歌单封面" />
            </LazyLoad>
          </div>

          {/* 歌单描述 */}
          <p className={classnames('row-ellipsis', styles['desc'])}>{ item.name }</p>
        </Link>
      ))}
    </div>
  );
};

export default memo(RecommendList);
