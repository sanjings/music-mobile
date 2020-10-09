import React, { memo } from 'react';

import { Link } from 'react-router-dom';

import Cover from "../Cover"

import styles from './item.module.scss'

const ListItem = props => {
   const { itemData } = props,
         { id, coverImgUrl, updateFrequency, tracks } = itemData;

   return (
      <Link to={`/rank/${id}`} className={styles['list-item']}>
         {/* 榜单封面 */}
         <div className={styles['cover']}>
            <Cover 
               coverImgUrl={coverImgUrl}
               updateFrequency={updateFrequency} 
            />
         </div>

         {/* 歌曲列表 */}
         <ul className={styles['song-list']}>
            {
               tracks.map((item, index) => (
                  <li className={styles['song-item']} key={index}>
                     <span>{ index + 1 }.</span>
                     <span>{ item.first }</span>
                     <span> - </span>
                     <span>{ item.second }</span>
                  </li>
               ))
            }
         </ul>
      </Link>
   )
}


export default memo(ListItem)