import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from '~/components/Pagination';
import Loading from '~/components/Loading/Loading';
import { getDetailOfNovels, getNovelsByGenre } from '~/services/getApiService';

import classnames from 'classnames/bind';
import styles from './Detail.module.scss';
import { useEffect, useState } from 'react';
const cx = classnames.bind(styles);

function Detail() {
  const { isDark } = useSelector((state) => state.styles);

  const [detailNovel, setDetailNovel] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [hotNovels, setHotNovels] = useState();

  const [moreButton, setMoreButton] = useState(false);

  const { novel } = useParams();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getDetailOfNovels(novel, currentPage);
        const hotNovels = await getNovelsByGenre('truyen-duoc-xem-nhieu-nhat', 1);
        setHotNovels(hotNovels.novels.slice(0, 10));
        setDetailNovel(data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchApi();
  }, [novel, currentPage]);

  // Check if detailNovel has the necessary properties before rendering
  if (!detailNovel.title) {
    return <Loading />; 
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const half = Math.ceil(detailNovel.chapters.length / 2);
  const firstHalf = detailNovel.chapters.slice(0, half);
  const secondHalf = detailNovel.chapters.slice(half);

  const handleChangeLimit = () => {
    setMoreButton(!moreButton);
  };

  return (
    <div className={cx({ 'dark-theme': isDark === 'true' }, 'container', 'csstransforms3d', 'truyen')} id="truyen">
      <div className="row">
        <div className={cx('col-12', 'col-lg-9', 'col-truyen-main')}>
          <div className={cx('col-12', 'col-info-desc', 'clearfix')}>
            <div className={cx('title-list', 'book-intro')}>
              <h2>Thông tin truyện</h2>
            </div>
            <h3 className={cx('title')} itemProp="name">
              {detailNovel.title}
            </h3>
            <div className={cx('col-12', 'col-sm-4', 'col-md-4', 'col-lg-4', 'info-holder')}>
              <div className={cx('books')}>
                <div className={cx('book')}>
                  <img src={detailNovel.coverUrl} alt={detailNovel.title} itemProp="image" className={cx('image')} />
                </div>
              </div>
              <div className={cx('info')}>
                <div>
                  <h3>Tác giả:</h3>
                  <span itemProp="author">{detailNovel.author}</span>
                </div>
                <div>
                  <h3>Thể loại:</h3>
                  {detailNovel.genres &&
                    detailNovel.genres.map((genre, index) => (
                      <span key={index}>
                        <a itemProp="genre" href={`/genre/${genre.genreUrl}/`} title={genre.name}>
                          {genre.genreName}
                        </a>
                        {index < detailNovel.genres.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                </div>
                <div>
                  <h3>Nguồn:</h3>
                  <span className={cx('source')}>sưu tầm</span>
                </div>
                <div>
                  <h3>Trạng thái:</h3>
                  <span className={cx('text-primary')}>{detailNovel.status}</span>
                </div>
              </div>
            </div>
            <div className={cx('col-12', 'col-sm-8', 'col-md-8', 'col-lg-8', 'desc')}>
              <div
                className={cx('desc-text', 'desc-text-full', { showfull: moreButton })}
                id="desc-text"
                dangerouslySetInnerHTML={{ __html: detailNovel.summary }}
              />
              <div className={cx('showmore')}>
                <span
                  className={cx('btn', 'btn-default', 'btn-xs')}
                  id="morebutton"
                  title="Xem thêm"
                  onClick={handleChangeLimit}
                >
                  {moreButton ? <span>&laquo; Thu gọn</span> : 'Xem thêm »'}
                </span>
              </div>
            </div>
          </div>
          <div className={cx('col-xs-12', 'list-chapter-first')} id="list-chapter">
            <div className={cx('title-list')}>
              <h2>Danh sách chương</h2>
            </div>
            <div className={cx('row', 'clearfix')}>
              <div className={cx('col-xs-12', 'col-sm-6', 'col-md-6')}>
                <ul className={cx('list-chapter')}>
                  {firstHalf.map((chapter, index) => (
                    <li key={index}>
                      <span className={cx('glyphicon', 'glyphicon-certificate')}>
                        <FontAwesomeIcon className={cx('iconlist')} icon={faCertificate} />
                      </span>{' '}
                      <Link to={`/${novel}/${chapter.url}`} title={chapter.title}>
                        <span className={cx('chapter-text')}>{chapter.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={cx('col-xs-12', 'col-sm-6', 'col-md-6')}>
                <ul className={cx('list-chapter')}>
                  {secondHalf.map((chapter, index) => (
                    <li key={index}>
                      <span className={cx('glyphicon', 'glyphicon-certificate')}>
                        <FontAwesomeIcon className={cx('iconlist')} icon={faCertificate} />
                      </span>{' '}
                      <Link to={`/${novel}/${chapter.url}`} title={chapter.title}>
                        <span className={cx('chapter-text')}>{chapter.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              baseLink={`/detail/${novel}`}
            />
          </div>
        </div>
        <div className={cx('visible-lg-block', 'col-lg-3', 'text-center', 'col-truyen-side')}>
          <div className={cx('list', 'list-truyen', 'list-side')}>
            <div className={cx('title-list')}>
              <h4>Truyện đang hot</h4>
            </div>
            {hotNovels.map((novel, index) => (
              <div className={cx('row', 'top-item')} key={index}>
                <div className={cx('d-flex')}>
                  <div
                    className={cx(
                      'top-num',
                      index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : 'top',
                    )}
                  >
                    {index + 1}
                  </div>
                  <div className={cx('d-flex', 'flex-column', 'info_top')}>
                    <div className={cx('s-title')}>
                      <h3>
                        <Link to={`/detail/${novel.nameUrl}`} title={novel.title}>
                          {novel.title}
                        </Link>
                      </h3>
                    </div>
                    <div>
                      <span itemProp="genre" href="https://truyenfull.vn/the-loai/tien-hiep/" title="Tiên Hiệp">
                        {novel.author}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
