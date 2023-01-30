import { Pagination } from 'antd';
import PropTypes from 'prop-types';

function PaginationEl({ changePage, page, totalResults }) {
  const totalRes = totalResults >= 500 ? 500 : totalResults;
  return (
    <Pagination
      pageSize={1}
      defaultCurrent={page} // дефолтная страница
      current={page} // выбранная страница
      total={totalRes} // общее количество страниц
      onChange={(currentPage) => {
        changePage(currentPage);
      }}
    />
  );
}
export default PaginationEl;

PaginationEl.defaultProps = {
  changePage: () => {},
  page: '',
  mode: 'search',
};

PaginationEl.propType = {
  changePage: PropTypes.func,
  page: PropTypes.string,
  mode: PropTypes.string,
};
