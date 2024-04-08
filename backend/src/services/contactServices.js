import db from "../configs/sqlite3.js";
import ObjectId from "bson-objectid";
import { ErrorHandler } from "../utils/errorHandler.js";

const listContacts = async () => {
  try {
    // create sql query
    const sql = "SELECT * FROM contacts";

    // execute the query
    const list = await new Promise((success, fail) =>
      db.all(sql, (error, rows) => {
        if (error) {
          fail(new Error(error.message || "Unable to fetch contacts"));
        }

        if (rows.length === 0) {
          success([]);
        } else {
          const parsedRows = rows.map((row) => ({
            ...row,
            phoneNumber: JSON.parse(row.phoneNumber),
            address: JSON.parse(row.address),
          }));

          success(parsedRows);
        }
      })
    );

    // return the list of contacts
    return list;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

const createContact = async (request) => {
  try {
    // compose the data object
    const id = new ObjectId().toString();
    const phoneNumber = JSON.stringify(request.phoneNumber);
    const address = JSON.stringify(request.address);
    const data = { ...request, id, phoneNumber, address };

    // extract the values, columns, and placeholders
    const values = Object.values(data);
    const columns = Object.keys(data).join(", ");
    const placeholders = Object.keys(data)
      .map(() => "?")
      .join(", ");

    // create the SQL query
    const sql = `INSERT INTO contacts (${columns}) VALUES (${placeholders})`;

    // execute the query
    const newContact = await new Promise((success, fail) =>
      db.run(sql, values, (error) => {
        if (error) {
          fail(new Error(error.message | "Unable to create contact"));
        }

        success(data);
      })
    );

    // return the new contact
    return newContact;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

const updateContact = async (id, request) => {
  try {
    // create the SQL query for fetching the contact first
    const sql_read = "SELECT * FROM contacts WHERE id = ?";

    // execute the query
    const contact = await new Promise((success, fail) =>
      db.get(sql_read, [id], (error, row) => {
        if (error) {
          fail(new Error(error.message || "Unable to fetch contact"));
        }

        success(row);
      })
    );

    // check if the contact exists
    if (!contact) {
      throw new ErrorHandler(404, "Contact not found");
    }

    // compose the data object
    const data = { ...request };

    // check if the phoneNumber and address are present
    for (const key in data) {
      if (key === "phoneNumber" || key === "address") {
        // convert the phoneNumber and address to JSON strings
        data[key] = JSON.stringify(data[key]);
      }
    }

    // extract the new data
    const values = Object.values(data);
    const setClause = Object.keys(request)
      .map((key) => `${key} = ?`)
      .join(", ");

    // create the SQL query for updating the contact
    const sql_write = `UPDATE contacts SET ${setClause} WHERE id = ?`;

    // execute the query
    const updatedContact = await new Promise((success, fail) =>
      db.run(sql_write, [...values, id], (error) => {
        if (error) {
          fail(new Error(error.message || "Unable to update contact"));
        }

        success({ ...contact, ...data });
      })
    );

    return updatedContact;
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }

    throw new ErrorHandler(500, error.message);
  }
};

const deleteContact = async (id) => {
  try {
    // create the SQL query for fetching the contact first
    const sql_read = "SELECT * FROM contacts WHERE id = ?";

    // execute the query
    const contact = await new Promise((success, fail) =>
      db.get(sql_read, [id], (error, row) => {
        if (error) {
          fail(new Error(error.message || "Unable to fetch contact"));
        }

        success(row);
      })
    );

    // check if the contact exists
    if (!contact) {
      throw new ErrorHandler(404, "Contact not found");
    }

    const deletedContact = await new Promise((success, fail) =>
      db.run("DELETE FROM contacts WHERE id = ?", [id], (error) => {
        if (error) {
          fail(new Error(error.message || "Unable to delete contact"));
        }

        success(contact);
      })
    );

    return deletedContact;
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }

    throw new ErrorHandler(500, error.message);
  }
};

const uploadProfileImage = async (blob) => {
  try {
    // generate a new ID
    const id = new ObjectId().toString();

    // create the SQL query for uploading the profile image
    const sql = `INSERT INTO images (id, image) VALUES (?, ?)`;

    // execute the query
    const newImage = await new Promise((success, fail) =>
      db.run(sql, [id, blob], (error) => {
        if (error) {
          fail(new Error(error.message || "Unable to upload profile image"));
        }

        success(row);
      })
    );

    // return the new image ID
    return newImage;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

const contactServices = {
  listContacts,
  createContact,
  updateContact,
  deleteContact,
  uploadProfileImage,
};

Object.freeze(contactServices);

export default contactServices;
