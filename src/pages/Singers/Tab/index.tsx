import React, { FC, memo, MouseEvent, ReactElement, useEffect, useRef } from 'react';
import classnames from 'classnames';

import Scroll from 'components/Scroll';

import styles from './index.module.scss';
import { ITabProps } from '../typing';

const Tab: FC<ITabProps> = ({ 
  currentType, 
  listData, 
  onItemClick 
}): ReactElement => {
  const listRef = useRef<HTMLUListElement>(null);

  /**
   * 动态设置list的宽度
   */
  useEffect((): void => {
    if (listData.length) {
      const listDom = listRef.current,
        itemsDom = listDom!.querySelectorAll('li');

      let width: number = 0;
      Array.from(itemsDom).forEach(el => {
        width += el.offsetWidth;
      });
      listDom!.style.width = width + 'px';
    }
  }, [listData]);

  /**
   * item点击事件
   * @param {Event} e
   */
  const handleClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement,
          itemValue = target.dataset.value;

    itemValue !== undefined && onItemClick(itemValue);
  };

  return (
    <Scroll direction="horizontal">
      <ul className={styles['tab-list']} ref={listRef} onClick={handleClick}>
        {
          listData && listData.map(item => (
            <li
              className={classnames(styles['list-item'],currentType === item.key && styles['actived'])}
              key={item.key}
              data-value={item.key}
            >
              { item.name }
            </li>
          ))
        }
      </ul>
    </Scroll>
  );
};

export default memo(Tab);
