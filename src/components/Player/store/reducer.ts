import {
  SET_FULL_SCREEN,
  SET_PLAYING_STATUS,
  SET_CURRENT_INDEX,
  SET_CURRENT_SONG,
  SET_PLAY_LIST,
  SET_SHOW_PLAY_LIST,
  DELETE_SONG
} from './actionTypes';
import { produce } from 'immer';
import { ISong } from '@/typings';

export interface IPlayerState {
  fullScreen: boolean;
  playingStatus: boolean;
  currentIndex: number;
  currentSong: ISong | null;
  playList: ISong[];
  showPlayList: boolean;
}

export interface IPlayerAction {
  type: string;
  payload: boolean | number | ISong | ISong[];
}

const initialState: IPlayerState = {
  fullScreen: false,
  playingStatus: false,
  currentIndex: -1,
  currentSong: null,
  playList: [],
  showPlayList: false
};

/**
 * 删除指定歌曲
 * @param state 
 * @param index 
 */
const deleteSongFromPlayList = (state: IPlayerState, index: number): void => {
  const { playList, currentIndex } = state;

  playList.splice(index, 1);

  if (index < currentIndex) {
    state.currentIndex--;
  }
};

export default produce((state: IPlayerState, action: IPlayerAction) => {
  switch (action.type) {
    case SET_FULL_SCREEN:
      state.fullScreen = action.payload as boolean;
      break;
    case SET_PLAYING_STATUS:
      state.playingStatus = action.payload as boolean;
      break;
    case SET_CURRENT_INDEX:
      state.currentIndex = action.payload as number;
      break;
    case SET_CURRENT_SONG:
      state.currentSong = action.payload as ISong;
      break;
    case SET_PLAY_LIST:
      state.playList = action.payload as ISong[];
      break;
    case SET_SHOW_PLAY_LIST:
      state.showPlayList = action.payload as boolean;
      break;
    case DELETE_SONG:
      deleteSongFromPlayList(state, action.payload as number);
      break;
    default:
      break;
  }
}, initialState);
