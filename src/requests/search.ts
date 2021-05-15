import { ajaxGet } from '../utils/http';
import { GET_HOT_KEYWORDS_LIST, GET_SEARCH_LIST_BY_KEYWORDS, GET_SEARCH_SUGGEST_BY_KEYWORDS } from '../configs/api';

/**
 * 请求热门关键词列表
 */
export const httpGetHotKeywordsList = () => {
  return ajaxGet(GET_HOT_KEYWORDS_LIST);
};

/**
 * 请求搜索列表
 * @param keywords
 */
export const httpGetSearchList = async (keywords: string) => {
  const res = await ajaxGet(GET_SEARCH_LIST_BY_KEYWORDS, { keywords });
  const list = res.result && res.result.songs ? res.result.songs : [];
  return list.map((item: any) => {
    return {
      ...item,
      album: {
        ...item.album,
        picUrl: 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
      },
      dt: item.duration,
      singers: item.artists
    };
  });
};

/**
 * 请求搜索建议
 * @param keywords
 */
export const httpGetSearchSuggest = (keywords: string) => {
  return ajaxGet(GET_SEARCH_SUGGEST_BY_KEYWORDS, { keywords });
};
