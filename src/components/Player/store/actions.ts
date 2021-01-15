import { ISong } from '../../../typings';
import {
  SET_FULL_SCREEN,
  SET_PLAYING_STATUS,
  SET_CURRENT_INDEX,
  SET_CURRENT_SONG,
  SET_PLAY_LIST,
  SET_SHOW_PLAY_LIST,
  DELETE_SONG
} from './actionTypes';
import { IPlayerAction } from './reducer';

export const changeFullScreenAction = (payload: boolean): IPlayerAction => ({
  type: SET_FULL_SCREEN,
  payload
})

export const changePlayingStatusAction = (payload: boolean): IPlayerAction => ({
  type: SET_PLAYING_STATUS,
  payload
})

export const changeCurrentIndexAction = (payload: number): IPlayerAction => ({
  type: SET_CURRENT_INDEX,
  payload
})

export const changeCurrentSongAction = (payload: ISong): IPlayerAction => ({
  type: SET_CURRENT_SONG,
  payload
})

export const changePlayListAction = (payload: ISong[]): IPlayerAction => ({
  type: SET_PLAY_LIST,
  payload
})


export const changeShowPlayListAction = (payload: boolean): IPlayerAction => ({
  type: SET_SHOW_PLAY_LIST,
  payload
})

export const deleteSongAction = (payload: number): IPlayerAction => ({
  type: DELETE_SONG,
  payload
})
