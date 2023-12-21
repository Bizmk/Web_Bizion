import React from 'react';
import './Pagination.css';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className='pagination-container'>
      <button
        className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <SlArrowLeft />
      </button>
      
      <label className="page-item current">
        {currentPage}
      </label>
      
      <button
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <SlArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
