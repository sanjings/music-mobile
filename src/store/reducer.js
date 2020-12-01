import { SHOW_TOAST, HIDE_TOAST } from './actionTypes';
import { produce } from 'immer';

const initialState = {
  showToast: false,
  toastText: '暂未开发'
}

export default produce((state, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      state.showToast = true;
      state.toastText = action.payload || '暂未开发';
      break;
    case HIDE_TOAST:
      state.showToast = false;
      break;
    default:
      break;
  }
}, initialState)