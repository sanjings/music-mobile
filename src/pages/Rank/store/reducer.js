import { SET_RANK_LOADING, SET_RANK_DATA } from './actionTypes';
import { produce } from 'immer';

const initialState = {
  loading: false,
  globalList: [],
  official: []
}

export default produce((state, action) => {
  switch (action.type) {
    case SET_RANK_LOADING:
      state.loading = action.payload;
      break;
    case SET_RANK_DATA:
      state.globalList = action.payload.globalList;
      state.officialList = action.payload.officialList;
      state.loading = false;
      break;
    default:
      break;
  }
}, initialState);