import {
  UPDATE_SINGER_LIST,
  CONCAT_SINGER_LIST,
  UPDATE_PULL_DOWN_LOADING,
  UPDATE_PULL_UP_LOADING
} from './actionTypes'

const initialState = {
  pullDownLoading: false,
  pullUpLoading: false,
  singerList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SINGER_LIST:
      return {
        ...state,
        singerList: action.payload,
        pullDownLoading: false
      };
    case CONCAT_SINGER_LIST:
      return {
        ...state,
        singerList: state.singerList.concat(action.payload),
        pullUpLoading: false
      };
    case UPDATE_PULL_DOWN_LOADING:
      return {
        ...state,
        pullDownLoading: action.payload
      };
    case UPDATE_PULL_UP_LOADING:
      return {
        ...state,
        pullUpLoading: action.payload
      };
    default:
      return state;
  }
}