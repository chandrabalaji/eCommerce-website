export function validateRequiredFields(data, requiredFields) {
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
    return {
      valid: false,
      missingFields,
    };
  }

  return { valid: true };
}
