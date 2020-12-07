import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Cover from "../Cover";

import styles from './item.module.scss';

const ListItem = props => {
  const { itemData: { id, coverImgUrl, updateFrequency, tracks } } = props;

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
              <span>{index + 1}.</span>
              <span>{item.first}</span>
              <span> - </span>
              <span>{item.second}</span>
            </li>
          ))
        }
      </ul>
    </Link>
  )
}

ListItem.propTypes = {
  itemData: PropTypes.object
}


export default memo(ListItem)