import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faRectangleList,
} from '@fortawesome/free-solid-svg-icons';

import classnames from 'classnames/bind';
import styles from './Reader.module.scss';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getNovelChapter } from '~/services/getApiService';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNovelRead, toggleFull, setBodyChapter } from '~/actions';

const cx = classnames.bind(styles);

function Reader() {
  const [chapter, setChapter] = useState({});

  const dispatch = useDispatch();
  const full = useSelector((state) => state.full);

  const { novel, idChapter } = useParams();

  const handleToggleFull = () => {
    dispatch(toggleFull(!full));
  };

  const { fontSize, lineHeight, newType, newFont, newColor, isDark } = useSelector((state) => state.styles);

  useEffect(() => {
    document.body.id = 'body_chapter';
    dispatch(setBodyChapter(true));

    if (newColor === '1') {
      document.body.style.backgroundColor = 'rgb(194, 180, 155)';
      document.body.style.backgroundImage = 'url(//static.8cache.com/img/bg_book_op.png)';
      document.body.style.backgroundRepeat = 'repeat';
    } else if (newColor === '2') {
      document.body.style.backgroundColor = 'rgb(242, 242, 242)';
      document.body.style.backgroundImage = 'url(//static.8cache.com/img/bg_op.png)';
      document.body.style.backgroundRepeat = 'repeat';
    } else if (newColor === '3' || isDark === 'true') {
      document.body.style.backgroundColor = '#232323';
      document.body.style.backgroundImage = 'url(https://static.8cache.com/img/bg_dark.gif)';
      document.body.style.backgroundRepeat = 'repeat';
    } else {
      document.body.style.backgroundColor = newColor;
    }

    return () => {
      document.body.id = '';
      document.body.style.backgroundColor = '';
      document.body.style.backgroundImage = '';
      document.body.style.backgroundRepeat = '';
    };
  }, [newColor, isDark, dispatch]);

  useEffect(() => {
    const element = document.querySelector('#chapter-big-container');
    if (element) {
      element.style.marginTop = full ? '10px' : '0px';
    }
  }, [full]);

  useEffect(() => {
    const element = document.querySelector('#chapter-c');
    if (element) {
      element.style.fontSize = fontSize;
      element.style.lineHeight = lineHeight;
      element.style.fontFamily = newFont;
    }

    const elementID_Home = document.getElementById('body_chapter');
    elementID_Home.style.backgroundColor = newColor;
  }, [fontSize, lineHeight, newFont, newColor]);

  const setContanier = newType === 'yes' ? 'container-fluid' : 'container';

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getNovelChapter(novel, idChapter);
        setChapter(data);
        if (data && data.title) {
          const novelInfo = { title: data.title, idChapter, nameUrl: novel };
          dispatch(setNovelRead(novelInfo));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchApi();
  }, [novel, idChapter, dispatch]);

  if (!chapter.title) {
    return <div>Loading...</div>; // Or a better loading indicator
  }

  return (
    <div id="chapter-big-container" className={cx(setContanier, { 'dark-theme': isDark === 'true' }, 'chapter')}>
      <div className={cx('row')}>
        <div className={cx('col-12', 'chapterdetail')}>
          <button
            type="button"
            className={cx('btn', 'btn-responsive', 'btn-success', 'toggle-nav-open')}
            onClick={handleToggleFull}
          >
            <span className={cx('glyphicon')}>
              {full ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
            </span>
          </button>
          <Link className={cx('truyen-title')} to={`/detail/${novel}/1`}>
            {chapter.title}
          </Link>
          <h2>
            <span className={cx('chapter-title', 'chapter-text')}>{chapter.chapterTitle}</span>
          </h2>
          <hr className={cx('chapter-start')} />
          <div className={cx('chapter-nav')} id="chapter-nav-top">
            <div className={cx('btn-group')}>
              <Link
                className={cx('btn', 'btn-success', 'btn-chapter-nav', {
                  disabled: chapter.previousChapterUrl === '#',
                })}
                to={`/${novel}/${chapter.previousChapterUrl}`}
                title={chapter.previousChapterUrl}
              >
                <span className={cx('glyphicon')}>
                  <FontAwesomeIcon className={cx('font-click-left')} icon={faChevronLeft} />
                </span>
                <span className={cx('hidden-xs')}>Chương </span>trước
              </Link>
              <button type="button" className={cx('btn', 'btn-success', 'btn-chapter-nav', 'chapter_jump')}>
                <span className={cx('glyphicon')}>
                  <FontAwesomeIcon className={cx('font-click-list')} icon={faRectangleList} />
                </span>
              </button>
              <Link
                className={cx('btn', 'btn-success', 'btn-chapter-nav', {
                  disabled: chapter.nextChapterUrl === '#',
                })}
                to={`/${novel}/${chapter.nextChapterUrl}`}
                title={chapter.nextChapterUrl}
                id="next_chap"
              >
                <span className={cx('hidden-xs')}>Chương </span>tiếp
                <span className={cx('glyphicon')}>
                  <FontAwesomeIcon className={cx('font-click-right')} icon={faChevronRight} />
                </span>
              </Link>
            </div>
          </div>
          <br />
          <hr className={cx('chapter-end')} />
          <div id="chapter-c" className={cx('chapter-c')} dangerouslySetInnerHTML={{ __html: chapter.content }} />
          <hr className={cx('chapter-end')} />
          <div className={cx('chapter-nav')} id="chapter-nav-top">
            <div className={cx('btn-group')}>
              <Link
                className={cx('btn', 'btn-success', 'btn-chapter-nav', {
                  disabled: chapter.previousChapterUrl === '#',
                })}
                to={`/${novel}/${chapter.previousChapterUrl}`}
              >
                <span className={cx('glyphicon')}>
                  <FontAwesomeIcon className={cx('font-click-left')} icon={faChevronLeft} />
                </span>
                <span className={cx('hidden-xs')}>Chương </span>trước
              </Link>
              <button type="button" className={cx('btn', 'btn-success', 'btn-chapter-nav', 'chapter_jump')}>
                <span className={cx('glyphicon')}>
                  <FontAwesomeIcon className={cx('font-click-list')} icon={faRectangleList} />
                </span>
              </button>
              <Link
                className={cx('btn', 'btn-success', 'btn-chapter-nav', {
                  disabled: chapter.nextChapterUrl === '#',
                })}
                to={`/${novel}/${chapter.nextChapterUrl}`}
                id="next_chap"
              >
                <span className={cx('hidden-xs')}>Chương </span>tiếp
                <span className={cx('glyphicon')}>
                  <FontAwesomeIcon className={cx('font-click-right')} icon={faChevronRight} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reader;
