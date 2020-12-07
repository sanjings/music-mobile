import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ListItem from './item';

import styles from './index.module.scss';

const RecommendList = props => {
  const { listData } = props;

  return (
    <div className={styles['recom-list']}>
      {
        listData.map(item => (
          <ListItem itemData={item} key={item.id} />
        ))
      }
    </div>
  )
}

RecommendList.defaultProps = {
  listData: []
}

RecommendList.propTypes = {
  listData: PropTypes.array
}



export default memo(RecommendList)