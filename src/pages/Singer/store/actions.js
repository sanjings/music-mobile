import {
  UPDATE_SINGER_DETAIL,
  UPDATE_LOADING
} from './actionTypes'
import { getSingerDetailRequest } from '../../../apis/requests/singer'

export const updateSingerDetailAction = (payload) => {
  return {
    type: UPDATE_SINGER_DETAIL,
    payload
  }
}

export const updateLoadingAction = (payload) => {
  return {
    type: UPDATE_LOADING,
    payload
  }
}

export const getSingerDetailAction = id => {
  return async (dispatch) => {
    dispatch(updateLoadingAction(true))
    const resp = await getSingerDetailRequest(id)
    dispatch(updateSingerDetailAction(resp))
  }
}