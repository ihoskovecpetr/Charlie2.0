import { ValidationError } from "yup"; // typescript

export const formatYupError = err => {
  const errors = [];
  console.log("Yup errors: ", err);
  err.inner.forEach(e => {
    errors.push({
      name: e.path,
      message: e.message
    });
  });
  return { errorOut: errors };
};
