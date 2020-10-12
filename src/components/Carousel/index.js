import React, { memo, useState, useEffect } from 'react';
import classnames from 'classnames'
import Swiper from 'swiper'

import 'swiper/css/swiper.min.css';
import styles from './index.module.scss'

const Carousel = props => {
  const { banners } = props

  const [swiper, setSwiper] = useState(null)

  /**
   * 初始化swiper组件
   */
  useEffect(() => {
    if (banners.length && !swiper) {
      const newSwiper = new Swiper('.swiper-container', {
        speed: 1200,
        autoplay: {
          delay: 3000, // 3秒切换一次
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true
      })

      setSwiper(newSwiper)
    }
  }, [banners, swiper])

  return (
    <div className={styles['carousel']}>
      <div className={classnames('swiper-container', styles['swiper-container'])}>
        <div className="swiper-wrapper">
          {
            banners.map(item => {
              return (
                <ul className="swiper-slide" key={item.bannerId}>
                  <li className={classnames('slider-item', styles['slider-item'])}>
                    <img src={item.pic} width="100%" height="100%" alt="推荐" />
                  </li>
                </ul>
              );
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  )
}

export default memo(Carousel)