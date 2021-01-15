import React, { FC, memo, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { IStoreState } from '../../store';

import { hideToastAction } from '../../store/actions';

import styles from './index.module.scss';

const Toast: FC = (): ReactElement => {
  const { showToast, toastText } = useSelector((state: IStoreState) => ({
    showToast: state.global.showToast,
    toastText: state.global.toastText
  }));

  const dispatch = useDispatch();

  const hideToast = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(hideToastAction());
  };

  return (
    <CSSTransition in={showToast} timeout={200} classNames="drop" unmountOnExit>
      <div className={styles['toast-wrap']}>
        <div className={styles['mask']} onClick={hideToast}></div>
        <p className={styles['toast-label']}>{toastText}</p>
      </div>
    </CSSTransition>
  );
};

export default memo(Toast);
