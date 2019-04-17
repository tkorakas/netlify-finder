import { types } from '../actions/types';

export const defaultState = {
  newSiteModalVisible: false,
  sitesLoading: false
};

const settingsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SHOW_NEW_SITE_DIALOG:
      return {...state, newSiteModalVisible: action.newSiteModalVisible};
    default:
      return state
  }
};

export default settingsReducer;