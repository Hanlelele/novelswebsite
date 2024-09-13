import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripfire } from '@fortawesome/free-brands-svg-icons';

import { useSelector } from 'react-redux';

import Loading from '~/components/Loading/Loading';
import { Link } from 'react-router-dom';
import { getHotNovels } from '~/services/getApiService';
import classnames from 'classnames/bind';
import styles from './SidebarPart1.module.scss';
import { useState, useEffect } from 'react';
const cx = classnames.bind(styles);

function SidebarPart1() {
  const [hotNovels, setHotNovels] = useState([]);
  const { isDark } = useSelector((state) => state.styles);


  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getHotNovels();
        setHotNovels(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchApi();
  }, []);

  if (!hotNovels) {
    return <Loading />; 
  }

  return (
    <div className={cx({ 'dark-theme': isDark === 'true' }, 'container', 'mt-4', 'intro-index')} id="intro-index">
      <div className={cx('title-list', 'd-flex')}>
        <h2>
          <a className={cx('text-title')} href="https://truyenfull.vn/danh-sach/truyen-hot/">
            Truyện hot <FontAwesomeIcon icon={faGripfire} />
          </a>
        </h2>
      </div>
      <div className={cx('index-intro')}>
        {hotNovels.map((novel, index) => (
          <div className={cx('item', 'top-1')} key={index}>
            <Link to={`/detail/${novel.nameUrl}`}>
              {novel.status === 'Full' ? <span className={cx('full-label')}></span> : ''}
              <img src={novel.cover} alt={novel.title} className={cx('img-responsive', 'item-img')} itemProp="image" />
              <div className={cx('title')}>
                <h3>{novel.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidebarPart1;
