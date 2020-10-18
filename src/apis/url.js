/**
 * @description 接口地址统一管理
 */

/**
 * 推荐相关
 */
export const GET_BANNERS = '/banner' // banner
export const GET_RECOMMEND_LIST = '/personalized' // 推荐歌单
export const GET_RECOMMEND_NEW_SONGS = '/personalized/newsong' // 推荐新歌

/**
 * 排行榜相关
 */
export const GET_RANK_LIST = '/toplist/detail' // 榜单列表

/**
 * 歌手相关
 */
export const GET_SINGER_LIST = '/artist/list' // 歌手列表
export const GET_SINGER_DETAIL_AND_HOT_SONGS = '/artists' // 歌手信息和热门歌曲

/**
 * 歌单相关
 */
export const GET_ALBUM_DETAIL_BY_ID = '/playlist/detail' // 歌单详情

/**
 * 搜索相关
 */
export const GET_HOT_KEYWORDS_LIST = '/search/hot' // 热门搜索关键词
export const GET_SEARCH_LIST_BY_KEYWORDS = '/search' // 搜索
export const GET_SEARCH_SUGGEST_BY_KEYWORDS = '/search/suggest' // 搜索建议

/**
 * 歌曲相关
 */
export const GET_LYRIC = '/lyric' // 歌词