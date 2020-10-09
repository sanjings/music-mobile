import React, { memo } from 'react';

import { Link } from 'react-router-dom';

import Cover from '../Cover'

import styles from './index.module.scss'

const GlobalList = props => {
   const { listData } = props;

   return (
      <div className={styles['global-list']}>
         {
            listData.map(item => (
               <Link to={`/rank/${item.id}`} className={styles['list-item']} key={item.id}>
                  <Cover 
                     coverImgUrl={item.coverImgUrl}
                     updateFrequency={item.updateFrequency}
                  />
               </Link>
            ))
         }
      </div>
   )
}

export default memo(GlobalList)