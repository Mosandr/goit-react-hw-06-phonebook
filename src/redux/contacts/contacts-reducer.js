import { combineReducers } from "redux";
import actionsTypes from "./contacts-types";

const itemsReducer = (
  state = JSON.parse(localStorage.getItem("contacts")) || [],
  { type, payload }
) => {
  let updateContacts = [...state];
  switch (type) {
    case actionsTypes.ADD:
      updateContacts = [payload, ...state];
      localStorage.setItem("contacts", JSON.stringify(updateContacts));
      return updateContacts;
    case actionsTypes.DELETE:
      updateContacts = state.filter(({ id }) => id !== payload);
      localStorage.setItem("contacts", JSON.stringify(updateContacts));
      return updateContacts;
    default:
      return state;
  }
};
const filterReducer = (state = "", { type, payload }) => {
  switch (type) {
    case actionsTypes.CHANGE_FILTER:
      return payload;
    default:
      return state;
  }
};

export default combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});
