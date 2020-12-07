import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ListItem from './item';

const SingerList = props => {
  const { listData } = props;

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

SingerList.defaultProps = {
  listData: []
}

SingerList.propTypes = {
  listData: PropTypes.array
}


export default memo(SingerList)