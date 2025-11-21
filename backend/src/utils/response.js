export const successResponse = (res, data = null, message = "Success", statusCode = 200) =>
  res.status(statusCode).json({ status: "success", message, data });

export const errorResponse = (
  res,
  message = "Something went wrong",
  statusCode = 500,
  errors = null
) => res.status(statusCode).json({ status: "error", message, errors });

