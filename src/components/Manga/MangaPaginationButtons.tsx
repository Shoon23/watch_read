import React from "react";

type Props = {
  nextPage: () => void;
  prevPage: () => void;
  page: number;
};

function MangaPaginationButtons({ prevPage, page, nextPage }: Props) {
  return (
    <section className="flex place-content-center my-1">
      <div className="btn-group">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="btn btn-primary"
        >
          «
        </button>
        <button className="btn btn-primary">{page}</button>
        <button
          onClick={nextPage}
          //   disabled={!pageInfo.hasNextPage}
          className="btn btn-primary"
        >
          »
        </button>
      </div>
    </section>
  );
}

export default MangaPaginationButtons;
