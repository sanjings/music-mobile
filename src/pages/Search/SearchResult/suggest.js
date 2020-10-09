import React, { memo } from "react"

import { Link } from 'react-router-dom'
import LazyLoad from "react-lazyload";

import styles from './suggest.module.scss'

const suggest = props => {
  const { listData, type } = props

  return (
    <div className={styles['suggest']}>
      <h1 className={styles['title']}>相关{type}</h1>
      <div className={styles['list']}>
        {
          listData.map(item => (
            <Link
              to={`${type === '歌手' ? '/singers' : '/album'}/${item.id}`} 
              key={item.id} 
              className={styles['item']}
            >
              <div className={styles['img-wrapper']}>
                <LazyLoad placeholder={<img src={require('../../../assets/images/music.png')} height="100%" alt="cover" />}>
                  <img src={type === '歌手' ? item.picUrl : item.coverImgUrl} alt="cover" />
                </LazyLoad>
              </div>
              <div className={styles['item-desc']}>{item.name}</div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default memo(suggest)