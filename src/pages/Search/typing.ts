import { ISinger, ISong } from './../../typings/index';
export interface IHotKey {
  first: string;
}

export interface IHotProps {
  listData: Array<IHotKey>;
  onItemClick: (value: string) => void;
}

export interface ISearchResult {
  suggest: ISuggest; 
  songList: ISong[];
}

export interface ISuggest {
  artists: ISinger[];
  playlists: ISuggestAlbum[];
}

export interface ISuggestProps {
  listData: Array<ISinger | ISuggestAlbum>;
  type: '歌手' | '歌单';
}

export interface ISuggestAlbum {
  id: number;
  name: string;
  coverImgUrl: string;
}