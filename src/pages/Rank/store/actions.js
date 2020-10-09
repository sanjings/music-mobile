import { UPDATE_GLOBAL_LIST, UPDATE_OFFICAIL_LIST } from './actionTypes'
import { getRankListRequest } from '../../../apis/requests/rank'

export const updateGlobalList = (payload) => {
   return {
      type: UPDATE_GLOBAL_LIST,
      payload
   }
}

export const updateOfficailList = (payload) => {
   return {
      type: UPDATE_OFFICAIL_LIST,
      payload
   }
}

/**
 * 获取榜单数据
 */
export const getRankListAction = () => {
   return async (dispatch) => {
      const resp = await getRankListRequest(),
            list = resp.list,
            globalList = list.filter(item => !item.tracks.length),
            officailList = list.filter(item => item.tracks.length);

      dispatch(updateGlobalList(globalList))
      dispatch(updateOfficailList(officailList))
   }
}