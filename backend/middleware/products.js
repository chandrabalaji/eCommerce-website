export const validateRequiredFields = (requiredFields) => (req, res, next) => {
  const data = req.body;
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (
      data[field] === undefined ||
      data[field] === null ||
      data[field] === ""
    ) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Some fields are missing",
      missingFields,
      status: 400,
    });
  }

  next();
};
