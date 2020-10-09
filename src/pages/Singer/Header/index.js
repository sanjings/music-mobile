import React, { memo, forwardRef } from 'react';

import styles from './index.module.scss'

const AlbumHeader = forwardRef((props, ref) => {
   const { title } = props;

   const { clickBack } = props;

   return (
      <header className={styles['header']} ref={ref}>
         <i className="iconfont icon-leftarrow" onClick={ clickBack }></i>
         <h1>{ title }</h1>
      </header>
   )
})

export default memo(AlbumHeader)