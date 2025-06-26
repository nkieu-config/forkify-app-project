/**
 * Class responsible for managing the search form interactions in the UI.
 *
 * This class handles retrieving the search input from the user,
 * clearing the input field, and setting up event handlers for search submissions.
 */
class SearchView {
  _parentEl = document.querySelector('.search');

  /**
   * Retrieves the user's search query from the input field.
   * Also clears the input field after retrieving the value.
   * @returns {string} The search query entered by the user.
   */
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput(); // Clear the input field after getting the query
    return query;
  }

  /**
   * Clears the search input field.
   * @private
   */
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  /**
   * Attaches a handler function to the search form's submit event.
   * This is used to trigger search functionality in the controller.
   * @param {Function} handler - The callback function to execute when the form is submitted.
   */
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
