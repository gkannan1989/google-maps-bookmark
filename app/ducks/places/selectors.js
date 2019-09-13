/**
   * handles selectors 
   * @memberOf components.Globals.reducers.selectorys
   * @object selectors 
   * @description
   *  it handle the state data 
   * @return void 
   * 
 */
const selectors = {
  places: state => state.get('places'),
  bookmarkHistory: state => state.get('places').bookmarkHistory,
};
export default selectors;
