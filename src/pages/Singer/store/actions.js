import {
  SET_SINGER_DETAIL,
  SET_SINGER_LOADING
} from './actionTypes'
import { getSingerDetailRequest } from 'requests/singer'

export const changeSingerDetailAction = (payload) => {
  return {
    type: SET_SINGER_DETAIL,
    payload
  }
}

export const changeLoadingAction = (payload) => {
  return {
    type: SET_SINGER_LOADING,
    payload
  }
}

export const getSingerDetailAction = id => {
  return async (dispatch) => {
    dispatch(changeLoadingAction(true))
    const resp = await getSingerDetailRequest(id)
    dispatch(changeSingerDetailAction(resp))
  }
}