import { Dispatch } from 'redux';
import {
  SET_RECOM_LOADING,
  SET_BANNERS,
  SET_RECOMMEND_LIST,
  SET_RECOMMEND_NEW_SONGS
} from './actionTypes';

import {
  httpGetBanners,
  httpGetRecommendList,
  httpGetRecommendNewSongs
} from '@/requests/recommend';
import { IBanner } from 'components/Carousel/typing';
import { IRecom, ISong } from '@/typings';
import { IRecomAction } from './reducer';

export const changeLoading = (payload: boolean): IRecomAction => {
  return {
    type: SET_RECOM_LOADING,
    payload
  }
}

export const changeBanners = (payload: IBanner[]): IRecomAction => {
  return {
    type: SET_BANNERS,
    payload
  }
};

export const changeRecommendList = (payload: IRecom[]): IRecomAction => {
  return {
    type: SET_RECOMMEND_LIST,
    payload
  }
};

export const changeRecommendNewSongs = (payload: ISong[]): IRecomAction => {
  return {
    type: SET_RECOMMEND_NEW_SONGS,
    payload
  }
};

/**
 * 获取banner数据
 * @param {Number} type 客户端类型
 */
export const getBannersAction = (type: number) => {
  return async (dispatch: Dispatch) => {
    const resp: any = await httpGetBanners(type);
    dispatch(changeBanners(resp.banners))
  }
}

/**
 * 获取推荐歌单数据
 * @param {Number} limit 
 */
export const getRecommendListAction = (limit: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(changeLoading(true))
    const resp: any = await httpGetRecommendList(limit);
    dispatch(changeRecommendList(resp.result))
  }
}

/**
 * 获取推荐新歌数据
 */
export const getRecommendNewSongsAction = () => {
  return async (dispatch: Dispatch) => {
    const resp = await httpGetRecommendNewSongs();
    dispatch(changeRecommendNewSongs(resp))
  }
}
