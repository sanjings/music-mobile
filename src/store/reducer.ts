import { SHOW_TOAST, HIDE_TOAST } from './actionTypes';
import { produce } from 'immer';

export interface IGlobalState {
  showToast: boolean;
  toastText: string;
}

export interface IGlobalAction {
  type: string;
  payload?: string;
}

const initialState: IGlobalState = {
  showToast: false,
  toastText: '暂未开发'
}

export default produce((state: IGlobalState, action: IGlobalAction) => {
  switch (action.type) {
    case SHOW_TOAST:
      state.showToast = true;
      state.toastText = action.payload as string;
      break;
    case HIDE_TOAST:
      state.showToast = false;
      break;
    default:
      break;
  }
}, initialState);