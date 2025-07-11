import View from './View.js';
import icons from '../../img/icons.svg?url';
import Fraction from 'fraction.js';

/**
 * Class responsible for rendering a full recipe view.
 * Handles events for updating servings and adding bookmarks.
 * Inherits shared rendering functionality from the base View class.
 */
class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  /**
   * Adds event handlers for rendering the recipe based on the current URL hash.
   * Triggers when the page loads or hash changes.
   * @param {Function} handler - The controller function to call.
   */
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  /**
   * Adds click event handler for the servings update buttons (+ / -).
   * @param {Function} handler - The controller function to update servings.
   */
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;

      // Read value from data-update-to attribute
      const { updateTo } = btn.dataset;

      // Only call handler if new value is valid (> 0)
      if (updateTo > 0) handler(+updateTo);
    });
  }

  /**
   * Adds click event handler for the bookmark button.
   * @param {Function} handler - The controller function to add/remove bookmark.
   */
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  /**
   * Generates the full HTML markup for the recipe view.
   * Includes image, title, cooking time, servings, ingredients, and directions.
   * @returns {string} The generated markup for rendering.
   */
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <!-- Cooking time -->
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>

      <!-- Servings with + / - buttons -->
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">${
          this._data.servings === 1 ? 'serving' : 'servings'
        }</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings - 1
          }">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings + 1
          }">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <!-- User-generated badge (conditionally shown if 'key' exists) -->
      <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
        <svg>
            <use href="${icons}#icon-user"></use>
        </svg>
      </div>

      <!-- Bookmark button -->
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
        </svg>
      </button>
    </div>

    <!-- Ingredients list -->
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
      </ul>
    </div>

    <!-- Directions -->
    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a class="btn--small recipe__btn" href="${
        this._data.sourceUrl
      }" target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  `;
  }

  /**
   * Generates markup for a single ingredient line.
   * Converts quantity to fractional format using Fraction.js.
   * @param {Object} ing - An ingredient object { quantity, unit, description }.
   * @returns {string} HTML markup for the ingredient.
   */
  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">
        ${ing.quantity ? new Fraction(ing.quantity).toFraction(false) : ''}
      </div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
  `;
  }
}

export default new RecipeView();
