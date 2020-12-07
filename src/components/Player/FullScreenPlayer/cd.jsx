import React, { memo, forwardRef } from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './cd.module.scss';

const CD = forwardRef((props, ref) => {
  const { show, picUrl, playingStatus, currentPlayingLyric } = props;

  const { toggleCd } = props;

  return (
    <div
      style={{display: show ? 'flex' : 'none'}} 
      className={styles['cd-wrap']} 
      ref={ref} 
      onClick={() => toggleCd(false)}
    >
      <div className={classnames(styles['needle'], !playingStatus && styles['pause'])}></div>
      <div className={classnames(styles['cd-cover'], !playingStatus && styles['pause'])}>
        <img src={ picUrl + '?param=400x400' } className={styles['img-cover']} alt="cover" />
      </div>
      <p className={styles['lyrics']}>{ currentPlayingLyric }</p>
    </div>
  )
})

CD.defaultProps = {
  show: true
}

CD.propTypes = {
  show: PropTypes.bool,
  picUrl: PropTypes.string,
  toggleCd: PropTypes.func
}

export default memo(CD)