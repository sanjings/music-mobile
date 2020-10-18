import {
  SET_RECOM_LOADING,
  SET_BANNERS,
  SET_RECOMMEND_LIST,
  SET_RECOMMEND_NEW_SONGS
} from './actionTypes';

import {
  getBannersRequest,
  getRecommendListRequest,
  getRecommendNewSongsRequest
} from 'requests/recommend';

export const changeLoading = payload => {
  return {
    type: SET_RECOM_LOADING,
    payload
  }
}

export const changeBanners = (payload) => {
  return {
    type: SET_BANNERS,
    payload
  }
};

export const changeRecommendList = payload => {
  return {
    type: SET_RECOMMEND_LIST,
    payload
  }
};

export const changeRecommendNewSongs = payload => {
  return {
    type: SET_RECOMMEND_NEW_SONGS,
    payload
  }
};

/**
 * 获取banner数据
 * @param {Number} type 客户端类型
 */
export const getBannersAction = type => {
  return async (dispatch) => {
    const resp = await getBannersRequest(type);
    dispatch(changeBanners(resp.banners))
  }
}

/**
 * 获取推荐歌单数据
 * @param {Number} limit 
 */
export const getRecommendListAction = limit => {
  return async (dispatch) => {
    dispatch(changeLoading(true))
    const resp = await getRecommendListRequest(limit);
    dispatch(changeRecommendList(resp.result))
  }
}

/**
 * 获取推荐新歌数据
 */
export const getRecommendNewSongsAction = () => {
  return async (dispatch) => {
    const resp = await getRecommendNewSongsRequest();
    dispatch(changeRecommendNewSongs(resp))
  }
}
