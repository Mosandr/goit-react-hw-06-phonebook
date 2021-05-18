import shortId from "shortid";
import actionsTypes from "./contacts-types";

export const addItem = (contact) => ({
  type: actionsTypes.ADD,
  payload: {
    id: shortId.generate(),
    name: contact.name,
    number: contact.number,
  },
});

export const deleteItem = (id) => ({
  type: actionsTypes.DELETE,
  payload: id,
});

export const filterChange = (value) => ({
  type: actionsTypes.CHANGE_FILTER,
  payload: value,
});

export default { addItem, deleteItem, filterChange };
