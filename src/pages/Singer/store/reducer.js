import {
  SET_SINGER_DETAIL,
  SET_SINGER_LOADING
} from './actionTypes'

const initialState = {
  singerDetail: null,
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGER_DETAIL:
      return {
        ...state,
        singerDetail: action.payload,
        loading: false
      };
    case SET_SINGER_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}