const yup = require("yup");

let userYupSchema = yup.object().shape({
  name: yup.string().required(),
  password: yup
    .string()
    .required()
    .min(5),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function() {
    return new Date();
  })
});

module.exports = {
  userYupSchema
};
