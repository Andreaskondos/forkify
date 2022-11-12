import icons from "url:../../img/icons.svg";
import View from "./View.js";

class ResultsView extends View {
  _parentEl = document.querySelector(".results");
  _errorMsg = `No recipes found for your query. Please try again!`;
  _message = ``;

  _generateMarkUp() {
    return this._data.map((rec) => this._generateMarkUpPreview(rec)).join("\n");
  }
}

export default new ResultsView();
