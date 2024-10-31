export class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  
  export const handleError = (err, req, res, next) => {
    // Check if the error is an instance of our ErrorHandler class
    if (err instanceof ErrorHandler) {
      const { statusCode, message } = err;
      return res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
      });
    }
  
    // If the error is unknown, log it for debugging and send a generic response
    console.error("Unexpected error:", err);
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "An unexpected error occurred. Please try again later.",
    });
  };
  

  