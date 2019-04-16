import axios from 'axios';

const API = 'https://api.netlify.com/api/v1';

export const setToken = token => axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const getSites = () => axios.get(`${API}/sites`);

export const getSite = id => axios.get(`${API}/sites/${id}`);

export const getFiles = siteId => axios.get(`${API}/sites/${siteId}/files`);

export const deploySite = (data, siteId) => axios.post(`${API}/sites/${siteId}/deploys`, data);

export const uploadFile = (data, filename, deployId) => axios.put(`${API}/deploys/${deployId}/files${filename}`, data, {headers: {'Content-Type': 'application/octet-stream'}});

export const createSite = values => axios.post(`${API}/sites`, values, {headers: {'Content-Type': 'application/json'}});

export const deleteSite = siteId => axios.delete(`${API}/sites/${siteId}`);
