import icons from '../../img/icons.svg?url';

/**
 * Abstract base class for all views.
 * Provides common functionality for rendering data, updating DOM efficiently,
 * and displaying spinners, messages, or error states.
 */
export default class View {
  _data;

  /**
   * Render the received data to the DOM.
   * @param {Object|Object[]} data - The data to be rendered (e.g. recipe, search results).
   * @param {boolean} [render=true] - If false, returns the markup string instead of rendering to DOM.
   * @returns {undefined|string} - If `render` is false, returns generated markup as string.
   */
  render(data, render = true) {
    // Guard clause: if no data or empty array, show error message
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear(); // Clear old content
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Efficiently updates only changed elements in the DOM based on new data.
   * @param {Object} data - The updated data to be used for rendering.
   */
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Convert new markup string into real DOM nodes
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // Select all elements inside the new virtual DOM and current DOM
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // Loop through and compare each element pair
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed TEXT content
      if (
        !newEl.isEqualNode(curEl) &&
        curEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  /**
   * Clears the content of the parent DOM element.
   * @private
   */
  _clear() {
    this._parentElement.innerHTML = '';
  }

  /**
   * Renders a loading spinner to the parent DOM element.
   */
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Renders an error message to the parent DOM element.
   * @param {string} [message=this._errorMessage] - The error message to display.
   */
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Renders a generic success/info message to the parent DOM element.
   * @param {string} [message=this._message] - The message to display.
   */
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
