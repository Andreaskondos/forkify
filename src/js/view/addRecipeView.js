import View from "./View.js";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentEl = document.querySelector(".upload");
  _overlay = document.querySelector(".overlay");
  _window = document.querySelector(".add-recipe-window");
  _btn = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  renderUploadForm() {
    this.toggleHidden();
    const markUp = `
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="TEST21" required name="title" type="text" />
          <label>URL</label>
          <input value="TEST21" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="TEST21" required name="image" type="text" />
          <label>Publisher</label>
          <input value="TEST21" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="23" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="23" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="1,,Avocado"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=",,salt"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>
        <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
        `;
    this.clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }

  toggleHidden() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  addHandlerAddRecipeWindow() {
    this._btn.addEventListener("click", this.renderUploadForm.bind(this));
    this._overlay.addEventListener("click", this.toggleHidden.bind(this));
    this._btnClose.addEventListener("click", this.toggleHidden.bind(this));
  }

  /**
   * 
   * @param {function} handler Which function will use the data from our form
   * @param {Array} dataArr Here we take the data from the form using the method 
                            new FormData() and then using the spread operator (...)
                            to convert it in an Array
   * @param {Object | Object[]} data Here we use Object.fromEntries() to convert an
                            to an Object. 
   */
  addHandlerAddRecipe(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
