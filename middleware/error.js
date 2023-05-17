export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 501;

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
