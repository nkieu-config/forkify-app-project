import View from './View.js';

/**
 * View class responsible for managing the upload recipe form.
 * Handles showing/hiding the modal window, form submission, and data extraction.
 */
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :D';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    // Automatically set up event listeners when instance is created
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  /**
   * Toggles the visibility of the modal window and overlay.
   * Called when open/close button is clicked or overlay is clicked.
   */
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  /**
   * Adds event listener to the "Open Recipe" button to show the modal.
   * Binds `this` context to ensure correct reference inside toggleWindow.
   * @private
   */
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  /**
   * Adds event listeners to close buttons and overlay to hide the modal.
   * Uses `.bind(this)` to ensure proper `this` context inside toggleWindow.
   * @private
   */
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  /**
   * Registers a handler function that will be called when the upload form is submitted.
   * Collects the form data using FormData and converts it to an object.
   * @param {Function} handler - Controller function to handle the form data submission
   */
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // Collect form data as an array of key-value pairs
      const dataArr = [...new FormData(this)];

      // Convert array to object
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  // Dummy markup generator method (not used in this class but required by base View).
  _generateMarkup() {}
}

export default new AddRecipeView();
