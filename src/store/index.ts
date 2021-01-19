import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import globalReducer, { IGlobalState } from './reducer';
import { reducer as recommendReducer } from '../pages/Recommend/store';
import { reducer as rankReducer } from '../pages/Rank/store';
import { reducer as singersReducer } from '../pages/Singers/store';
import { reducer as singerReducer } from '../pages/Singer/store';
import { reducer as albumReducer } from '../pages/Album/store';
import { reducer as playerReducer } from '../components/Player/store';
import { reducer as searchReducer } from '../pages/Search/store';
import { IPlayerState } from '../components/Player/store/reducer';
import { IAlbumState } from './../pages/Album/store/reducer';
import { IRecomState } from './../pages/Recommend/store/reducer';
import { IRankState } from './../pages/Rank/store/reducer';
import { ISearchState } from './../pages/Search/store/reducer';
import { ISingerState } from '../pages/Singer/store/reducer';
import { ISingersState } from './../pages/Singers/store/reducer';

export interface IStoreState {
  global: IGlobalState;
  player: IPlayerState;
  album: IAlbumState;
  rank: IRankState;
  recommend: IRecomState;
  search: ISearchState;
  singer: ISingerState;
  singers: ISingersState;
}

const reducers = combineReducers({
  global: globalReducer,
  recommend: recommendReducer,
  rank: rankReducer,
  singers: singersReducer,
  singer: singerReducer,
  album: albumReducer,
  player: playerReducer,
  search: searchReducer
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store;