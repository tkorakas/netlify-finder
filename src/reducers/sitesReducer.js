import { types } from '../actions/types';

const sitesReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_SITES:
      return [...action.payload];
    case types.DELETE_SITE:
      const sites = state.filter(site => site.id !== action.payload);
      return sites;
    default:
      return state;
  }
};

export default sitesReducer;