import { types } from '../actions/types';
import reducer from './sitesReducer';

describe('Sites reducer', () => {
  it('Should return default state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual([]);
  });

  it('Should return new state if receive a type with existing state', () => {
    const defaultState = [{id: 1, name: 'Test site 1'}, {id: 2, name: 'Test site 2'}];
    const newState = [{id: 1, name: 'Test site 1'}, {id: 2, name: 'Test site 2'}];
    const state = reducer(defaultState, {type: types.GET_SITES, payload: newState});
    expect(state).toEqual(newState);
  });

  it('Should return existing state if don\'t receive new state', () => {
    const defaultState = [{id: 1, name: 'Test site 1'}, {id: 2, name: 'Test site 2'}];
    const state = reducer(defaultState, {});
    expect(state).toEqual(defaultState);
  });
});

describe('Sites reducer Get sites action', () => {
  it('Should return new state if receive a type with default state', () => {
    const newState = [{id: 1, name: 'Test site 1'}, {id: 2, name: 'Test site 2'}];
    const state = reducer(undefined, {type: types.GET_SITES, payload: newState});
    expect(state).toEqual(newState);
  });
});

describe('Sites reducer Delete sites action', () => {
  it('Should return new state if receive a type with default state', () => {
    const defaultState = [{id: 1, name: 'Test site 1'}, {id: 2, name: 'Test site 2'}];
    const state = reducer(defaultState, {type: types.DELETE_SITE, payload: 1});
    expect(state).toEqual([{id: 2, name: 'Test site 2'}]);
  });
});
