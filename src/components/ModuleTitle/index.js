import React, { memo} from 'react';

import classnames from 'classnames'

import styles from './index.module.scss'

const ModuleTitle = props => {
   const { title, symbol } = props;

   return (
      <div className={styles['title']}>
         <h1 className={classnames([styles['title-text'], symbol && styles['symbol']])}>{ title }</h1>
      </div>
   )
}

ModuleTitle.defaultProps = {
   size: 'default'
}

export default memo(ModuleTitle)