import { SET_ALBUM_DETAIL, SET_ALBUM_LOADING } from './actionTypes';
import { produce } from 'immer';

const initialState = {
  loading: false,
  albumDetail: null
}

export default produce((state, action) => {
  switch (action.type) {
    case SET_ALBUM_LOADING:
      state.loading = action.payload;
      break;
    case SET_ALBUM_DETAIL:
      state.albumDetail = action.payload;
      state.loading = false;
      break;
    default: 
      break;
  }
}, initialState)