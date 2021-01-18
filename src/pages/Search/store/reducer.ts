import { SET_HOT_KEYWORDS_LIST, SET_SEARCH_DATA } from './actionTypes';
import { produce } from 'immer';
import { IAction } from '../../../typings';
import { IHotKey, ISearchResult } from '../typing';

export interface ISearchState {
  hotKeywordsList: Array<IHotKey>;
  searchData: ISearchResult | null;
}

export interface ISearchAction extends IAction {
  payload: Array<IHotKey> | ISearchResult | null;
}

const initialState: ISearchState = {
  hotKeywordsList: [],
  searchData: null
};

export default produce((state: ISearchState, action: ISearchAction) => {
  switch (action.type) {
    case SET_HOT_KEYWORDS_LIST:
      state.hotKeywordsList = action.payload as Array<IHotKey>;
      break;
    case SET_SEARCH_DATA:
      state.searchData = action.payload as ISearchResult;
      break;
    default:
      break;
  }
}, initialState);
