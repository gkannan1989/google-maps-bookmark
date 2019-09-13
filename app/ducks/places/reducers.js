import types from './types';
//import utils from './utils';

const placesDefaultState = {
  bookmarkHistory: [],
};

/**
   * handles core part of server integration 
   * @memberOf components.Globals.reducers.actions
   * @function placesReducer 
   * @description
   *  it handle all the actions sent from the UI
   * @param {state, action}   
   * state - it has the user state object
   * action  - it defines the UI action triggered
   * @return void
   * types.SET_SEARCH_HISTORY - it will just set the data retrived from server
   * types.GET_SEARCH_HISTORY - it will fetch the data from server
   * types.DELETE_SEARCH_HISTORY - it will remove the history data
   * types.UPDATE_SEARCH_HISTORY - it will update the search history
   * 
 */

const placesReducer = (state = placesDefaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case (types.SET_SEARCH_HISTORY ||
          types.GET_SEARCH_HISTORY ||
          types.DELETE_SEARCH_HISTORY):
      return state; 
    case types.UPDATE_SEARCH_HISTORY:  
      if(payload && payload.history) {
        return {
          ...state,
          bookmarkHistory: payload.history
        };
      }
      return state;  
    default:
      return state;
  }
};

export default placesReducer;
