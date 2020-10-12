import React, { memo, forwardRef } from 'react';

import styles from './index.module.scss'

const AlbumHeader = forwardRef((props, ref) => {
  const { title, isTitleMarquee } = props;

  const { clickBack } = props;

  return (
    <header className={styles['header']} ref={ref}>
      <div className={styles['back']}>
        <i className="iconfont icon-leftarrow" onClick={clickBack}></i>
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

export default memo(AlbumHeader)