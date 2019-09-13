/**
 * @memberOf components.Globals.PlacesAutoComplete
 * @namespace components.Globals.PlacesAutoComplete.PlacesAutoCompleteSuggestion
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledAutoCompleteSuggestionsWrapper,
  StyledSuggestionItem,
} from './styles';
import defaultMessages from '../../../constants/defaultMessages';
import bookMarkerFullIcon from '../../../resources/images/bookmark-full.png';
import bookMarkerEmptyIcon from '../../../resources/images/bookmark-empty.png';

/**
 * function represents a stateless component
 * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoCompleteSuggestion
 * @function PlacesAutoCompleteSuggestion
 * @description
 * renders a list of suggestion items and bookmark history items
 * @param {object}   props     - props of component that were given by parent
 * @return {jsx} - jsx component to show
 * @example
 * <PlacesAutoCompleteSuggestion
     suggestions={suggestions}
     onSuggestionClick={onSuggestionClick}
  />
      
 */
/* eslint-disable react/no-array-index-key */ 
const PlacesAutoCompleteSuggestion = props => {
  const { suggestions, 
          onSuggestionClick, 
          modifier, 
          onEdit, 
          onSave, 
          onDelete, 
          onCancel, 
          placesBookmarkHistory } = props;
  
  return (
    <StyledAutoCompleteSuggestionsWrapper modifier={modifier}>
      {suggestions && suggestions.length ? (
        suggestions.map((suggestion, index) => { 
          const { title, 
                  lat, 
                  lng,
                  editable, 
                  id } = suggestion;
          /** flag that determine whether the place bookmarked or not */
          let isBookmarked = false; 
          /** identifying whether the history has the item or not */
          (modifier && modifier == "list" && placesBookmarkHistory.map((places, idx) => { 
            if(suggestion.title == places.title) {
              isBookmarked = true;
            }
          }))
          return ( 
            <StyledSuggestionItem
              key={index + 'new1' + id} 
              modifier={modifier}
              index={index}
              id={index == 0 ? 'firstCard' : ''}
              onClick={() => !isBookmarked ? onSuggestionClick(suggestion) : ''}
            > 
             { modifier == 'carousel' ? 
                (editable ? 
                <div key={index + 'key1' + id}>
                   <input id={"title_"+`${index}`} idx={id} className="input" defaultValue={title}/> 
                   <input id={"lat_"+`${index}`} idx={id} className="input" defaultValue={lat}/> 
                   <input id={"lng_"+`${index}`} idx={id} className="input" defaultValue={lng}/> 
                   
                 </div> 
                 : 
                <div key={index + 'key2' + id} onClick={() => onSuggestionClick(suggestion)}>
                   <span className="bookmark_h1">{title}</span> 
                   <span className="bookmark_h2 bookmark_span">{title}</span> 
                   <span className="bookmark_span">{modifier == 'carousel' ? 'Latitude: ' + lat : ''}</span>
                   <span className="bookmark_span">{modifier == 'carousel' ? 'Longitude: '+ lng : ''}</span> 
                 </div>)
              :
              (<React.Fragment>
                <span className="bookmark_span">{title}</span>  
                <span><img className="bookmarkico" src={isBookmarked ? bookMarkerFullIcon : bookMarkerEmptyIcon} /></span>
              </React.Fragment>)
             } 
             { modifier == 'carousel' ? 
               <React.Fragment>
                  {
                    editable ? 
                    (<React.Fragment>
                      <button type="button" idx={id} className='bookmarkButton button' onClick={(e) => onSave(e)} >Save</button>
                      <button type="button" idx={id} className='bookmarkButton button' onClick={(e) => onCancel(e)}>Cancel</button>
                    </React.Fragment>) : 
                    (<React.Fragment>
                      <button type="button" idx={id} className='bookmarkButton button'  onClick={(e) => onEdit(e)} >Edit</button>
                      <button type="button" idx={id} className='bookmarkButton button'   onClick={(e) => onDelete(e)}>Delete</button>
                    </React.Fragment>)
                  } 
               </React.Fragment> : '' 
             }
            </StyledSuggestionItem> 
          );
        })
      ) : (
        <StyledSuggestionItem key={index +'key4' + id} >{defaultMessages.noResult}</StyledSuggestionItem>
      )}
    </StyledAutoCompleteSuggestionsWrapper>
  );
};

/**
 * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoCompleteSuggestion
 * @name propTypes
 * @type {object}
 * @description defines prop types of PlacesAutoCompleteSuggestion
 * @property {array}         [suggestions]            - defines if any loading in progress from parent
 * @property {string}        [modifier]               - decides hos the component should be rendered, as a list or carousel.
 * @property {function}      onSuggestionClick        - function to call when user clicks on a suggestion item
 */
PlacesAutoCompleteSuggestion.propTypes = {
  suggestions: PropTypes.array,
  modifier: PropTypes.oneOf(['list', 'carousel']),
  onSuggestionClick: PropTypes.func.isRequired,
};
/**
 * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoCompleteSuggestion
 * @name defaultProps
 * @type {object}
 * @description defines default props of PlacesAutoCompleteSuggestion
 * @property {array}         [suggestions]          - sets an empty array as default suggestions
 * @property {string}        [modifier]             - sets list as default modifier
 */
PlacesAutoCompleteSuggestion.defaultProps = {
  suggestions: [],
  modifier: 'list',
};

/**
 * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoCompleteSuggestion
 * @export PlacesAutoCompleteSuggestion
 * @description exports PlacesAutoCompleteSuggestion module.
 */
export default PlacesAutoCompleteSuggestion;
