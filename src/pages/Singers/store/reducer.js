import {
  SET_SINGER_LIST,
  CONCAT_SINGER_LIST,
  SET_PULL_DOWN_LOADING,
  SET_PULL_UP_LOADING
} from './actionTypes';
import { produce } from 'immer';

const initialState = {
  pullDownLoading: false,
  pullUpLoading: false,
  singerList: []
}

export default produce((state, action) => {
  switch (action.type) {
    case SET_SINGER_LIST:
      state.singerList = action.payload;
      state.pullDownLoading = false;
      break;
    case CONCAT_SINGER_LIST:
      state.singerList.push(...action.payload);
      state.pullUpLoading = false;
      break;
    case SET_PULL_DOWN_LOADING:
      state.pullDownLoading = action.payload;
      break;
    case SET_PULL_UP_LOADING:
      state.pullUpLoading = action.payload;
      break;
    default:
      break;
  }
}, initialState)