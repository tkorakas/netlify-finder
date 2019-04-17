import { getSites as getSitesRequest, createSite as createSiteRequest, deleteSite as deleteSiteRequest } from '../netlify/api';
import { types } from '../actions/types';

// Get sites
export function getSites() {
  return (dispatch) => {
    getSitesRequest()
      .then(res => dispatch({ type: types.GET_SITES, payload: res.data }))
      .catch(error => dispatch({ type: 'GET_SITES_ERROR', error }));
  }
}

// Create site
export function createSite(values) {
  return (dispatch) => {
    createSiteRequest(values)
      .then(res => dispatch({
        type: 'SITE_CREATED',
        site: res.data
      }))
      .catch(error => dispatch({ type: 'SITE_CREATION_ERROR', error }))
  };
}

// Delete site
export function deleteSite(id) {
  return (dispatch) => {
    deleteSiteRequest(id)
      .then(res => dispatch({ type: types.DELETE_SITE, id }))
      .catch(error => dispatch({ type: 'DELETE_SITE_ERROR', error }));
  }
}

// Edit site
export function editSite(id, name) {
  return {
    type: 'EDIT_SITE',
    id,
    name
  };
}

// Upload site

// Upload file

// Scan for files

// Hash files

// Select folder

// Show create site dialog
export function toggleModal(state) {
  return { type: 'SHOW_NEW_SITE_DIALOG', newSiteModalVisible: state };
}
