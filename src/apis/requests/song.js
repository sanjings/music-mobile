import { axiosGet } from '../axios.js'
import { GET_SONG_DETAIL, GET_LYRIC } from '../url'

/**
 * 请求歌曲详情
 * @param {Number} id 
 */
const getSongDetailRequest = id => {
  return axiosGet(GET_SONG_DETAIL, { id })
}

/**
 * 请求歌词数据
 * @param {Number} id 
 */
const getLyricRequest = id => {
  return axiosGet(GET_LYRIC, { id })
}

export {
  getSongDetailRequest,
  getLyricRequest
}