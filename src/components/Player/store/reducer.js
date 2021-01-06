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

const initialState = {
  fullScreen: false,
  playingStatus: false,
  currentIndex: -1,
  currentSong: {},
  playList: [],
  showPlayList: false
};

const deleteSongFromPlayList = (state, index) => {
  const { playList, currentIndex } = state;

  playList.splice(index, 1);

  if (index < currentIndex) {
    state.currentIndex--;
  }
};

export default produce((state, action) => {
  switch (action.type) {
    case SET_FULL_SCREEN:
      state.fullScreen = action.payload;
      break;
    case SET_PLAYING_STATUS:
      state.playingStatus = action.payload;
      break;
    case SET_CURRENT_INDEX:
      state.currentIndex = action.payload;
      break;
    case SET_CURRENT_SONG:
      state.currentSong = action.payload;
      break;
    case SET_PLAY_LIST:
      state.playList = action.payload;
      break;
    case SET_SHOW_PLAY_LIST:
      state.showPlayList = action.payload;
      break;
    case DELETE_SONG:
      deleteSongFromPlayList(state, action.payload);
      break;
    default:
      break;
  }
}, initialState);
