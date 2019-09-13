import { takeLatest, call, select } from 'redux-saga/effects';

import api from './api';
import types from './types'; 

import defaultMessages from '../../constants/defaultMessages';
/**
   * handles error handling part 
   * @memberOf components.Globals.reducers.saga
   * @function catchError 
   * @description
   *  it catch the exception
   * @param {e} - exceptions
   * @return void 
   * 
 */
function* catchError(e) {
  console.log(e);
  let error = defaultMessages.promiseFailed;
  if (e && e.response) {
    const {
      response: {
        data: { error_message: errorMessage },
      },
    } = e;
    error = errorMessage;
    return error;
  }
} 
/**
   * handles fetching data from the getplaces 
   * @memberOf components.Globals.reducers.saga
   * @function getPlaces 
   * @description
   *  it fetch suggestion data
   * @param {action} 
   * query - search query
   * onSuccess - success response
   * onFailed - failed during server request
   * @return void 
   * 
 */
export function* getPlaces(action) {
  const {
    payload: { query, onSuccess, onFailed },
  } = action;
  try { 
    const response = yield call(api.getPlaces, { query }); 
    const {
      data: { results },
    } = response;
    yield call(onSuccess, results);
  } catch (e) { 
    let error = catchError(e);
    yield call(onFailed, error);
  }
}
/**
   * handles fetching data from the getSearchHistory 
   * @memberOf components.Globals.reducers.saga
   * @function getSearchHistory 
   * @description
   *  it fetch bookmark history data
   * @param {action}  
   * onSuccess - Success response
   * onFailed - failed during server request
   * @return void 
   * 
 */
export function* getSearchHistory(action) { 
  const {
    payload: { onSuccess, onFailed },
  } = action;
  try { 
    const response = yield call(api.getSearchHistory);  
    yield call(onSuccess, response && response.data);
  } catch (e) { 
    let error = catchError(e);
    yield call(onFailed, error);
  }
}
/**
   * handles fetching data from the getSearchHistory 
   * @memberOf components.Globals.reducers.saga
   * @function setSearchHistory 
   * @description
   *  it set bookmark history data
   * @param {action}  
   * onSuccess - Success response
   * data - post data
   * onFailed - failed during server request
   * @return void 
   * 
 */
export function* setSearchHistory(action) { 
  const {
    payload: { data, onSuccess, onFailed },
  } = action;
  try { 
    const response = yield call(api.setSearchHistory, data); 
    yield call(onSuccess, response && response.data);
  } catch (e) {  
    let error = catchError(e);
    yield call(onFailed, error);
  }
}
/**
   * handles delte data from bookmarkHistory 
   * @memberOf components.Globals.reducers.saga
   * @function deleteSearchHistory 
   * @description
   *  it set bookmark history data
   * @param {action}  
   * onSuccess - Success response
   * data - post data
   * onFailed - failed during server request
   * @return void 
   * 
 */
export function* deleteSearchHistory(action) { 
  const {
    payload: { data, onSuccess, onFailed },
  } = action;
  try { 
    const response = yield call(api.deleteSearchHistory, data);  
    yield call(onSuccess, response);
  } catch (e) {
    let error = catchError(e);
    yield call(onFailed, error);
  }
}
/**
   * handles reducer placesReducer 
   * @memberOf components.Globals.reducers.saga
   * @array placesReducer 
   * @description
   *  it handle the actions binding with events
   * @param {action}  
   * @return void 
   * 
 */
const placesReducer = [
        takeLatest(types.GET_PLACES, getPlaces), 
        takeLatest(types.GET_SEARCH_HISTORY, getSearchHistory),
        takeLatest(types.SET_SEARCH_HISTORY, setSearchHistory),
        takeLatest(types.DELETE_SEARCH_HISTORY, deleteSearchHistory)
];
export default placesReducer;
