import { UPDATE_ALBUM_DETAIL, UPDATE_LOADING } from './actionTypes'

const initialState = {
   loading: false,
   albumDetail: null
}

export default (state = initialState, action) => {
   switch(action.type) {
      case UPDATE_ALBUM_DETAIL:
         return {
            ...state,
            albumDetail: action.payload,
            loading: false
         };
      case UPDATE_LOADING:
         return {
            ...state,
            loading: action.payload
         };
      default:
         return state;
   }
}