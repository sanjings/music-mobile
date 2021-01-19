import { Dispatch } from 'redux';
import { ISingersAction } from './reducer';
import { ISinger } from '@/typings/index';
import {
  SET_SINGER_LIST,
  CONCAT_SINGER_LIST,
  SET_PULL_DOWN_LOADING,
  SET_PULL_UP_LOADING
} from './actionTypes';
import { getSingerListRequest } from 'requests/singer';

export const changeSingerListAction = (payload: ISinger[]): ISingersAction => {
  return {
    type: SET_SINGER_LIST,
    payload
  };
};

export const concatSingerListAction = (payload: ISinger[]): ISingersAction => {
  return {
    type: CONCAT_SINGER_LIST,
    payload
  };
};

export const changePullDownLoadingAction = (payload: boolean): ISingersAction => {
  return {
    type: SET_PULL_DOWN_LOADING,
    payload
  };
};

export const changePullUpLoadingAction = (payload: boolean): ISingersAction => {
  return {
    type: SET_PULL_UP_LOADING,
    payload
  };
};

/**
 * 请求歌手列表
 * @param initial 首字母
 */
export const getSingerListAction = (initial?: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(changePullDownLoadingAction(true));
    const resp = await getSingerListRequest(0, initial);
    dispatch(changeSingerListAction(resp.artists));
  };
};

/**
 * 请求更多歌手列表
 * @param offset 分页开始值
 * @param initial 首字母
 */
export const getMoreSingerListAction = (offset: number, initial: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(changePullUpLoadingAction(true));
    const resp = await getSingerListRequest(offset, initial);
    dispatch(concatSingerListAction(resp.artists));
  };
};
