import ResultRender from './resultRender';
import { algoliaSearcher } from './algoliaSearcher';

class GlobalSearch {
  constructor() {
    this.minSearchLength = 3;
  }
  searchProvider = {
    onInput: () => {
      let query = AppLaunchpad.globalSearch().getSearchString();
      if (query.length < this.minSearchLength) {
        //to short to be searched, please grow up
        AppLaunchpad.globalSearch().closeSearchResult();
        return;
      }
      algoliaSearcher.executeSearch(query);
    },
    onEscape: () => {
      AppLaunchpad.globalSearch().closeSearchResult();
      AppLaunchpad.globalSearch().clearSearchField();
    },
    customSearchResultRenderer: (searchResults, slot, searchApiObj) => {
      const query = searchResults.shift();
      const resultRender = new ResultRender(query, searchResults);
      const resultSpan = resultRender.buildDomResults();
      slot.appendChild(resultSpan);
    },
    disableInputHandlers: {
      type: false
    }
  };
}

export const globalSearch = new GlobalSearch();
