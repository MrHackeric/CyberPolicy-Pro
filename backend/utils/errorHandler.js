import express from "express";

export class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message); // Pass the message to the parent Error class
    this.statusCode = statusCode;
  }
}

// Middleware for handling errors
export const handleError1 = (err, req, res, next) => {
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
  return res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "An unexpected error occurred. Please try again later.",
  });
};

// This function should only be called within the context of an Express route or middleware
export const handleError = (res, statusCode, message, error) => {
  if (!res) {
    console.error("Response object is undefined.");
    return; // Early return if res is undefined
  }
  
  console.error(`${message} -`, error); // Log error details
  res.status(statusCode).json({
    message,
    error: error?.message || "Unknown error",
  });
};