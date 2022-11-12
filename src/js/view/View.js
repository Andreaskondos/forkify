import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  _message = `You have sucessfuly uploaded your recipe`;

  render(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    const markUp = this._generateMarkUp();
    this.clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }

  _generateMarkUpPreview(rec) {
    const id = window.location.hash.slice(1);

    return `      
    <li class="preview">
      <a class="preview__link ${
        rec.id === id ? "preview__link--active" : ""
      }" href="#${rec.id}">
        <figure class="preview__fig">
          <img src="${rec.image}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${rec.title}</h4>
          <p class="preview__publisher">${rec.publisher}</p>
          <div class="preview__user-generated ${rec.key ? "" : "hidden"}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
  `;
  }

  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkUp();
    const tempDom = document.createRange().createContextualFragment(newMarkUp);
    const newEl = Array.from(tempDom.querySelectorAll("*"));
    const curEl = Array.from(this._parentEl.querySelectorAll(`*`));

    curEl.forEach((el, i) => {
      if (el.firstChild?.nodeValue.trim() !== "" && !el.isEqualNode(newEl[i]))
        curEl[i].textContent = newEl[i].textContent;

      if (!el.isEqualNode(newEl[i])) {
        Array.from(newEl[i].attributes).forEach((attr) =>
          el.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markUp = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
          `;
    this.clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }

  clear() {
    this._parentEl.innerHTML = "";
  }

  renderError(msg = this._errorMsg) {
    const markUp = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>
    `;
    this.clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }

  successMsg(msg = this._message) {
    const markUp = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${msg}</p>
        </div>
    `;
    this.clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }
}
