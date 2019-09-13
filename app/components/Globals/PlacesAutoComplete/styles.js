import Styled from 'styled-components';

/* eslint-disable prettier/prettier */
const StyledAutoCompleteWrapper = Styled.div`
  position: absolute;
  top: calc(${props => props.theme.defaultRem});
  left: calc(${props => props.theme.defaultRem});
  z-index: 100;
  max-width: calc(${props => props.theme.defaultRem} * 40);
  width: calc(100% - calc(${props => props.theme.defaultRem} * 7))  
  
`;
const StyledSearchHistoryWrapper = Styled.div`
  position: absolute;
  bottom: calc(${props => props.theme.defaultRem}); 
  z-index: 98;
  height:100%
  position: absolute; 
  z-index: 98; 
  width: 32rem;
  height: 100%;
  top: 0px;
  max-width: 32rem;
  right: 0; 
  
`;
const StyledAutoCompleteFormWrapper = Styled.form`
  height: calc(${props => props.theme.defaultRem} * 3.5);
  background: ${props => props.theme.colors.white};
  border-radius: calc(${props => props.theme.defaultRem} * 3.5);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width:35em;
  padding: calc(${props => props.theme.defaultRem} * 0.5);
  > * {
    height: 100%;
    padding: calc(${props => props.theme.defaultRem} * 0.5);
    > * {
      width: 100%;
      height: 100%;
      border: none;
      background-color: transparent;
      padding: 0;
    }
  }
`;
const StyledAutoCompleteInputWrapper = Styled.div`
  width: calc(100% - calc(${props => props.theme.defaultRem} * 3.5));
  > input {
    font-size: 1.5;
  }
`;
const StyledAutoCompleteButtonWrapper = Styled.div`
  width: calc(${props => props.theme.defaultRem} * 3.5);
  button {
    cursor: pointer;
  }
`;

const StyledAutoCompleteSuggestionsWrapper = Styled.div`
  ${props => props.modifier === 'list' && (`
    border-radius: calc(${props.theme.defaultRem} * 0.5);
    box-shadow: 0 calc(${props.theme.defaultRem} * 0.5) calc(${props.theme.defaultRem} * 1) rgba(0, 0, 0, 0.1);
    background-color: ${props.theme.colors.white};
    margin-top: calc(${props.theme.defaultRem} * 1);
  `)}
  ${props => props.modifier === 'carousel' && (`
  
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    flex-direction: column;
    align-items: flex-end;
    overflow-y: scroll;
    height: inherit; 
  `)}
`;
const StyledSuggestionItem = Styled.div`
  padding: calc(${props => props.theme.defaultRem} * 1);
  font-size: calc(${props => props.theme.defaultRem} * 1.2);
  cursor: pointer; 
  ${props => props.modifier === 'list' && (`
    &:not(:last-child){
      border: solid calc(${props.theme.defaultRem} * 0.1) ${props.theme.colors.borderColor};
    }  
    .bookmarkBtn {
      border: none;
      text-align: center;
      -webkit-text-decoration: none;
      text-decoration: none;
      display: block; 
      cursor: pointer;
      white-space: nowrap;
      width: 21%;
      background-color: #000;
      height: 22px;
      line-height: 2px;
      font-family: FancySans;
      font-size: 12px;
      float: right;
      position: a;
      /* line-height: 0em; */
      bottom: .5em;
    }
    .bookmarkico {
      float: right;
      height: 20px; 
      position: relative;
      bottom: 5px;
    }
    
  `)}

  ${props => props.index == 0 && props.modifier === 'carousel' && (`  
      animation-duration: 400ms;
      animation-name: blink;
      animation-iteration-count: infinite;
      animation-direction: alternate; 
      @keyframes blink {
          from {
            background-color: none;
          }
          to {
            background-color: #009e384f;
          }
        }
  `)}

  ${props => props.modifier === 'carousel' && (`
    & {
      > * {
        background-color: ${props.theme.colors.white};
        padding: calc(${props.theme.defaultRem} * 2);
        border-radius: calc(${props.theme.defaultRem} * 0.5);
        display: block; 
      } 
      width: 20em; 
      position:relative;
      left:3.5em; 
      .bookmarkButton { 
          border: none;  
          text-align: center;
          text-decoration: none;
          display: block; 
          margin: 4px 2px;
          cursor: pointer;  
          white-space: nowrap;
          width:100%;
          background-color: #000;
          height:10px;
          line-height: 2px;
          font-family: FancySans;
          font-size:12px;
      }
      .bookmark_span { 
          clear: both;
          display: inherit;
          padding: 1rem; 
          overflow:hidden;
      }
      .bookmark_h2 {
          line-height: 1.3em
      }
      .input {
          clear: both;
          display: inherit;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 14.8em;
      }
      .bookmark_h1{
        clear: both;
        display: inherit;
        line-height: 1.3em
        padding: 1rem; 
        font-size:14px;
        color:#B22222;
        overflow:hidden;
      } 
    }
  `)}
`;

export {
  StyledAutoCompleteWrapper,
  StyledSearchHistoryWrapper,
  StyledAutoCompleteFormWrapper,
  StyledAutoCompleteInputWrapper,
  StyledAutoCompleteButtonWrapper,
  StyledAutoCompleteSuggestionsWrapper,
  StyledSuggestionItem,
};
