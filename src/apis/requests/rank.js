import { httpGet } from '../http.js'
import { GET_RANK_LIST } from '../url'

/**
 * 请求所有榜单数据
 */
const getRankListRequest = () => {
  return httpGet(GET_RANK_LIST)
}

export {
  getRankListRequest
}