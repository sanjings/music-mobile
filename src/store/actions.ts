import { SHOW_TOAST, HIDE_TOAST } from './actionTypes';
import { IGlobalAction } from './reducer';

export const showToastAction = (payload: string = '暂未开发'): IGlobalAction => {
  return {
    type: SHOW_TOAST,
    payload
  }
}

export const hideToastAction = (): IGlobalAction => {
  return {
    type: HIDE_TOAST
  }
}