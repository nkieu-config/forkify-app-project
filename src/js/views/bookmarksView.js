import View from './View.js';
import previewView from './previewView.js';

/**
 * View class responsible for rendering and managing the user's bookmarked recipes.
 * Extends the base View class which provides shared UI rendering functionality.
 */
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :D';
  _message = '';

  /**
   * Registers a handler to be called when the window loads.
   * Typically used to render bookmarks from localStorage on page load.
   * @param {Function} handler - Controller function to call when bookmarks should be rendered
   */
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  /**
   * Generates HTML markup for the list of bookmarks.
   * Uses the PreviewView to render each individual bookmark.
   * @returns {string} The concatenated HTML string of all bookmark previews
   */
  _generateMarkup() {
    return (
      this._data
        // Render each bookmark using previewView (without inserting into DOM)
        .map(bookmark => previewView.render(bookmark, false))
        .join('')
    );
  }
}

export default new BookmarksView();
