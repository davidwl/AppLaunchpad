class Communication {
  customMessagesListeners = {
    'search.tag.keyword': (customMessage, mfObject, mfNodeObj) => {
      AppLaunchpad.globalSearch().openSearchField();
      AppLaunchpad.globalSearch().setSearchString(customMessage.keyword);
    }
  };
}

export const communication = new Communication();
