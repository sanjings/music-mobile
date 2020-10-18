import { SET_ALBUM_DETAIL, SET_ALBUM_LOADING } from './actionTypes'
import { getAlbumDetailRequest } from 'requests/album'

export const changeLoadingAction = payload => {
  return {
    type: SET_ALBUM_LOADING,
    payload
  }
}

export const changeAlbumDetailAction = payload => {
  return {
    type: SET_ALBUM_DETAIL,
    payload: payload
  }
}

/**
 * 请求榜单详情数据
 * @param {Number} id 
 */
export const getAlbumDetailAction = id => {
  return async (dispatch) => {
    dispatch(changeLoadingAction(true))
    const resp = await getAlbumDetailRequest(id)
    dispatch(changeAlbumDetailAction(resp))
  }
}
