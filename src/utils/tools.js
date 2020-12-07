/**
 * 简易深拷贝
 * @param {Object}} data 
 */
export const deepClone = data => {
  return JSON.parse(JSON.stringify(data));
}

/**
 * 防抖函数
 * @params {Function} fn 要执行的函数
 * @params {Number} delayTime 延迟执行的时间
 * @return {Function}
 */
export const debounce = (fn, delayTime = 300) => {
  let timer = null;
  return function (...args) {
    const _this = this;

    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(_this, args);
    }, delayTime)
  };
}

/**
 * 节流函数
 * @params {Function} fn 要执行的函数
 * @params {Number} waitTime 间隔执行的时间
 * @return {Function}
 */
export const throttle = (fn, waitTime) => {
  let preTime = 0;
  return function (...args) {
    const nowTime = new Date().getTime();

    if (nowTime - preTime >= waitTime) {
      fn.apply(this, args);
      preTime = nowTime;
    }
  };
}

/**
 * 判断是否是空对象
 * @param {Object} obj 
 */
export const isEmptyObject = obj => {
  return JSON.stringify(obj) === '{}' ? true : false;
}



