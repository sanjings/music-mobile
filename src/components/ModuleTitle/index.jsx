import React, { memo } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './index.module.scss'

const ModuleTitle = props => {
  const { title, symbol } = props;

  return (
    <div className={styles['title']}>
      <h1 className={classnames(styles['title-text'], symbol && styles['symbol'])}>{title}</h1>
    </div>
  )
}

ModuleTitle.defaultProps = {
  symbol: true
}

ModuleTitle.propTypes = {
  size: PropTypes.string,
  symbol: PropTypes.bool
}

export default memo(ModuleTitle)