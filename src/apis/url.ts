/**
 * @description 接口地址统一管理
 */

/**
 * 推荐相关
 */
export const GET_BANNERS: string = '/banner'; // banner
export const GET_RECOMMEND_LIST: string = '/personalized'; // 推荐歌单
export const GET_RECOMMEND_NEW_SONGS: string = '/personalized/newsong'; // 推荐新歌

/**
 * 排行榜相关
 */
export const GET_RANK_LIST: string = '/toplist/detail'; // 榜单列表

/**
 * 歌手相关
 */
export const GET_SINGER_LIST: string = '/artist/list'; // 歌手列表
export const GET_SINGER_DETAIL_AND_HOT_SONGS: string = '/artists'; // 歌手信息和热门歌曲

/**
 * 歌单相关
 */
export const GET_ALBUM_DETAIL_BY_ID: string = '/playlist/detail'; // 歌单详情

/**
 * 搜索相关
 */
export const GET_HOT_KEYWORDS_LIST: string = '/search/hot'; // 热门搜索关键词
export const GET_SEARCH_LIST_BY_KEYWORDS: string = '/search'; // 搜索
export const GET_SEARCH_SUGGEST_BY_KEYWORDS: string = '/search/suggest'; // 搜索建议

/**
 * 歌曲相关
 */
export const GET_LYRIC: string = '/lyric'; // 歌词
