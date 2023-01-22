import { Pagination } from 'antd';
import PropTypes from 'prop-types';

function PaginationEl({ changePage, page, mode }) {
  if (mode === 'search') {
    return (
      <Pagination
        hideOnSinglePage={[0]}
        defaultCurrent={1}
        current={page}
        total={500}
        onChange={(currentPage) => {
          changePage(currentPage);
        }}
      />
    );
  }
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
