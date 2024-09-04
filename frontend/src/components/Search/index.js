import { useState, useRef, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate } from 'react-router-dom';

import { useDebounce } from '~/hooks';

import { useDispatch } from 'react-redux';
import { setSearchText } from '~/actions';

import classnames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classnames.bind(styles);

function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    dispatch(setSearchText(debouncedValue));
  }, [debouncedValue, dispatch]);

  const inputRef = useRef();

  const handleChangeSearch = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
  };

  const handleClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(setSearchText(searchValue.trim()));
      navigate(`/search`);
    }
  };

  return (
    <Form className={cx('navbar-form', 'navbar-right')}>
      <div className={cx('input-group', 'search-holder')}>
        <div className={cx('form-control', 'no-focus-border')}>
          <input
            ref={inputRef}
            className={cx('no-focus-border')}
            id="search-input"
            spellCheck={false}
            placeholder="Search..."
            itemProp="query-input"
            value={searchValue}
            onChange={handleChangeSearch}
            onKeyDown={handleKeyDown}
            required
          />

          {!!searchValue && (
            <button className={cx('clear')} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
        </div>

        <div className={cx('input-group-btn')}>
          <Link to="/search" className={cx('btn', 'btn-default')} type="submit" aria-label="Tìm kiếm" role="search">
            <span className={cx('glyphicon', 'glyphicon-search')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </Link>
        </div>
      </div>
      <div className={cx('list-group', 'list-search-res', 'hide')}></div>
    </Form>
  );
}

export default Search;
