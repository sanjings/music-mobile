import { axiosGet } from '../axios.js'
import { GET_SINGER_LIST, GET_SINGER_DETAIL_AND_HOT_SONGS } from '../url'


/**
 * 请求歌手列表数据
 * @param {Number} offset 
 * @param {String} initial 首字母
 */
const getSingerListRequest = (offset, initial) => {
   return axiosGet(GET_SINGER_LIST, { offset, initial })
}

/**
 * 请求歌手信息和热门歌曲数据
 * @param {String} id 歌手id
 */
const getSingerDetailRequest = id => {
   return axiosGet(GET_SINGER_DETAIL_AND_HOT_SONGS, { id })
            .then(res => ({
               ...res.artist,
               hotSongs: res.hotSongs.map(item => {
                  return {
                     id: item.id,
                     name: item.name,
                     album: item.al,
                     singers: item.ar,
                     dt: item.dt
                  }
               })
            }))
}


export {
   getSingerListRequest,
   getSingerDetailRequest
}