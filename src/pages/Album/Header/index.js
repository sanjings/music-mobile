import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types'

import styles from './index.module.scss'

const AlbumHeader = forwardRef((props, ref) => {
  const { title, isTitleMarquee } = props;

  const { onClickBack } = props;

  return (
    <header className={styles['header']} ref={ref}>
      <div className={styles['back']}>
        <i className="iconfont icon-leftarrow" onClick={onClickBack}></i>
      </div>
      {
        isTitleMarquee
          ?
          <marquee><h1>{title}</h1></marquee>
          :
          <h1>{title}</h1>}
    </header>
  )
})

AlbumHeader.propTypes = {
  title: PropTypes.string,
  isTitleMarquee: PropTypes.bool,
  onClickBack: PropTypes.func
}

export default memo(AlbumHeader)