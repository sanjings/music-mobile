import {
  SET_FULL_SCREEN,
  SET_PLAYING_STATUS,
  SET_CURRENT_INDEX,
  SET_CURRENT_SONG,
  SET_PLAY_LIST,
  SET_SHOW_PLAY_LIST,
  DELETE_SONG
} from './actionTypes';

export const changeFullScreenAction = payload => ({
  type: SET_FULL_SCREEN,
  payload
})

export const changePlayingStatusAction = payload => ({
  type: SET_PLAYING_STATUS,
  payload
})

export const changeCurrentIndexAction = payload => ({
  type: SET_CURRENT_INDEX,
  payload
})

export const changeCurrentSongAction = payload => ({
  type: SET_CURRENT_SONG,
  payload
})

export const changePlayListAction = payload => ({
  type: SET_PLAY_LIST,
  payload
})


export const changeShowPlayListAction = payload => ({
  type: SET_SHOW_PLAY_LIST,
  payload
})

export const deleteSongAction = payload => ({
  type: DELETE_SONG,
  payload
})
