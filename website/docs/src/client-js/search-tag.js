import AppLaunchpadClient from '@applaunchpad-project/client';

export class SearchTagHandler {
  init() {
    window.searchTag = (evt, keyword) => {
      AppLaunchpadClient.sendCustomMessage({ id: 'search.tag.keyword', keyword: keyword });
    };
  }
}
