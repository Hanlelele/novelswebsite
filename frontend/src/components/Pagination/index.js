import classnames from 'classnames/bind';
import styles from './Pagination.module.scss';
const cx = classnames.bind(styles);

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    if (endPage - startPage < maxPageNumbersToShow - 1) {
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    onPageChange(page);
  };
  return (
    <div className={cx('text-center', 'pagination-container')}>
      <ul className={cx('pagination', 'pagination-sm')}>
        <li className={cx({ disabled: currentPage === 1 })}>
          <span onClick={() => handlePageChange(1)} title="First Page">
            <span className={cx('arrow')}>&laquo;</span> Đầu
          </span>
        </li>
        <li className={cx({ disabled: currentPage === 1 })}>
          <span onClick={() => handlePageChange(currentPage - 1)} title="Previous Page">
            <span className={cx('glyphicon', 'glyphicon-menu-left')}>&#60;</span>
          </span>
        </li>
        {getPageNumbers().map((page) => (
          <li key={page}>
            <span
              className={cx({ active: page === currentPage })}
              onClick={() => handlePageChange(page)}
              title={`Page ${page}`}
            >
              {page}
            </span>
          </li>
        ))}
        <li className={cx({ disabled: currentPage === totalPages })}>
          <span onClick={() => handlePageChange(currentPage + 1)} title="Next Page">
            <span className={cx('glyphicon', 'glyphicon-menu-right')}>&#62;</span>
          </span>
        </li>
        <li className={cx({ disabled: currentPage === totalPages })}>
          <span onClick={() => handlePageChange(totalPages)} title="Last Page">
            Cuối <span className={cx('arrow')}>&raquo;</span>
          </span>
        </li>
      </ul>
    </div>
  );
}
export default Pagination;
