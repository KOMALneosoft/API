const empModel = require("../Schemas/EmployeeSchema.js");
const mongoose = require("mongoose");
const getData = async () => await empModel.find({});
const postData = async (data) => {
  console.log(data);
  let insert = await new empModel(data);
  insert.save((err) => {
    if (err) {
      console.log(err);
    }
  });
};
const deleteData = async (email) => await empModel.deleteOne({ email: email });
const putData = async (email, data) =>
  await empModel.findOneAndUpdate({ email: email }, data);

module.exports = { getData, postData, deleteData, putData };
