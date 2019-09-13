import types from './types';

const actions = {
  getPlaces: payload => ({
    type: types.GET_PLACES,
    payload,
  }),
  setSearchHistory: payload => ({
    type: types.SET_SEARCH_HISTORY,
    payload,
  }),
  updateSearchHistory: payload => ({
    type: types.UPDATE_SEARCH_HISTORY,
    payload,
  }),
  getSearchHistory: payload => ({
    type: types.GET_SEARCH_HISTORY,
    payload,   
  }),
  deleteSearchHistory: payload => ({
    type: types.DELETE_SEARCH_HISTORY,
    payload,   
  }),
   
};
export default actions;
