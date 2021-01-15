/**
 * 简易深拷贝
 * @param data 
 */
export const deepClone = <T = any>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
}

/**
 * 防抖函数
 * @params {Function} fn 要执行的函数
 * @params {Number} delayTime 延迟执行的时间
 * @return {Function}
 */
export const debounce = (fn: Function, delayTime: number = 300) => {
  let timer: NodeJS.Timeout | null = null;
  return function (...args: any) {
    timer && clearTimeout(Number(timer));
    timer = setTimeout(() => {
      fn.apply(null, args);
    }, delayTime)
  };
}

/**
 * 节流函数
 * @params {Function} fn 要执行的函数
 * @params {Number} waitTime 间隔执行的时间
 * @return {Function}
 */
export const throttle = (fn: Function, waitTime: number = 300) => {
  let preTime: number = 0;
  return function (...args: any) {
    const nowTime = new Date().getTime();

    if (nowTime - preTime >= waitTime) {
      fn.apply(null, args);
      preTime = nowTime;
    }
  };
}

/**
 * 判断是否是空对象
 * @param obj 
 */
export const isEmptyObject = (obj: object | null): boolean => {
  if (!obj) return true;
  return JSON.stringify(obj) === '{}' ? true : false;
}



