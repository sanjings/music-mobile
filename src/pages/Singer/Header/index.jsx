import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const SingerHeader = forwardRef((props, ref) => {
  const { title } = props;

  const { onClickBack } = props;

  return (
    <header className={styles['header']} ref={ref}>
      <i className="iconfont icon-leftarrow" onClick={onClickBack}></i>
      <h1>{ title }</h1>
    </header>
  )
})

SingerHeader.propTypes = {
  title: PropTypes.string,
  onClickBack: PropTypes.func
}

export default memo(SingerHeader)