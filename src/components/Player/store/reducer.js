import {
  SET_FULL_SCREEN,
  SET_PLAY_MODE,
  SET_PLAYING_STATUS,
  SET_CURRENT_INDEX,
  SET_CURRENT_SONG,
  SET_PLAY_LIST,
  SET_SEQUENCE_PLAY_LIST,
  SET_SHOW_PLAY_LIST
} from './actionTypes'

import { playMode } from '../../../apis/config'

const initialState = {
  fullScreen: false,
  playingStatus: false,
  currentIndex: -1,
  currentSong: {},
  playList: [],
  sequencePlayList: [],
  showPlayList: false,
  playMode: playMode.sequence
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FULL_SCREEN:
      return {
        ...state,
        fullScreen: action.payload
      };
    case SET_PLAY_MODE:
      return {
        ...state,
        playMode: action.payload
      };
    case SET_PLAYING_STATUS:
      return {
        ...state,
        playingStatus: action.payload
      };
    case SET_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.payload
      };
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload
      };
    case SET_PLAY_LIST:
      return {
        ...state,
        playList: action.payload
      };
    case SET_SEQUENCE_PLAY_LIST:
      return {
        ...state,
        sequencePlayList: action.payload
      };
    case SET_SHOW_PLAY_LIST:
      return {
        ...state,
        showPlayList: action.payload
      };
    default:
      return state;
  }
}