const defaultState = {
  newSiteModalVisible: false,
  sitesLoading: false
};

const settingsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_NEW_SITE_DIALOG':
      return {...state, newSiteModalVisible: action.newSiteModalVisible};
    case 'SHOW_DIALOG':
      return {...state, sites: action.sites};
    default:
      return state
  }
};

export default settingsReducer;