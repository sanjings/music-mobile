import React, { memo } from 'react';

import { Link } from 'react-router-dom';
import LazyLoad from "react-lazyload";
import classnames from 'classnames'

import { formatCount } from '../../../utils/filters'

import styles from './item.module.scss'

const ListItem = props => {
   const { itemData } = props,
         { id, picUrl, playCount, name } = itemData;

   return (
      <Link to={`/recommend/${id}`} className={styles['list-item']}>
         {/* 封面图片 */}
         <div className={styles['img-wrapper']}>
            {/* 点击量 */}
            <div className={styles['play-count']}>
               <i className="iconfont icon-headset"></i>
               <span className={styles['count']}>{ formatCount(playCount) }</span>
            </div>
            <LazyLoad once placeholder={<img width="100%" height="100%" src={require('../../../assets/images/music.png')} alt="music"/> }>
               <img src={picUrl} width="100%" height="100%" alt="歌单封面" />
            </LazyLoad>
         </div>

         {/* 歌单描述 */}
         <p className={classnames('row-ellipsis', styles['desc'])}>{ name }</p>
      </Link>
   )
}


export default memo(ListItem)