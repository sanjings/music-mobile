import { ajaxGet } from '../utils/http';
import { GET_RANK_LIST } from '../configs/api';

/**
 * 请求所有榜单数据
 */
export const httpGetRankList = () => {
  return ajaxGet(GET_RANK_LIST);
};
