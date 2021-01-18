import React, { FC, memo, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import styles from './suggest.module.scss';
import { ISuggestAlbum, ISuggestProps } from '../typing';
import { ISinger } from '../../../typings';

const suggest: FC<ISuggestProps> = ({ 
  listData, 
  type = '歌手' 
}): ReactElement => {
  return (
    <div className={styles['suggest']}>
      <h1 className={styles['title']}>相关{ type }</h1>
      <div className={styles['list']}>
        {
          listData && listData.map((item: any) => (
            <Link
              to={`${type === '歌手' ? '/singers' : '/album'}/${item.id}`}
              key={item.id}
              className={styles['item']}
            >
              <div className={styles['img-wrap']}>
                <LazyLoad
                  placeholder={
                    <img
                      src={require('assets/images/music.png')}
                      width="100%"
                      height="100%"
                      alt="cover"
                    />
                  }
                >
                  <img src={type === '歌手' ? item.picUrl : item.coverImgUrl} alt="cover" />
                </LazyLoad>
              </div>
              <div className={styles['item-desc']}>{ item.name }</div>
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default memo(suggest);
