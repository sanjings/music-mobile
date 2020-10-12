import {
  UPDATE_BANNERS,
  UPDATE_RECOMMEND_LIST,
  UPDATE_RECOMMEND_NEW_SONGS
} from './actionTypes';

const initialState = {
  banners: [],
  recommendList: [],
  recommendNewSongs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BANNERS:
      return {
        ...state,
        banners: action.payload
      };
    case UPDATE_RECOMMEND_LIST:
      return {
        ...state,
        recommendList: action.payload
      };
    case UPDATE_RECOMMEND_NEW_SONGS:
      return {
        ...state,
        recommendNewSongs: action.payload
      };
    default:
      return state;
  }
}