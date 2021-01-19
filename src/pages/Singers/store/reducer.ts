import {
  SET_SINGER_LIST,
  CONCAT_SINGER_LIST,
  SET_PULL_DOWN_LOADING,
  SET_PULL_UP_LOADING
} from './actionTypes';
import { produce } from 'immer';
import { IAction, ISinger } from '@/typings';

export interface ISingersState {
  pullDownLoading: boolean;
  pullUpLoading: boolean;
  singerList: ISinger[];
}

export interface ISingersAction extends IAction {
  payload: boolean | ISinger[];
}

const initialState: ISingersState = {
  pullDownLoading: false,
  pullUpLoading: false,
  singerList: []
};

export default produce((state: ISingersState, action: ISingersAction) => {
  switch (action.type) {
    case SET_SINGER_LIST:
      state.singerList = action.payload as ISinger[];
      state.pullDownLoading = false;
      break;
    case CONCAT_SINGER_LIST:
      state.singerList.push(...action.payload as ISinger[]);
      state.pullUpLoading = false;
      break;
    case SET_PULL_DOWN_LOADING:
      state.pullDownLoading = action.payload as boolean;
      break;
    case SET_PULL_UP_LOADING:
      state.pullUpLoading = action.payload as boolean;
      break;
    default:
      break;
  }
}, initialState);
