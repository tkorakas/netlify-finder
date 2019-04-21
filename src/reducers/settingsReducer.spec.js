import { types } from "../actions/types";
import settingsReducer, { defaultState } from "./settingsReducer";

describe("Settings Reducer", () => {
  it("Should return default state", () => {
    const state = settingsReducer(undefined, {});
    expect(state).toBe(defaultState);
  });

  it("Should return new state if receive a type with default state", () => {
    const state = settingsReducer(undefined, {
      type: types.SHOW_NEW_SITE_DIALOG,
      payload: true
    });
    expect(state).toEqual({ ...defaultState, newSiteModalVisible: true });
  });

  it("Should return new state if receive a type with existing state", () => {
    const state = settingsReducer(
      { ...defaultState, newSiteModalVisible: true },
      { type: types.SHOW_NEW_SITE_DIALOG, payload: false }
    );
    expect(state).toEqual({ ...defaultState, newSiteModalVisible: false });
  });
});
