import {
  UPDATE_SINGER_DETAIL,
  UPDATE_LOADING
} from './actionTypes'

const initialState = {
  singerDetail: null,
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SINGER_DETAIL:
      return {
        ...state,
        singerDetail: action.payload,
        loading: false
      };
    case UPDATE_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}