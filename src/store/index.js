import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import globalReducer from './reducer';
import { reducer as recommendReducer } from '../pages/Recommend/store';
import { reducer as rankReducer } from '../pages/Rank/store';
import { reducer as singersReducer } from '../pages/Singers/store';
import { reducer as singerReducer } from '../pages/Singer/store';
import { reducer as albumReducer } from '../pages/Album/store';
import { reducer as playerReducer } from '../components/Player/store';
import { reducer as searchReducer } from '../pages/Search/store';

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