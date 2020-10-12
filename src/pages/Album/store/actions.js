import { UPDATE_ALBUM_DETAIL, UPDATE_LOADING } from './actionTypes'
import { getAlbumDetailRequest } from '../../../apis/requests/album'

export const updateAlbumDetailAction = (payload) => {
  return {
    type: UPDATE_ALBUM_DETAIL,
    payload: payload
  }
}

export const updateLoadingAction = (payload) => {
  return {
    type: UPDATE_LOADING,
    payload
  }
}


export const getAlbumDetailAction = (id) => {
  return async (dispatch) => {
    dispatch(updateLoadingAction(true))
    const resp = await getAlbumDetailRequest(id)
    dispatch(updateAlbumDetailAction(resp))
  }
}
