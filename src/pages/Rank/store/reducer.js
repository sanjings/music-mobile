import { SET_LOADING, SET_RANK_DATA } from './actionTypes'

const initialState = {
  loading: false,
  globalList: [],
  officailList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_RANK_DATA:
      return {
        ...state,
        globalList: action.payload.globalList,
        officailList: action.payload.officailList,
        loading: false
      };
    default:
      return state;
  }
}