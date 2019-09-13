/**
 * @memberOf components
 * @namespace components.Places
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Map from '../Globals/Map';
import PlacesAutoComplete from '../Globals/PlacesAutoComplete';

import { StyledPlacesWrapper } from './styles';
import MAP_INFO from '../../constants/mapInfo';

/**
 * class representing a component
 * @memberOf components.Places
 * @class Places
 * @classdesc
 * Places contains map and auto complete form and passes props that they need
 * @extends Component
 * @example
 * <Places getPlaces={getPlaces} placesBookmarkHistory={placesBookmarkHistory} />
 */
class Places extends Component {
  /**
   * initializes Places
   * @memberOf components.Places.Places
   * @constructs Places
   * @function constructor
   * @description initializes default states and gives access to class through the handlers
   * @param {object} props - props to extend
   * @return void
   */
  constructor(props) {
    super(props);

    const {
      location: { lat, lng },
    } = props;
    this.state = {
      lat,
      lng,
    };

    this.handleSetLocation = this.handleSetLocation.bind(this);
  }

  /**
   * sets a location
   * @memberOf components.Places.Places
   * @function handleSetLocation
   * @description sets given location to state of component
   * @param {object}   location - location to put in state
   * @param {function} callback - callback to call after setting location
   * @return void
   */
  handleSetLocation(location, callback = () => {}) {
    const { lat, lng } = location;
    this.setState(
      {
        lat,
        lng,
      },
      callback,
    );
  }
  /**
   * renders Places component
   * @memberOf components.Places.Places
   * @function render
   * @description passes properties and methods to child component
   * @return {jsx} - jsx component to show
   */
  render() {
    const { lat, lng } = this.state; 
    let { getPlaces, 
          getSearchHistory, 
          deleteSearchHistory, 
          setSearchHistory, 
          updateSearchHistory, 
          placesBookmarkHistory } = this.props;
    return (
      <StyledPlacesWrapper>
        <Map
          location={{ lat, lng }}
          hasMarker
          onSetLocation={this.handleSetLocation}
          autoAskGeoLocationAccess
          placesBookmarkHistory={placesBookmarkHistory}
        />
        <PlacesAutoComplete
          onSetLocation={this.handleSetLocation}
          onGetPlaces={getPlaces}
          onSetSearchHistory={setSearchHistory}
          onUpdateSearchHistory={updateSearchHistory}
          placesBookmarkHistory={placesBookmarkHistory}
          getSearchHistory={getSearchHistory}
          location={{ lat, lng }} 
          deleteSearchHistory={deleteSearchHistory}
        />
      </StyledPlacesWrapper>
    );
  }
}

/**
 * @memberOf components.Places.Places
 * @name propTypes
 * @type {object}
 * @description defines prop types of Places
 * @property {object}      [location]                - Location to pass to the map
 * @property {array}       placesBookmarkHistory       - array of user's bookmark history
 * @property {function}    getPlaces                 - function to dispatch getPlace action
 * @property {function}    setSearchHistory          - function to dispatch setSearchHistory action
 */
Places.propTypes = {
  location: PropTypes.object,
  placesBookmarkHistory: PropTypes.array.isRequired,
  getPlaces: PropTypes.func.isRequired,
  setSearchHistory: PropTypes.func.isRequired,
};

/**
 * @memberOf components.Places.Places
 * @name defaultProps
 * @type {object}
 * @description defines default props of Places
 * @property {object}      location            - Location to pass to the map
 */
Places.defaultProps = {
  location: MAP_INFO.defaultLocation,
};

/**
 * @memberOf components.Places.Places
 * @export Places
 * @description exports Places module.
 */
export default Places;
