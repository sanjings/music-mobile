import { ajaxGet } from '../utils/http';
import { GET_BANNERS, GET_RECOMMEND_LIST, GET_RECOMMEND_NEW_SONGS } from '../configs/api';

/**
 * 请求banner数据
 * @param type
 */
export const httpGetBanners = (type: number) => {
  return ajaxGet(GET_BANNERS, { type });
};

/**
 * 请求推荐歌单数据
 * @param limit 取出数量
 */
export const httpGetRecommendList = (limit: number) => {
  return ajaxGet(GET_RECOMMEND_LIST, { limit });
};

/**
 * 请求推荐新歌数据
 */
export const httpGetRecommendNewSongs = async () => {
  const { result } = await ajaxGet(GET_RECOMMEND_NEW_SONGS);
  return result.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      album: item.song.album,
      singers: item.song.artists,
      dt: item.song.duration
    };
  });
};