import icons from "url:../../img/icons.svg";
import View from "./View.js";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  _generateMarkUp() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (curPage === 1 && numPages > 1) {
      return this._nextPageMarkUp(curPage);
    }
    if (curPage === numPages && numPages > 1) {
      return this._prevPageMarkUp(curPage);
    }
    if (curPage > 1) {
      return this._prevPageMarkUp(curPage) + this._nextPageMarkUp(curPage);
    }
    return ``;
  }

  _prevPageMarkUp(page) {
    return `
    <button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${page - 1}</span>
    </button>
    `;
  }

  _nextPageMarkUp(page) {
    return `
    <button class="btn--inline pagination__btn--next">
      <span>Page ${page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
  `;
  }

  addHandlerPagination(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      let counter;
      btn.classList.contains("pagination__btn--next")
        ? (counter = 1)
        : (counter = -1);
      handler(counter);
    });
  }
}

export default new PaginationView();
