/**
 * @memberOf containers
 * @namespace containers.PlacesPage
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import placesSelectors from '../../ducks/places/selectors';
import placesActions from '../../ducks/places/actions';

import Places from '../../components/Places';

import { StyledPlacesContainer } from './styles';

/**
 * class representing a container
 * @memberOf containers.PlacesPage
 * @class PlacesPage
 * @classdesc
 *  PlacesPage contains action dispatcher and states that are related to places,
 *  such as getting places or giving search history of places.
 * @extends Component
 * @example
 * <PlacesPage />
 */
/* eslint-disable react/prefer-stateless-function */
class PlacesPage extends Component {
  /**
   * renders PlacesPage container
   * @memberOf containers.PlacesPage.PlacesPage
   * @function render
   * @description passes properties and methods to child component
   * @return {jsx} - jsx component to show
   */
  render() { 
    let { getPlaces, 
          setSearchHistory, 
          deleteSearchHistory, 
          updateSearchHistory, 
          placesBookmarkHistory, 
          getSearchHistory } = this.props; 
    return (
      
      <StyledPlacesContainer>
          <Places
            getPlaces={getPlaces}
            setSearchHistory={setSearchHistory}
            updateSearchHistory={updateSearchHistory}
            placesBookmarkHistory={placesBookmarkHistory}
            getSearchHistory={getSearchHistory} 
            deleteSearchHistory={deleteSearchHistory}
          />
      </StyledPlacesContainer>
    );
  }
}


/**
 * @memberOf containers.PlacesPage.PlacesPage
 * @name mapStateToProps
 * @type {function}
 * @description maps states to prop for PlacesPage
 * @params {object} state    - receives app state as parameter
 * @return {object}          - returns mapped props of given state
 */
const mapStateToProps = state => ({
  placesBookmarkHistory: placesSelectors.bookmarkHistory(state),
});

/**
 * @memberOf containers.PlacesPage.PlacesPage
 * @name mapDispatchToProps
 * @type {function}
 * @description maps dispatch to prop for PlacesPage
 * @params {function} dispatch    - receives dispatch function as parameter
 * @return {object}               - returns mapped props of given dispatch to dispatch an action by calling a function
 */
const mapDispatchToProps = dispatch => ({
  getPlaces: payload => dispatch(placesActions.getPlaces(payload)),
  setSearchHistory: payload => dispatch(placesActions.setSearchHistory(payload)),
  updateSearchHistory: payload => dispatch(placesActions.updateSearchHistory(payload)),
  getSearchHistory: payload => dispatch(placesActions.getSearchHistory(payload)),
  deleteSearchHistory: payload => dispatch(placesActions.deleteSearchHistory(payload))
});

/**
 * @memberOf containers.PlacesPage.PlacesPage
 * @name propTypes
 * @type {object}
 * @description defines prop types of PlacesPage
 * @property {array}       placesBookmarkHistory       - SELF INJECTION, array of user's search history
 * @property {function}    getPlaces                 - SELF INJECTION, function to dispatch getPlace action
 * @property {function}    setSearchHistory          - SELF INJECTION, function to dispatch setSearchHistory action
 */
PlacesPage.propTypes = {
  placesBookmarkHistory: PropTypes.array.isRequired,
  getPlaces: PropTypes.func.isRequired,
  setSearchHistory: PropTypes.func.isRequired,
};

/**
 * @memberOf containers.PlacesPage.PlacesPage
 * @export PlacesPage
 * @description injects router props, connects states and dispatches to PlacesPage module.
 */
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PlacesPage),
);
