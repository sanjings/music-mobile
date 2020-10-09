import React, { memo, useState, useRef, useEffect, useMemo } from 'react';

import { debounce } from '../../../utils/tools'

import styles from './index.module.scss'

const ProgressBar = props => {
  const { percent } = props

  const { onChange } = props

  const [touch, setTouch] = useState({}),
        [barWidth, setBarWidth] = useState();

  const progressBtnWidth = 16;

  const barRef = useRef(),
        progressRef = useRef(),
        progressBtnRef = useRef();

  const _changePercent = () => {
    const progressDom = progressRef.current;

    const curPercent = progressDom.clientWidth / (barWidth - progressBtnWidth);

    onChange(curPercent)
  }

  useEffect(() => {
    setBarWidth(barRef.current.clientWidth)
  }, [])

  useEffect(() => {
    if (!barWidth) return ;

    const offsetWidth = barWidth * percent
    _offset(offsetWidth)
  }, [percent, barWidth]);

  const _offset = offsetWidth => {
    const progressDom = progressRef.current,
          progressBtnDom = progressBtnRef.current;

    if (offsetWidth < 0) {
      offsetWidth = 0
    } else if (offsetWidth >= barWidth - progressBtnWidth) {
      offsetWidth = barWidth - progressBtnWidth
    }
    progressDom.style.width = `${offsetWidth}px`;
    progressBtnDom.style.left = `${offsetWidth}px`;
  }

  const handleTouchStart = e => {
    const progressDom = progressRef.current;

    const startTouch = {
      initiated: true,
      startX: e.touches[0].pageX,
      left: progressDom.clientWidth
    }

    setTouch(startTouch)
  }

  const handleTouchMove = e => {
    if (!touch.initiated) return;
    const scrollX = e.touches[0].pageX - touch.startX,
          offsetWidth = Math.min(Math.max(0, touch.left + scrollX), barWidth);

    _offset (offsetWidth);
  }

  const handleTouchEnd = e => {
    setTouch({
      ...touch,
      initiated: false
    })
    _changePercent()
  }

  const handleClick = e => {
    const offsetLeft = barRef.current.offsetLeft;
    const offsetWidth = e.pageX - offsetLeft - (progressBtnWidth / 2);
    _offset (offsetWidth);
    _changePercent()
  }

  return (
    <div className={styles['progress-wrapper']}>
      <div className={styles['bar-inner']} ref={barRef} onClick={handleClick}>
        <div className={styles['progress']} ref={progressRef}></div>
        <span
          ref={progressBtnRef} 
          className={styles['progress-btn']}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        ></span>
      </div>
    </div>
  );
};

export default memo(ProgressBar)