import React, { memo } from 'react';
import { useDispatch } from 'react-redux'

import ListItem from './item'
import ListMenu from './menu'

import { actions } from '../Player/store'

import styles from './index.module.scss'

const  { changeCurrentIndexAction, changePlayListAction, changeSequencePlayListAction } = actions

const SongList = props => {
  const {
    listData,
    showIndex,
    showMenu,
    showCollect,
    showPlay,
    subscribedCount
  } = props;

  const dispatch = useDispatch()

  const handleClickPlay = index => {
    dispatch(changePlayListAction(listData))
    dispatch(changeSequencePlayListAction(listData))
    dispatch(changeCurrentIndexAction(index))
  }

  return (
    <div className={styles['song-list']}>
      {/* 列表菜单 */}
      {
        showMenu
        &&
        <ListMenu
          songCount={listData.length}
          showCollect={showCollect}
          subscribedCount={subscribedCount}
        />
      }

      {/* 歌曲列表 */}
      <ul className={styles['list-wrapper']} >
        {
          listData.map((item, index) => {
            return (
              <ListItem 
                itemData={item} 
                key={item.id}
                showPlay={showPlay}
                showIndex={showIndex} 
                index={index}
                onClickPlay={handleClickPlay}
              />
            )
          })
        }
      </ul>
    </div>
  )
}

SongList.defaultProps = {
  showIndex: true,
  showCollect: false,
  showPlay: true
};

export default memo(SongList)