import View from './View.js';
import icons from '../../img/icons.svg?url';

/**
 * View class responsible for rendering a single recipe preview item.
 * Used in search results and bookmark lists.
 * Inherits base rendering methods from View class.
 */
class PreviewView extends View {
  _parentElement = '';

  /**
   * Generates HTML markup for a single preview item.
   * Highlights it if it matches the current URL hash (i.e. selected recipe).
   * @returns {string} HTML markup string for one preview item
   */
  _generateMarkup() {
    // Get the current recipe ID from the URL
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
      <a class="preview__link ${
        this._data.id === id ? 'preview__link--active' : ''
      }" href="#${this._data.id}">
        <figure class="preview__fig">
          <img src="${this._data.image}" alt="${this._data.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${this._data.title}</h4>
          <p class="preview__publisher">${this._data.publisher}</p>
          <div class="preview__user-generated ${
            this._data.key ? '' : 'hidden'
          }">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
    `;
  }
}

export default new PreviewView();
