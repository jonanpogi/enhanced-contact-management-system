// import the necessary packages
import express from "express";
import validation from "../utils/validation.js";
import contactServices from "../services/contactServices.js";
import errorHandler, { ErrorHandler } from "../utils/errorHandler.js";

// initialize express router
const router = express.Router();

// define routes for contacts
router.get(
  "/contacts",
  errorHandler((_, res) => {
    const response = contactServices.listContacts();

    res.status(200).json({
      success: true,
      data: response,
    });
  })
);

router.post(
  "/contact",
  validation.addContact,
  errorHandler((req, res) => {
    const response = contactServices.createContact(req.body);

    res.status(201).json({
      success: true,
      data: response,
    });
  })
);

router.put(
  "/contact/:id",
  validation.updateContact,
  errorHandler((req, res) => {
    const response = contactServices.updateContact(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: response,
    });
  })
);

router.delete(
  "/contact/:id",
  validation.deleteContact,
  errorHandler((req, res) => {
    const response = contactServices.deleteContact(req.params.id);

    res.status(200).json({
      success: true,
      data: response,
    });
  })
);

// export router as Contacts route
export { router as Contacts };
