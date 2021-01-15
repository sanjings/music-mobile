import React, { memo, useState, useEffect, FC, ReactElement } from 'react';
import classnames from 'classnames';
import Swiper from 'swiper';

import 'swiper/css/swiper.min.css';
import styles from './index.module.scss';
import { IProps } from './typing';

const Carousel: FC<IProps> = ({
  banners = []
}): ReactElement => {
  const [swiper, setSwiper] = useState<Swiper | null>(null);

  /**
   * 初始化swiper组件
   */
  useEffect((): void => {
    if (banners.length && !swiper) {
      const swiperInstance = new Swiper('.swiper-container', {
        speed: 1200,
        autoplay: {
          delay: 3000, // 3秒切换一次
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true
      });

      setSwiper(swiperInstance);
    }
  }, [banners, swiper]);

  return (
    <div className={styles['carousel']}>
      <div className={classnames('swiper-container', styles['swiper-container'])}>
        <div className="swiper-wrapper">
          {banners.map(item => {
            return (
              <ul className="swiper-slide" key={item.bannerId}>
                <li className={classnames('slider-item', styles['slider-item'])}>
                  <img src={item.pic} width="100%" height="100%" alt="推荐" />
                </li>
              </ul>
            );
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default memo(Carousel);
