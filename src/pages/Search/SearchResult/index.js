import React, { memo } from "react"

import { Link } from 'react-router-dom'

import Suggest from './suggest'
import SongList from '../../../components/SongList'

import styles from './index.module.scss'

const SearchResult = props => {
   const { data } = props,
         { suggest, songList } = data,
         { artists, playlists } = suggest;

   return (
      <div className={styles['search-result']}>
         {/* 相关歌手建议 */}
         {
            artists
            &&
            <Suggest listData={artists} type="歌手"/>
         }

         {/* 相关歌单建议 */}
         {
            playlists
            &&
            <Suggest listData={playlists} type="歌单"/>
         }

         {/* 歌曲列表 */}
         <SongList 
            listData={songList} 
            showIndex={false} 
            showPlay={false}
         />
      </div>
   )
}

export default memo(SearchResult)