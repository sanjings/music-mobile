/**
 * 格式化数量
 * @param {Number} count 
 * @return {String}
 */
export const formatCount = count => {
  if (count < 0) return;
  if (count >= 100000000) {
    return (count / 100000000).toFixed(1) + '亿'
  }
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万'
  }
  return count
}

/**
 * 给小于10的数字补上0
 * @param {Number} num 
 */
export const formatNumber = num => {
  num = num.toString()
  return num[1] ? num : '0' + num
}

/**
 * 格式化歌手名字
 * @param {Array} singerList 
 */
export const formatSingerName = singerList => {
  return singerList.map(item => item.name).join(' / ')
}