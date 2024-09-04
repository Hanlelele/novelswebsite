import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import images from '~/assets/images';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/esm/Button';

import Search from '~/components/Search';

import { useType } from '~/typeContext';
import Option from '~/components/Option';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faGear } from '@fortawesome/free-solid-svg-icons';

import classnames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { setDarkTheme } from '~/actions';
import { getHeaderData } from '~/services/getApiService';

const cx = classnames.bind(styles);

function Header() {
  const { setSelectedType, setSelectedGenre, setSelectedGenreList } = useType();
  const [optionTest, setOption] = useState(false);
  const [types, setTypes] = useState([]);
  const [genres, setGenres] = useState([]);
  const dispatch = useDispatch();

  const full = useSelector((state) => state.full);
  const { isDark } = useSelector((state) => state.styles);
  const { isBodyChapterSet } = useSelector((state) => state.styles);
  // eslint-disable-next-line

  useEffect(() => {
    setOption(isBodyChapterSet);
  }, [isBodyChapterSet]);

  const handleBackGroundColorChange = (e) => {
    dispatch(setDarkTheme(e.target.value));
  };

  useEffect(() => {
    if (isDark === 'true') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  const fadeClass = full ? 'fade-edit-off' : 'fade-edit-on';

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getHeaderData();
        setTypes(data.types);
        setGenres(data.genres);
        setSelectedGenreList(data.genres);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchApi();
  }, [setSelectedGenreList]);

  const columns = [[], [], []];
  genres.forEach((genre, index) => {
    columns[index % 3].push(genre);
  });

  const handleItemClick = (typeName) => {
    setSelectedType(typeName);
  };

  const handleGenreClick = (genreName) => {
    setSelectedGenre(genreName);
  };

  return (
    <div className={cx({ 'dark-theme': isDark === 'true' }, 'wrapper', 'mb-3', fadeClass, { 'display-none': full })}>
      <Navbar expand="lg">
        <Container className={cx('title')}>
          <Link to="/">
            <div>
              <img src={images.logoWeb} className={cx('header-logo')} alt="logo-web" />
            </div>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={cx('navbar-right')}>
              <Dropdown>
                <Dropdown.Toggle className={cx('btn-reset')} id="dropdown-basic">
                  <FontAwesomeIcon icon={faList} /> Danh sách
                </Dropdown.Toggle>
                <Dropdown.Menu className={cx('drow-menu')}>
                  {types.map((type, index) => (
                    <Dropdown.Item
                      as={Link}
                      to={`/types/${type.slug}`}
                      key={index}
                      onClick={() => handleItemClick(type.name)}
                    >
                      {type.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle className={cx('btn-reset')} id="dropdown-basic">
                  <FontAwesomeIcon icon={faList} /> Thể loại
                </Dropdown.Toggle>
                <Dropdown.Menu className={cx('drow-menu', 'multi-column')}>
                  <div className={cx('row', 'form-row')}>
                    {columns.map((column, colIndex) => (
                      <div className={cx('col-md-4', 'genre')} key={colIndex}>
                        {column.map((genre, index) => (
                          <Dropdown.Item
                            as={Link}
                            to={`/genre/${genre.slug}`}
                            key={index}
                            onClick={() => handleGenreClick(genre.name)}
                          >
                            {genre.name}
                          </Dropdown.Item>
                        ))}
                      </div>
                    ))}
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              {/* <Dropdown>
                <Dropdown.Toggle className={cx('btn-reset')} id="dropdown-basic">
                  <FontAwesomeIcon icon={faList} /> Phân loại theo Chương
                </Dropdown.Toggle>
                <Dropdown.Menu className={cx('drow-menu')}>
                  <Dropdown.Item href="#/action-1">Truyện mới cập nhật</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Truyện Hot</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Truyện Full</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Tân Hiệp Hay</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Truyện Teen Hay</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Ngôn Tình Hay</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
              <Dropdown>
                <Dropdown.Toggle className={cx('btn-reset')} id="dropdown-basic">
                  <FontAwesomeIcon icon={faGear} /> Tùy chỉnh
                </Dropdown.Toggle>
                {optionTest ? (
                  <Option />
                ) : (
                  <Dropdown.Menu className={cx('drow-menu', 'dropdown-menu-right', 'settings')}>
                    <Form className={cx('form-horizontal')}>
                      <div className={cx('form-group-sm', 'row')}>
                        <Form.Label className={cx('col-5', 'control-label')}>Màu nền</Form.Label>
                        <div className={cx('col-7')}>
                          <Form.Select
                            className={cx('form-control', 'no-focus-border')}
                            size="lg"
                            onChange={handleBackGroundColorChange}
                            value={isDark}
                          >
                            <option value="false">Xám nhạt</option>
                            <option value="true">Màu tối</option>
                          </Form.Select>
                        </div>
                      </div>
                    </Form>
                  </Dropdown.Menu>
                )}
              </Dropdown>
            </Nav>
            <Search />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
