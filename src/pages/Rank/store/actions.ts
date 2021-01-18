import { IRankItem } from './../typing';
import { Dispatch } from 'redux';
import { IRankAction, IRankPayload } from './reducer';
import { SET_RANK_LOADING, SET_RANK_DATA } from './actionTypes';
import { getRankListRequest } from '../../../apis/requests/rank';



export const changeLoadingAction = (payload: boolean): IRankAction => {
  return {
    type: SET_RANK_LOADING,
    payload
  };
};

export const changeRankDataAction = (payload: IRankPayload): IRankAction => {
  return {
    type: SET_RANK_DATA,
    payload
  };
};

/**
 * 获取榜单数据
 */
export const getRankListAction = () => {
  return async (dispatch: Dispatch) => {
    dispatch(changeLoadingAction(true));
    const resp: any = await getRankListRequest();

    const list = resp.list,
          globalList = list.filter((item: IRankItem) => !item.tracks?.length),
          officialList = list.filter((item: IRankItem) => item.tracks?.length);

    dispatch(changeRankDataAction({ globalList, officialList }));
  };
};
