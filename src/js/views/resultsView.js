import View from './View.js';
import previewView from './previewView.js';

/**
 * Class responsible for rendering the search results in the UI.
 * Inherits from the generic View class.
 */
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _message = '';

  /**
   * Generates the HTML markup for the list of search results.
   * Each result is rendered using the previewView component.
   *
   * @returns {string} HTML markup string representing the search results.
   */
  _generateMarkup() {
    // Loop through each result in the data array and generate preview markup
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
