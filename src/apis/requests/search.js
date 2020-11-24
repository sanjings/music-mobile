import { ajaxGet } from '../ajax.js'
import { 
  GET_HOT_KEYWORDS_LIST, 
  GET_SEARCH_LIST_BY_KEYWORDS, 
  GET_SEARCH_SUGGEST_BY_KEYWORDS 
} from '../url'

/**
 * 请求热门关键词列表
 */
const getHotKeywordsListRequest = () => {
  return ajaxGet(GET_HOT_KEYWORDS_LIST)
}

/**
 * 请求搜索列表
 * @param {String} keywords 
 */
const getSearchListRequest = keywords => {
  return ajaxGet(GET_SEARCH_LIST_BY_KEYWORDS, { keywords })
    .then(res => {
      const list = res.result && res.result.songs ? res.result.songs : [];
      return list.map(item => {
        return {
          ...item,
          album: {
            ...item.album,
            picUrl: 'ajaxs://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
          },
          dt: item.duration,
          singers: item.artists
        }
      })
    })
}

/**
 * 请求搜索建议
 * @param {String} keywords 
 */
const getSearchSuggestRequest = keywords => {
  return ajaxGet(GET_SEARCH_SUGGEST_BY_KEYWORDS, { keywords })
}

export {
  getHotKeywordsListRequest,
  getSearchListRequest,
  getSearchSuggestRequest
}