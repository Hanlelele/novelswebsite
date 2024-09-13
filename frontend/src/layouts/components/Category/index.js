import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPencil } from '@fortawesome/free-solid-svg-icons';

import Pagination from '~/components/Pagination';

import { useSelector } from 'react-redux';
import Loading from '~/components/Loading/Loading';
import { useType } from '~/typeContext';
import classnames from 'classnames/bind';
import styles from './Category.module.scss';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getNovelsByGenre, searchNovel, getHeaderData } from '~/services/getApiService';
const cx = classnames.bind(styles);

function Category() {
  const { isDark } = useSelector((state) => state.styles);

  const { searchText } = useSelector((state) => state.searchResult);
  const [novels, setNovels] = useState([]);
  const [genres, setGenres] = useState([]);
  const [description, setDescription] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const { selectedType, selectedGenre, setSelectedGenre } = useType();

  const { type, genre } = useParams();

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        let data;

        const genres = await getHeaderData();
        if (type) {
          data = await getNovelsByGenre(type, currentPage);
        } else if (genre) {
          data = await getNovelsByGenre(genre, currentPage);
        } else {
          data = await searchNovel(searchText, currentPage);
        }
        if (data) {
          setGenres(genres.genres);
          setDescription(data?.description);
          setNovels(data.novels);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchNovels();
  }, [type, genre, currentPage, searchText]);

  useEffect(() => {
    const setCurrentPageToOne = () => {
      setCurrentPage(1);
    };

    setCurrentPageToOne();
  }, [type, genre, searchText]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreClick = (genreName) => {
    setSelectedGenre(genreName);
  };

  if (!novels) {
    return <Loading />;
  }
  return (
    <div className={cx({ 'dark-theme': isDark === 'true' }, 'container', 'list-page')} id="list-page">
      <div className="row">
        <div className={cx('col-12', 'col-sm-12', 'col-md-9', 'col-lg-9', 'col-truyen-main')}>
          <div className={cx('list', 'list-truyen')}>
            <div className={cx('title-list')}>
              <h2>
                {type ? selectedType : genre ? 'TRUYỆN ' + selectedGenre : 'TÌM TRUYỆN VỚI TỪ KHÓA: ' + searchText}
              </h2>
            </div>
            {novels.map((novel, index) => (
              <div className={cx('row', 'form-row')} key={index}>
                <div className={cx('col-3')}>
                  <div>
                    <img src={novel.cover} className={cx('cover')} alt={novel.title} />
                  </div>
                </div>
                <div className={cx('col-7 d-flex flex-column justify-content-evenly')}>
                  <div>
                    <span className={cx('glyphicon', 'glyphicon-book')}>
                      <FontAwesomeIcon icon={faBook} />
                    </span>
                    <h3 className={cx('truyen-title')} itemProp="name">
                      <Link to={`/detail/${novel.nameUrl}`} title={novel.title}>
                        {novel.title}
                      </Link>
                    </h3>
                    {novel.isFull && <span className={cx('label-title', 'label-full')}>Full</span>}
                    {novel.isHot && <span className={cx('label-title', 'label-hot')}>Hot</span>}
                  </div>
                  <span className={cx('author')} itemProp="author">
                    <span className={cx('glyphicon', 'glyphicon-pencil')}>
                      <FontAwesomeIcon className={cx('pencil')} icon={faPencil} />
                    </span>{' '}
                    {novel.author}
                  </span>
                </div>
                <div className={cx('col-2', 'text-info')}>
                  <div>
                    <span>{novel.lastChapter}</span>
                  </div>
                </div>
              </div>
            ))}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
        <div className={cx('col-md-3', 'col-lg-3', 'col-truyen-side')}>
          {genre && (
            <div className={cx('panel', 'cat-desc', 'text-start')}>
              <div className={cx('panel-body')} dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          )}

          <div className={cx('list', 'list-truyen', 'list-cat', 'panel')}>
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

export default Category;
