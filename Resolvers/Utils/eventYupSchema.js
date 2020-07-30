const yup = require("yup");

let eventYupSchema = yup.object().shape({
  name: yup.string().required().min(5),
  lat: yup.number(),
  lng: yup.number(),
  address: yup.string(),
  dateStart: yup.date().min(new Date()),
  price: yup.number().min(0),
  capacityMax: yup.number().positive(),
  description: yup.string().min(10),
});

module.exports = {
  eventYupSchema,
};
