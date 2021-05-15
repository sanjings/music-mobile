import { ISinger } from "../typings";

/**
 * 格式化数量
 * @param count 
 */
export const formatCount = (count: number): number | string | undefined => {
  if (count < 0) return;
  if (count >= 100000000) {
    return (count / 100000000).toFixed(1) + '亿';
  }
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万';
  }
  return count;
}

/**
 * 给小于10的数字补上0
 * @param num 
 */
export const formatNumber = (num: number): string | number => {
  const numStr = num.toString();
  return numStr[1] ? num : '0' + num;
}

/**
 * 格式化歌手名字
 * @param singerList 
 */
export const formatSingerName = (singerList: ISinger[]): string => {
  return singerList.map((item: ISinger): string => item.name).join(' / ');
}

/**
 * 组装歌曲的url
 * @param id 
 */
export const formatSongUrl = (id: number): string => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

/**
 * 转换歌曲播放时间
 * @param interval 
 */
export const formatPlayTime = (interval: number): string => {
  interval = interval | 0; // 向下取整
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};