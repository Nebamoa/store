import React from 'react'
import ReactPaginate from 'react-paginate'
import style from './Pagination.module.scss'

type PaginationProps = {
    handlePageClick: (i: number) => void,
    currentPage: number,
    length: number,
}

const Pagination: React.FC<PaginationProps> = ({currentPage, handlePageClick, length}) => {
  return (
    <div>
    <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => {
            handlePageClick(e.selected + 1)
        }}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(length / 6)}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Pagination
