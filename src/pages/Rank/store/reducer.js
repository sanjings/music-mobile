import { UPDATE_GLOBAL_LIST, UPDATE_OFFICAIL_LIST } from './actionTypes'

const initialState = {
   globalList: [],
   officailList: []
}

export default (state = initialState, action) => {
   switch(action.type) {
      case UPDATE_GLOBAL_LIST:
         return {
            ...state,
            globalList: action.payload
         };
      case UPDATE_OFFICAIL_LIST:
         return {
            ...state,
            officailList: action.payload
         };
      default: 
         return state;
   }
}