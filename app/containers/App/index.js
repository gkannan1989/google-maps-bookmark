/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import PlacesPage from 'containers/PlacesPage/Loadable';

// import PrivateRoutes from './PrivateRoutes';

import routers from '../../constants/routers';

function App() {
  return (
    <Router>
      <div>
        <Route
          render={({ location }) => {
            const routes = (
              <Switch location={location}>
                <Route path={routers.sample} component={PlacesPage} />
              </Switch>
            );
            return routes;
          }}
        />
        <ToastContainer />
      </div>
    </Router>
  );
}
export default App;
