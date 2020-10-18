import React, { memo } from "react"
import PropTypes from 'prop-types'

import Suggest from './suggest'
import SongList from 'components/SongList'

const SearchResult = props => {
  const { data } = props,
        { suggest, songList } = data,
        { artists, playlists } = suggest;

  return (
    <div className="result-wrapper">
      {/* 相关歌手建议 */}
      {
        artists
        &&
        <Suggest listData={artists} type="歌手" />
      }

      {/* 相关歌单建议 */}
      {
        playlists
        &&
        <Suggest listData={playlists} type="歌单" />
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

SearchResult.propTypes = {
  data: PropTypes.object
}

export default memo(SearchResult)