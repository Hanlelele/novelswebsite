import {
  SET_BACKGROUND_COLOR,
  SET_FONT_FAMILY,
  SET_FONT_SIZE,
  SET_FULL_SCREEN,
  SET_LINE_HEIGHT,
  SET_DARK_THEME,
  SET_BODY_CHAPTER,
} from '~/actions';

const initialState = {
  fontSize: '16px',
  lineHeight: '100%',
  newType: 'no',
  newFont: 'Palatino Linotype, sans-serif',
  newColor: 'rgb(244, 244, 244)',
  isDark: 'false',
  isBodyChapterSet: false,
};

const styleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FONT_SIZE:
      return {
        ...state,
        fontSize: action.newSize,
      };
    case SET_LINE_HEIGHT:
      return {
        ...state,
        lineHeight: action.newHeight,
      };
    case SET_FULL_SCREEN:
      return {
        ...state,
        newType: action.newType,
      };
    case SET_FONT_FAMILY:
      return {
        ...state,
        newFont: action.newFont,
      };
    case SET_BACKGROUND_COLOR:
      return {
        ...state,
        newColor: action.newColor,
      };
    case SET_DARK_THEME:
      return {
        ...state,
        isDark: action.isDark,
      };
    case SET_BODY_CHAPTER:
      return {
        ...state,
        isBodyChapterSet: action.isBodyChapterSet,
      };
    default:
      return state;
  }
};

export default styleReducer;
