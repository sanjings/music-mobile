import {
  SET_LOADING,
  SET_HOT_KEYWORDS_LIST,
  SET_SEARCH_DATA
} from './actionTypes'

const initialState = {
  loading: false,
  hotKeywordsList: [],
  searchData: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case SET_HOT_KEYWORDS_LIST:
      return {
        ...state,
        hotKeywordsList: action.payload
      }
    case SET_SEARCH_DATA:
      return {
        ...state,
        loading: false,
        searchData: action.payload
      }
    default:
      return state
  }
}