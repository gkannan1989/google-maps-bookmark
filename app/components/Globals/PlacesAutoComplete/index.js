/**
 * @memberOf components.Globals
 * @namespace components.Globals.PlacesAutoComplete
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import PlacesAutoCompleteForm from './PlacesAutoCompleteForm';
import PlacesAutoCompleteSuggestion from './PlacesAutoCompleteSuggestion'; 
import LoadingIcon from '../../../resources/images/loading-ico1.gif';
import defaultMessages from '../../../constants/defaultMessages';

import {
  StyledAutoCompleteWrapper,
  StyledSearchHistoryWrapper,
} from './styles';

/**
 * class representing a component
 * @memberOf components.Globals.PlacesAutoComplete
 * @class PlacesAutoComplete
 * @classdesc
 * Places auto complete will render a form which can get places from google places api
 * and shows suggestions, or user's places search history
 * @extends Component
 * @example
 * <PlacesAutoComplete
     onSetLocation={onSetLocation}
     onGetPlaces={onGetPlaces}
     placesBookmarkHistory={placesBookmarkHistory}
     location={location}
   />
 */
class PlacesAutoComplete extends Component {
  /**
   * initializes PlacesAutoComplete
   * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
   * @constructs PlacesAutoComplete
   * @function constructor
   * @description initializes default states and gives access to class through the handlers
   * @param {object} props - props to extend
   * @return void
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      query: '',
      places: [],
      placesAutoCompleteSuggestionVisibility: false,
      history: [] 
    };

    this.node = null;

    this.handleToggleLoading = this.handleToggleLoading.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleSetQuery = this.handleSetQuery.bind(this);
    this.handleGetPlaces = this.handleGetPlaces.bind(this);
    this.handleSetPlaces = this.handleSetPlaces.bind(this);
    this.handlePlacesSearchHistoryItemClick = this.handlePlacesSearchHistoryItemClick.bind(
      this,
    );
    this.handleSetPlacesAutoCompleteSuggestionVisibility = this.handleSetPlacesAutoCompleteSuggestionVisibility.bind(
      this,
    );
    this.handlePlacesItemClick = this.handlePlacesItemClick.bind(this);
  }

  /**
   * operations after mounting components
   * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
   * @function componentDidMount
   * @description attaches outside click function to window click
   * @return void
   */
  componentDidMount() {
    window.addEventListener('click', this.handleOutsideClick);
    this.handleToggleLoading();
    this.props.getSearchHistory({ 
      onSuccess: results => { 
        this.handleToggleLoading();
        if(results) {
          this.props.onUpdateSearchHistory({ 
            history: (results)
          });
        }
        else {
          toast.error(defaultMessages.errorOccurred);
        }  
      },
      onFailed: message => {
        this.handleToggleLoading();
        toast.error(defaultMessages.errorOccurred); /** generic error */
      },
    })
  }

  /**
   * toggles loading state of component
   * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
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
   * handles visibility of suggestions
   * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
   * @function handleOutsideClick
   * @description handles visibility of suggestions based on users target click,
   * if clicked area is child of this component it would show suggestions, but if it's not, it will hide suggestions
   * @return void
   */
  handleOutsideClick(e) {
    let placesAutoCompleteSuggestionVisibility = true;
    if (this.node && !this.node.contains(e.target)) {
      placesAutoCompleteSuggestionVisibility = false;
    }
    this.handleSetPlacesAutoCompleteSuggestionVisibility(
      placesAutoCompleteSuggestionVisibility,
    );
  }

  /**
   * handles set query into the state
   * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
   * @function handleSetQuery
   * @description
   * puts user input into the state of the component to show in form and send to the api
   * @param {string}   query       - user input to set in state of the component
   * @param {function} callback    - function to call after setting the query
   * @return void
   */
  handleSetQuery(query, callback = () => {}) { 
    this.setState(
      {
        query,
      },
      callback,
    );
  }

  /**
   * handles api call for getting places from google api service
   * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
   * @function handleGetPlaces
   * @description
   * dispatches an action with given parameters to get places from google api service,
   * in case of succeed, callback will put places into the state,
   * and in case of failure it would toast a message.
   * @return void
   */
  handleGetPlaces(e) {
    if (e) {
      e.preventDefault();
    }

    const { query, loading } = this.state;
    const { onGetPlaces, placesBookmarkHistory } = this.props;
    const trimmedQuery = query ? query.trim() : '';
    if (!loading && trimmedQuery) {
      this.handleToggleLoading();
      onGetPlaces({
        query: trimmedQuery,
        onSuccess: results => { 
          const places = [];
          results.forEach(item => {
            const {
              geometry: {
                location: { lat, lng },
              },
              name: title,
            } = item;
            places.push({
              lat,
              lng,
              title,
              editable: false 
            });
          });
          this.handleSetPlaces(places, () => {
            this.handleSetPlacesAutoCompleteSuggestionVisibility(true);
            this.handleToggleLoading();
          });
        },
        onFailed: message => {
          this.handleToggleLoading();
          toast.error(defaultMessages.errorOccurred); /** generic error */
        },
      });
    }
  }

  /**
   * handles set places into the state
   * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
   * @function handleSetPlaces
   * @description
   * puts given places into the state to render as suggestions
   * @param {array}   places       - array of places to set into the state
   * @param {function} callback    - function to call after setting the places
   * @return void
   */
  handleSetPlaces(places, callback = () => {}) {
    console.log(places);
    this.setState(
      {
        places,
      },
      callback,
    );
  }

  /**
   * handles click on search history item
   * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
   * @function handlePlacesSearchHistoryItemClick
   * @description
   * will put clicked item into the search query and submit the form to get the related result
   * @param {object}   bookmarkHistory       - object of item of a single bookmark history
   * @return void
   */
  handlePlacesSearchHistoryItemClick(bookmarkHistory) {
    const { type, title, editable, lat, lng } = bookmarkHistory;
    if (!editable) {
      this.handleSetPlacesAutoCompleteSuggestionVisibility(false);
     // this.handleSetQuery(title, this.handleGetPlaces);
      this.props.onSetLocation({ lat, lng });
    } else if (type === "place") {
      this.handlePlacesItemClick(bookmarkHistory);
    } 
  }

  /**
   * handles get bookmark history list
   * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
   * @function handleGetSearchHistory
   * @description
   * will fetch the updated bookmark history from the server
   * @param {string}   key - key determine where the user triggered this action
   * @return void
   */

  handleGetSearchHistory(results, key) {
    if(results || key == 'onDelete') {
      this.props.getSearchHistory({ 
        onSuccess: results => {  
          this.handleToggleLoading();
          if(results) {
            this.props.onUpdateSearchHistory({ 
              history: results
            });
            if(key == 'handleItemClick') {
              /** scroll to top view */
              let element = document.getElementById("firstCard");
              element && element.scrollIntoView();
              /** */
            }
          } else {
            toast.error(defaultMessages.errorOccurred);
          }     
        },
        onFailed: message => {
          this.handleToggleLoading();
          toast.error(defaultMessages.errorOccurred); /** generic error */
        },
      })
    }
    else {
      toast.error(defaultMessages.errorOccurred);
    }
    
  }

  /**
   * handles click on suggested place item
   * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
   * @function handlePlacesItemClick
   * @description
   * will show clicked place on map
   * @param {object}   place       - object of item of a single place
   * @return void
   */
  handlePlacesItemClick(place) {
    const { onSetLocation, onSetSearchHistory } = this.props;
    const { lat, lng, title } = place;
    this.handleSetPlacesAutoCompleteSuggestionVisibility(false);
    this.handleSetQuery(title);
    onSetLocation({ lat, lng });
    this.handleToggleLoading(); 
    onSetSearchHistory({
      data: place, 
      onSuccess: results => { 
        this.handleGetSearchHistory(results, 'handleItemClick')
        // if(results) {
        //   this.handleGetSearchHistory('handleItemClick')
        // } else {
        //   toast.error(defaultMessages.errorOccurred);
        // }
      },
      onFailed: message => {
        this.handleToggleLoading();
        toast.error(defaultMessages.errorOccurred); /** generic error */
      },
    })
    
  }

  /**
   * handles visibility of suggestion box
   * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
   * @function handleSetPlacesAutoCompleteSuggestionVisibility
   * @description
   * puts visibility of suggestion box into the state
   * @param {boolean}   placesAutoCompleteSuggestionVisibility     - visibility of suggestion box
   * @return void
   */
  handleSetPlacesAutoCompleteSuggestionVisibility(
    placesAutoCompleteSuggestionVisibility,
  ) {
    this.setState({
      placesAutoCompleteSuggestionVisibility,
    });
  }

 /**
   * handles on edit of the history item
   * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
   * @function onEdit
   * @description
   * it handle the edit history item of the bookmark history
   * @param {string}   e   - user selected element
   * @param {function} toggle    - deciding parameter for edit or cancel action to update editable flag
   * @return void
   */
  onEdit = (e, toggle) => {
    e.stopPropagation();
    const { onSetSearchHistory, placesBookmarkHistory } = this.props; 
    const currID = e.currentTarget.getAttribute('idx')
    placesBookmarkHistory.map((place, id) => {
      if(place.id == currID) {
        placesBookmarkHistory[id].editable = (toggle ? false : true);
        this.handleToggleLoading();
        onSetSearchHistory({
          data: placesBookmarkHistory[id], 
          id: currID,
          onSuccess: results => { 
            this.handleGetSearchHistory(results);   
          },
          onFailed: message => {
            this.handleToggleLoading();
            toast.error(defaultMessages.errorOccurred); /** generic error */
          },
        })
      }
    })    
}
/**
 * handles on delete of the history item
 * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
 * @function onDelete
 * @description
 * it removes the bookmark item of the bookmark history
 * @param {string} e - user selected element 
 * @return void
 */
  onDelete = (e) => { 
    e.stopPropagation();
    const { deleteSearchHistory } = this.props;
    this.handleToggleLoading();  
    deleteSearchHistory({
      data: e.currentTarget.getAttribute('idx'), 
      onSuccess: results => {  
        this.handleGetSearchHistory(results, 'onDelete');  
      },
      onFailed: message => {
        this.handleToggleLoading();
        toast.error(defaultMessages.errorOccurred);/** generic error */
      },
    })
  }

/**
 * handles cancel action in the bookmark model 
 * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
 * @function onCancel
 * @description
 * it cancel the bookmark edit item block in the bookmark history
 * @param {string} e - user selected element 
 * @return void
 */
  onCancel = (e) => {
    this.onEdit(e, true); 
  };

/**
 * handles changes to save in the bookmark history block
 * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
 * @function onDelete
 * @description
 * it removes the bookmark item of the bookmark history
 * @param {string} e - user selected element 
 * @return void
 */
  onSave = (e) => {
   e.stopPropagation(); 
   const { onSetSearchHistory, placesBookmarkHistory } = this.props; 
   let currID = e.currentTarget.getAttribute('idx');
   placesBookmarkHistory.map((place, id) => { 
     if(place.id == currID)
     {
       let title = document.getElementById("title_"+id).value;
       let lat = document.getElementById("lat_"+id).value;
       let lng = document.getElementById("lng_"+id).value;
       if(!isNaN(lat) && lat != "" && title != "" && !isNaN(lng) && lng != "") {
          placesBookmarkHistory[id].title = title;
          placesBookmarkHistory[id].lat = parseFloat(lat);
          placesBookmarkHistory[id].lng = parseFloat(lng); 
          placesBookmarkHistory[id].editable = false;
          this.handleToggleLoading(); 
          onSetSearchHistory({
            data: placesBookmarkHistory[id], 
            id: currID,
            onSuccess: results => {
                this.handleToggleLoading(); 
                this.handleGetSearchHistory(results);
            },
            onFailed: message => {
              this.handleToggleLoading();
              toast.error(defaultMessages.errorOccurred); /** generic error */
            }
        })
       }
       else {
        toast.error(defaultMessages.inputError)
       }
     }
   }) 
  }  
 
  /**
   * renders PlacesAutoComplete component
   * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
   * @function render
   * @description renders an auto complete form with search history and places as suggestion
   * @return {jsx} - jsx component to show
   */
  render() {
    let { placesBookmarkHistory } = this.props; 
    const {
      places,
      query,
      loading,
      placesAutoCompleteSuggestionVisibility  
    } = this.state;   
    const suggestionVisibility = placesAutoCompleteSuggestionVisibility && places.length && !loading; 
    return (
      <Fragment>
        <img className={loading ? "loading_show" : "loading_hide"} src={LoadingIcon}/>
        <StyledAutoCompleteWrapper
          innerRef={node => {
            this.node = node;
          }}
        > 
          <PlacesAutoCompleteForm
            loading={loading}
            query={query}
            onSetQuery={this.handleSetQuery}
            onFormSubmit={this.handleGetPlaces}
          />
          {suggestionVisibility && (
            <PlacesAutoCompleteSuggestion
              suggestions={places}
              onSuggestionClick={this.handlePlacesItemClick}
              onEdit={this.onEdit}
              onDelete={this.onDelete}
              onSave={this.onSave}
              onCancel={this.onCancel}
              editing={false}
              placesBookmarkHistory={placesBookmarkHistory}
            />
          )} 
        </StyledAutoCompleteWrapper>
        {placesBookmarkHistory && placesBookmarkHistory.length && (
          <StyledSearchHistoryWrapper>
            <PlacesAutoCompleteSuggestion
              suggestions={placesBookmarkHistory}
              onSuggestionClick={this.handlePlacesSearchHistoryItemClick}
              modifier="carousel"
              onEdit={this.onEdit}
              onDelete={this.onDelete}
              onSave={this.onSave}
              onCancel={this.onCancel}
              editing={false} 
            /> 
          </StyledSearchHistoryWrapper>
        )} 
      </Fragment>
    );
  }

  /**
   * operations before unmounting components
   * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
   * @function componentWillUnmount
   * @description detaches outside click function from window click
   * @return void
   */
  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
  }
}

/**
 * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
 * @name propTypes
 * @type {object}
 * @description defines prop types of PlacesAutoComplete
 * @property {function}     onSetLocation            - function to pass selected location to parent
 * @property {function}     onGetPlaces              - dispatches an action to getPlaces
 * @property {function}     onSetSearchHistory       - dispatches an action to onSetSearchHistory
 * @property {array}        [placesBookmarkHistory]    - user's search history of queries
 */
PlacesAutoComplete.propTypes = {
  onSetLocation: PropTypes.func.isRequired,
  onGetPlaces: PropTypes.func.isRequired,
  onSetSearchHistory: PropTypes.func.isRequired,
  placesBookmarkHistory: PropTypes.array,
};

/**
 * @memberOf components.Globals.PlacesAutoComplete.PlacesAutoComplete
 * @export PlacesAutoComplete
 * @description exports PlacesAutoComplete module.
 */
export default PlacesAutoComplete;
