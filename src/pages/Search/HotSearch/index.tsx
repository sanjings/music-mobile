import React, { FC, memo, MouseEvent, ReactElement } from 'react';

import styles from './index.module.scss';
import { IHotKey, IHotProps } from '../typing';

const HotSearch: FC<IHotProps> = ({ 
  listData, 
  onItemClick 
}): ReactElement => {
  /**
   * item点击事件
   * @param e
   */
  const handleItemClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const value = target.dataset.value;
    value && onItemClick(value);
  };

  return (
    <div className={styles['hot-search']}>
      <h1 className={styles['title']}>热门搜索</h1>
      <ul className={styles['list']} onClick={handleItemClick}>
        {listData.map((item: IHotKey, index: number) => (
          <li className={styles['list-item']} key={index} data-value={item.first}>
            { item.first }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(HotSearch);
