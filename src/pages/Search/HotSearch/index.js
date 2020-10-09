import React, { memo } from "react"

import styles from './index.module.scss'

const HotSearch = props => {
  const { listData } = props

  const { onItemClick } = props

  /**
   * item点击事件
   * @param {Event} e 
   */
  const handleItemClick = (e) => {
    const value = e.target.dataset.value
    value && onItemClick(value)
  }

  return (
    <div className={styles['hot-search']}>
      <h1 className={styles['title']}>热门搜索</h1>
      <ul className={styles['list']} onClick={handleItemClick}>
        {
          listData.map((item, index) => (
            <li 
              className={styles['list-item']} 
              key={index}
              data-value={item.first}
            >
              {item.first}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default memo(HotSearch)

