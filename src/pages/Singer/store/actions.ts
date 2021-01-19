import { Dispatch } from 'redux';
import { SET_SINGER_DETAIL, SET_SINGER_LOADING } from './actionTypes';
import { getSingerDetailRequest } from 'requests/singer';
import { ISingerAction } from './reducer';
import { ISinger } from '@/typings';

export const changeSingerDetailAction = (payload: ISinger): ISingerAction => {
  return {
    type: SET_SINGER_DETAIL,
    payload
  };
};

export const changeLoadingAction = (payload: boolean): ISingerAction => {
  return {
    type: SET_SINGER_LOADING,
    payload
  };
};

export const getSingerDetailAction = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(changeLoadingAction(true));
    const resp = await getSingerDetailRequest(id);
    dispatch(changeSingerDetailAction(resp));
  };
};
