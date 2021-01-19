import { SET_SINGER_DETAIL, SET_SINGER_LOADING } from './actionTypes';
import { produce } from 'immer';
import { IAction, ISinger } from '@/typings';

export interface ISingerState {
  singerDetail: ISinger | null;
  loading: boolean;
}

export interface ISingerAction extends IAction {
  payload: boolean | ISinger;
}

const initialState: ISingerState = {
  singerDetail: null,
  loading: false
};

export default produce((state: ISingerState, action: ISingerAction) => {
  switch (action.type) {
    case SET_SINGER_DETAIL:
      state.singerDetail = action.payload as ISinger;
      state.loading = false;
      break;
    case SET_SINGER_LOADING:
      state.loading = action.payload as boolean;
      break;
    default:
      break;
  }
}, initialState);
