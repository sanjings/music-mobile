import React, { FC, memo, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import Cover from '../Cover';
import { IRankItem, IRankListProps } from '../typing';

import styles from './index.module.scss';

const GlobalList: FC<IRankListProps> = ({ 
  listData 
}): ReactElement => {
  return (
    <div className={styles['global-list']}>
      {
        listData && listData.map((item: IRankItem) => (
          <Link to={`/rank/${item.id}`} className={styles['list-item']} key={item.id}>
            <Cover coverImgUrl={item.coverImgUrl} updateFrequency={item.updateFrequency} />
          </Link>
        ))
      }
    </div>
  );
};

export default memo(GlobalList);
