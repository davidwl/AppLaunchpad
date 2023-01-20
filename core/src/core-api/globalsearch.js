/* istanbul ignore file */

/**
 * Functions to use AppLaunchpad Global Search
 * @name GlobalSearch
 */
class AppLaunchpadGlobalSearch {
  /**
   * Opens the global search field.
   * @memberof GlobalSearch
   * @since 1.3.0
   * @example AppLaunchpad.globalSearch().openSearchField();
   */
  openSearchField() {
    AppLaunchpad.openSearchField();
  }

  /**
   * Closes the global search field.
   * @memberof GlobalSearch
   * @since 1.3.0
   * @example AppLaunchpad.globalSearch().closeSearchField();
   */
  closeSearchField() {
    AppLaunchpad.closeSearchField();
  }

  /**
   * Clears the global search field.
   * @memberof GlobalSearch
   * @since 1.3.0
   * @example AppLaunchpad.globalSearch().clearSearchField();
   */
  clearSearchField() {
    AppLaunchpad.clearSearchField();
  }

  /**
   * Opens the global search result. By standard it is a popover.
   * @memberof GlobalSearch
   * @param {Array} searchResultItems
   * @since 1.3.0
   * @example
   * let searchResultItem = {
   *   pathObject: {
   *     link,
   *     params: {}
   *   },
   *   label,
   *   description
   * }
   *
   * AppLaunchpad.globalSearch().showSearchResult([searchResultItem1, searchResultItem2]);
   */
  showSearchResult(searchResultItems) {
    AppLaunchpad.showSearchResult(searchResultItems);
  }

  /**
   * Closes the global search result. By standard it is rendered as a popover.
   * @memberof GlobalSearch
   * @since 1.3.0
   * @example AppLaunchpad.globalSearch().closeSearchResult();
   */
  closeSearchResult() {
    AppLaunchpad.closeSearchResult();
  }

  /**
   * Gets the value of the search input field.
   * @memberof GlobalSearch
   * @since 1.3.0
   * @example AppLaunchpad.globalSearch().getSearchString();
   */
  getSearchString() {
    return AppLaunchpad.getGlobalSearchString();
  }

  /**
   * Sets the value of the search input field.
   * @memberof GlobalSearch
   * @param searchString search value
   * @since 1.3.0
   * @example AppLaunchpad.globalSearch().setSearchString('searchString');
   */
  setSearchString(searchString) {
    AppLaunchpad.setGlobalSearchString(searchString);
  }

  /**
   * Sets the value of the Placeholder search input field.
   * @memberof GlobalSearch
   * @param searchString search value
   * @since 1.7.1
   * @example AppLaunchpad.globalSearch().setSearchInputPlaceholder('HERE input Placeholder');
   */
  setSearchInputPlaceholder(searchString) {
    AppLaunchpad.setSearchInputPlaceholder(searchString);
  }
}
export const globalSearch = new AppLaunchpadGlobalSearch();
