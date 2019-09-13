/**
 * @memberOf components.Globals
 * @namespace components.Globals.Map
 */
import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import MAP_INFO from '../../../constants/mapInfo';

import Marker from './Marker';
import GeoLocationTracker from './GeoLocationTracker';

import { StyledMapWrapper, StyledGeoLocationTrackerWrapper } from './styles';

/**
 * function represents a Map component
 * @memberOf components.Globals.Map
 * @function Map
 * @description
 * renders a map using google map service
 * @param {object}   props     - props of component that were given by parent
 * @return {jsx} - jsx component to show
 * @example
 * <Map
     zoom={zoom}
     location={location}
     hasMarker={hasMarker}
  />
 */
const Map = props => {
  const {
    zoom,
    location: { lat, lng },
    hasMarker,
    autoAskGeoLocationAccess,
    showGeoLocationTrackerButton,
    onSetLocation,
    placesBookmarkHistory
  } = props; 
  return (
    <StyledMapWrapper>
      <GoogleMapReact
        bootstrapURLKeys={{ key: MAP_INFO.key }}
        defaultZoom={zoom}
        center={{ lat, lng }}
      >
        {hasMarker && placesBookmarkHistory &&
          placesBookmarkHistory.map((place, idx) => {
            return (<Marker key={idx} lat={place.lat} lng={place.lng} />)
          }
        )}
      </GoogleMapReact>
      <StyledGeoLocationTrackerWrapper>
        <GeoLocationTracker
          autoAskGeoLocationAccess={autoAskGeoLocationAccess}
          showGeoLocationTrackerButton={showGeoLocationTrackerButton}
          onSetLocation={onSetLocation}
        />
      </StyledGeoLocationTrackerWrapper>
    </StyledMapWrapper>
  );
};

/**
 * @memberOf components.Globals.Map
 * @name propTypes
 * @type {object}
 * @description defines prop types of Map
 * @property {number}         [zoom]                             - zoom level of map
 * @property {object}         [location]                         - center position of map
 * @property {boolean}        [hasMarker]                        - defines that map has any marker to show or not
 * @property {boolean}        [hasMarker]                        - defines that map has any marker to show or not
 * @property {boolean}        [autoAskGeoLocationAccess]         - defines that map can asks for user's geo location
 * @property {boolean}        [showGeoLocationTrackerButton]     - defines that map has button to ask for user's geo location
 * @property {func}           [onSetLocation]                    - function to pass given location by geo location tracker to parent
 */
Map.propTypes = {
  zoom: PropTypes.number,
  location: PropTypes.object,
  hasMarker: PropTypes.bool,
  autoAskGeoLocationAccess: PropTypes.bool,
  showGeoLocationTrackerButton: PropTypes.bool,
  onSetLocation: PropTypes.func,
};

/**
 * @memberOf components.Globals.Map
 * @name defaultProps
 * @type {object}
 * @description defines default props of Map
 * @property {number}         [zoom]                             - defines default zoom of map
 * @property {object}         [location]                         - defines default center position of map
 * @property {boolean}        [hasMarker]                        - defines that map has any marker to show or not
 * @property {boolean}        [autoAskGeoLocationAccess]         - disables asking geo location of user by default
 * @property {boolean}        [showGeoLocationTrackerButton]     - shows a button to ask user's geo location by default
 * @property {func}           [onSetLocation]                    - makes onSetLocation optional for maps without geo location tracking button
 */
Map.defaultProps = {
  zoom: MAP_INFO.zoom,
  location: MAP_INFO.defaultLocation,
  hasMarker: false,
  autoAskGeoLocationAccess: false,
  showGeoLocationTrackerButton: true,
  onSetLocation: () => {},
};

/**
 * @memberOf components.Globals.Map
 * @export Map
 * @description exports Map module.
 */
export default Map;
