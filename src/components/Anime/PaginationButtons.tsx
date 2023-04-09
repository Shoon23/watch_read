import React from "react";

type Props = {
  nextPage: () => void;
  prevPage: () => void;
  pageInfo: {
    currentPage: number | undefined | string;
    hasNextPage: boolean | undefined;
  };
};

function PaginationButtons({ prevPage, pageInfo, nextPage }: Props) {
  return (
    <section className="flex place-content-center my-1">
      <div className="btn-group">
        <button
          onClick={prevPage}
          disabled={pageInfo.currentPage === 1}
          className="btn btn-primary"
        >
          «
        </button>
        <button className="btn btn-primary">{pageInfo.currentPage}</button>
        <button
          onClick={nextPage}
          disabled={!pageInfo.hasNextPage}
          className="btn btn-primary"
        >
          »
        </button>
      </div>
    </section>
  );
}

export default PaginationButtons;
