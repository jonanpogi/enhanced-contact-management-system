import { mockData } from "../mock_data.js";
import ObjectId from "bson-objectid";
import { ErrorHandler } from "../utils/errorHandler.js";

const listContacts = () => {
  const list = mockData;

  if (list.length === 0) {
    return [];
  }

  return list;
};

const createContact = (request) => {
  const id = new ObjectId();
  const newContact = { id: id.toString(), ...request };

  mockData.contacts.push(newContact);

  return newContact;
};

const updateContact = (id, request) => {
  const index = mockData.contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    throw new ErrorHandler(404, "Contact not found");
  }

  const updatedContact = { ...mockData.contacts[index], ...request };

  mockData.contacts[index] = updatedContact;

  return updatedContact;
};

const deleteContact = (id) => {
  const index = mockData.contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    throw new ErrorHandler(404, "Contact not found");
  }

  const deletedContact = mockData.contacts[index];

  mockData.contacts.splice(index, 1);

  return deletedContact;
};

const contactServices = {
  listContacts,
  createContact,
  updateContact,
  deleteContact,
};

Object.freeze(contactServices);

export default contactServices;
