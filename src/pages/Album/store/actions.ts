import { IAlbumAction } from './reducer';
import { SET_ALBUM_DETAIL, SET_ALBUM_LOADING } from './actionTypes';
import { httpGetAlbumDetail } from '@/requests/album';
import { Dispatch } from 'redux';

export const changeLoadingAction = (payload: boolean): IAlbumAction => {
  return {
    type: SET_ALBUM_LOADING,
    payload
  };
};

export const changeAlbumDetailAction = (payload: any): IAlbumAction => {
  return {
    type: SET_ALBUM_DETAIL,
    payload: payload
  };
};

/**
 * 请求榜单详情数据
 * @param {Number} id
 */
export const getAlbumDetailAction = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(changeLoadingAction(true));
    const resp = await httpGetAlbumDetail(id);
    dispatch(changeAlbumDetailAction(resp));
  };
};
