import {
  SET_RECOM_LOADING,
  SET_BANNERS,
  SET_RECOMMEND_LIST,
  SET_RECOMMEND_NEW_SONGS
} from './actionTypes';
import { produce } from 'immer';
import { IBanner } from 'components/Carousel/typing';
import { IAction, ISong, IRecom } from '@/typings';

export interface IRecomState {
  loading: boolean;
  banners: Array<IBanner>;
  recommendList: Array<IRecom>;
  recommendNewSongs: Array<ISong>;
}

export interface IRecomAction extends IAction {
  payload: boolean | Array<IBanner> | Array<IRecom> | Array<ISong>;
}

const initialState: IRecomState = {
  loading: false,
  banners: [],
  recommendList: [],
  recommendNewSongs: []
};

export default produce((state: IRecomState, action: IRecomAction) => {
  switch (action.type) {
    case SET_RECOM_LOADING:
      state.loading = action.payload as boolean;
      break;
    case SET_BANNERS:
      state.banners = action.payload as IBanner[];
      break;
    case SET_RECOMMEND_LIST:
      state.recommendList = action.payload as IRecom[];
      state.loading = false;
      break;
    case SET_RECOMMEND_NEW_SONGS:
      state.recommendNewSongs = action.payload as ISong[];
      break;
    default:
      break;
  }
}, initialState);
