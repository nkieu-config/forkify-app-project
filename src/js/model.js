import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { AJAX } from './helpers.js';

/**
 * Global application state
 * - recipe: currently loaded recipe
 * - search: data related to search results and pagination
 * - bookmarks: user's bookmarked recipes (persisted in localStorage)
 */
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

/**
 * Transforms API recipe data into a normalized object for internal use
 * @param {Object} data - Raw recipe data returned from API
 * @returns {Object} - Formatted recipe object
 */
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

/**
 * Loads a single recipe based on the given ID and updates the application state.
 * Also sets the `bookmarked` flag if it's already bookmarked.
 * @param {string} id - ID of the recipe to load
 */
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    // Mark as bookmarked if it already exists in the bookmarks array
    state.recipe.bookmarked = state.bookmarks.some(
      bookmark => bookmark.id === id
    );
  } catch (err) {
    throw err;
  }
};

/**
 * Loads recipes that match the user's search query and updates the state.
 * @param {string} query - Search string entered by the user
 */
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    // Normalize the results from API
    state.search.results = data.data.recipes.map(rec => ({
      id: rec.id,
      title: rec.title,
      publisher: rec.publisher,
      image: rec.image_url,
      ...(rec.key && { key: rec.key }), // optional property
    }));

    // Reset to first page of results
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

/**
 * Returns a portion of the search results corresponding to the given page number.
 * @param {number} [page=state.search.page] - Page number to display
 * @returns {Array<Object>} - Array of recipe objects for current page
 */
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

/**
 * Updates the ingredient quantities based on the new number of servings.
 * @param {number} newServings - New desired number of servings
 */
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // Recalculate quantity proportionally
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  // Update servings in state
  state.recipe.servings = newServings;
};

/**
 * Stores the current bookmarks array in localStorage.
 */
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

/**
 * Adds a recipe to the bookmarks list and updates localStorage.
 * Also marks current recipe as bookmarked (if applicable).
 * @param {Object} recipe - Recipe object to bookmark
 */
export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

/**
 * Removes a recipe from the bookmarks list and updates localStorage.
 * Also updates current recipe bookmark flag if necessary.
 * @param {string} id - ID of the recipe to remove from bookmarks
 */
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // If current recipe is the one being removed, unmark it
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

/**
 * Initializes bookmarks from localStorage on page load.
 */
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

/**
 * Uploads a new user-created recipe to the API.
 * Normalizes ingredient data, sends request, and updates state.
 * @param {Object} newRecipe - Object containing form data for a new recipe
 */
export const uploadRecipe = async function (newRecipe) {
  try {
    // Convert ingredient fields to an array of objects
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());

        // Ensure valid ingredient format (quantity, unit, description)
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format.'
          );

        const [quantity, unit, description] = ingArr;

        return {
          quantity: quantity ? +quantity : null, // convert to number or null
          unit,
          description,
        };
      });

    // Format the new recipe data for the API
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // Send POST request to API
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);

    // Save uploaded recipe to state
    state.recipe = createRecipeObject(data);

    // Auto-bookmark newly uploaded recipe
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
