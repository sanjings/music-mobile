import {
  SET_LOADING,
  SET_HOT_KEYWORDS_LIST,
  SET_SEARCH_DATA
} from './actionTypes'

import {
  getHotKeywordsListRequest,
  getSearchListRequest,
  getSearchSuggestRequest
} from '../../../apis/requests/search'

export const changeLoadingAction = payload => ({
  type: SET_LOADING,
  payload
})

export const changeHotKeywordsListAction = payload => ({
  type: SET_HOT_KEYWORDS_LIST,
  payload
})

export const changeSearchDataAction = payload => ({
  type: SET_SEARCH_DATA,
  payload
})

export const getHotKeywordsListAction = () => {
  return async (dispatch) => {
    const resp = await getHotKeywordsListRequest()
    dispatch(changeHotKeywordsListAction(resp.result.hots))
  }
}

export const getSearchDataAction = keywords => {
  return async (dispatch) => {
    dispatch(changeLoadingAction(true))
    const resp = await Promise.all([getSearchListRequest(keywords), getSearchSuggestRequest(keywords)])
    dispatch(changeSearchDataAction({
      songList: resp[0],
      suggest: resp[1].result
    }))
  }
}
