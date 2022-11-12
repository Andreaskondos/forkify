import icons from "url:../../img/icons.svg";
import View from "./View.js";

class SearchView extends View {
  _parentEl = document.querySelector(".search");
  _errorMsg = `No recipes found for your query. Please try again!`;
  _message = ``;

  getQuery() {
    const query = this._parentEl.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector(".search__field").value = "";
    document.activeElement.blur();
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
