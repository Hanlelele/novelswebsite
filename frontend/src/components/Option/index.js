import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Dropdown from 'react-bootstrap/Dropdown';

import { useDispatch, useSelector } from 'react-redux';
import { setDarkTheme, setFontSize, setLineHeight, setFullScreen, setFontFamily, setBackgroundColor } from '~/actions';

import classnames from 'classnames/bind';
import styles from './Option.module.scss';
const cx = classnames.bind(styles);

function Option() {
  const dispatch = useDispatch();

  const { isDark, newColor } = useSelector((state) => state.styles);

  const handleFontSizeChange = (e) => {
    dispatch(setFontSize(e.target.value + 'px'));
  };

  const handleLineHeightChange = (e) => {
    dispatch(setLineHeight(e.target.value + '%'));
  };

  const handleFullScreen = (e) => {
    dispatch(setFullScreen(e.target.value));
  };

  const handleFontFamilyChange = (e) => {
    dispatch(setFontFamily(e.target.value + ', sans-serif'));
  };

  const handleBackGroundColorChange = (e) => {
    const backgroundColorSet = e.target.value;
    dispatch(setBackgroundColor(backgroundColorSet));
    if (backgroundColorSet === '3') {
      dispatch(setDarkTheme('true'));
    } else {
      dispatch(setDarkTheme('false'));
    }
  };

  return (
    <Dropdown.Menu className={cx('drow-menu', 'dropdown-menu-right', 'settings')}>
      <Form className={cx('form-horizontal')}>
        <div className={cx('form-group', 'form-group-sm', 'row')}>
          <Form.Label className={cx('col-sm-2', 'col-md-5', 'control-label')}>Màu nền</Form.Label>
          <div className={cx('col-sm-5', 'col-md-7')}>
            <Form.Select
              className={cx('form-control')}
              size="lg"
              onChange={handleBackGroundColorChange}
              value={isDark === 'true' ? '3' : newColor}
            >
              <option value="rgb(244, 244, 244)">Xám nhạt</option>
              <option value="rgb(233, 235, 238)">Xanh nhạt</option>
              <option value="rgb(244, 244, 228)">Vàng nhạt</option>
              <option value="1">Sách cũ</option>
              <option value="2">Hạt sạn</option>
              <option value="3">Màu tối</option>
            </Form.Select>
          </div>
        </div>
        <div className={cx('form-group', 'form-group-sm', 'row')}>
          <Form.Label className={cx('col-sm-2', 'col-md-5', 'control-label')}>Font chữ</Form.Label>
          <div className={cx('col-sm-5', 'col-md-7')}>
            <Form.Select className={cx('form-control')} size="lg" onChange={handleFontFamilyChange}>
              <option value="Palatino Linotype">Palatino Linotype</option>
              <option value="Bookerly">Bookerly</option>
              <option value="Minion">Minion</option>
              <option value="Roboto">Roboto</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Arial">Arial</option>
            </Form.Select>
          </div>
        </div>
        <div className={cx('form-group', 'form-group-sm', 'row')}>
          <Form.Label className={cx('col-sm-2', 'col-md-5', 'control-label')}>Size chữ</Form.Label>
          <div className={cx('col-sm-5', 'col-md-7')}>
            <Form.Select className={cx('form-control')} size="lg" onChange={handleFontSizeChange}>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
              <option value="22">22</option>
              <option value="24">24</option>
              <option value="28">28</option>
              <option value="30">30</option>
              <option value="36">36</option>
              <option value="40">40</option>
            </Form.Select>
          </div>
        </div>
        <div className={cx('form-group', 'form-group-sm', 'row')}>
          <Form.Label className={cx('col-sm-2', 'col-md-5', 'control-label')}>Chiều cao dòng</Form.Label>
          <div className={cx('col-sm-5', 'col-md-7')}>
            <Form.Select className={cx('form-control')} size="lg" onChange={handleLineHeightChange}>
              <option value="100">100%</option>
              <option value="120">120%</option>
              <option value="140">140%</option>
              <option value="160">160%</option>
              <option value="180">180%</option>
              <option value="200">200%</option>
            </Form.Select>
          </div>
        </div>
        {/* <div className={cx('form-group', 'form-group-sm', 'row')}>
          <Form.Label className={cx('col-sm-2', 'col-md-5', 'control-label')}>
            Full khung
          </Form.Label>
          <div className={cx('col-sm-5', 'col-md-7')}>
            <Form.Label className="radio-inline" for="fluid-yes">
              <input type="radio" name="fluid-switch" id="fluid-yes" value="yes" /> Có
            </Form.Label>
            <Form.Label className="radio-inline" for="fluid-no">
              <input type="radio" name="fluid-switch" id="fluid-no" value="no" checked /> Không
            </Form.Label>
          </div>
        </div> */}
        <Form.Group as={Row} className={cx('form-group', 'form-group-sm')}>
          <Form.Label column sm={2} md={5} className={cx('control-label')}>
            Full khung
          </Form.Label>
          <Col sm={5} md={7} className={cx('form-check')}>
            <Form.Check
              type="radio"
              label="Có"
              name="fluid-switch"
              id="fluid-yes"
              value="yes"
              className="radio-inline me-3"
              onChange={handleFullScreen}
            />
            <Form.Check
              type="radio"
              label="Không"
              name="fluid-switch"
              id="fluid-no"
              value="no"
              defaultChecked
              className="radio-inline"
              onChange={handleFullScreen}
            />
          </Col>
        </Form.Group>
      </Form>
    </Dropdown.Menu>
  );
}

export default Option;
