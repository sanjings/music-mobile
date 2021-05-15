import { ajaxGet } from '../utils/http';
import { GET_SINGER_LIST, GET_SINGER_DETAIL_AND_HOT_SONGS } from '../configs/api';

/**
 * 请求歌手列表数据
 * @param offset
 * @param initial 首字母
 */
export const httpGetSingerList = (offset: number, initial?: string) => {
  return ajaxGet(GET_SINGER_LIST, { offset, initial });
};

/**
 * 请求歌手信息和热门歌曲数据
 * @param id 歌手id
 */
export const httpGetSingerDetail = async (id: number) => {
  const { artist, hotSongs } = await ajaxGet(GET_SINGER_DETAIL_AND_HOT_SONGS, { id });
  return {
    ...artist,
    hotSongs: hotSongs.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        album: item.al,
        singers: item.ar,
        dt: item.dt
      };
    })
  };
};
