import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import actions from "../contacts/contacts-actions";

const initialState = JSON.parse(localStorage.getItem("contacts")) || [];

const itemsReducer = createReducer(initialState, {
  [actions.addItem]: (state, { payload }) => [payload, ...state],
  [actions.deleteItem]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filterReducer = createReducer("", {
  [actions.filterChange]: (_, { payload }) => payload,
});

export default combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});
