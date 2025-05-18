// backend/error/error.js
const errorHandler = (err, res) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ success: false, message });
};

export { errorHandler };
