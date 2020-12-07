import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { formatCount } from 'utils/formats';

import styles from './menu.module.scss';

const ListMenu = props => {
  const { songCount, subscribedCount, showCollect } = props;

  const { onClickPlayAll } = props;

  return (
    <div className={styles['list-menu']}>
      <div className={styles['play-btn']} onClick={onClickPlayAll}>
        <i className="iconfont icon-play-circle"></i>
        <span className={styles['play-text']}>播放全部</span>
        <span className={styles['song-count']}>(共{songCount}首)</span>
      </div>
      {
        showCollect
        &&
        <button className={styles['collect']}>
          <i className="iconfont icon-plus"></i>
          <span className={styles['collect-count']}>收藏({formatCount(subscribedCount)})</span>
        </button>
      }
    </div>
  )
}

ListMenu.defaultProps = {
  songCount: 0
}

ListMenu.propTypes = {
  songCount: PropTypes.number,
  onClickPlayAll: PropTypes.func
}

export default memo(ListMenu)