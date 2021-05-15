import { ajaxGet } from '../utils/http';
import { GET_ALBUM_DETAIL_BY_ID } from '../configs/api';

/**
 * 请求歌单详情
 */
export const httpGetAlbumDetail = async (id: number) => {
  const { playlist }: any = await ajaxGet(GET_ALBUM_DETAIL_BY_ID, { id });
  return {
    ...playlist,
    tracks: playlist.tracks.map((item: any) => {
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
