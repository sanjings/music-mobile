import {
  SET_LOADING,
  SET_BANNERS,
  SET_RECOMMEND_LIST,
  SET_RECOMMEND_NEW_SONGS
} from './actionTypes';

const initialState = {
  loading: false,
  banners: [],
  recommendList: [],
  recommendNewSongs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_BANNERS:
      return {
        ...state,
        banners: action.payload
      };
    case SET_RECOMMEND_LIST:
      return {
        ...state,
        recommendList: action.payload,
        loading: false
      };
    case SET_RECOMMEND_NEW_SONGS:
      return {
        ...state,
        recommendNewSongs: action.payload
      };
    default:
      return state;
  }
}