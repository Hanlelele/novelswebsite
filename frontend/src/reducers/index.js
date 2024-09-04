import { combineReducers } from '@reduxjs/toolkit';
import toggleFull from './toggel-full';
import styleReducer from './option';
import searchResult from './search';
import setNovelsReadList from './listNovelRead';

const rootReducer = combineReducers({
  full: toggleFull,
  styles: styleReducer,
  searchResult: searchResult,
  novelsList: setNovelsReadList,
});

export default rootReducer;
