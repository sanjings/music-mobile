import React, { FC, memo, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { IRankItem, IRankListProps, IRankTrack } from '../typing';

import Cover from "../Cover";

import styles from './index.module.scss';

const OfficialList: FC<IRankListProps> = ({
  listData
}): ReactElement => {
  return (
    <div className={styles['official-list']}>
      {
        listData && listData.map((item: IRankItem) => (
          <Link to={`/rank/${item.id}`} className={styles['list-item']} key={item.id}>
            {/* 榜单封面 */}
            <div className={styles['cover']}>
              <Cover coverImgUrl={item.coverImgUrl} updateFrequency={item.updateFrequency} />
            </div>

            {/* 歌曲列表 */}
            <ul className={styles['song-list']}>
              {item.tracks && item.tracks.map((cur: IRankTrack, index: number) => (
                <li className={styles['song-item']} key={index}>
                  <span>{ index + 1 }.</span>
                  <span>{ cur.first }</span>
                  <span> - </span>
                  <span>{ cur.second }</span>
                </li>
              ))}
            </ul>
          </Link>
        ))
      }
    </div>
  );
};

export default memo(OfficialList);
