/**
 * @memberOf components.Globals.PlacesAutoComplete
 * @namespace components.Globals.PlacesAutoComplete.PlacesAutoCompleteForm
 */
import React from 'react';
import PropTypes from 'prop-types';

import defaultMessages from '../../../constants/defaultMessages';

import TypingDone from '../TypingDone';
import Icon from '../Icon';

import {
  StyledAutoCompleteFormWrapper,
  StyledAutoCompleteInputWrapper,
  StyledAutoCompleteButtonWrapper,
} from './styles';

/**
 * function represents a stateless component
 * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoCompleteForm
 * @function PlacesAutoCompleteForm
 * @description
 * renders a form to let user search and passes search query to parent
 * @param {object}   props     - props of component that were given by parent
 * @return {jsx} - jsx component to show
 * @example
 * <PlacesAutoCompleteForm
     loading={loading}
     query={query}
     onSetQuery={onSetQuery}
     onFormSubmit={onFormSubmit}
    />
 */
/* eslint-disable no-nested-ternary */
const PlacesAutoCompleteForm = props => {
  const { loading, query, onSetQuery, onFormSubmit } = props;
  return (
    <StyledAutoCompleteFormWrapper onSubmit={onFormSubmit}>
      <StyledAutoCompleteInputWrapper>
        <TypingDone
          onChangeValue={onSetQuery}
          disabled={loading}
          onTypingDone={onFormSubmit}
          placeholder={defaultMessages.searchPlaces}
          value={query}
          type="text"
        />
      </StyledAutoCompleteInputWrapper>
      <StyledAutoCompleteButtonWrapper>
        <button
          className={loading ? 'spinner' : ''}
          type="button"
          onClick={() => onSetQuery('')}
          disabled={loading}
        >
          <Icon
            name={loading ? 'spinner' : query ? 'cross' : 'search'}
            size={1.5}
          /> 
        </button>
      </StyledAutoCompleteButtonWrapper>
    </StyledAutoCompleteFormWrapper>
  );
};

/**
 * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoCompleteForm
 * @name propTypes
 * @type {object}
 * @description defines prop types of PlacesAutoCompleteForm
 * @property {boolean}         [loading]            - defines if any loading in progress from parent
 * @property {string}          [query]              - user's input query in form
 * @property {function}        onSetQuery           - function to pass query to parent
 * @property {function}        onFormSubmit         - function to submit form
 */
PlacesAutoCompleteForm.propTypes = {
  loading: PropTypes.bool,
  query: PropTypes.string,
  onSetQuery: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
/**
 * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoCompleteForm
 * @name defaultProps
 * @type {object}
 * @description defines default props of PlacesAutoCompleteForm
 * @property {boolean}         [loading]            - sets false for default loading
 * @property {string}          [query]              - sets an empty string as default query
 */
PlacesAutoCompleteForm.defaultProps = {
  loading: false,
  query: '',
};

/**
 * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoCompleteForm
 * @export PlacesAutoCompleteForm
 * @description exports PlacesAutoCompleteForm module.
 */
export default PlacesAutoCompleteForm;
