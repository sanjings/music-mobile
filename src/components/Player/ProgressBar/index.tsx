import React, { 
  FC, 
  memo, 
  useState, 
  useRef, 
  useEffect, 
  ReactElement, 
  TouchEvent, 
  MouseEvent 
} from 'react';

import styles from './index.module.scss';
import { IProgressBarProps, IProgressTouchInfo } from '../typing';

const progressBtnWidth: number = 16;

const ProgressBar: FC<IProgressBarProps> = ({
  percent = 0,
  onChange
}): ReactElement => {
  const [touchInfo, setTouchInfo] = useState<IProgressTouchInfo>({
    initiated: false,
    startX: 0,
    left: 0
  });
  const [barWidth, setBarWidth] = useState<number>(0);

  const barRef = useRef<HTMLDivElement>(null),
        progressRef = useRef<HTMLDivElement>(null),
        progressBtnRef = useRef<HTMLSpanElement>(null);

  /**
   * 获取进度条容器的物理宽度并保存
   */
  useEffect((): void => {
    setBarWidth(barRef.current!.clientWidth);
  }, []);

  /**
   * 计算已完成进度的宽度
   */
  useEffect((): void => {
    if (!barWidth) return;

    if (percent >= 0 && percent <= 1 && !touchInfo.initiated) {
      const offsetWidth: number = (barWidth - progressBtnWidth) * percent;
      _offset(offsetWidth);
    }
  }, [percent, barWidth]);

  /**
   * 根据点击时的偏移值，计算进度百分比，并执行onChange回调
   */
  const _changePercent = (): void => {
    const progressDom = progressRef.current,
          curPercent: number = progressDom!.clientWidth / (barWidth - progressBtnWidth);

    onChange(curPercent);
  };

  /**
   * 设置已完成进度条和按钮的偏移值样式
   * @param offsetWidth
   */
  const _offset = (offsetWidth: number): void => {
    const progressDom = progressRef.current,
          progressBtnDom = progressBtnRef.current;

    if (offsetWidth < 0) {
      offsetWidth = 0;
    } else if (offsetWidth >= barWidth - progressBtnWidth) {
      offsetWidth = barWidth - progressBtnWidth;
    }

    progressDom!.style.width = `${offsetWidth}px`;
    progressBtnDom!.style.left = `${offsetWidth}px`;
  };

  /**
   * 按钮touchStart事件
   * @param {Event} e
   */
  const handleTouchStart = (e: TouchEvent): void => {
    const progressDom = progressRef.current;

    setTouchInfo({
      initiated: true,
      startX: e.touches[0].pageX,
      left: progressDom!.clientWidth
    });
  };

  /**
   * 按钮touchMove事件
   * @param {Event} e
   */
  const handleTouchMove = (e: TouchEvent): void => {
    if (!touchInfo.initiated) return;
    const scrollX: number = e.touches[0].pageX - touchInfo.startX,
          offsetWidth: number = Math.min(Math.max(0, touchInfo.left + scrollX), barWidth);

    _offset(offsetWidth);
  };

  /**
   * 按钮touchEnd事件
   */
  const handleTouchEnd = (): void => {
    setTouchInfo(preTouchInfo => ({
      ...preTouchInfo,
      initiated: false
    }));
    _changePercent();
  };

  /**
   * 点击切换进度
   * @param {Event} e
   */
  const handleClick = (e: MouseEvent): void => {
    e.stopPropagation();
    const offsetLeft: number = barRef.current!.offsetLeft;
    const offsetWidth: number = e.pageX - offsetLeft;
    _offset(offsetWidth);
    _changePercent();
  };

  return (
    <div className={styles['progress-wrap']}>
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

export default memo(ProgressBar);
