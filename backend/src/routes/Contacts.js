// import the necessary packages
import express from "express";
import validation from "../utils/validation.js";
import contactServices from "../services/contactServices.js";
import errorHandler from "../utils/errorHandler.js";

// initialize express router
const router = express.Router();

// define routes for contacts
router.get(
  "/contacts",
  errorHandler(async (_, res) => {
    const response = await contactServices.listContacts();

    res.status(200).json({
      success: true,
      data: response,
    });
  })
);

router.post(
  "/contact",
  validation.addContact,
  errorHandler(async (req, res) => {
    const response = await contactServices.createContact(req.body);

    res.status(201).json({
      success: true,
      data: response,
    });
  })
);

router.put(
  "/contact/:id",
  validation.updateContact,
  errorHandler(async (req, res) => {
    const response = await contactServices.updateContact(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: response,
    });
  })
);

router.delete(
  "/contact/:id",
  errorHandler(async (req, res) => {
    const response = await contactServices.deleteContact(req.params.id);

    res.status(200).json({
      success: true,
      data: response,
    });
  })
);

// export router as Contacts route
export { router as Contacts };
