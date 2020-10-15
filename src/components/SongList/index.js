import React, { memo } from 'react';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import ListItem from './item'
import ListMenu from './menu'

import { deepClone } from '../../utils/tools'
import { actions } from '../Player/store'

import styles from './index.module.scss'

const  { changeCurrentIndexAction, changePlayListAction } = actions

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
    dispatch(changePlayListAction(deepClone(listData)))
    dispatch(changeCurrentIndexAction(index))
  }

  const handlePlayAll = () => {
    dispatch(changePlayListAction(deepClone(listData)))
    dispatch(changeCurrentIndexAction(0))
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
          onClickPlayAll={handlePlayAll}
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
  listData: [],
  showIndex: true,
  showMenu: false,
  showCollect: false,
  showPlay: true,
  subscribedCount: 0
};

SongList.propTypes = {
  listData: PropTypes.array,
  showIndex: PropTypes.bool,
  showMenu: PropTypes.bool,
  showCollect: PropTypes.bool,
  showPlay: PropTypes.bool,
  subscribedCount: PropTypes.number
};

export default memo(SongList)