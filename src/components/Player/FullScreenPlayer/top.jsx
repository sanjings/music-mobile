import React, { memo } from "react";
import PropTypes from 'prop-types';

import styles from './top.module.scss';

const Top = props => {
  const { songName, singerName } = props;

  const { toggleFullScreen } = props;

  return (
    <div className={styles['top']}>
      <div className={styles['back']} onClick={() => toggleFullScreen(false)}>
        <i className="iconfont icon-downarrow"></i>
      </div>
      <div className={styles['song-info']}>
        <p className={styles['song-name']}>{ songName }</p>
        <p className={styles['singer-name']}>{ singerName }</p>
      </div>
    </div>
  )
}

Top.propTypes = {
  songName: PropTypes.string,
  singerName: PropTypes.string,
  toggleFullScreen: PropTypes.func
}

export default memo(Top)