/**
 * @memberOf containers
 * @namespace containers.Hoc
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { withCookies } from 'react-cookie';
import Moment from 'moment-jalaali';


/**
 * class representing a container
 * @memberOf containers.Hoc
 * @class Hoc
 * @classdesc HOC or High Order Component, is the main component that initializes app, handles redirect to entry point and sets flags on user to detect later
 * @extends Component
 * @example
 * <Hoc history={history} />
 */
import App from '../App';

class Hoc extends Component {
  /**
   * initializes Hoc
   * @memberOf containers.Hoc.Hoc
   * @constructs Hoc
   * @function constructor
   * @description implements parent class's methods and properties, and passes object instance to handlers
   * @param {object} props - props to extend
   * @return void
   */
  constructor(props) {
    super(props);

    this.handleSetCookie = this.handleSetCookie.bind(this);
  }

  /**
   * operations after mounting components
   * @memberOf containers.Hoc.Hoc
   * @function componentDidMount
   * @description initializes application and finds out where should be the entry point, initializes jalaali dates, adds an event listener to avoid context menu for mobile devices, and sets a cookie to track user later
   * @return void
   */
  componentDidMount() {
    Moment.loadPersian({
      dialect: 'persian-modern',
      usePersianDigits: true,
    });
    this.handleSetCookie();
  }

  /**
   * sets a cookie
   * @memberOf containers.Hoc.Hoc
   * @function handleSetCookie
   * @description sets a cookie as UDID for user only one time to track user
   * @return void
   */
  handleSetCookie() {
    const { cookies } = this.props;
    if (!cookies.get('UDID')) {
      const timestamp = Math.floor(new Date().getTime() / 1000);
      const randomNumber = Math.floor(Math.random() * 9999999999 + 1000000000);
      const expires = new Date();
      expires.setTime(expires.getTime() + 3000 * 24 * 60 * 60 * 1000);
      cookies.set('UDID', `${timestamp}${randomNumber}`, {
        expires,
      });
    }
  }

  /**
   * renders Hoc container
   * @memberOf containers.Hoc.Hoc
   * @function render
   * @description passes properties and methods to child component
   * @return {jsx} - jsx component to show
   */
  render() {
    const { history } = this.props;
    return (
      <Fragment>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Fragment>
    );
  }
}

/**
 * @memberOf containers.Hoc.Hoc
 * @name propTypes
 * @type {object}
 * @description defines prop types of Hoc
 * @property {object}    history                   - object of history
 * @property {object}    [cookies]                 - SELF INJECTION, object of cookies which is injected by react-cookies
 */
Hoc.propTypes = {
  history: PropTypes.object.isRequired,
  cookies: PropTypes.object,
};
/**
 * @memberOf containers.Hoc.Hoc
 * @export Hoc
 * @description injects router props, connects states and dispatches to Hoc module.
 */
export default withCookies(Hoc);
