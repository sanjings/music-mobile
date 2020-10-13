import React, { memo, useEffect, useRef } from 'react'
import classnames from 'classnames'

import Scroll from '../../../components/Scroll'

import styles from './index.module.scss'

const Tab = props => {
  const { currentType, listData } = props;

  const { handleClick } = props;

  const listRef = useRef(null);

  /**
   * 动态设置list的宽度
   */
  useEffect(() => {
    if (listData.length) {
      const listDom = listRef.current,
            itemsDom = listDom.querySelectorAll("li");

      let width = 0;
      Array.from(itemsDom).forEach(el => {
        width += el.offsetWidth;
      })
      listDom.style.width = width + 'px'
    }
  }, [listData])

  /**
   * item点击事件
   * @param {Event} e 
   */
  const clickHandle = (e) => {
    const target = e.target,
          itemValue = target.dataset.value;

    itemValue != undefined && handleClick(itemValue)
  }

  return (
    <Scroll direction="horizontal">
      <ul className={styles['tab-list']} ref={listRef} onClick={clickHandle}>
        {
          listData.map(item => (
            <li
              className={classnames(styles['list-item'], currentType === item.key && styles['actived'])}
              key={item.key}
              data-value={item.key}
            >
              { item.name}
            </li>
          ))
        }
      </ul>
    </Scroll>
  )
}

export default memo(Tab)