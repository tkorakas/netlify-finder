
const sitesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_SITES':
      console.log(action, 'GET_SITES ACTION')
      return [...action.sites];
    case 'DELETE_SITE':
      const sites = state.filter(site => site.id !== action.id);
      return sites;
    default:
      return state
  }
};

export default sitesReducer;