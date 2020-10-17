import {
  SET_FULL_SCREEN,
  SET_PLAYING_STATUS,
  SET_CURRENT_INDEX,
  SET_CURRENT_SONG,
  SET_PLAY_LIST,
  SET_SHOW_PLAY_LIST,
  DELETE_SONG
} from './actionTypes'

const initialState = {
  fullScreen: false,
  playingStatus: false,
  currentIndex: -1,
  currentSong: {},
  playList: [],
  showPlayList: false,
}

const deleteSongFormPlayList = (state, index) => {
  let currentIndex = state.currentIndex;
  const playList = state.playList;

  playList.splice(index, 1)

  if (index < currentIndex) currentIndex--;

  return {
    ...state,
    playList,
    currentSong: playList[currentIndex],
    currentIndex
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FULL_SCREEN:
      return {
        ...state,
        fullScreen: action.payload
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
    case SET_SHOW_PLAY_LIST:
      return {
        ...state,
        showPlayList: action.payload
      };
    case DELETE_SONG:
      return deleteSongFormPlayList(state, action.payload)
    default:
      return state;
  }
}