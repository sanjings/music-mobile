import React, { FC, memo, ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import ListItem from './item';
import ListMenu from './menu';

import { deepClone } from 'utils/tools';
import { actions } from '../Player/store';

import styles from './index.module.scss';
import { IProps } from './typing';

const { changeCurrentIndexAction, changePlayListAction } = actions;

const SongList: FC<IProps> = ({
  listData = [],
  showIndex = true,
  showMenu = false,
  showCollect = false,
  showPlay = true,
  subscribedCount = 0
}): ReactElement => {
  const dispatch = useDispatch();

  const handleClickPlay = (index: number): void => {
    dispatch(changePlayListAction(deepClone(listData)));
    dispatch(changeCurrentIndexAction(index));
  };

  const handlePlayAll = (): void => {
    dispatch(changePlayListAction(deepClone(listData)));
    dispatch(changeCurrentIndexAction(0));
  };

  return (
    <div className={styles['song-list']}>
      {/* 列表菜单 */}
      {showMenu && (
        <ListMenu
          songCount={listData.length}
          showCollect={showCollect}
          subscribedCount={subscribedCount}
          onClickPlayAll={handlePlayAll}
        />
      )}

      {/* 歌曲列表 */}
      <ul className={styles['list-wrap']}>
        {listData.map((item, index) => {
          return (
            <ListItem
              itemData={item}
              key={item.id}
              showPlay={showPlay}
              showIndex={showIndex}
              index={index}
              onClickPlay={handleClickPlay}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default memo(SongList);
