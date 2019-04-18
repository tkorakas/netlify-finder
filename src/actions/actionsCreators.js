import { getSites as getSitesRequest, createSite as createSiteRequest, deleteSite as deleteSiteRequest } from '../netlify/api';
import { types } from '../actions/types';

export function getSites() {
  return (dispatch) => {
    getSitesRequest()
      .then(res => dispatch({ type: types.GET_SITES, payload: res.data }))
      .catch(error => dispatch({ type: 'GET_SITES_ERROR', payload: error }));
  };
}

export function createSite(values) {
  const { name, ...rest } = values;
    const payload = {
      name,
      processing_settings: {
        css: { bundle: rest['css-bundle'], minify: rest['css-minify'] },
        js: { bundle: rest['js-bundle'], minify: rest['js-minify'] },
        html: {
          pretty_urls: rest['pretty'], canonical_urls: rest['canonical']
        },
        images: { optimize: rest['image'] }
      }
    };

  return (dispatch) => {
    createSiteRequest(payload)
      .then(res => dispatch({
        type: types.SITE_CREATED,
        payload: res.data
      }))
      .catch(error => dispatch({ type: 'SITE_CREATION_ERROR', error }))
  };
}

export function deleteSite(id) {
  return (dispatch) => {
    deleteSiteRequest(id)
      .then(res => dispatch({ type: types.DELETE_SITE, payload: id }))
      .catch(error => dispatch({ type: 'DELETE_SITE_ERROR', error }));
  }
}

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
  return { type: types.SHOW_NEW_SITE_DIALOG, payload: state };
}
