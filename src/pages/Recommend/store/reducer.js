import {
  SET_RECOM_LOADING,
  SET_BANNERS,
  SET_RECOMMEND_LIST,
  SET_RECOMMEND_NEW_SONGS
} from './actionTypes';
import { produce } from 'immer'

const initialState = {
  loading: false,
  banners: [],
  recommendList: [],
  recommendNewSongs: []
};

export default produce((state, action) => {
  switch (action.type) {
    case SET_RECOM_LOADING:
      state.loading = action.payload;
      break;
    case SET_BANNERS:
      state.banners = action.payload;
      break;
    case SET_RECOMMEND_LIST:
      state.recommendList = action.payload;
      state.loading = false;
      break;
    case SET_RECOMMEND_NEW_SONGS:
      state.recommendNewSongs = action.payload;
      break;
    default: 
      break;
  }
}, initialState)
