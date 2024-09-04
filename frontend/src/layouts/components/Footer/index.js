import classnames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

const cx = classnames.bind(styles);

function Footer() {
  return (
    <div className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('logo', 'col-3', 'col-sm-3', 'col-md-3', 'col-lg-3')}>
          <img src={images.logoWeb} alt="logo-web" className={cx('logowweb')} />
        </div>

        <div className={cx('info', 'col-9', 'col-sm-9', 'col-md-9', 'col-lg-9')}>
          <h4 className={cx('text')}>
            Website{' '}
            <Link title="đọc truyện online" to="/">
              đọc truyện
            </Link>{' '}
            online chất lượng hàng đầu việt nam, với nhiều{' '}
            <Link title="Truyện Tiên Hiệp" href="/genre/tien-hiep/">
              truyện tiên hiệp
            </Link>
            ,{' '}
            <Link title="Truyện Kiếm Hiệp" href="/genre/kiem-hiep/">
              truyện kiếm hiệp
            </Link>
            ,{' '}
            <Link title="truyen ngon tinh" href="/genre/ngon-tinh/">
              truyện ngôn tình
            </Link>
            ,{' '}
            <Link title="truyen teen" href="/genre/truyen-teen/">
              truyện teen
            </Link>
            ,{' '}
            <Link title="Truyện Đô Thị" href="/genre/do-thi/">
              truyện đô thị
            </Link>{' '}
            được tác giả và dịch giả chọn lọc và đăng tải. Truy cập website nghĩa là bạn đã đồng ý với các quy định và
            điều khoản của chúng tôi. Vui lòng đọc kỹ các thông tin liên quan ở phía dưới. <hr />
            <p>
              <span>Chính sách bảo mật</span>
              &nbsp; - &nbsp;
              <span>Điều khoản sử dụng</span> &nbsp; - &nbsp;
              <span>Quy định về nội dung</span> &nbsp; - &nbsp;
              <span>Vấn đề bản quyền</span> &nbsp; - &nbsp;
              <span>Thỏa thuận quyền riêng tư</span>
            </p>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Footer;
