import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addrecipeView.js';

/**
 * Handles loading and rendering of the selected recipe
 * triggered by hash change or page load.
 * Also updates results and bookmarks views accordingly.
 * @returns {Promise<void>}
 */
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Show loading spinner while fetching data
    recipeView.renderSpinner();

    // Highlight selected recipe in the search results view
    resultsView.update(model.getSearchResultsPage());

    // Update bookmarks to reflect current state
    bookmarksView.update(model.state.bookmarks);

    // Load recipe data from API and update state
    await model.loadRecipe(id);

    // Render recipe to UI
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

/**
 * Handles search functionality.
 * Fetches results from API and renders the result and pagination views.
 * @returns {Promise<void>}
 */
const controlSearchResults = async function () {
  try {
    // Show spinner in results section
    resultsView.renderSpinner();

    // Get query from search input
    const query = searchView.getQuery();
    if (!query) return;

    // Fetch matching recipes from API and update state
    await model.loadSearchResults(query);

    // Render current page of search results
    resultsView.render(model.getSearchResultsPage(1));

    // Render pagination controls
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

/**
 * Handles pagination button clicks.
 * Renders new search results and updates pagination controls.
 * @param {number} goToPage - The target page number to navigate to.
 * @returns {void}
 */
const controlPagination = function (goToPage) {
  // Render target page of results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Update pagination buttons
  paginationView.render(model.state.search);
};

/**
 * Handles update of servings in the recipe.
 * Updates the ingredient quantities accordingly.
 * @param {number} newServings - The new desired number of servings.
 */
const controlServings = function (newServings) {
  // Update servings in state
  model.updateServings(newServings);

  // Re-render only updated parts in the recipe view
  recipeView.update(model.state.recipe);
};

/**
 * Handles toggling of bookmark on the current recipe.
 * Updates state, recipe view, and bookmarks view.
 */
const controlAddBookmark = function () {
  // Toggle bookmark state
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view (bookmark icon)
  recipeView.update(model.state.recipe);

  // Re-render bookmarks sidebar
  bookmarksView.render(model.state.bookmarks);
};

/**
 * Renders bookmarks on initial page load.
 */
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

/**
 * Handles uploading of a new recipe.
 * Renders spinner, sends recipe to API, and updates views.
 * @param {Object} newRecipe - The recipe data entered by the user.
 * @returns {Promise<void>}
 */
const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner in the modal
    addRecipeView.renderSpinner();

    // Upload recipe to API and update state
    await model.uploadRecipe(newRecipe);

    // Render newly created recipe in main view
    recipeView.render(model.state.recipe);

    // Show success message
    addRecipeView.renderMessage();

    // Render updated bookmarks
    bookmarksView.render(model.state.bookmarks);

    // Update URL with new recipe ID (without reload)
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close the modal window after a delay
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    // Show error message in modal
    addRecipeView.renderError(err.message);
  }
};

/**
 * Initializes the application by setting up all event handlers.
 */
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

// Start the application
init();
