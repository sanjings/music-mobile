import React, { memo } from 'react';

import ListItem from './item'

const SingerList = props => {
  const { listData } = props

  return (
    <div className="singer-list">
      {
        listData.map(item => (
          <ListItem itemData={item} key={item.id}></ListItem>
        ))
      }
    </div>
  )

}

export default memo(SingerList)