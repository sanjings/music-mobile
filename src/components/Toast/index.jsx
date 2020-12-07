import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { hideToastAction } from '@/store/actions';

import styles from './index.module.scss';

const Toast = () => {
  const { showToast, toastText } = useSelector(state => ({
    showToast: state.global.showToast,
    toastText: state.global.toastText,
  }));

  const dispatch = useDispatch();

  const hideToast = e => {
    e.stopPropagation();
    dispatch(hideToastAction());
  }

  return (
    <CSSTransition in={showToast} timeout={300} classNames="drop" unmountOnExit>
      <div className={styles['toast-wrap']}>
        <div className={styles['mask']} onClick={ hideToast }></div>
        <p className={styles['toast-label']}>{ toastText }</p>
      </div>
    </CSSTransition>
  )
}

export default memo(Toast)