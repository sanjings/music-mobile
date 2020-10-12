import {
  UPDATE_BANNERS,
  UPDATE_RECOMMEND_LIST,
  UPDATE_RECOMMEND_NEW_SONGS
} from './actionTypes';

import {
  getBannersRequest,
  getRecommendListRequest,
  getRecommendNewSongsRequest
} from '../../../apis/requests/recommend';


export const updateBanners = (payload) => {
  return {
    type: UPDATE_BANNERS,
    payload
  }
};

export const updateRecommendList = (payload) => {
  return {
    type: UPDATE_RECOMMEND_LIST,
    payload
  }
};

export const updateRecommendNewSongs = (payload) => {
  return {
    type: UPDATE_RECOMMEND_NEW_SONGS,
    payload
  }
};

/**
 * 获取banner数据
 * @param {Number} type 
 */
export const getBannersAction = (type) => {
  return async (dispatch) => {
    const resp = await getBannersRequest(type);
    dispatch(updateBanners(resp.banners))
  }
}

/**
 * 获取推荐歌单数据
 * @param {Number} limit 
 */
export const getRecommendListAction = (limit) => {
  return async (dispatch) => {
    const resp = await getRecommendListRequest(limit);
    dispatch(updateRecommendList(resp.result))
  }
}

/**
 * 获取推荐新歌数据
 */
export const getRecommendNewSongsAction = () => {
  return async (dispatch) => {
    const resp = await getRecommendNewSongsRequest();
    dispatch(updateRecommendNewSongs(resp))
  }
}
