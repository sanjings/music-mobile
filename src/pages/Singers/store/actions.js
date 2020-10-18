import {
  SET_SINGER_LIST,
  CONCAT_SINGER_LIST,
  SET_PULL_DOWN_LOADING,
  SET_PULL_UP_LOADING
} from './actionTypes'
import { getSingerListRequest } from 'requests/singer'

export const changeSingerListAction = (payload) => {
  return {
    type: SET_SINGER_LIST,
    payload
  }
}

export const concatSingerListAction = (payload) => {
  return {
    type: CONCAT_SINGER_LIST,
    payload
  }
}

export const changePullDownLoadingAction = (payload) => {
  return {
    type: SET_PULL_DOWN_LOADING,
    payload
  }
}

export const changePullUpLoadingAction = (payload) => {
  return {
    type: SET_PULL_UP_LOADING,
    payload
  }
}

/**
 * 请求歌手列表
 * @param {String} initial 首字母 
 */
export const getSingerListAction = initial => {
  return async (dispatch) => {
    dispatch(changePullDownLoadingAction(true))
    const resp = await getSingerListRequest(0, initial)
    dispatch(changeSingerListAction(resp.artists))
  }
}

/**
 * 请求更多歌手列表
 * @param {Number} offset 分页开始值
 * @param {String} initial 首字母 
 */
export const getMoreSingerListAction = (offset, initial) => {
  return async (dispatch) => {
    dispatch(changePullUpLoadingAction(true))
    const resp = await getSingerListRequest(offset, initial)
    dispatch(concatSingerListAction(resp.artists))
  }
}