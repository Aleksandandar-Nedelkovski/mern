import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
const PER_PAGE = 10;

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch("https://ihsavru.me/Demo/uploads.json")
      .then((res) => res.json())
      .then((data) => {
        const {
          course: { uploads },
        } = data;
        setData(uploads);
      });
  }

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;

  const currentPageData = data
    .slice(offset, offset + PER_PAGE)
    .map(({ thumburl }) => (
      <img className="slider-img" alt="" key={thumburl.id} src={thumburl} />
    ));

  const pageCount = Math.ceil(data.length / PER_PAGE);

  return (
    <div className="container">
      <h1 className="x-large text-center">Home Challenges</h1>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      {currentPageData}
    </div>
  );
}
