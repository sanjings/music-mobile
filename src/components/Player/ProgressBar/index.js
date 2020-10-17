import React, { memo, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types'

import styles from './index.module.scss'

const ProgressBar = props => {
  const { percent } = props

  const { onChange } = props

  const [touchInfo, setTouchInfo] = useState({}),
        [barWidth, setBarWidth] = useState();

  const progressBtnWidth = 16;

  const barRef = useRef(),
        progressRef = useRef(),
        progressBtnRef = useRef();

  /**
   * 获取进度条容器的物理宽度并保存
   */
  useEffect(() => {
    setBarWidth(barRef.current.clientWidth)
  }, [])

  /**
   * 计算已完成进度的宽度
   */
  useEffect(() => {
    if (!barWidth) return ;

    if (percent >= 0 && percent <= 1 && !touchInfo.initiated) {
      const offsetWidth = (barWidth - progressBtnWidth) * percent;
      _offset(offsetWidth)
    }
  }, [percent, barWidth]);

  /**
   * 根据点击时的偏移值，计算进度百分比，并执行onChange回调
   */
  const _changePercent = () => {
    const progressDom = progressRef.current,
          curPercent = progressDom.clientWidth / (barWidth - progressBtnWidth);
          

    onChange(curPercent)
  }

  /**
   * 设置已完成进度条和按钮的偏移值样式
   * @param {Number} offsetWidth 
   */
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

  /**
   * 按钮touchStart事件
   * @param {Event} e 
   */
  const handleTouchStart = e => {
    const progressDom = progressRef.current;

    const startTouch = {
      initiated: true,
      startX: e.touches[0].pageX,
      left: progressDom.clientWidth
    }

    setTouchInfo(startTouch)
  }

  /**
   * 按钮touchMove事件
   * @param {Event} e 
   */
  const handleTouchMove = e => {
    if (!touchInfo.initiated) return;
    const scrollX = e.touches[0].pageX - touchInfo.startX,
          offsetWidth = Math.min(Math.max(0, touchInfo.left + scrollX), barWidth);

    _offset (offsetWidth);
  }

  /**
   * 按钮touchEnd事件
   * @param {Event} e 
   */
  const handleTouchEnd = e => {
    setTouchInfo({
      ...touchInfo,
      initiated: false
    })
    _changePercent()
  }

  /**
   * 点击切换进度
   * @param {Event} e 
   */
  const handleClick = e => {
    e.stopPropagation()
    const offsetLeft = barRef.current.offsetLeft;
    const offsetWidth = e.pageX - offsetLeft;
    _offset(offsetWidth);
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

ProgressBar.defaultProps = {
  percent: 0,
  onChange: () => {}
}

ProgressBar.propTypes = {
  percent: PropTypes.number,
  onChange: PropTypes.func
}

export default memo(ProgressBar)