import { API_KEY, API_URL, RES_PER_PAGE } from "./config.js";
import { AJAX } from "./helper";
// import "regenerator-runtime/runtime";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

const createRecipe = function (recipe) {
  return {
    title: recipe.title,
    publisher: recipe.publisher,
    cookingTime: recipe.cooking_time,
    servings: recipe.servings,
    id: recipe.id,
    ingredients: recipe.ingredients,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const { recipe } = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    state.recipe = createRecipe(recipe);
    if (state.bookmarks.some((rec) => rec.id === state.recipe.id))
      state.recipe.bookmarked = true;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = data.recipes.map(
      (rec) =>
        (rec = {
          title: rec.title,
          publisher: rec.publisher,
          id: rec.id,
          image: rec.image_url,
          ...(rec.key && { key: rec.key }),
        })
    );
    if (
      Array.isArray(state.search.results) &&
      state.search.results.length === 0
    )
      throw new Error(`No recipes found for your query. Please try again!`);
  } catch (err) {
    throw err;
  }
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(
    (ing) =>
      (ing.quantity = (ing.quantity * newServings) / state.recipe.servings)
  );
  state.recipe.servings = newServings;
};

export const getPageResults = function (page = 1) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const addBookmark = function (recipe) {
  if (recipe.id === state.recipe.id && !state.recipe.bookmarked === true) {
    state.recipe.bookmarked = true;
    state.bookmarks.push(recipe);
  }
  persistBookmarks();
};

export const delBookmark = function (id) {
  if (id === state.recipe.id) {
    const index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);
    state.recipe.bookmarked = false;
    state.bookmarks.splice(index, 1);
  }

  persistBookmarks();
};

export const addRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(
        (entr) => entr[0].startsWith("ingredient") && entr[1].trim() !== ""
      )
      .map(function (ing) {
        const ingArr = ing[1].split(",").map((el) => el.trim());
        if (ingArr.length !== 3)
          throw new Error(`Wrong ingredients format usage`);
        const [quantity, unit, description] = ingArr;
        if (/\d/.test(unit) || /\d/.test(description))
          throw new Error("Invalid input on ingrendients");
        return {
          quantity: quantity ? +quantity : null,
          unit: unit ? unit : null,
          description: description ? description : ".",
        };
      });
    const data = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      id: newRecipe.id,
      ingredients: ingredients,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
    };
    const { recipe } = await AJAX(`${API_URL}?key=${API_KEY}`, data);
    return recipe;
  } catch (err) {
    throw err;
  }
};

export const getLocalstorage = function () {
  const storedBookmarks = localStorage.getItem("bookmarks");
  if (storedBookmarks) state.bookmarks = JSON.parse(storedBookmarks);
};
