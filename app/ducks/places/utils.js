/**
   * handle normalize search history
   * @memberOf components.Globals.reducers.utils
   * @object utils 
   * @description
   *  utility to handle bookmark data
   * @return void 
   * 
 */
import { sortBy } from 'lodash';
const utils = {
  normalizeSearchHistory(bookmarkHistory, payload) {
    const filteredSearchHistory = bookmarkHistory.filter(
      item => (item && item.title && item.title.toUpperCase()) !== (payload && payload.title && payload.title.toUpperCase()),
    );
    filteredSearchHistory.unshift(payload);
    if (filteredSearchHistory.length > 10) {
      filteredSearchHistory.pop();
    }
    return sortBy(filteredSearchHistory, 'title');
  },
};
export default utils;
