import React, { FC, memo, ReactElement } from 'react';

import Suggest from './suggest';
import SongList from '../../../components/SongList';
import { ISearchResult } from '../typing';

const SearchResult: FC<ISearchResult> = ({ 
  suggest: { artists, playlists }, 
  songList 
}): ReactElement => {
  return (
    <div className="result-wrap">
      {/* 相关歌手建议 */}
      { artists && <Suggest listData={artists} type="歌手" /> }

      {/* 相关歌单建议 */}
      { playlists && <Suggest listData={playlists} type="歌单" /> }

      {/* 歌曲列表 */}
      <SongList 
        listData={songList} 
        showIndex={false} 
        showPlay={false} 
      />
    </div>
  );
};

export default memo(SearchResult);
