import { SET_SEARCH_RESULT, SET_SEARCH_TEXT } from '~/actions';

const initialSearch = {
  searchText: '',
  searchList: [],
};

const searchResult = (state = initialSearch, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULT:
      return {
        ...state,
        searchResult: action.searchList,
      };
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.searchText,
      };
    default:
      return state;
  }
};

export default searchResult;
