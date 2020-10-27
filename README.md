# react+hooks+redux+immer打造音乐webapp

### 项目简介
使用react hooks+redux+immer.js编写的仿网易云音乐移动端web项目。  
特别鸣谢huangyi大佬的课程[Vue2.0开发企业级移动端音乐Web App](https://coding.imooc.com/learn/list/107.html)，以及神三元大佬的小册[React Hooks 与 Immutable 数据流实战](https://juejin.im/book/6844733816460804104)

#### 技术栈
- **[react v16.13](https://github.com/facebook/react):**  react全家桶
- **[redux](https://github.com/reduxjs/redux):**  状态管理容器
- **[redux-thunk](https://github.com/reduxjs/redux-thunk):**  处理异步逻辑的redux中间件
- **[react-lazyload](https://github.com/twobin/react-lazyload):**  懒加载库 
- **[immer](https://github.com/immerjs/immer):**  一个不可变数据的库 
- **[axios](https://github.com/axios/axios):**  基于promise的HTTP库
- **[swiper](https://github.com/nolimits4web/swiper):** 著名轮播图插件 
- **[better-scroll](https://github.com/ustbhuangyi/better-scroll):**  huangyi大佬的移动端滚动插件
- **[react-app-rewired](https://github.com/timarney/react-app-rewired)  [customize-cra](https://github.com/arackaf/customize-cra):**  在不暴露eject的情况下修改webpack配置 
- **[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi):**  开源的NodeJS版api接口  

#### 已完成功能
  - 推荐页面
    - 轮播图
    - 推荐歌单
    - 推荐新歌

  - 歌手列表页面
    - 选择分类（根据歌手首字母筛选）
    - 歌手列表
    - 上拉刷新、下拉加载更多（分页功能）

  - 歌手详情页面
    - 歌曲列表

  - 排行榜页面
    - 官方榜单
    - 全球榜单

  - 歌单页面
    - 歌曲列表

  - 搜索页面
    - 防抖远程搜索
    - 热门搜索关键词
    - 搜索结果列表

  - 歌曲播放
    - 只要有歌曲列表的地方，都可以直接点击播放
    - 全屏播放
    - 底部播放
    - 歌曲控制（暂停、播放、上一首、下一首）
    - 歌词解析、展示、滚动
    - 播放列表
    
### 项目规范
1. 所有组件的文件夹命名用大驼峰，文件命名用小驼峰，出口文件使用index命名；
2. 插件命名使用大驼峰，其他所有文件和文件夹均使用小驼峰；
3. 样式通过scss和css Modules结合来进行编写，所有的css类名全部小写，并用-连接；
4. 定义scss变量，并配置webpack全局注入；
5. 网络请求相关封装和api接口管理、数据处理都在apis文件夹中；
6. 工具方法统一放在utils文件夹中，再分类管理；
7. 插件统一放在plugins文件夹中；
8. 页面组件和业务模块组件统一放在pages文件夹中，页面组件作为容器组件，用于处理数据、逻辑和布局，业务模块组件是对应页面的UI组件，只负责UI不负责逻辑；
9. 通用组件和其它UI组件统一放在components中；
10. 不使用class组件，统一使用函数式组件和hooks；  
11. 所有组件使用memo进行包裹，避免不必要的渲染；
12. 组件内部状态使用useState，业务数据全部用redux管理；  
13. 组件内部书写顺序：
   - 解构props的属性
   - 解构props的方法
   - 解构redux中的数据
   - useState管理组件内部状态
   - useRef
   - useEffect
   - 其他逻辑代码
   - jsx代码
14. redux规范：
    - redux结合immerjs
    - 每个页面模块有自己独立的reducer，放在对应文件夹下的store文件夹下，在全局的store中通过combineReducer合并
    - ajax请求放在actions中，由redux-thunk处理
    - 使用react-redux hooks的useSelector和useDispatch，不再使用connect
    
### 项目运行
#### clone项目
```
git clone https://github.com/sanjing14/react-hooks-music-h5.git
```
#### 拉取后端项目
```
cd react-hooks-music-h5
git submodule init
git submodule update
```
#### 安装依赖（如果没有yarn推荐使用cnpm）
```
npm install cnpm -g --registry=https://registry.npm.taobao.org
cd NeteaseCloudMusicApi
yarn install or cnpm install
cd ..
yarn install or cnpm install
```

#### 本地运行
```
yarn start or npm run start
```
#### 打包
```
yarn build or npm run build
```

### 最后
欢迎pr，喜欢就赏个⭐吧，谢谢支持
