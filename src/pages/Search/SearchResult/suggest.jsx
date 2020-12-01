import React, { memo } from "react"
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LazyLoad from "react-lazyload";

import styles from './suggest.module.scss'

const suggest = props => {
  const { listData, type } = props

  return (
    <div className={styles['suggest']}>
      <h1 className={styles['title']}>相关{ type }</h1>
      <div className={styles['list']}>
        {
          listData.map(item => (
            <Link
              to={`${type === '歌手' ? '/singers' : '/album'}/${item.id}`} 
              key={item.id} 
              className={styles['item']}
            >
              <div className={styles['img-wrap']}>
                <LazyLoad 
                  placeholder={<img src={require('assets/images/music.png')} width="100%" height="100%" alt="cover" />}
                >
                  <img src={type === '歌手' ? item.picUrl : item.coverImgUrl} alt="cover" />
                </LazyLoad>
              </div>
              <div className={styles['item-desc']}>{ item.name }</div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

suggest.defaultProps = {
  listData: [],
  type: '歌手'
}

suggest.propTypes = {
  listData: PropTypes.array,
  type: PropTypes.oneOf(['歌手', '歌单'])
}

export default memo(suggest)