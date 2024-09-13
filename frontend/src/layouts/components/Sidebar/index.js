import SidebarPart1 from './SidebarPart1';
import SideBarPart2 from './SidebarPart2';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBodyChapter } from '~/actions';

function SideBar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBodyChapter(false));

    document.body.id = 'body_home';

    return () => {
      document.body.id = '';
    };
  }, [dispatch]);

  return (
    <>
      <SidebarPart1 />
      <SideBarPart2 />
    </>
  );
}

export default SideBar;
