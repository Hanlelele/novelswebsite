import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

import { getHeaderData, getNewNovels } from '~/services/getApiService';

import { useType } from '~/typeContext';

import classnames from 'classnames/bind';
import styles from './SidebarPart2.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
const cx = classnames.bind(styles);

function SideBarPart2() {
  const { setSelectedType, setSelectedGenre } = useType();
  const { isDark } = useSelector((state) => state.styles);

  const [newNovels, setNewNovels] = useState([]);
  const [genres, setGenres] = useState([]);
  const [listNovelRead, setListNovelRead] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getNewNovels();
        setNewNovels(data);
        const genres = await getHeaderData();
        setGenres(genres.genres);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchApi();
  }, []);

  useEffect(() => {
    const listRead = Cookies.get('novelsList');
    if (listRead) {
      setListNovelRead(JSON.parse(listRead));
    }
  }, []);

  const handleItemClick = () => {
    setSelectedType('TRUYỆN MỚI CẬP NHẬT');
  };

  const handleGenreClick = (genreName) => {
    setSelectedGenre(genreName);
  };

  function timeAgo(timestamp) {
    const now = Math.floor(Date.now() / 1000); // Get current Unix timestamp in seconds
    const diff = now - timestamp;

    if (diff < 60) {
      return `${diff} giây trước`;
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} phút trước`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} giờ trước`;
    } else {
      const days = Math.floor(diff / 86400);
      return `${days} ngày trước`;
    }
  }

  return (
    <div className={cx({ 'dark-theme': isDark === 'true' }, 'container', 'list-index')} id="list-index">
      <div className={cx('list', 'list-truyen', 'col-12', 'col-sm-12', 'col-md-8', 'col-lg-8', 'col-truyen-main')}>
        <div className={cx('title-list')}>
          <h2>
            <Link to={`/types/all`} title="Truyện mới cập nhật" onClick={() => handleItemClick()}>
              Truyện mới cập nhật
              <FontAwesomeIcon className={cx('glyphicon', 'ms-1')} icon={faChevronRight} />
            </Link>
          </h2>
        </div>
        {newNovels.map((novel, index) => (
          <div className={cx('row')} key={index}>
            <div className={cx('col-9', 'col-sm-6', 'col-md-8', 'col-title', 'text-truncate')}>
              <FontAwesomeIcon className={cx('glyphicon', 'me-1')} icon={faChevronRight} />
              <span></span>
              <h3 itemProp="name">
                <Link to={`/detail/${novel.nameUrl}`}>{novel.title}</Link>
              </h3>
              <span className="label-title label-full"></span>
              <span className="label-title label-hot"></span>
            </div>
            <div className={cx('col-3', 'col-sm-3', 'col-md-2', 'text-info')}>{novel.lastChapter}</div>
            <div className={cx('hidden-xs', 'col-sm-3', 'col-md-2', 'col-time')}>{timeAgo(novel.lastUpdate)}</div>
          </div>
        ))}
      </div>

      <div className={cx('col-md-4', 'col-lg-4', 'col-truyen-side')}>
        <div className={cx('visible-md-block', 'visible-lg-block')}>
          {listNovelRead.length > 0 && (
            <div className={cx('list', 'list-truyen', 'list-history', 'col-xs-12')}>
              <div className={cx('title-list')}>
                <h2>Truyện đang đọc</h2>
              </div>
              {listNovelRead.map((novelRead, index) => (
                <div className={cx('row')} key={index}>
                  <div className={cx('col-md-5', 'col-lg-7')}>
                    <FontAwesomeIcon
                      className={cx('glyphicon', 'glyphicon-chevron-right', 'me-1')}
                      icon={faChevronRight}
                    />
                    <h3>
                      <Link to={`/detail/${novelRead.nameUrl}`}>{novelRead.title}</Link>
                    </h3>
                  </div>
                  <div className={cx('col-md-7', 'col-lg-5', 'text-info')}>
                    <Link to={`/${novelRead.nameUrl}/${novelRead.idChapter}`}>Đọc tiếp C {novelRead.idChapter}</Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={cx('list', 'list-truyen', 'list-cat')}>
            <div className={cx('title-list')}>
              <h4>Thể loại truyện</h4>
            </div>
            <div className={cx('row')}>
              {genres.map((genre, index) => (
                <div className={cx('col-lg-6', 'genreText')} key={index}>
                  <Link to={`/genre/${genre.slug}`} title={genre.name} onClick={() => handleGenreClick(genre.name)}>
                    {genre.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarPart2;
