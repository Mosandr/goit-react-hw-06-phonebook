import { createAction } from "@reduxjs/toolkit";
import shortId from "shortid";

const addItem = createAction("items/Add", (contact) => ({
  payload: {
    id: shortId.generate(),
    name: contact.name,
    number: contact.number,
  },
}));

const deleteItem = createAction("items/Delete");

const filterChange = createAction("items/Filter");

export default { addItem, deleteItem, filterChange };
