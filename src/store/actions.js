import { SHOW_TOAST, HIDE_TOAST } from './actionTypes';

export const showToastAction = payload => {
  return {
    type: SHOW_TOAST,
    payload
  }
}

export const hideToastAction = payload => {
  return {
    type: HIDE_TOAST,
    payload
  }
}