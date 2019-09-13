/**
 * @memberOf components.Globals.Map
 * @namespace components.Globals.Map.GeoLocationTracker
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import defaultMessages from '../../../constants/defaultMessages';

//import Icon from '../Icon';

import { StyledTrackButton } from './styles';
import locationIcon from '../../../resources/images/location-icon.png';
import LoadingIcon from '../../../resources/images/loading-ico1.gif';

/**
 * class representing a component
 * @memberOf components.Globals.Map.GeoLocationTracker
 * @class GeoLocationTracker
 * @classdesc
 * Geo location tracker will ask user to give permission to gave parent component the given location
 * @extends Component
 * @example
 * <GeoLocationTracker
     autoAskGeoLocationAccess={autoAskGeoLocationAccess}
     showGeoLocationTrackerButton={showGeoLocationTrackerButton}
     onSetLocation={onSetLocation}
    />
 */
class GeoLocationTracker extends Component {
  /**
   * initializes GeoLocationTracker
   * @memberOf components.Globals.Map.GeoLocationTracker.GeoLocationTracker
   * @constructs GeoLocationTracker
   * @function constructor
   * @description initializes default states and gives access to class through the handlers
   * @param {object} props - props to extend
   * @return void
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    this.handleToggleLoading = this.handleToggleLoading.bind(this);
    this.handleAskGeoLocationAccess = this.handleAskGeoLocationAccess.bind(
      this,
    );
    this.handleAcceptGeoLocationAccess = this.handleAcceptGeoLocationAccess.bind(
      this,
    );
    this.handleDismissGeoLocationAccess = this.handleDismissGeoLocationAccess.bind(
      this,
    );
  }

  /**
   * operations after mounting components
   * @memberOf components.Globals.Map.GeoLocationTracker.GeoLocationTracker
   * @function componentDidMount
   * @description asks for geo location tracking permission
   * @return void
   */
  componentDidMount() {
    const { autoAskGeoLocationAccess } = this.props;
    if (autoAskGeoLocationAccess) {
      this.handleAskGeoLocationAccess();
    }
  }

  /**
   * toggles loading state of component
   * @memberOf components.Globals.Map.GeoLocationTracker.GeoLocationTracker
   * @function handleToggleLoading
   * @description toggles loading state of component
   * @return void
   */
  handleToggleLoading() {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
    });
  }

  /**
   * asks for geo location tracking permission
   * @memberOf components.Globals.Map.GeoLocationTracker.GeoLocationTracker
   * @function handleAskGeoLocationAccess
   * @description shows the tracking location permission popup of the browser
   * @return void
   */
  handleAskGeoLocationAccess() {
    if (navigator.geolocation) {
      this.handleToggleLoading();
      navigator.geolocation.getCurrentPosition(
        this.handleAcceptGeoLocationAccess,
        this.handleDismissGeoLocationAccess,
      );
    } else {
      this.handleDismissGeoLocationAccess();
    }
  }

  /**
   * handles the geo location tracking confirmation
   * @memberOf components.Globals.Map.GeoLocationTracker.GeoLocationTracker
   * @function handleAcceptGeoLocationAccess
   * @description passes user location to parent component if user accept the geo location permission
   * @return void
   */
  handleAcceptGeoLocationAccess(position) {
    const { onSetLocation } = this.props;
    const {
      coords: { latitude: lat, longitude: lng },
    } = position;
    onSetLocation({ lat, lng });
    this.handleToggleLoading();
  }

  /**
   * handles the geo location tracking dismiss
   * @memberOf components.Globals.Map.GeoLocationTracker.GeoLocationTracker
   * @function handleDismissGeoLocationAccess
   * @description toasts an error if geo location tracking be dismissed by user or other reasons
   * @return void
   */
  handleDismissGeoLocationAccess(error = false) {
    let message = defaultMessages.geoLocationFailed;
    if (error && error.code && error.code === error.PERMISSION_DENIED) {
      message = defaultMessages.geoLocationPermissionDenied;
    }
    toast.error(message);
    this.handleToggleLoading();
  }

  /**
   * renders GeoLocationTracker component
   * @memberOf components.Globals.Map.GeoLocationTracker.GeoLocationTracker
   * @function render
   * @description renders a geo location tracking button
   * @return {jsx} - jsx component to show
   * <Icon
          className={loading ? 'spinner' : ''}
          name={loading ? 'spinner' : 'map-marker'}
          size={2}
        />
   */
  render() {
    const { loading } = this.state;
    const { showGeoLocationTrackerButton } = this.props;
    if (!showGeoLocationTrackerButton) {
      return null;
    }
    return (
      <StyledTrackButton
        disabled={loading}
        onClick={this.handleAskGeoLocationAccess}
      >
      <img className={loading ? "loadingshow" : "loadinghide"} src={LoadingIcon}/>
      <img className={"locationIco"} src={locationIcon}/> 
      </StyledTrackButton>
    );
  }
}

/**
 * @memberOf components.Globals.Map.GeoLocationTracker.GeoLocationTracker
 * @name propTypes
 * @type {object}
 * @description defines prop types of GeoLocationTracker
 * @property {boolean}        [autoAskGeoLocationAccess]         - defines that map can asks for user's geo location
 * @property {boolean}        [showGeoLocationTrackerButton]     - defines that map has button to ask for user's geo location
 * @property {func}           onSetLocation                      - function to pass given location by geo location tracker to parent
 */
GeoLocationTracker.propTypes = {
  autoAskGeoLocationAccess: PropTypes.bool,
  showGeoLocationTrackerButton: PropTypes.bool,
  onSetLocation: PropTypes.func.isRequired,
};
/**
 * @memberOf components.Globals.Map.GeoLocationTracker.GeoLocationTracker
 * @name defaultProps
 * @type {object}
 * @description defines default props of GeoLocationTracker
 * @property {boolean}        [autoAskGeoLocationAccess]         - disables asking geo location of user by default
 * @property {boolean}        [showGeoLocationTrackerButton]     - shows a button to ask user's geo location by default
 */
GeoLocationTracker.defaultProps = {
  autoAskGeoLocationAccess: false,
  showGeoLocationTrackerButton: true,
};

/**
 * @memberOf components.Globals.Map.GeoLocationTracker.GeoLocationTracker
 * @export GeoLocationTracker
 * @description exports GeoLocationTracker module.
 */
export default GeoLocationTracker;
