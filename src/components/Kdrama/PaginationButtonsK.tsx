import React from "react";

type Props = {
  nextPage: () => void;
  prevPage: () => void;
  pageInfo: {
    currentPage: number | undefined | string;
    hasNextPage: boolean | undefined;
  };
};

function PaginationButtonsK({ prevPage, pageInfo, nextPage }: Props) {
  return (
    <section className="flex place-content-center my-2">
      <div className="btn-group">
        <button
          onClick={prevPage}
          disabled={pageInfo.currentPage === 1}
          className="btn btn-primary"
        >
          «
        </button>
        <button className="btn btn-primary"></button>
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

export default PaginationButtonsK;
