import View from './View.js';
import icons from '../../img/icons.svg?url';

/**
 * View class responsible for rendering and handling pagination controls.
 * Inherits common rendering behavior from the base View class.
 */
class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  /**
   * Registers a click event listener on the pagination container.
   * Delegates event handling to dynamic pagination buttons.
   * @param {Function} handler - Function to call when a pagination button is clicked
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // Find closest pagination button (either next or prev)
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      // Extract page number from data attribute
      const gotoPage = +btn.dataset.goto;

      // Call the controller's handler with the selected page number
      handler(gotoPage);
    });
  }

  /**
   * Generates the appropriate markup for pagination buttons based on current page.
   * @returns {string} HTML markup for pagination controls
   */
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // CASE 1: First page and there are more pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }

    // CASE 2: Last page and there are more than 1 page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
      `;
    }

    // CASE 3: In the middle of pagination (not first or last)
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }

    // CASE 4: Only 1 page — no buttons needed
    return '';
  }
}

export default new paginationView();
