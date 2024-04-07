export class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error("ERROR: ", error);

    if (error instanceof ErrorHandler) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

export default errorHandler;
