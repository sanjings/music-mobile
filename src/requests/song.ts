import { ajaxGet } from '../utils/http';
import { GET_LYRIC } from '../configs/api';

/**
 * 请求歌词数据
 * @param id
 */
export const httpGetLyric = (id: number) => {
  return ajaxGet(GET_LYRIC, { id });
};
