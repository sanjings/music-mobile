import {
  SET_HOT_KEYWORDS_LIST,
  SET_SEARCH_DATA
} from './actionTypes';
import { produce } from 'immer';

const initialState = {
  hotKeywordsList: [],
  searchData: null
}

export default produce((state, action) => {
  switch (action.type) {
    case SET_HOT_KEYWORDS_LIST:
      state.hotKeywordsList = action.payload;
      break;
    case SET_SEARCH_DATA:
      state.searchData = action.payload;
      state.loading = false;
      break;
    default:
      break;
  }
}, initialState)