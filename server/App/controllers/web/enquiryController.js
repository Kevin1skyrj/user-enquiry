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
      res.status(200).json({
        status: 1,
        message: "Enquiry submitted successfully",
      });
    })
    .catch((err) => {
      console.error("Database error:", err);
      res.status(400).json({
        status: 0,
        message: "Enquiry submission failed",
        error: err.message,
      });
    });
};

let enquiryList = (req, res) => {
  enquiryModel
    .find()
    .then((enquiries) => {
      res.status(200).json({
        status: 1,
        message: "Enquiries retrieved successfully",
        data: enquiries,
      });
    })
    .catch((err) => {
      console.error("Database error:", err);
      res.status(400).json({
        status: 0,
        message: "Enquiry submission failed",
        error: err.message,
      });
    });
};

module.exports = {
  enquiryInsert,
  enquiryList,
};
