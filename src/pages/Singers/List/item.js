import React, { memo } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'

import styles from './item.module.scss'

const ListItem = props => {
  const { itemData } = props,
        { id, name, picUrl } = itemData;

  return (
    <Link to={`/singers/${id}`} className={styles['list-item']}>
      {/* 照片 */}
      <div className={styles['img-wrapper']}>
        <LazyLoad 
          placeholder={<img src={require('../../../assets/images/singer.png')} width="100%" height="100%" alt="歌手" />}
        >
          <img src={picUrl + '?param=100x100'} width="100%" height="100%" alt="歌手" />
        </LazyLoad>
      </div>

      {/* 名称 */}
      <p className={styles['name']}>{name}</p>
    </Link>
  )
}

ListItem.propTypes = {
  itemData: PropTypes.object
}

export default memo(ListItem)