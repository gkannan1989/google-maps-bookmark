import React from 'react';
import { connect } from 'react-redux';
import coreActions from '../../ducks/app/actions';

const widthLog = () => WrappedComponent => {
  const WrappedProvider = props => <WrappedComponent {...props} />;
  const mapDispatchToProps = dispatch => ({
    saveLog: payload => dispatch(coreActions.saveLog(payload)),
  });
  return connect(
    null,
    mapDispatchToProps,
  )(WrappedProvider);
};
export default widthLog;
