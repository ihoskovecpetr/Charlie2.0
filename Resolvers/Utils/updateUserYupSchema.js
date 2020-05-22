const yup = require("yup");

let updateUserYupSchema = yup.object().shape({
  name: yup.string().required(),
  password: yup
    .string()
    .min(5),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function() {
    return new Date();
  })
});

module.exports = {
  updateUserYupSchema
};
