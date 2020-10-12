import React, { memo } from 'react';

import ListItem from './item'

import styles from './index.module.scss'

const OfficialList = (props) => {
  const { listData } = props

  return (
    <div className={styles['official-list']}>
      {
        listData.map(item => (
          <ListItem itemData={item} key={item.coverImgId} />
        ))
      }
    </div>
  )
}

export default memo(OfficialList)