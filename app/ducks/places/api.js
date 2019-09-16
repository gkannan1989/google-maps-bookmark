import axios from 'axios';
import axiosConfig from '../../utils/axiosConfig';

import URI from '../../constants/uri'; 

  /**
   * handles core part of server integration 
   * @memberOf components.Globals.places.API
   * @object api 
   * @description
   *  it has set of methods will handle core integration
   * @param {string}   empty 
   * @return void
   */

const api = {
  /**
   * handles get places 
   * @memberOf components.Globals.places.API
   * @function getPlaces
   * @description
   * we are triggering the google third party search
   * @param {string}   query  - it has the user query from browser
   * @return void
   */
  getPlaces({ query }) {
    const url = URI.GOOGLE_MAP.TEXT_SEARCH({
      query,
    });
    const config = axiosConfig({ url, method: 'GET' });
    return axios(config);
  },
  /**
   * handles get bookmark history
   * @memberOf components.Globals.places.API
   * @function getSearchHistory
   * @description
   * we are triggering get search history 
   * @param {string}   empty 
   * @return void
   */
  getSearchHistory() {
    const url = URI.BOOKMARK_END_POINT;
    const config = axiosConfig({ url, method: 'GET' , headers: {
      'Content-Type':'application/x-www-form-urlencoded',
      'Access-Control-Allow-Credentials':true
    } });
    return axios(config);
  },
  /**
   * set bookmark history
   * @memberOf components.Globals.places.API
   * @function setSearchHistory
   * @description
   * will show clicked place on map
   * @param {object}   payload -> id 
   * payload.id determine the nature of the request whether its POST or PUT
   * @return void
   */
  setSearchHistory(payload) {  
    const url = (URI.BOOKMARK_END_POINT + 
    (payload && payload.id ? '/'+payload.id : '')); 
    const config = axiosConfig({ url, method: (
      payload && payload.id ? 'PUT' : 'POST'), data:{bookmark:payload}
    })
    return axios(config);
  },
  /**
   * handles delete bookmark history
   * @memberOf components.Globals.places.API
   * @function deleteSearchHistory
   * @description
   * it will handle delete bookmark
   * @param {object}   payload   - object of bookmark item of a single place
   * @return void
   */
  deleteSearchHistory(payload) { 
    const url = URI.BOOKMARK_END_POINT + '/' + payload;
    const config = axiosConfig({ url, method: 'DELETE'});
    return axios(config);
  }
};
export default api;
