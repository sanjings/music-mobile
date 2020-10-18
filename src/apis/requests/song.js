import { axiosGet } from '../axios.js'
import { GET_LYRIC } from '../url'

/**
 * 请求歌词数据
 * @param {Number} id 
 */
const getLyricRequest = id => {
  return axiosGet(GET_LYRIC, { id })
}

export {
  getLyricRequest
}