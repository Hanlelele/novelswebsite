export const SET_FONT_SIZE = 'SET_FONT_SIZE';
export const SET_LINE_HEIGHT = 'SET_LINE_HEIGHT';
export const SET_FULL_SCREEN = 'SET_FULL_SCREEN';
export const SET_FONT_FAMILY = 'SET_FONT_FAMILY';
export const SET_BACKGROUND_COLOR = 'SET_BACKGROUND_COLOR';
export const SET_DARK_THEME = 'SET_DARK_THEME';
export const SET_BODY_CHAPTER = 'SET_BODY_CHAPTER';
export const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const SET_NOVEL_READ = 'SET_NOVEL_READ';

export const toggleFull = (newFull) => ({
  type: 'TOGGLE_FULL',
  payload: newFull,
});

export const setFontSize = (newSize) => ({
  type: SET_FONT_SIZE,
  newSize: newSize,
});

export const setLineHeight = (newHeight) => ({
  type: SET_LINE_HEIGHT,
  newHeight: newHeight,
});

export const setFullScreen = (isFull) => ({
  type: SET_FULL_SCREEN,
  newType: isFull,
});

export const setFontFamily = (newFont) => ({
  type: SET_FONT_FAMILY,
  newFont: newFont,
});

export const setBackgroundColor = (newColor) => ({
  type: SET_BACKGROUND_COLOR,
  newColor: newColor,
});

export const setDarkTheme = (isDark) => ({
  type: SET_DARK_THEME,
  isDark: isDark,
});

export const setBodyChapter = (value) => ({
  type: SET_BODY_CHAPTER,
  isBodyChapterSet: value,
});

export const setSearchText = (searchText) => ({
  type: SET_SEARCH_TEXT,
  searchText: searchText,
});

export const setSearchResult = (searchList) => ({
  type: SET_SEARCH_RESULT,
  searchList: searchList,
});

export const setNovelRead = (novel) => {
  return {
    type: SET_NOVEL_READ,
    novelsList: novel,
  };
};
