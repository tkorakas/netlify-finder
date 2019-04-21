import { types } from "../actions/types";

export const defaultState = {
  newSiteModalVisible: false,
  sitesLoading: true
};

const settingsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SHOW_NEW_SITE_DIALOG:
      return { ...state, newSiteModalVisible: action.payload };
    case types.GET_SITES:
      return { ...state, sitesLoading: false };
    case types.SITE_CREATED:
      return { ...state, newSiteModalVisible: false };
    default:
      return state;
  }
};

export default settingsReducer;
