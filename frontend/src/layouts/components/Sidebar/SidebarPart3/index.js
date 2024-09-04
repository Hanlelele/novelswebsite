//import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

import { getAlls } from '~/services/getApiService';

import classnames from 'classnames/bind';
import styles from './SidebarPart3.module.scss';
import { useState, useEffect } from 'react';
const cx = classnames.bind(styles);

function SidebarPart3() {
  const [completedNovels, setCompletedNovels] = useState([]);

  const { isDark } = useSelector((state) => state.styles);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getAlls();
        setCompletedNovels(data.hotNovelList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchApi();
  }, []);

  return (
    <div className={cx({ 'dark-theme': isDark === 'true' }, 'container', 'truyen-slide')} id="truyen-slide">
      <div className={cx('list', 'list-thumbnail', 'col-xs-12')}>
        <div className={cx('title-list')}>
          <h2>
            <a className={cx('text-title')} href="https://truyenfull.vn/danh-sach/truyen-hot/">
              Truyện đã hoàn thành <FontAwesomeIcon icon={faChevronRight} />
            </a>
          </h2>
        </div>
        <div className={cx('row')}>
          {completedNovels.slice(0, 12).map((completedNovel, index) => (
            <div className={cx('col-xs-4', 'col-sm-3', 'col-md-2')} key={index}>
              {' '}
              <a href="https://truyenfull.vn/cong-luoc-trai-tim/chuong-1/" title="Công Lược Trái Tim">
                <img className={cx('lazyimg')} src={completedNovel.coverUrl} alt={completedNovel.title} />
                <div className={cx('caption')}>
                  <h3>{completedNovel.title}</h3>{' '}
                  <small className={cx('btn-xs', 'label-primary')}>Full - {completedNovel.newestChapter} chương</small>
                </div>
              </a>
            </div>
          ))}

          {/* <div className={cx('col-xs-4', 'col-sm-3', 'col-md-2')}>
            {' '}
            <a href="https://truyenfull.vn/cong-luoc-trai-tim/chuong-1/" title="Công Lược Trái Tim">
              <img
                className={cx('lazyimg')}
                src="https://imgtruyentr.staticscdn.net/2021/06/10/cong-luoc-trai-tim-215x322.jpg?1"
                alt="Công Lược Trái Tim"
              />
              <div className={cx('caption')}>
                <h3>Công Lược Trái Tim</h3> <small className={cx('btn-xs', 'label-primary')}>Full - 250 chương</small>
              </div>
            </a>
          </div>
          <div className={cx('col-xs-4', 'col-sm-3', 'col-md-2')}>
            {' '}
            <a href="https://truyenfull.vn/cong-luoc-trai-tim/chuong-1/" title="Công Lược Trái Tim">
              <img
                className={cx('lazyimg')}
                src="https://imgtruyentr.staticscdn.net/2021/06/10/cong-luoc-trai-tim-215x322.jpg?1"
                alt="Công Lược Trái Tim"
              />
              <div className={cx('caption')}>
                <h3>Công Lược Trái Tim</h3> <small className={cx('btn-xs', 'label-primary')}>Full - 250 chương</small>
              </div>
            </a>
          </div>
          <div className={cx('col-xs-4', 'col-sm-3', 'col-md-2')}>
            {' '}
            <a href="https://truyenfull.vn/cong-luoc-trai-tim/chuong-1/" title="Công Lược Trái Tim">
              <img
                className={cx('lazyimg')}
                src="https://imgtruyentr.staticscdn.net/2021/06/10/cong-luoc-trai-tim-215x322.jpg?1"
                alt="Công Lược Trái Tim"
              />
              <div className={cx('caption')}>
                <h3>Công Lược Trái Tim</h3> <small className={cx('btn-xs', 'label-primary')}>Full - 250 chương</small>
              </div>
            </a>
          </div>
          <div className={cx('col-xs-4', 'col-sm-3', 'col-md-2')}>
            {' '}
            <a href="https://truyenfull.vn/cong-luoc-trai-tim/chuong-1/" title="Công Lược Trái Tim">
              <img
                className={cx('lazyimg')}
                src="https://imgtruyentr.staticscdn.net/2021/06/10/cong-luoc-trai-tim-215x322.jpg?1"
                alt="Công Lược Trái Tim"
              />
              <div className={cx('caption')}>
                <h3>Công Lược Trái Tim</h3> <small className={cx('btn-xs', 'label-primary')}>Full - 250 chương</small>
              </div>
            </a>
          </div>
          <div className={cx('col-xs-4', 'col-sm-3', 'col-md-2')}>
            {' '}
            <a href="https://truyenfull.vn/cong-luoc-trai-tim/chuong-1/" title="Công Lược Trái Tim">
              <img
                className={cx('lazyimg')}
                src="https://imgtruyentr.staticscdn.net/2021/06/10/cong-luoc-trai-tim-215x322.jpg?1"
                alt="Công Lược Trái Tim"
              />
              <div className={cx('caption')}>
                <h3>Công Lược Trái Tim</h3> <small className={cx('btn-xs', 'label-primary')}>Full - 250 chương</small>
              </div>
            </a>
          </div>
          <div className={cx('col-xs-4', 'col-sm-3', 'col-md-2')}>
            {' '}
            <a href="https://truyenfull.vn/cong-luoc-trai-tim/chuong-1/" title="Công Lược Trái Tim">
              <img
                className={cx('lazyimg')}
                src="https://imgtruyentr.staticscdn.net/2021/06/10/cong-luoc-trai-tim-215x322.jpg?1"
                alt="Công Lược Trái Tim"
              />
              <div className={cx('caption')}>
                <h3>Công Lược Trái Tim</h3> <small className={cx('btn-xs', 'label-primary')}>Full - 250 chương</small>
              </div>
            </a>
          </div>
          <div className={cx('col-xs-4', 'col-sm-3', 'col-md-2')}>
            {' '}
            <a href="https://truyenfull.vn/cong-luoc-trai-tim/chuong-1/" title="Công Lược Trái Tim">
              <img
                className={cx('lazyimg')}
                src="https://imgtruyentr.staticscdn.net/2021/06/10/cong-luoc-trai-tim-215x322.jpg?1"
                alt="Công Lược Trái Tim"
              />
              <div className={cx('caption')}>
                <h3>Công Lược Trái Tim</h3> <small className={cx('btn-xs', 'label-primary')}>Full - 250 chương</small>
              </div>
            </a>
          </div>
          <div className={cx('col-xs-4', 'col-sm-3', 'col-md-2')}>
            {' '}
            <a href="https://truyenfull.vn/cong-luoc-trai-tim/chuong-1/" title="Công Lược Trái Tim">
              <img
                className={cx('lazyimg')}
                src="https://imgtruyentr.staticscdn.net/2021/06/10/cong-luoc-trai-tim-215x322.jpg?1"
                alt="Công Lược Trái Tim"
              />
              <div className={cx('caption')}>
                <h3>Công Lược Trái Tim</h3> <small className={cx('btn-xs', 'label-primary')}>Full - 250 chương</small>
              </div>
            </a>
          </div>
          <div className={cx('col-xs-4', 'col-sm-3', 'col-md-2')}>
            {' '}
            <a href="https://truyenfull.vn/cong-luoc-trai-tim/chuong-1/" title="Công Lược Trái Tim">
              <img
                className={cx('lazyimg')}
                src="https://imgtruyentr.staticscdn.net/2021/06/10/cong-luoc-trai-tim-215x322.jpg?1"
                alt="Công Lược Trái Tim"
              />
              <div className={cx('caption')}>
                <h3>Công Lược Trái Tim</h3> <small className={cx('btn-xs', 'label-primary')}>Full - 250 chương</small>
              </div>
            </a>
          </div>
          <div className={cx('col-xs-4', 'col-sm-3', 'col-md-2')}>
            {' '}
            <a href="https://truyenfull.vn/cong-luoc-trai-tim/chuong-1/" title="Công Lược Trái Tim">
              <img
                className={cx('lazyimg')}
                src="https://imgtruyentr.staticscdn.net/2021/06/10/cong-luoc-trai-tim-215x322.jpg?1"
                alt="Công Lược Trái Tim"
              />
              <div className={cx('caption')}>
                <h3>Công Lược Trái Tim</h3> <small className={cx('btn-xs', 'label-primary')}>Full - 250 chương</small>
              </div>
            </a>
          </div>
          <div className={cx('col-xs-4', 'col-sm-3', 'col-md-2')}>
            {' '}
            <a href="https://truyenfull.vn/cong-luoc-trai-tim/chuong-1/" title="Công Lược Trái Tim">
              <img
                className={cx('lazyimg')}
                src="https://imgtruyentr.staticscdn.net/2021/06/10/cong-luoc-trai-tim-215x322.jpg?1"
                alt="Công Lược Trái Tim"
              />
              <div className={cx('caption')}>
                <h3>Công Lược Trái Tim</h3> <small className={cx('btn-xs', 'label-primary')}>Full - 250 chương</small>
              </div>
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SidebarPart3;
