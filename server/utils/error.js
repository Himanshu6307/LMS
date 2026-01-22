export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ErrorHandler";
  }
}

// Error handling middleware
export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB ID error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // JWT token error
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid";
    err = new ErrorHandler(message, 400);
  }

  // JWT expired error
  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token is expired";
    err = new ErrorHandler(message, 401);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    statusCode: err.statusCode,
  });
};
