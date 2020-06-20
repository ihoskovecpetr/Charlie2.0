const yup = require("yup");

let updateUserYupSchema = yup.object().shape({
  _id: yup.string(), //keep on going with _id\\
  name: yup.string(),
  description: yup.string(),
  picture: yup.string(),
  socialId: yup.string(),
  typeDirect: yup.bool(),
  typeSocial: yup.bool(),
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
