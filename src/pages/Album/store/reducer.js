import { SET_ALBUM_DETAIL, SET_ALBUM_LOADING } from './actionTypes'

const initialState = {
  loading: false,
  albumDetail: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUM_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_ALBUM_DETAIL:
      return {
        ...state,
        albumDetail: action.payload,
        loading: false
      };
    default:
      return state;
  }
}