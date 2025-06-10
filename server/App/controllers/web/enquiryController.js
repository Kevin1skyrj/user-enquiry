const enquiryModel = require("../../models/enquirymodels");

let enquiryInsert = (req, res) => {
  let { name, email, phone, message } = req.body;
  let userEnquiry = new enquiryModel({
    name,
    email,
    phone,
    message,
  });
  userEnquiry
    .save()
    .then(() => {
      res.send({
        status: 1,
        message: "Enquiry submitted successfully",
      });
    })
    .catch((err) => {
      res.send({
        status: 0,
        message: "Enquiry submitted failed",
        error: err,
      });
    });
};

module.exports = {
  enquiryInsert,
};
