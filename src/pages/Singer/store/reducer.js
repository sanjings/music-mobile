import {
  SET_SINGER_DETAIL,
  SET_SINGER_LOADING
} from './actionTypes';
import { produce } from 'immer';

const initialState = {
  singerDetail: null,
  loading: false
}

export default produce((state, action) => {
  switch (action.type) {
    case SET_SINGER_DETAIL:
      state.singerDetail = action.payload;
      state.loading = false;
      break;
    case SET_SINGER_LOADING:
      state.loading = action.payload;
      break;
    default:
      break;
  }
}, initialState);