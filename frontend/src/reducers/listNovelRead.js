import { SET_NOVEL_READ } from '~/actions';
import Cookies from 'js-cookie';

const initialReadList = JSON.parse(Cookies.get('novelsList') || '[]');

const setNovelsReadList = (state = initialReadList, action) => {
  switch (action.type) {
    case SET_NOVEL_READ:
      const updatedList = state.map((novel) => (novel.title === action.novelsList.title ? action.novelsList : novel));

      if (!updatedList.some((novel) => novel.title === action.novelsList.title)) {
        updatedList.push(action.novelsList);
      }

      Cookies.set('novelsList', JSON.stringify(updatedList));

      return updatedList;

    default:
      return state;
  }
};

export default setNovelsReadList;
