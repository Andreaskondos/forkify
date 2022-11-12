"use strict";
import * as model from "./model.js";
// import "core-js/stable";
// import "regenerator-runtime/runtime";
import recipeView from "./view/recipeView.js";
import searchView from "./view/searchView.js";
import resultsView from "./view/resultsView.js";
import paginationView from "./view/paginationView.js";
import bookmarksView from "./view/bookmarksView.js";
import addRecipeView from "./view/addRecipeView.js";
import { wait } from "./helper.js";

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    resultsView.update(model.getPageResults());
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError(`${err.message} ⛔⛔⛔`);
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    resultsView.render(model.getPageResults());
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError(`${err.message} ⛔⛔⛔`);
  }
};

const controlPagination = function (counter) {
  model.state.search.page += counter;
  resultsView.render(model.getPageResults(model.state.search.page));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else model.delBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    const recipe = await model.addRecipe(newRecipe);
    await model.loadRecipe(recipe.id);
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    addRecipeView.successMsg();
    await wait(1.5);
    addRecipeView.toggleHidden();
    model.addBookmark(model.state.recipe);
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};

const init = function () {
  model.getLocalstorage();
  bookmarksView.render(model.state.bookmarks);
  addRecipeView.addHandlerAddRecipeWindow();
  addRecipeView.addHandlerAddRecipe(controlAddRecipe);
  recipeView.addHandlerBookmark(controlBookmark);
  recipeView.addHandlerView(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
};

init();

const clearLocaleStorage = function () {
  window.localStorage.clear();
};
