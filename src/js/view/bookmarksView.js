import icons from "url:../../img/icons.svg";
import View from "./View.js";

class BookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");
  _message = `
              <div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>
                  No bookmarks yet. Find a nice recipe and bookmark it :)
                </p>
              </div>
            `;

  _generateMarkUp() {
    if (Array.isArray(this._data) && this._data.length === 0)
      return this._message;
    else
      return this._data
        .map((bookmark) => this._generateMarkUpPreview(bookmark))
        .join("\n");
  }
}

export default new BookmarksView();
