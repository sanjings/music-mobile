import { axiosGet } from '../axios.js'
import { GET_ALBUM_DETAIL_BY_ID } from '../url'


/**
 * 请求歌单详情
 */
const getAlbumDetailRequest = (id) => {
   return axiosGet(GET_ALBUM_DETAIL_BY_ID, {id})
            .then(res => {
               const list = res.playlist;
               return {
                  ...list,
                  tracks: list.tracks.map(item => {
                     return {
                        id: item.id,
                        name: item.name,
                        album: item.al,
                        singers: item.ar,
                        dt: item.dt
                     }
                  })
               }
            })
}


export {
   getAlbumDetailRequest
}