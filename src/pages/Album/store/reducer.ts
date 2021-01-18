import { SET_ALBUM_DETAIL, SET_ALBUM_LOADING } from './actionTypes';
import { produce } from 'immer';

export interface IAlbumState {
  loading: boolean;
  albumDetail: any
}

export interface IAlbumAction {
  type: string;
  payload: any;
}

const initialState: IAlbumState = {
  loading: false,
  albumDetail: null
};

export default produce((state: IAlbumState, action: IAlbumAction) => {
  switch (action.type) {
    case SET_ALBUM_LOADING:
      state.loading = action.payload;
      break;
    case SET_ALBUM_DETAIL:
      state.albumDetail = action.payload;
      state.loading = false;
      break;
    default:
      break;
  }
}, initialState);
