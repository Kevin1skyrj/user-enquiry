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
        message: "Failed to retrieve enquiries",
        error: err.message,
      });
    });
};

let enquiryDelete = (req, res) => {
  let { id } = req.params;
  enquiryModel
    .findByIdAndDelete(id)
    .then((deletedEnquiry) => {
      if (!deletedEnquiry) {
        return res.status(404).json({
          status: 0,
          message: "Enquiry not found",
        });
      }
      res.status(200).json({
        status: 1,
        message: "Enquiry deleted successfully",
        data: deletedEnquiry,
      });
    })
    .catch((err) => {
      console.error("Database error:", err);
      res.status(400).json({
        status: 0,
        message: "Failed to delete enquiry",
        error: err.message,
      });
    });
};

let enquiryUpdate = (req, res) => {
  let { id } = req.params;
  let { name, email, phone, message } = req.body;
  
  enquiryModel
    .findByIdAndUpdate(
      id,
      { name, email, phone, message },
      { new: true, runValidators: true }
    )
    .then((updatedEnquiry) => {
      if (!updatedEnquiry) {
        return res.status(404).json({
          status: 0,
          message: "Enquiry not found",
        });
      }
      res.status(200).json({
        status: 1,
        message: "Enquiry updated successfully",
        data: updatedEnquiry,
      });
    })
    .catch((err) => {
      console.error("Database error:", err);
      res.status(400).json({
        status: 0,
        message: "Failed to update enquiry",
        error: err.message,
      });
    });
};

module.exports = {
  enquiryInsert,
  enquiryList,
  enquiryDelete,
  enquiryUpdate,
};
