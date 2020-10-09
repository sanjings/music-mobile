import { 
   UPDATE_SINGER_LIST, 
   CONCAT_SINGER_LIST,
   UPDATE_PULL_DOWN_LOADING,
   UPDATE_PULL_UP_LOADING
} from './actionTypes'
import { getSingerListRequest } from '../../../apis/requests/singer'

export const updateSingerListAction = (payload) => {
   return {
      type: UPDATE_SINGER_LIST,
      payload
   }
}

export const concatSingerListAction = (payload) => {
   return {
      type: CONCAT_SINGER_LIST,
      payload
   }
}

export const updatePullDownLoadingAction = (payload) => {
   return {
      type: UPDATE_PULL_DOWN_LOADING,
      payload
   }
}

export const updatePullUpLoadingAction = (payload) => {
   return {
      type: UPDATE_PULL_UP_LOADING,
      payload
   }
}

export const getSingerListAction = (initial) => {
   return async (dispatch) => {
      dispatch(updatePullDownLoadingAction(true))
      const resp = await getSingerListRequest(0, initial)
      dispatch(updateSingerListAction(resp.artists))
   }
}

export const getMoreSingerListAction = (offset, initial) => {
   return async (dispatch) => {
      dispatch(updatePullUpLoadingAction(true))
      const resp = await getSingerListRequest(offset, initial)
      dispatch(concatSingerListAction(resp.artists))
   }
}