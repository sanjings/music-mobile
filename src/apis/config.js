const BASE_URL = 'http://localhost:3300'
// const BASE_URL = 'http://192.168.1.5:3300'

const TIME_OUT = 1000 * 10

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 状态码
 */
const errorHandle = status => {
  // HTTP状态码判断
  if (status >= 500) {
    console.log("系统开小差了, 请联系技术管理员或稍后重试")
  } else {
    console.log("网络请求失败, 请刷新重试")
  }
}

// 歌手首字母
const alphaTypes = [
  {
    key: "",
    name: "All"
  },
  {
    key: "A",
    name: "A"
  },
  {
    key: "B",
    name: "B"
  },
  {
    key: "C",
    name: "C"
  },
  {
    key: "D",
    name: "D"
  },
  {
    key: "E",
    name: "E"
  },
  {
    key: "F",
    name: "F"
  },
  {
    key: "G",
    name: "G"
  },
  {
    key: "H",
    name: "H"
  },
  {
    key: "I",
    name: "I"
  },
  {
    key: "J",
    name: "J"
  },
  {
    key: "K",
    name: "K"
  },
  {
    key: "L",
    name: "L"
  },
  {
    key: "M",
    name: "M"
  },
  {
    key: "N",
    name: "N"
  },
  {
    key: "O",
    name: "O"
  },
  {
    key: "P",
    name: "P"
  },
  {
    key: "Q",
    name: "Q"
  },
  {
    key: "R",
    name: "R"
  },
  {
    key: "S",
    name: "S"
  },
  {
    key: "T",
    name: "T"
  },
  {
    key: "U",
    name: "U"
  },
  {
    key: "V",
    name: "V"
  },
  {
    key: "W",
    name: "W"
  },
  {
    key: "X",
    name: "X"
  },
  {
    key: "Y",
    name: "Y"
  },
  {
    key: "Z",
    name: "Z"
  }
];

export {
  BASE_URL,
  TIME_OUT,
  errorHandle,
  alphaTypes
}