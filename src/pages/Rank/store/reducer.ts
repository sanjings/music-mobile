import { IRankItem } from './../typing';
import { SET_RANK_LOADING, SET_RANK_DATA } from './actionTypes';
import { produce } from 'immer';

export interface IRankState {
  loading: boolean;
  globalList: IRankItem[];
  officialList: IRankItem[];
}

export interface IRankAction {
  type: string;
  payload: boolean | IRankPayload;
}

export interface IRankPayload {
  globalList: IRankItem[];
  officialList: IRankItem[];
}

const initialState: IRankState = {
  loading: false,
  globalList: [],
  officialList: []
};

export default produce((state: IRankState, action: IRankAction) => {
  switch (action.type) {
    case SET_RANK_LOADING:
      state.loading = action.payload as boolean;
      break;
    case SET_RANK_DATA:
      const { globalList, officialList } = action.payload as IRankPayload;
      state.globalList = globalList;
      state.officialList = officialList;
      state.loading = false;
      break;
    default:
      break;
  }
}, initialState);
